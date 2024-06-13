import { Link } from "react-router-dom";

function HomePage() {

    return (
        <>  
            <h1>HomePage</h1>
            <Link to={"/editar"}>Editar produto</Link>
        </>
    )
}

export default HomePage;