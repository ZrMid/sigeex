import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SesionUs from "./componentes/ventanas/SesionUs"; //Importamos el componente de login
import { RedirectSession } from "./componentes/utilidades/RedirectSession";
import MainSis from "./componentes/ventanas/MainSis";

const App = () => {
    return (
        <div className="App">
            {/*Router contiene los dejas componentes de direcciones */}
            <Router>
                <RedirectSession />
                <Routes> {/* Aqui se guardan las rutas con su respectiva direccion (href) y el componente*/}
                    <Route path="/sesionUs" element={<SesionUs />} />
                    <Route path="/mainSis" element={<MainSis />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;