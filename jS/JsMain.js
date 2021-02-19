const vm = new Vue({
    el: '#app',
    data: {
        mensagem: 'o vue está funfando',
        produtos: {},
        produto: false
        
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
        }
    },
    created() {
        this.fetchProdutos();
    }
})