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
        // เปลี่ยนเมลตรงนี้เป็นเมลคุณ
        session.user.role = session.user.email === "newgod155700@gmail.com" ? "OWNER" : "USER";
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
