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
        // เปลี่ยนเมลเป็นของคุณเพื่อรับยศเจ้าของร้าน
        session.user.role = session.user.email === "ใส่เมลคุณที่นี่@gmail.com" ? "OWNER" : "USER";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
