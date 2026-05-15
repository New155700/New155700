# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, session, redirect, jsonify, url_for
from werkzeug.utils import secure_filename
import json, os, time, uuid
import string, random
import requests
import threading

app = Flask(__name__)
app.secret_key = "nnshop_ultra_premium_key_9999"

# Config
DB_FILE = "database.json"
UPLOAD_FOLDER = "static/uploads"
ADMIN_PIN = "5593" 
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER): os.makedirs(UPLOAD_FOLDER)

# GitHub Real-time Config
GITHUB_TOKEN = "ghp_1DS1fUw1a1VjCpoOD9qkYJE3E62XO2m2uGc"
GITHUB_REPO = "github.com/New155700/New155700.git"
GITHUB_URL = f"https://New155700:{GITHUB_TOKEN}@{GITHUB_REPO}"

# Cloudflare Turnstile Secret Key
TURNSTILE_SECRET = "0x4AAAAAADOLXU2qRpsdS8Lm_Mp-iFeUeVA"

# --- SYSTEM: REAL-TIME SYNC HELPER ---

def sync_now():
    """ฟังก์ชันสั่ง Push ข้อมูลขึ้น GitHub ทันทีแบบเบื้องหลัง"""
    def run():
        # รอสัก 1 วินาทีเพื่อให้ไฟล์บันทึกเสร็จสมบูรณ์
        time.sleep(1)
        os.system("git add .")
        os.system(f'git commit -m "Real-time Update: {time.strftime("%H:%M:%S")}"')
        os.system(f"git push {GITHUB_URL} main --force")
    threading.Thread(target=run, daemon=True).start()

# --- DATABASE HELPERS ---

def load_db():
    if not os.path.exists(DB_FILE):
        default_db = {
            "users": {}, "products": [], "logs": [], "orders": [], 
            "categories": ["GAME", "SOFTWARE", "STREAMING"],
            "settings": {"shop_name": "NN SHOP"}
        }
        save_db(default_db)
        return default_db
    with open(DB_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_db(data):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    # สั่งซิงค์ไป GitHub ทันทีที่มีการเซฟข้อมูล
    sync_now()

def get_user():
    db = load_db()
    name = session.get("username")
    return db["users"].get(name) if name else None

# --- API สำหรับตรวจสอบ PIN 5593 ---
@app.route("/api/verify_admin_pin", methods=["POST"])
def verify_pin():
    data = request.json
    if data and data.get("pin") == ADMIN_PIN:
        session["admin_auth"] = True
        return jsonify({"status": "success"})
    return jsonify({"status": "error", "msg": "รหัส PIN ไม่ถูกต้อง!"})

# --- AUTH ROUTES ---

@app.route("/")
def index():
    if "username" in session: return redirect(url_for("home"))
    return render_template("welcome.html")

@app.route("/api/auth", methods=["POST"])
def auth():
    db = load_db()
    data = request.json
    
    if not data:
        return jsonify({"status": "error", "msg": "ข้อมูลไม่ถูกต้อง"})
    
    action = data.get("action")
    u = data.get("username")
    p = data.get("password")
    token = data.get("turnstile_token")
    
    if not u or not p:
        return jsonify({"status": "error", "msg": "กรุณากรอกข้อมูลให้ครบ"})

    if not token:
        return jsonify({"status": "error", "msg": "กรุณายืนยันตัวตนว่าไม่ใช่บอท"})

    try:
        verify_response = requests.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={'secret': TURNSTILE_SECRET, 'response': token},
            timeout=10
        )
        res_data = verify_response.json()
        if not res_data.get("success"):
            return jsonify({"status": "error", "msg": "การยืนยันตัวตนล้มเหลว กรุณารีเฟรชหน้าเว็บแล้วลองใหม่"})
    except requests.exceptions.RequestException:
        return jsonify({"status": "error", "msg": "ระบบตรวจสอบความปลอดภัยขัดข้อง กรุณาลองใหม่"})

    if action == "register":
        if u in db["users"]: 
            return jsonify({"status": "error", "msg": "มีชื่อผู้ใช้งานนี้ในระบบแล้ว"})
        
        db["users"][u] = {
            "password": p, 
            "rank": "MEMBER", 
            "balance": 0, 
            "is_admin": False, 
            "total_topup": 0
        }
        save_db(db)
        return jsonify({"status": "success"})
        
    if action == "login":
        if u in db["users"] and db["users"][u]["password"] == p:
            session["username"] = u
            return jsonify({"status": "success"})
        return jsonify({"status": "error", "msg": "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"})

    return jsonify({"status": "error", "msg": "คำสั่งไม่ถูกต้อง"})

# --- HOME ---

@app.route("/home")
def home():
    user = get_user()
    if not user: return redirect(url_for("index"))
    
    db = load_db()
    username = session.get("username")
    my_orders = [o for o in db.get("orders", []) if o.get("user") == username]
    
    return render_template("index.html", 
                           user=user, 
                           db=db, 
                           username=username, 
                           orders=my_orders)

# --- API BUY ---

@app.route("/api/buy", methods=["POST"])
def buy_api():
    db = load_db()
    user_session = db["users"].get(session.get("username"))
    if not user_session: return jsonify({"status": "error", "msg": "เซสชั่นหมดอายุ"})
    
    data = request.json
    p_id_str = data.get("product_id")
    if p_id_str is None: return jsonify({"status": "error", "msg": "ไม่พบรหัสสินค้า"})
    
    p_id = int(p_id_str)
    
    try:
        product = db["products"][p_id]
        price = int(product["price"])
        
        if user_session["balance"] >= price:
            user_session["balance"] -= price
            order_id = str(uuid.uuid4())[:8].upper()
            
            new_order = {
                "order_id": order_id,
                "user": session["username"],
                "product_name": product["name"],
                "price": price,
                "time": time.strftime("%d/%m/%Y %H:%M:%S"),
                "status": "สำเร็จ",
                "details": "ขอบคุณที่ใช้บริการ นี่คือรหัสของคุณ: " + str(uuid.uuid4())
            }
            
            db["orders"].append(new_order)
            db["logs"].append({
                "user": session["username"], 
                "action": f"ซื้อ {product['name']}",
                "amount": -price, 
                "time": time.strftime("%d/%m/%Y %H:%M")
            })
            
            save_db(db)
            return jsonify({"status": "success", "msg": "ซื้อสินค้าสำเร็จ!", "order": new_order})
        return jsonify({"status": "error", "msg": "ยอดเงินคงเหลือไม่เพียงพอ"})
    except Exception as e:
        return jsonify({"status": "error", "msg": "ไม่พบข้อมูลสินค้าหรือเกิดข้อผิดพลาด"})

# --- ADMIN SYSTEM ---

@app.route("/admin")
def admin():
    user = get_user()
    if not user or not user.get("is_admin"): 
        return redirect(url_for("home"))
    
    db = load_db()
    
    if not session.get("admin_auth"):
        return render_template("admin.html", 
                               db=db,
                               username=session.get("username"),
                               user=user,
                               users=db.get("users", {}), 
                               products=db.get("products", []), 
                               logs=db.get("logs", []), 
                               categories=db.get("categories", ["GAME", "SOFTWARE", "STREAMING"]), 
                               orders=db.get("orders", []),
                               is_pin_locked=True)

    session["admin_auth"] = False 
    
    return render_template("admin.html", 
                           db=db, 
                           username=session.get("username"), 
                           user=user,
                           users=db.get("users", {}), 
                           products=db.get("products", []), 
                           logs=db.get("logs", []), 
                           categories=db.get("categories", ["GAME", "SOFTWARE", "STREAMING"]), 
                           orders=db.get("orders", []),
                           is_pin_locked=False)

# --- PRODUCT MANAGEMENT ---

def generate_short_id(existing_products):
    chars = string.ascii_uppercase + string.digits
    used_ids = {p.get("secret_code") for p in existing_products}
    while True:
        length = random.randint(1, 3)
        new_id = ''.join(random.choice(chars) for _ in range(length))
        if new_id not in used_ids:
            return new_id

@app.route("/add_product", methods=["POST"])
def add_product():
    if not get_user() or not get_user().get("is_admin"): return "Unauthorized"
    db = load_db()
    
    name = request.form.get("name")
    price = request.form.get("price")
    cat = request.form.get("category")
    qty = int(request.form.get("quantity", 1))
    custom_content = request.form.get("content", "ไม่มีรายละเอียด")
    
    f = request.files.get("image")
    fname = "default.png"
    if f and f.filename != '':
        original_name = secure_filename(f.filename)
        fname = f"{int(time.time())}_{original_name}"
        f.save(os.path.join(app.config["UPLOAD_FOLDER"], fname))

    for _ in range(qty):
        unique_short_id = generate_short_id(db["products"])
        db["products"].append({
            "name": name, 
            "price": price, 
            "category": cat, 
            "img": fname,
            "content": custom_content,
            "secret_code": unique_short_id
        })
        
    save_db(db)
    return redirect(url_for("admin"))

@app.route("/money", methods=["POST"])
def money_manage():
    if not get_user() or not get_user().get("is_admin"): return "Unauthorized"
    db = load_db()
    target = request.form.get("username")
    action = request.form.get("action")
    amount = int(request.form.get("amount", 0))
    if target in db["users"]:
        if action == "add":
            db["users"][target]["balance"] += amount
            db["users"][target]["total_topup"] = db["users"][target].get("total_topup", 0) + amount
        else:
            db["users"][target]["balance"] -= amount
        db["logs"].append({"admin": session["username"], "user": target, "action": action, "amount": amount, "time": time.strftime("%d/%m/%Y %H:%M")})
        save_db(db)
    return redirect(url_for("admin"))

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
