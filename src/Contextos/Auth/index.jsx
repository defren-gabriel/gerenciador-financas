import { useState, useEffect } from "react";
import { 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword 
} from "firebase/auth";
import {auth} from "../../Firebase/config";
import { useContext, createContext } from "react";

/*contexto*/
export const Auth = createContext();

/*hook*/
export const useAuth = () => useContext(Auth);

/*provider*/
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Efeito para verificar se o usuário já está logado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Função de login
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user; // Retorna o usuário autenticado
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            throw error;
        }
    };

    // Função de registro
    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user; // Retorna o usuário registrado
        } catch (error) {
            console.error("Erro ao registrar usuário:", error.message);
            throw error;
        }
    };

    // Função de logout
    const logout = async () => {
        try {
            await signOut(auth);  
        } catch (error) {
            console.error("Erro ao fazer logout:", error.message);
            throw error;
        }
    };

    /*provider - acesso*/
    return(
        <Auth.Provider value={{user, login, register, logout}}>
            {!loading && children}
        </Auth.Provider>
    );
}