document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    if (!productId) {
        document.getElementById("conteudo").innerHTML = "<h4>Produto não encontrado.</h4>";
        return;
    }

    fetch("/db/produtos.json")
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);

            if (product) {
                document.getElementById("conteudo").innerHTML = `
                    <div class="container mt-5">
                    <div class="card mx-auto">
                        <div class="row g-0">
                            <div class="col-md-5">
                                <img src="/images/${product.image}" class="img-fluid rounded-start" id="img-produto" alt="Imagem do Produto">
                            </div>
                            <div class="col-md-7">
                                <div class="card-body">
                                    <form id="product-form" method="GET" action="/pages/compras/index.html">
                                        <input type="hidden" name="productId" id="hidden-product-id" value="${product.id}"></input>
                                        <h5 class="card-title">${product.name}</h5>
                                        <p class="card-text">${product.description}</p>
                                        <p class="card-text fw-bold text-primary">Preço: R$ ${product.price.toFixed(2)}</p>
                                        <button type="submit" class="btn btn-primary">Comprar Agora</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            } else {
                document.getElementById("conteudo").innerHTML = "<h4>Produto não encontrado.</h4>";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
            document.getElementById("conteudo").innerHTML = "<h4>Erro ao carregar os detalhes do produto.</h4>";
        });
});
