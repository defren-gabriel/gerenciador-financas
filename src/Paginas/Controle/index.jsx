import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Contextos/Auth";
import { db } from "../../Firebase/config";

import { 
    collection, 
    addDoc,
    query, 
    where, 
    onSnapshot,
    serverTimestamp,
    orderBy
} from "firebase/firestore";

import {format} from "date-fns";

import Categoria from "../../Componentes/Categoria";

import styles from "./Controle.module.css";

const Controle = () => {
    //verifica se o usuario esta conectado
    const {user} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate("/");
        }
    }, []);

    //mantem as categorias e registros para cada categoria - dados temporarios
    const [categorias, setCategorias] = useState([]);
    const [registros, setRegistros] = useState([]);

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

        registraCategoria(nomecategoria);
    }
    const registraCategoria = async (categoria) => {
        if (!user) return; // Garante que o usuário está autenticado
    
        //prepara a data formatada
        const dataAtual = new Date();
        const dataFormatada = format(dataAtual, "dd/MM/yyyy");

        try {
          await addDoc(collection(db, "categorias"), {
            idusuario: user.uid, // ID do usuário autenticado  
            nome: categoria,
            data: dataFormatada,
            ordem: serverTimestamp()
          });
          setNomecategoria("");
          setEstaRegistrando(!estaRegistrando);
        } catch (error) {
          console.error("Erro ao adicionar item:", error);
        }
    };

    //lista as categorias todas
    useEffect(() => {
        if (!user) {
          setCategorias([]);  
          return;
        }
    
        const q = query(
          collection(db, "categorias"),
          where("idusuario", "==", user.uid),
          orderBy("ordem", "desc")
        );
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const cats = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
    
          setCategorias(cats);
        });
    
        return () => {
          unsubscribe();
        };
    }, [user]);

    //lista os registros
    useEffect(() => {
        if (!user) {
          setRegistros([]);  
          return;
        }
    
        const q = query(
          collection(db, "registros"),
          where("idusuario", "==", user.uid),
          orderBy("ordem", "asc")
        );
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const lis = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
    
          setRegistros(lis);
        });
    
        return () => {
          unsubscribe();
        };
    }, [user]);

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
                        <h2 className={styles.titulo2novac}>Registrando nova categoria</h2>
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