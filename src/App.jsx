import { Routes, Route } from "react-router-dom"

//Rotas - Pages
import HomePage from "./pages/HomePage"
import EditPage from "./pages/EditPage"

function App() {

    return (
        <>
            <header>
                <h1>Motoca Systems</h1>
            </header>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/editar" element={<EditPage />} />
            </Routes>
        </>
    )
}

export default App
