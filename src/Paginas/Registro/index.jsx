import {useState} from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Registro.module.css";

const Registro = () => {
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => setEmail(e.target.value);
    const [senha, setSenha] = useState("");
    const handleSenhaChange = (e) => setSenha(e.target.value);

    //manipula a mudança de pagina
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/");
    }

    //manipula o registro
    const [registrando, setRegistrando] = useState(false);
    const Registro = (e) => {
        e.preventDefault();

        setRegistrando(true);
        console.log("Fazendo o registro");
        navigate("/controle");
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
                <p className={styles.erro}>Houve um erro qualquer</p>
            </form>
        </main>
    );
}

export default Registro;