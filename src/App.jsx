import {BrowserRouter, Routes, Route} from "react-router-dom";

//paginas
import Login from "./Paginas/Login";
import Registro from "./Paginas/Registro";
import Erro from "./Paginas/Erro";
import Controle from "./Paginas/Controle";

//componentes
import Navegacao from "./Componentes/Navegacao";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navegacao />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/controle" element={<Controle />} />
          <Route path="*" element={<Erro />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;