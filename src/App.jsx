import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./Paginas/Login";
import Registro from "./Paginas/Registro";
import Erro from "./Paginas/Erro";
import Controle from "./Paginas/Controle";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        {/*componente de navegação*/}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/controle" element={<Controle />} />
          <Route path="*" element={<Erro />} />
        </Routes>  
      </BrowserRouter>
    </main>
  )
}

export default App;