import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function CreatePage() {

    const [isLoading, setIsLoading] = useState(false);
    const [, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState("#00");
    const navigate = useNavigate();

    //função para chamar os produtos do json server
    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/produtos");
            setProducts(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    //função para criar produtos
    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(`http://localhost:3000/produtos`, { name, price, color, status, id});
            toast.success(`${response.data.name} cadastrado com sucesso!`);
            getProducts();
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className="title-create">
                <h2>Registro de Motos</h2>
            </div>
            <Link to={"/"}>Voltar para Página inicial</Link>
            <div className="container-form">
                <h2>Preencha as informações a baixo para registrar uma Moto</h2>
                <form onSubmit={saveProduct}>
                    <div>
                        <label>Código</label>
                        <input type="text" value={id} required onChange={(e) => setId(e.target.value)} placeholder="Digite o Código da Moto" />
                    </div>
                    <div>
                        <label>Modelo da Moto</label>
                        <input type="text" value={name} required onChange={(e) => setName(e.target.value)} placeholder="Digite o modelo da Moto" />
                    </div>
                    <div>
                        <label>Cor</label>
                        <input type="text" value={color} required onChange={(e) => setColor(e.target.value)} placeholder="Digite a cor da Moto" />
                    </div>
                    <div>
                        <label>Valor</label>
                        <input type="number" value={price} required onChange={(e) => setPrice(e.target.value)} placeholder="Digite o valor da Moto" />
                    </div>
                    <div>
                        <label>Status</label>
                        <input type="text" value={status} required onChange={(e) => setStatus(e.target.value)} placeholder="Digite o status da Moto" />
                    </div>
                    <div>
                        {!isLoading && (<button> Cadastrar </button>)}
                    </div>
                </form>
            </div>
        </>
    )

}

export default CreatePage;