'use client'

export default function Login() {
  // const router = useRouter();

  function handleLogin() {
    console.log('click');
  }

  return (
    <main className="flex min-h-screen justify-center items-center">
      <button onClick={() => handleLogin()}>Log In With Google</button>
    </main>
  )
}