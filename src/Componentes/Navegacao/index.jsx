import { useNavigate, useLocation } from "react-router-dom";

import {useAuth} from "../../Contextos/Auth";

import styles from "./Navegacao.module.css";

const Navegacao = () => {
    const navigate = useNavigate();
    
    //se estiver na pagina de controle identifica como estando logado
    const location = useLocation();
    const local = location.pathname === "/controle";

    //pega o metodos de saida
    const {logout} = useAuth();

    //manipula o sair
    const Sair = async (e) => {
        e.preventDefault();

        try {
            await logout();  
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error.message);
        }
    }

    return(
        <header>
            <nav className={styles.container}>
                <div className={styles.projdev}>
                    <a className={styles.projdeva} href="https://github.com/defren-gabriel/gerenciador-financas" target="_blank">
                        <figure className={styles.projdevac}>
                            <img 
                                className={styles.projdevai} 
                                src="https://defren-gabriel.github.io/bookmarks/github.png" 
                                alt="Página do GitHub do Projeto" />
                            <figcaption className={styles.projdevacfig}>GitHub</figcaption>
                        </figure>
                    </a>
                    <a className={styles.projdeva} href="https://github.com/defren-gabriel" target="_blank">
                        <figure className={styles.projdevac}>
                            <img 
                                className={styles.projdevai} 
                                src="https://defren-gabriel.github.io/bookmarks/eu.png" 
                                alt="Página do Desenvolvedor" />
                            <figcaption className={styles.projdevacfig}>Eu</figcaption>
                        </figure>
                    </a>
                </div>
                <div className={styles.links}>
                    <span className={styles.linkss}>Gerenciar Finanças</span>                    
                    {
                        local &&
                            <button 
                                className={styles.linksb}
                                onClick={Sair}
                            >
                                Sair
                            </button>
                    }
                </div>
            </nav>
        </header>
    );
}

export default Navegacao;