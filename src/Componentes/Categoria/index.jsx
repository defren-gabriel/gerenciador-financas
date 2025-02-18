import { useState, useEffect } from "react";

import styles from "./Categoria.module.css";

const Categoria = ({idcategoria, nomecategoria, data, registros}) => {
    //configura os states
    const [idCat, setIdcat] = useState("");
    const [nomeCat, setNomecat] = useState("");
    const [da, setDa] = useState("");   //data
    const [reg, setReg] = useState([]); //lista de registros
    const [total, setTotal] = useState("");

    //ao renderizar o componente os dados são passados do props para os states
    useState(()=>{
        setIdcat(idcategoria);
        setNomecat(nomecategoria);
        setDa(data);
        //filtra os registros para cada categoria
        const tempRegistros = registros.filter((prev)=>prev.idcategoria == idcategoria);
        setReg(tempRegistros);
        //calcula o total
        const soma = tempRegistros.reduce((acumulador, item) => {
            const valorAjustado = item.tipogasto === 0 ? -item.valor : item.valor;
            return acumulador + valorAjustado;
        }, 0);
        setTotal(soma.toFixed(2));
    }, []);

    return(
        <section className={styles.container_categoria}>
            {/*titulo e data*/}
            <div className={styles.titulo1}>
                <h1 className={styles.titulo1cat}>{nomeCat}</h1>
                <span className={styles.titulo1valor}>Valor</span>
                <span className={styles.titulo1data}>{da}</span>
            </div>
            {
                reg.map((item)=>(
                    <div 
                        key={item.id}
                        className={styles.itemlinha}
                    >
                        <span className={styles.itemlinha1}>{item.descricao}</span>
                        {
                            !item.tipogasto ? 
                            <span className={styles.itemlinha2}>R$ - {item.valor.toFixed(2)}</span> :
                            <span className={styles.itemlinha2}>R$ {item.valor.toFixed(2)}</span>
                        }
                        <span className={styles.itemlinha3}>{item.data}</span>
                    </div>
                ))
            }
            <div className={styles.total}>
                <strong className={styles.totaltitulo}>Total:</strong>
                <strong className={styles.totalvalor}>R$ {total}</strong>
            </div>
        </section>
    );
}

export default Categoria;