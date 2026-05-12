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
    async session({ session, token }: any) {
      if (session.user) {
        // กำหนดให้ Email ของคุณเป็น OWNER โดยอัตโนมัติ
        if (session.user.email === "อีเมลของคุณ@gmail.com") {
          session.user.role = "OWNER";
        } else {
          session.user.role = "USER";
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
