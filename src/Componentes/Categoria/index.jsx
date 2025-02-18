import { useState, useEffect } from "react";

import styles from "./Categoria.module.css";

const Categoria = ({idcategoria, nomecategoria, data, registros}) => {
    //configura os states
    const [idCat, setIdcat] = useState("");
    const [nomeCat, setNomecat] = useState("");
    const [da, setDa] = useState("");
    const [reg, setReg] = useState([]);

    //ao renderizar o componente os dados são passados do props para os states
    useState(()=>{
        setIdcat(idcategoria);
        setNomecat(nomecategoria);
        setDa(data);
        setReg(registros);
    }, []);

    return(
        <section className={styles.container_categoria}>
            {/*titulo e data*/}
            <div className={styles.titulo1}>
                <h1 className={styles.titulo1h1}>{nomeCat}</h1>
                <span className={styles.titulo1s}>{da}</span>
            </div>
        </section>
    );
}

export default Categoria;