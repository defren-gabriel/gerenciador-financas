import {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";

import {useAuth} from "../../Contextos/Auth";

import styles from "./Login.module.css";

const Login = () => {
    //do contexto
    const {user, login} = useAuth();

    const inputLoginRef = useRef();

    //verifica se já esta logado
    useEffect(()=>{
        if(user){
            navigate("/controle");
        }

        //foca o componente login
        if(inputLoginRef.current){
            inputLoginRef.current.focus();
        }
    }, []);

    //controle do email e senha
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => setEmail(e.target.value);
    const [senha, setSenha] = useState("");
    const handleSenhaChange = (e) => setSenha(e.target.value);

    //mensagem de erro
    const [error, setError] = useState("");

    //manipula a mudança de pagina para a pagina de registro
    const navigate = useNavigate();
    const handleRegistro = (e) => {
        e.preventDefault();
        navigate("/registro");
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

    //manipula o login
    const [logando, setLogando] = useState(false);
    const Login = async (e) => {
        e.preventDefault();

        setLogando(true);
        setError("");
        try {
            const loggedUser = await login(email, senha);

            if (loggedUser) {
                setEmail("");
                setSenha("");
                navigate("/controle");
                setLogando(false);
            }
        } catch (error) {
            console.log(error.code);
            setError(tratarErroAutenticacao(error.code));
            setLogando(false);
        }
    }

    return(
        <main className={styles.container}>
            <h1 className={styles.titulo1}>Efetue a entrada</h1>
            {/*container do formulario*/}
            <form 
                className={styles.form}
                onSubmit={Login}
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
                        ref={inputLoginRef}
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
                    !logando ? 
                        <div className={styles.botoes}>
                            <button 
                                className={styles.botaoregistrar}
                                onClick={handleRegistro}
                                type="button"
                            >
                                Fazer o registro
                            </button>
                            <input 
                                className={styles.botaoentrar} 
                                type="submit" 
                                value="Entrar" 
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

export default Login;