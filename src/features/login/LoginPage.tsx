import { auth } from "@/firebase/firebaseClient";
import { FirebaseError } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LoginPage = () => {
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      if (!auth) return;
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(token, user);
    } catch (e: unknown) {
      const credential = GoogleAuthProvider.credentialFromError(
        e as FirebaseError
      );
      return Promise.reject(e);
    }
  };
  return (
    <main
      className={"w-full h-full min-h-screen flex items-center justify-center"}
    >
      <button className={"font-serif text-5xl"} onClick={handleLogin}>
        GOOGLE LOGIN
      </button>
    </main>
  );
};

export default LoginPage;
