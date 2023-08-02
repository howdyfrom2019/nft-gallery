import { auth } from "@/firebase/firebaseClient";
import { FirebaseError } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      if (!auth) return;
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      toast(`Hello ${user.displayName}!`, {
        icon: "🖐️",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      router.push("/list");
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
