import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  callbacks: {
    async session({ session }) {
      if (session?.user) {

        // OWNER EMAIL
        if (session.user.email === 'newgod155700@gmail.com') {
          session.user.role = 'OWNER';
        } else {
          session.user.role = 'USER';
        }
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
