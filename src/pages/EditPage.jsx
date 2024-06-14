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
        status: "",
        id: id
    });
    const nameStatus = ["Em trânsito", "Em estoque", "Sem estoque"];

    //função para chamar os produtos do json server
    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/produtos/${id}`);
            setProduct({
                name: response.data.name,
                price: response.data.price,
                color: response.data.color,
                status: response.data.status,
                id: response.data.id
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="title-edit">
                <h2>Editar</h2>
            </div>
            <Link to={"/"}>Voltar para Página inicial</Link>
            <div className="container-form">
                <h2>Preencha as informações a baixo para registrar uma Moto</h2>
                <form onSubmit={updateProduct}>
                    <div>
                        <label>Código da Moto</label>
                        <input type="text" value={product.id} disabled style={{ backgroundColor: "#302b3b" }} required onChange={(e) => setProduct({ ...product, id: e.target.value })} placeholder="Digite o Código da Moto" />
                    </div>
                    <div>
                        <label>Modelo da Moto</label>
                        <input type="text" value={product.name} style={{ textTransform: "uppercase" }} required onChange={(e) => setProduct({ ...product, name: e.target.value })} placeholder="Digite o modelo da Moto" />
                    </div>
                    <div>
                        <label>Cor</label>
                        <input type="text" value={product.color} style={{ textTransform: "uppercase" }} required onChange={(e) => setProduct({ ...product, color: e.target.value })} placeholder="Digite a cor da Moto" />
                    </div>
                    <div>
                        <label>Valor</label>
                        <input type="number" value={product.price} required onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder="Digite o valor da Moto" />
                    </div>
                    <div>
                        <label>Status</label>
                        <select value={product.status} required onChange={(e) => setProduct({ ...product, status: e.target.value })}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><circle cx={12} cy={12} r={10}></circle><path d="m16 12l-4-4l-4 4m4 4V8"></path></g></svg>
                            Atualizar
                        </button>)}
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditPage;