const vm = new Vue({
    el: '#app',
    data: {
        mensagem: 'o vue está funfando',
        produtos: {}
    },
    methods: {
        fetchProdutos() {
            fetch('./api/produtos.json')
            .then(response => response.json())
            .then(response => {
                this.produtos = response;
            })
        }
    },
    created() {
        this.fetchProdutos();
    }
})