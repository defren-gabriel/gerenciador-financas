import { useState, useEffect, useRef } from "react";

import Categoria from "../../Componentes/Categoria";

import styles from "./Controle.module.css";

const Controle = () => {
    //mantem as categorias e registros para cada categoria - dados temporarios
    const [categorias, setCategorias] = useState([
        {id: 1, nome: "Pessoais - Fevereiro", data: "02 de fevereiro de 2025", idusuario: 1},
        {id: 2, nome: "Empréstimos", data: "05 de fevereiro de 2025", idusuario: 1}
    ]);
    const [registros, setRegistros] = useState([
        {id: 1, descricao: "Compras do inicio do mes", tipogasto: 0, valor: 345.32, data: "03 de fevereiro de 2025", idcategoria: 1, idusuario: 1},
        {id: 2, descricao: "Ração pros cachorros", tipogasto: 0, valor: 121.0, data: "16 de fevereiro de 2025", idcategoria: 1, idusuario: 1},
        {id: 3, descricao: "Salário do mês", tipogasto: 1, valor: 3467.9, data: "26 de fevereiro de 2025", idcategoria: 1, idusuario: 1},
        {id: 4, descricao: "Empréstimo Ramon", tipogasto: 0, valor: 300, data: "01 de fevereiro de 2025", idcategoria: 2, idusuario: 1}
    ]);

    //referente ao botão de nova categoria e seu formulario
    const [estaRegistrando, setEstaRegistrando] = useState(false);
    const handleEstaRegistrandoChange = (e) => {
        e.preventDefault();

        setEstaRegistrando(!estaRegistrando);
    }
    useEffect(()=>{
        if(nomecategoriaRef.current){
            nomecategoriaRef.current.focus();
        }
    }, [estaRegistrando]);
    const [nomecategoria, setNomecategoria] = useState("");
    const handleNomecategoriaChange = (e) => setNomecategoria(e.target.value);
    const nomecategoriaRef = useRef();

    //manipula o registro de nova categoria
    const handleRegistroCategoria = (e) => {
        e.preventDefault();

        console.log("Registrando nova categoria");
    }

    return(
        <main className={styles.container}>
            <h1 className={styles.titulo1}>Página de controle de finanças</h1>
            {/*mapeia as categorias e passa os dados da categoria e a lista de dados para filtragem dentro do componente*/}
            {
                categorias.map((item)=>(
                    <Categoria
                        key={item.id} 
                        idcategoria={item.id} //id da categoria
                        nomecategoria={item.nome}
                        data={item.data}
                        registros={registros}
                    />
                ))
            }
            {/*container para o botão de registro de nova categoria*/}
            <button 
                className={styles.novacategoria}
                onClick={handleEstaRegistrandoChange}
            >
                Registrar nova categoria
            </button>
            {
                estaRegistrando && 
                    <div className={styles.containernovac}>
                        <h2>Registrando nova categoria</h2>
                        <form 
                            onSubmit={handleRegistroCategoria}
                            className={styles.formregistracat}
                        >
                            {/*container para o nome da categoria*/}
                            <div className={styles.inputnome}>
                                <label 
                                    htmlFor="nomecategoria"
                                    className={styles.inputnomelabel}
                                >
                                    Nome da categoria
                                </label>
                                <input 
                                    type="text" 
                                    id="nomecategoria"
                                    name="nomecategoria"
                                    value={nomecategoria}
                                    onChange={handleNomecategoriaChange}
                                    className={styles.inputnomeinput}
                                    ref={nomecategoriaRef}
                                />
                            </div>
                            {/*container para o botão submit*/}
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
        </main>
    );
}

export default Controle;