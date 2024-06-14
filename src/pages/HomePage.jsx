import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"
import sweet from "sweetalert2"
import axios from "axios";

function HomePage() {
    const [, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    //função para chamar os produtos do json server
    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/produtos");
            setProducts(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    //chama a função para carregar os produtos
    useState(() => {
        getProducts();
    }, []);

    //se product.status for "Em trânsito" o texto fica laranja com fundo laranja, caso seja "Em estoque" o texto fica verde com fundo verde e caso seja "Sem estoque" o texto fica vermelho com fundo vermelho
    const statusColor = (status) => {
        if (status === "Em trânsito") {
            return "orange";
        } else if (status === "Em estoque") {
            return "green";
        } else {
            return "red";
        }
    }
    

    //função para deletar produtos
    const deleteProduct = async (id) => {
        const result = await sweet.fire({
            title: 'Deseja deletar esse registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Deletar',
            cancelButtonText: 'Cancelar'
        })
        if (result.isConfirmed) {
            try {
                console.log(`http://localhost:3000/produtos/${id}`);
                await axios.delete(`http://localhost:3000/produtos/${id}`);
                toast.success(`Deletado com sucesso!`);
                getProducts();
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <div className="search-container">
                <h2>Tabela de Motos</h2>
                <div className="search-area">
                    <form className="search-products">
                        <label htmlFor="search">
                            <input type="text" autoComplete="off" placeholder="Buscar por código, nome ou cor" id="search" required="" />
                            <div className="icon-search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#CAC9CD" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"></path></svg>
                            </div>
                            <button type="reset" className="close-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="none" stroke="#f55b50" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m8 8l32 32M8 40L40 8"></path></svg>
                            </button>
                        </label>
                    </form>
                    <Link to={"/criar"} className="create-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14"></path></svg>
                        novo registro
                    </Link>
                </div>
            </div>
            <div className="container-products">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <span>#00{product.id}</span>
                        <div className="product-data">
                            <div className="product-title">
                                <h3>{product.name}</h3>
                                <p><span style={{ color: statusColor(product.status) }}>{product.status}</span></p>
                            </div>
                            <p>Valor: R${product.price},00</p>
                            <p>Cor: {product.color}</p>
                        </div>
                        <div className="product-actions">
                            <button onClick={() => deleteProduct(product.id)}>Deletar</button>
                            <Link to={`/editar/${product.id}`}>Editar</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default HomePage;