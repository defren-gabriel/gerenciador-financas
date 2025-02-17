import styles from "./Navegacao.module.css";

const Navegacao = () => {
    return(
        <nav className={styles.container}>
            <div className={styles.projdev}>
                <a className={styles.projdeva} href="https://github.com/defren-gabriel/gerenciador-financas" target="_blank">Página do Projeto</a>
                <a className={styles.projdeva} href="https://github.com/defren-gabriel" target="_blank">Página do DeFrEn</a>
            </div>
            <div className={styles.links}>
                <span className={styles.linkss}>Gerenciar Finanças</span>
                <button className={styles.linksb}>Sair</button>
            </div>
        </nav>
    );
}

export default Navegacao;