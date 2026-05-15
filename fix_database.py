import json
import os

DB = "database.json"

default_settings = {

    "shop_name":"NN SHOP",
    "contact":"https://discord.gg/nnshop",
    "announcement":"WELCOME TO NN SHOP"

}

if not os.path.exists(DB):

    print("ไม่พบ database.json")
    exit()

with open(DB,"r") as f:

    data = json.load(f)

# =========================
# FIX SETTINGS
# =========================

if "settings" not in data:

    data["settings"] = default_settings

# =========================
# FIX USERS
# =========================

if "users" not in data:

    data["users"] = {}

# =========================
# FIX PRODUCTS
# =========================

if "products" not in data:

    data["products"] = []

# =========================
# FIX LOGS
# =========================

if "logs" not in data:

    data["logs"] = []

# =========================
# SAVE
# =========================

with open(DB,"w") as f:

    json.dump(data,f,indent=4)

print("DATABASE FIX SUCCESS")
