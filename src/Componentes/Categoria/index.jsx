import { useState, useEffect, useRef } from "react";

import { useAuth } from "../../Contextos/Auth";
import { db } from "../../Firebase/config";

import { 
    collection, 
    addDoc,
    query, 
    where, 
    onSnapshot,
    deleteDoc, 
    doc,
    serverTimestamp,
    orderBy,
    getDocs
} from "firebase/firestore";

import {format} from "date-fns";

import styles from "./Categoria.module.css";

const Categoria = ({idcategoria, nomecategoria, data, registros}) => {
    const {user} = useAuth();

    //configura os states
    const [idCat, setIdcat] = useState("");
    const [nomeCat, setNomecat] = useState("");
    const [da, setDa] = useState("");   //data
    const [reg, setReg] = useState([]); //lista de registros
    const [total, setTotal] = useState("");

    //ao renderizar o componente os dados são passados do props para os states
    useEffect(()=>{
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
    }, [idcategoria, nomecategoria, data, registros]);

    //manipula o comportamento do formulario de registro de despesa/receita
    const [estaRegistrando, setEstaRegistrando] = useState(false);
    const handleEstaRegistrandoChange = () => setEstaRegistrando(!estaRegistrando);
    /*ao abrir o formulário de resistro de receita/despesa foca no descricao*/
    useEffect(()=>{
        if(descricaoRef.current){
            setDescricao("");
            setTipo("Despesa");
            setValor("");
            descricaoRef.current.focus();
        }
    }, [estaRegistrando]);

    //estados que manipulam os dados de novo registro
    const descricaoRef = useRef();
    const [descricao, setDescricao] = useState("");
    const handleDescricaoChange = (e) => setDescricao(e.target.value);
    const [tipo, setTipo] = useState("Despesa");
    const handleTipoChange = (e) => setTipo(e.target.value);
    const [valor, setValor] = useState("");
    const handleValorChange = (e) => {
        const input = e.target.value;

        // Regex para validar números inteiros ou flutuantes com ponto
        const isValid = /^\d*(,\d{0,2})?$/.test(input);

        if (isValid) {
            setValor(input); // Atualiza o estado apenas se for válido
        }
    }

    //manipula o novo registro de receita/despesa
    const handleRegistra = (e) => {
        e.preventDefault();

        registraRegistro();
    }
    const registraRegistro = async () => {
        if (!user) return; // Garante que o usuário está autenticado

        //prepara a data formatada
        const dataAtual = new Date();
        const dataFormatada = format(dataAtual, "dd/MM/yyyy");
        //prepara o tipo
        const tempTipo = tipo === "Despesa" ? 0 : 1;
        //prepara o valor corretamente se for vazio ou "," marca como "0"
        let tempValor = "";
        if(valor == "" || valor == ","){
            tempValor = "0";
        }
        else {
            tempValor = valor;
        }
        tempValor = tempValor.replace(",", ".");
    
        try {
            await addDoc(collection(db, "registros"), {
                idusuario: user.uid,
                descricao: descricao,
                tipogasto: tempTipo,
                valor: parseFloat(tempValor),
                data: dataFormatada,
                idcategoria: idCat,
                ordem: serverTimestamp()
            });
            setEstaRegistrando(!estaRegistrando);
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
        }
    };

    return(
        <section className={styles.container_categoria}>
            {/*titulo valor e data*/}
            <div className={styles.titulo1}>
                <h1 className={styles.titulo1cat}>{nomeCat}</h1>
                <span className={styles.titulo1valor}>Valor</span>
                <span className={styles.titulo1data}>{da}</span>
            </div>
            {
                reg.map((item)=>(
                    /*container para as linhas*/
                    <div 
                        key={item.id}
                        className={item.tipogasto ? styles.itemlinhar : styles.itemlinhad}
                    >
                        <span className={styles.itemlinha1}>{item.descricao}</span>
                        <span className={styles.itemlinha2}>R$ {item.valor.toFixed(2).replace(".", ",")}</span>
                        <span className={styles.itemlinha3}>{item.data}</span>
                    </div>
                ))
            }
            {/*container para o formulário de registro de despesa/receita*/}
            <button 
                onClick={()=>handleEstaRegistrandoChange()}
                className={styles.estaregistrando}
            >
                Novo Registro
            </button>
            {
                estaRegistrando && 
                    <div className={styles.adicao}>
                        <h2 className={styles.adicaoh2}>Nova Receita/Despesa</h2>
                        <form 
                            className={styles.formadicao}
                            onSubmit={handleRegistra}
                        >
                            {/*container descricao*/}
                            <div className={styles.descricao}>
                                <label 
                                    htmlFor="descricao"
                                    className={styles.descricaolabel}
                                >
                                    Descrição
                                </label>
                                <input 
                                    type="text"
                                    id="descricao"
                                    name="descricao"
                                    value={descricao}
                                    onChange={handleDescricaoChange}
                                    className={styles.descricaoinput}
                                    ref={descricaoRef}
                                />
                            </div>
                            {/*container tipogasto*/}
                            <div className={styles.tipogasto}>
                                <label 
                                    htmlFor="tipogastoinput"
                                    className={styles.label}
                                >
                                    Tipo de registro
                                </label>
                                <div 
                                    className={styles.tipogastoinput}
                                    id="tipogastoinput"
                                >
                                    <label 
                                        htmlFor="tipogastodespesa"
                                        className={styles.label}
                                    >
                                        Despesa
                                    </label>
                                    <input
                                        type="radio"
                                        value="Despesa"
                                        name="tipo"
                                        checked={tipo === "Despesa"}
                                        onChange={handleTipoChange}
                                        id="tipogastodespesa"
                                        className={styles.input}
                                    />
                                    <label 
                                        htmlFor="tipogastoreceita"
                                        className={styles.label}
                                    >
                                        Receita
                                    </label>
                                    <input
                                        type="radio"
                                        value="Receita"
                                        name="tipo"
                                        checked={tipo === "Receita"}
                                        onChange={handleTipoChange}
                                        id="tipogastoreceita"
                                        className={styles.input}
                                    />
                                </div>
                            </div>
                            {/*container valor*/}
                            <div className={styles.valor}>
                                <label 
                                    htmlFor="valor"
                                    className={styles.valorlabel}
                                >
                                    Valor R$
                                </label>
                                <input 
                                    type="text"
                                    id="valor"
                                    name="valor"
                                    value={valor}
                                    onChange={handleValorChange}
                                    className={styles.valorinput}
                                />
                            </div>
                            {/*container submit */}
                            <div className={styles.submit}>
                                <input 
                                    type="submit" 
                                    value="Registrar" 
                                    className={styles.submitsubmit}
                                />
                            </div>
                        </form>
                    </div>
            }
            {/*container para mostrar a soma total*/}
            <div className={styles.total}>
                <strong className={styles.totaltitulo}>Total:</strong>
                <strong className={total >= 0 ? styles.totalvalorp : styles.totalvalorn}>R$ {total.replace(".", ",")}</strong>
            </div>
            <hr />
        </section>
    );
}

export default Categoria;