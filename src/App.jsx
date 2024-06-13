import { Routes, Route, Link } from "react-router-dom"

//Rotas - Pages
import HomePage from "./pages/HomePage"
import EditPage from "./pages/EditPage"

function App() {

    return (
        <>
            <header>
                <Link to={"/"} className="header-logo">
                    <img src="https://www.motocasystems.com.br/img/lOGO-SISTEMA-CINZA.c1f96a12.png" alt="Logo da Motoca Systems" />
                    <h1>Motoca Systems</h1>
                </Link>
                <div className="header-options">
                    <Link to={"/"} className="icon-home">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#CAC9CD" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path></svg>
                    </Link>
                    <Link to={"/login"} className="icon-user">
                        <img src="https://s3-alpha-sig.figma.com/img/e0f4/5fcb/04a5be3e74157ed546f35c0cb9e966aa?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cX89hYnRLY1GU17dVnsLtDYjg3rkdMJkRGkvQK7h46bRcBoKkb--Q6PKRv2eR1vTe3UMg0Qjbd~lyRQkSCGxR7e-L~iPoSmYuZ8vvYpFT0y47dhGbYqQ1Vio7PzGCU05Xgs4a8xLgWfBfsDgf5~HNJX5smfPsizfADmWh5Vz14-zv1kJR9zhumTDZB5cgh18oVdZs59StN6Js3cQAZbWNSaEXIqgtCqMxiqTyGgwEwaXefFyi3CNDo4oziXxfVsS-fe08k4OR~Kz9Kb4HJWUWwInDwWbhAedefFfwUYX2qBcp3hMluzOuH3ZAoALcKYVDei2mdz01-vMPOQ-4VF3mQ__" alt="Icone de usuario padrão" />
                        <div className="user-online"></div>
                    </Link>
                </div>
            </header>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/editar" element={<EditPage />} />
            </Routes>
            <footer>
                <p>
                    Desenvolvido por
                    <strong>
                        <a href="https://www.linkedin.com/in/j-gui/">José Guilherme</a>
                    </strong>
                </p>
            </footer>
        </>
    )
}

export default App
