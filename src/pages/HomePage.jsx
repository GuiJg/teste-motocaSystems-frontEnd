import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"
import sweet from "sweetalert2"
import axios from "axios";

function HomePage() {
    const [, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const VITE_JSON_SERVER_API = import.meta.env.VITE_JSON_SERVER_API

    //função para chamar os produtos do json server
    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${VITE_JSON_SERVER_API}/produtos`);
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
            return "#FFB400";
        } else if (status === "Em estoque") {
            return "#56CA00";
        } else {
            return "#FF4C51";
        }
    }

    const statusBackground = (status) => {
        if (status === "Em trânsito") {
            return "#544146";
        } else if (status === "Em estoque") {
            return "#354546";
        } else {
            return "#55304C";
        }
    }

    // Função para deletar um produto e mudar o svg daquele produto especifico 

    const deleteProduct = async (id) => {
        try {
            // Antes de fazer a requisição de exclusão, atualiza o produto para indicar que está em processo de exclusão
            setProducts(products.map(product => {
                if (product.id === id) {
                    return { ...product, deleting: true };
                }
                return product;
            }));

            const result = await sweet.fire({
                title: 'Deseja deletar esse registro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Deletar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await axios.delete(`${VITE_JSON_SERVER_API}/produtos/${id}`);
                toast.success(`Produto ${id} deletado com sucesso!`);

                // Após a exclusão bem-sucedida, remover o produto da lista localmente
                setProducts(products.filter(product => product.id !== id));
            } else {
                // Se o usuário cancelar a exclusão, redefinir o estado do produto
                setProducts(products.map(product => {
                    if (product.id === id) {
                        return { ...product, deleting: false };
                    }
                    return product;
                }));
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success(`Produto deletado com sucesso!`);
                getProducts();
            } else {
                toast.error(error.message);
            }

            // Em caso de erro, redefinir o estado do produto
            setProducts(products.map(product => {
                if (product.id === id) {
                    return { ...product, deleting: false };
                }
                return product;
            }));
        }
    };

    //filter list das motos por nome, cor ou código
    const filterList = (event) => {
        const search = event.target.value;
        if (search) {
            const filteredList = products.filter((product) => {
                return Object.keys(product).some((key) => {
                    return String(product[key]).toLowerCase().includes(search.toLowerCase());
                });
            });
            setProducts(filteredList);
        } else {
            getProducts();
        }
    }

    return (
        <>
            <div className="search-container">
                <h2>Tabela de Motos</h2>
                <div className="search-area">
                    <form className="search-products">
                        <label htmlFor="search">
                            <input type="text" onChange={filterList} autoComplete="off" placeholder="Buscar por código, nome ou cor" id="search" required="" />
                            <div className="icon-search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#CAC9CD" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"></path></svg>
                            </div>
                            <button type="reset" onClick={getProducts} className="close-btn">
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
                        <div className="product-data">
                            <div className="product-data-code">
                                <span id="product-code">#00{product.id}</span>
                            </div>
                            <div className="product-info">
                                <div className="product-title">
                                    <h3>{product.name}</h3>
                                    <p><span style={{ color: statusColor(product.status), backgroundColor: statusBackground(product.status), padding: "0.3rem 0.6rem", borderRadius: "1rem" }}>{product.status}</span></p>
                                </div>
                                <div className="product-price-color">
                                    <p>Valor: R${product.price},00</p>
                                    <p>Cor: {product.color}</p>
                                </div>
                            </div>
                        </div>
                        <div className="product-actions">
                            <button onClick={() => deleteProduct(product.id)} disabled={product.deleting}>
                                {product.deleting ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="none" stroke="#FF4C51" strokeDasharray={15} strokeDashoffset={15} strokeLinecap="round" strokeWidth={2} d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="#FF4C51" d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2M9 4h6v2H9zm8 16H7V8h10z"></path>
                                    </svg>
                                )}
                            </button>
                            <Link to={`/editar/${product.id}`} className="edit-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="#E7E3FC" d="m.5 7.5l-.464-.186a.5.5 0 0 0 0 .372zm14 0l.464.186a.5.5 0 0 0 0-.372zm-7 4.5c-2.314 0-3.939-1.152-5.003-2.334a9.368 9.368 0 0 1-1.449-2.164a5.065 5.065 0 0 1-.08-.18l-.004-.007v-.001L.5 7.5l-.464.186v.002l.003.004a2.107 2.107 0 0 0 .026.063l.078.173a10.368 10.368 0 0 0 1.61 2.406C2.94 11.653 4.814 13 7.5 13zm-7-4.5l.464.186l.004-.008a2.62 2.62 0 0 1 .08-.18a9.368 9.368 0 0 1 1.449-2.164C3.56 4.152 5.186 3 7.5 3V2C4.814 2 2.939 3.348 1.753 4.666a10.367 10.367 0 0 0-1.61 2.406a6.05 6.05 0 0 0-.104.236l-.002.004v.001H.035zm7-4.5c2.314 0 3.939 1.152 5.003 2.334a9.37 9.37 0 0 1 1.449 2.164a4.705 4.705 0 0 1 .08.18l.004.007v.001L14.5 7.5l.464-.186v-.002l-.003-.004a.656.656 0 0 0-.026-.063a9.094 9.094 0 0 0-.39-.773a10.365 10.365 0 0 0-1.298-1.806C12.06 3.348 10.186 2 7.5 2zm7 4.5a68.887 68.887 0 0 1-.464-.186l-.003.008l-.015.035l-.066.145a9.37 9.37 0 0 1-1.449 2.164C11.44 10.848 9.814 12 7.5 12v1c2.686 0 4.561-1.348 5.747-2.665a10.366 10.366 0 0 0 1.61-2.407a6.164 6.164 0 0 0 .104-.236l.002-.004v-.001h.001zM7.5 9A1.5 1.5 0 0 1 6 7.5H5A2.5 2.5 0 0 0 7.5 10zM9 7.5A1.5 1.5 0 0 1 7.5 9v1A2.5 2.5 0 0 0 10 7.5zM7.5 6A1.5 1.5 0 0 1 9 7.5h1A2.5 2.5 0 0 0 7.5 5zm0-1A2.5 2.5 0 0 0 5 7.5h1A1.5 1.5 0 0 1 7.5 6z"></path></svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default HomePage;