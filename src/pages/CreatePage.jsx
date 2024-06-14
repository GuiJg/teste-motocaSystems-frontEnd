import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function CreatePage() {

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState("0");
    const navigate = useNavigate();
    const nameStatus = ["Em trânsito", "Em estoque", "Sem estoque"];

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
            const response = await axios.post(`http://localhost:3000/produtos`, { name, price, color, status, id });
            toast.success(`${response.data.name} cadastrado com sucesso!`);
            getProducts();
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    //função para verificar se o código da moto ja existe
    const checkId = () => {
        const idExists = products.find((product) => product.id === id);
        if (idExists) {
            toast.error("Ja existe uma moto com esse Código");
            setId("");
        }
    }

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
                        <input type="text" value={id} maxLength={3} required onChange={(e) => setId(e.target.value)} onBlur={checkId} placeholder="Digite o Código da Moto" />
                    </div>
                    <div>
                        <label>Modelo da Moto</label>
                        <input type="text" value={name} style={{ textTransform: "uppercase" }} required onChange={(e) => setName(e.target.value)} placeholder="Digite o modelo da Moto" />
                    </div>
                    <div>
                        <label>Cor</label>
                        <input type="text" value={color} style={{ textTransform: "uppercase" }} required onChange={(e) => setColor(e.target.value)} placeholder="Digite a cor da Moto" />
                    </div>
                    <div>
                        <label>Valor</label>
                        <input type="number" value={price} required onChange={(e) => setPrice(e.target.value)} placeholder="Digite o valor da Moto" />
                    </div>
                    <div>
                        <label>Status</label>
                        <select value={status} required onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Selecione um Status</option>
                            {nameStatus.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {!isLoading && (<button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14"></path></svg>
                            Cadastrar
                        </button>)}
                    </div>
                </form>
            </div>
        </>
    )

}

export default CreatePage;