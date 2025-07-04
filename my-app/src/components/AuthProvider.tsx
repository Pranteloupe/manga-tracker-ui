import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, createContext, useState } from "react";
import { auth } from "../firebaseConfig";
import { redirect } from "react-router";

interface contextProps {
  user: string | null;
  signIn: (email: string, password: string) => void;
  logOut: () => void;
}

const AuthContext = createContext({} as contextProps);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const signIn = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("created");
        // Signed up
        const user = userCredential.user;
        redirect("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const logOut = () => {
    setUser(null);
    redirect("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);