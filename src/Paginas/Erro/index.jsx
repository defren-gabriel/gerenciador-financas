import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Erro.module.css";

const Erro = () => {
    const navigate = useNavigate();

    //ao entrar na página mostra a informação e redireciona para a pagina de login
    useEffect(()=>{
        const timer = setTimeout(() => {
            navigate("/");
        }, 2500);

        // Limpa o temporizador se o componente for desmontado antes de 4 segundos
        return () => clearTimeout(timer);
    }, []);

    return(
        <section className={styles.container}>
            <h1 className={styles.titulo1}>A página não existe</h1>
            <p className={styles.paragrafo}>Redirecionando para a página de login...</p>
        </section>
    );
}

export default Erro;