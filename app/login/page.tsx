'use client'

import { auth, provider } from '@/lib/firebase-config';
import { getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return;
      }

      fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.push("/poker");
        }
      });
    });
  }, []);

  function handleLogin() {
    signInWithRedirect(auth, provider);
  }

  return (
    <main className="flex min-h-screen justify-center items-center">
      {/* <LoginForm /> */}
      <button onClick={() => handleLogin()}>Log In</button>
    </main>
  )
}