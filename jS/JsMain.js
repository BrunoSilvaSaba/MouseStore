const vm = new Vue({
    el: '#app',
    data: {
        mensagem: 'o vue está funfando',
        produtos: [],
        produto: false, 
        carrinho: [],
        carrinhoTotal: 0, 
        
        
    },
    filters: {
        filtroPreco(value) {
            return `R$ ${value},00`
        }
    },
    methods: {
        fetchProdutos() {
            fetch('./api/produtos.json')
            .then(response => response.json())
            .then(response => {
                this.produtos = response;
            })
        }, 
        fetchProduto(id) {
            fetch(`./api/produtos/${id}/dados.json`)
            .then( r => r.json())
            .then( r => {
                this.produto = r;
            })
        },
        abrirModal(id) {
            this.fetchProduto(id);
            window.scrollTo({ 
                top: 0,
                behavior: "smooth"
            })
        },
        adicionarItemCarrinho() {
            this.produto.estoque--;
            const {id, nome, preco } = this.produto;
            this.carrinho.push({id, nome, preco});
        },
        removerItemCarrinho(index) {
            this.carrinho.splice(index, 1);
        }
    },
    created() {
        this.fetchProdutos();
    }
})