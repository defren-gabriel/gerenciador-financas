import {useState} from "react";

import styles from "./Login.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => setEmail(e.target.value);
    const [senha, setSenha] = useState("");
    const handleSenhaChange = (e) => setSenha(e.target.value);

    return(
        <section className={styles.container}>
            <h1 className={styles.titulo1}>Efetue a entrada</h1>
            {/*container do formulario*/}
            <form className={styles.form}>
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
                <div className={styles.botoes}>
                    <button className={styles.botaoregistrar}>Fazer o registro</button>
                    <input className={styles.botaoentrar} type="submit" value="Entrar" />
                </div>
            </form>
        </section>
    );
}

export default Login;