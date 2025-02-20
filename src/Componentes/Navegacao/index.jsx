import { useNavigate, useLocation } from "react-router-dom";

import {useAuth} from "../../Contextos/Auth";

import styles from "./Navegacao.module.css";

const Navegacao = () => {
    const navigate = useNavigate();
    
    //se estiver na pagina de controle identifica como estando logado
    const location = useLocation();
    const local = location.pathname === "/controle";

    //verifica se esta logado
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

    //monipula move para a pagina de login e registrar
    const handleInicio = (e) => {
        navigate("/");
    }
    const handleRegistro = (e) => {
        navigate("/registro");
    }

    return(
        <header>
            <nav className={styles.container}>
                <div className={styles.projdev}>
                    <a className={styles.projdeva} href="https://github.com/defren-gabriel/gerenciador-financas" target="_blank">Página do Projeto</a>
                    <a className={styles.projdeva} href="https://github.com/defren-gabriel" target="_blank">Página do DeFrEn</a>
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