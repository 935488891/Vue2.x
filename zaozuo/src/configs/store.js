import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        nav_show: false,
        ip: 'http://39.105.178.245:3000/users',
        imgurl: '',
        name: '',
        price: '',
        category: '',
        color:''
    },

    //获取数据方法
    getters: {
        get_nav_show: (state) => {
            return state.nav_show
        }
    },

    //修改数据
    mutations: {
        upd_nav_show(state, data) {
            state.nav_show = data
        },

        upd_imgurl(state, data) {
            state.imgurl = data
        },

        upd_name(state, data) {
            state.name = data
        },

        upd_price(state, data) {
            state.price = data
        },

        upd_category(state, data) {
            state.category = data
        },

        upd_color(state, data) {
            state.color = data
        }
    }
})

export default store

