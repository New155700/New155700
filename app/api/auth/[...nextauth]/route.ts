import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      if (session?.user) {
        // เปลี่ยนเมลข้างล่างนี้เป็น Gmail ของคุณเองเพื่อเป็นเจ้าของร้าน
        if (session.user.email === "newgod155700@gmail.com") {
          session.user.role = "OWNER";
        } else {
          session.user.role = "USER";
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
