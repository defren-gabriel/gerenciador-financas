import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import {useAuth} from "../../Contextos/Auth";

import styles from "./Registro.module.css";

const Registro = () => {
    const {user, register} = useAuth();
    
    //verifica se esta logado e muda para a página de controle
    useEffect(()=>{
        if(user){
            navigate("/controle");
        }
    }, []);

    //controle do email e senha
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => setEmail(e.target.value);
    const [senha, setSenha] = useState("");
    const handleSenhaChange = (e) => setSenha(e.target.value);
    const [error, setError] = useState("");

    //manipula a mudança para pagina login
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/");
    }

    //manipula as mensagens de erro
    const tratarErroAutenticacao = (codigoErro) => {
        const erros = {
            "auth/email-already-in-use": "Este e-mail já está em uso. Tente outro ou faça login.",
            "auth/invalid-email": "O e-mail informado não é válido. Verifique e tente novamente.",
            "auth/user-not-found": "Nenhum usuário encontrado com este e-mail. Verifique ou registre-se.",
            "auth/wrong-password": "Senha incorreta. Verifique e tente novamente.",
            "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
            "auth/network-request-failed": "Falha de conexão. Verifique sua internet.",
            "auth/too-many-requests": "Muitas tentativas seguidas. Aguarde um momento e tente novamente.",
            "auth/invalid-credential" : "Possível e-mail ou senha inválidos, verifique."
        };
    
        return erros[codigoErro] || "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    }

    //manipula o registro
    const [registrando, setRegistrando] = useState(false);
    const Registro = async (e) => {
        e.preventDefault();

        setRegistrando(true);
        setError("");
        try {
            const user = await register(email, senha);
            
            if (user) {
                setEmail("");
                setSenha("");
                navigate("/controle");
                setRegistrando(false);
            }
        } catch (error) {
            setError(tratarErroAutenticacao(error.code));
            setRegistrando(false);
        }
    }

    return(
        <main className={styles.container}>
            <h1 className={styles.titulo1}>Efetue o registro</h1>
            {/*container do formulario*/}
            <form 
                className={styles.form}
                onSubmit={Registro}
            >
                {/*container para o email*/}
                <div className={styles.email}>
                    <label 
                        htmlFor="email"
                        className={styles.label}
                    >
                        E-mail
                    </label>
                    <input 
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        id="email"
                        name="email"
                        className={styles.input}
                    />
                </div>
                {/*container para a senha*/}
                <div className={styles.senha}>
                    <label 
                        htmlFor="senha"
                        className={styles.label}
                    >
                        Senha
                    </label>
                    <input 
                        type="password" 
                        value={senha}
                        onChange={handleSenhaChange}
                        id="senha"
                        name="senha"
                        className={styles.input}
                    />
                </div>
                {/*container para os botoes*/}
                {
                    !registrando ?
                        <div className={styles.botoes}>
                            <button 
                                className={styles.botaoentrar}
                                onClick={handleLogin}
                            >
                                Fazer o login
                            </button>
                            <input 
                                className={styles.botaoregistrar} 
                                type="submit" 
                                value="Registrar" 
                            />
                        </div> :
                        <p className={styles.msgbtn}>Aguarde por favor...</p>
                }
                {
                    error && <p className={styles.erro}>{error}</p>
                }
            </form>
        </main>
    );
}

export default Registro;