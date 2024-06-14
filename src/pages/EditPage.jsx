import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditPage() {
    let { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        color: "",
        status: ""
    });

    //função para chamar os produtos do json server
    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/produtos");
            setProduct({
                name: response.data.name,
                price: response.data.price,
                color: response.data.color,
                status: response.data.status
            });
            setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`http://localhost:3000/produtos/${id}`, product);
            toast.success(`Editado com sucesso!`);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="title-create">
                <h2>Registro de Motos</h2>
            </div>
            <Link to={"/"}>Voltar para Página inicial</Link>
            <div className="container-form">
                <h2>Preencha as informações a baixo para registrar uma Moto</h2>
                <form onSubmit={updateProduct}>
                    <div>
                        <label>Modelo da Moto</label>
                        <input type="text" value={product.name} required onChange={(e) => setProduct({...product, name: e.target.value})} placeholder="Digite o modelo da Moto" />
                    </div>
                    <div>
                        <label>Cor</label>
                        <input type="text" value={product.color} required onChange={(e) => setProduct({...product, color: e.target.value})} placeholder="Digite a cor da Moto" />
                    </div>
                    <div>
                        <label>Valor</label>
                        <input type="number" value={product.price} required onChange={(e) => setProduct({...product, price: e.target.value})} placeholder="Digite o valor da Moto" />
                    </div>
                    <div>
                        <label>Status</label>
                        <input type="text" value={product.status} required onChange={(e) => setProduct({...product, status: e.target.value})} placeholder="Digite o status da Moto" />            
                    </div>
                    <div>
                        {!isLoading && (<button> Atualizar </button>)}
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditPage;