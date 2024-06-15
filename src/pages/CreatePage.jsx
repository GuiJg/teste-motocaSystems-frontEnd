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

    // const VITE_JSON_SERVER_API = import.meta.env.VITE_JSON_SERVER_API

    //função para chamar os produtos do json server
    const getProducts = async () => {
        try {
            const response = await axios.get(`https://json-server-api-one.vercel.app/produtos`);
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
            const response = await axios.post(`https://json-server-api-one.vercel.app/produtos`, { name, price, color, status, id });
            toast.success(`${response.data.name} cadastrado com sucesso!`);
            getProducts();
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Tratar explicitamente o erro 500, se necessário
                toast.success(`Produto cadastrado com sucesso!`);
                getProducts();
                navigate("/");
            } else {
                // Outros erros
                toast.error(error.message);
            }
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
                <Link to={"/"} className="title-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m14 7l-5 5m0 0l5 5"></path></svg>
                    Voltar para Página inicial
                </Link>
            </div>
            <div className="container-form">
                <h2>Preencha as informações a baixo para registrar uma Moto</h2>
                <form onSubmit={saveProduct}>
                    <div className="relative">
                        <input type="text" value={id} className="input-cal input-base" id="input" maxLength={3} required onChange={(e) => setId(e.target.value)} onBlur={checkId} placeholder="" />
                        <label id="label-input">Código</label>
                    </div>
                    <div className="relative">
                        <input type="text" className="input-cal input-base" id="input" value={name} required onChange={(e) => setName(e.target.value)} placeholder="" />
                        <label id="label-input">Modelo</label>
                    </div>
                    <div className="relative">
                        <input type="text" className="input-cal input-base" id="input" value={color} required onChange={(e) => setColor(e.target.value)} placeholder="" />
                        <label id="label-input">Cor</label>
                    </div>
                    <div className="relative">
                        <input type="number" className="input-cal input-base" id="input" value={price} required onChange={(e) => setPrice(e.target.value)} placeholder="" />
                        <label id="label-input">Valor</label>
                    </div>
                    <div className="relative">
                        <select value={status} className="input-cal input-base" id="input" required onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Selecione um Status</option>
                            {nameStatus.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <label id="label-input">Status</label>
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