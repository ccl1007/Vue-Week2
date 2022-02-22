//1.建立Vue環境
const app = {
    //2.建立Data
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'luku612150',
            products: [],
            temp: {},
        }
    },
    methods: {
        checkLogin(params) {
            // 5. 確認是否登入(記得要加this)
            axios.post(`${this.url}/api/user/check`)
                .then(() => {
                    //6.確定登入後調用取得後台產品的函式
                    this.getProducts();
                }).catch((err) => {
                    alert(err.response.data.message)
                    //6.無法登入則回到首頁
                    window.location = 'index.html';
                });
        },
        getProducts() {
            // 6. 取得後台產品列表
            axios.get(`${this.url}/api/${this.path}/admin/products`)
                .then((res) => {
                    this.products = res.data.products
                    console.log(this.products);
                }).catch((err) => {
                    alert(err.response.data.message)
                });
        },
        showProducts(item) {
            //7.點擊展示商品
            this.temp = item;
        }

    },
    // mounted 階段會將網頁上的 DOM 節點、事件都綁定至 Vue 的實體，可以放入希望掛載完成後就馬上執行的語法
    mounted() {
        // 4.取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        //5.進入後台頁面需要先執行 Get admin products
        //戳 check api 時會帶入 token，以驗證 token是否合法有效
        axios.defaults.headers.common.Authorization = token;
        this.checkLogin()
    }
}
//3.掛載Vue
Vue.createApp(app).mount("#app2");