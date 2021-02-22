const vm = new Vue({
    el: '#app',
    data: {
        mensagem: 'o vue está funfando',
        produtos: [],
        produto: false, 
        carrinho: []
        
    },
    filters: {
        filtroPreco(value) {
            return `R$ ${value},00`
        }
    },
    computed:{
        carrinhoTotal() {
            let total = 0;
            if(this.carrinho.length) {
                this.carrinho.forEach(item => {
                    total += item.preco;
                })
            }

            return total;
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
        }, 
        checarSaveLocal() {
            if(window.localStorage.carrinho) {
                this.carrinho = JSON.parse(window.localStorage.carrinho);
            }
        }
    },
    watch: {
        carrinho() {
            window.localStorage.carrinho = JSON.stringify(this.carrinho);
        }
    },
    created() {
        this.fetchProdutos();
        this.checarSaveLocal();
    }
})