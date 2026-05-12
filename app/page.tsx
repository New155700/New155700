'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <h1>NNSHOP</h1>

      {!session ? (
        <button
          onClick={() => signIn('google')}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login with Google
        </button>
      ) : (
        <>
          <img
            src={session.user?.image || ''}
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
          />

          <h2>{session.user?.name}</h2>

          <p>{session.user?.email}</p>

          <button
            onClick={() => signOut()}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </>
      )}
    </main>
  );
}
