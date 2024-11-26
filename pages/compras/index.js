document.addEventListener('DOMContentLoaded', function () {
    const cartTable = document.getElementById('cartTable');
    const totalAmount = document.getElementById('totalAmount');

    // Atualizar total ao alterar quantidade
    cartTable.addEventListener('input', function (e) {
      if (e.target.classList.contains('item-quantity')) {
        const row = e.target.closest('tr');
        const quantity = parseInt(e.target.value, 10);
        const price = parseFloat(row.querySelector('.item-price').textContent);
        const totalCell = row.querySelector('.item-total');

        // Atualizar o total do item
        const itemTotal = quantity * price;
        totalCell.textContent = itemTotal.toFixed(2);

        // Recalcular o total geral
        updateTotal();
      }
    });

    // Remover item do carrinho
    cartTable.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-remove')) {
        const row = e.target.closest('tr');
        row.remove();

        // Recalcular o total geral
        updateTotal();
      }
    });

    // Função para atualizar o total geral
    function updateTotal() {
      let total = 0;
      const rows = cartTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const itemTotal = parseFloat(row.querySelector('.item-total').textContent);
        total += itemTotal;
      });
      totalAmount.textContent = total.toFixed(2);
    }

    //******************************************** */
    //** Adiciona item ao carrinho*/
    //******************************************** */

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    if (!productId) {
        document.getElementById("itens").innerHTML = "<tr><td>Produto não encontrado.</td></tr>";
        return;
    }

    fetch("/db/produtos.json")
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);

            if (product) {
                document.getElementById("itens").innerHTML = `
                  <tr>
                    <td>${product.name}</td>
                    <td>
                        <input type="number" class="form-control item-quantity" value="1" min="1" style="width: 70px;">
                    </td>
                    <td class="item-price">${product.price.toFixed(2)}</td>
                    <td class="item-total">${product.price.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm btn-remove">Remover</button>
                    </td>
                  </tr>
                `;
            } else {
                document.getElementById("itens").innerHTML = "<h4>Produto não encontrado.</h4>";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
            document.getElementById("itens").innerHTML = "<h4>Erro ao carregar os detalhes do produto.</h4>";
        });


  });