import {changeCount, delSelect, getCartList} from "@/api/cart";
import {Toast} from "vant";

export default {
    namespaced: true,
    state() {
        return {
            cartList: []
        }
    },
    mutations: {
        setCartList(state, newCartList) {
            state.cartList = newCartList
        },
        toggleCheck(state, goodsId) {
            const goods = state.cartList.find(item => item.goods_id === goodsId)
            goods.isChecked = !goods.isChecked
        },
        toggleAllCheck(state, flag) {
            state.cartList.forEach(item => item.isChecked = flag)
        },
        changeCount(state, {goodsId, goodsNum}) {
            const goods = state.cartList.find(item => item.goods_id === goodsId)
            goods.goods_num = goodsNum
        }
    },
    getters: {
        //求所有的商品累加总数
        cartTotal(state) {
            return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
        },
        //选中的商品项
        selCartList(state) {
            return state.cartList.filter(item => item.isChecked)
        },
        //选中的总数
        selCount(state, getters) {
            return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
        },
        //选中的总价
        selPrice(state, getters) {
            return getters.selCartList.reduce((sum, item) => {
                return sum + item.goods.goods_price_min * item.goods_num
            }, 0).toFixed(2)
        },
        //是否全选
        isAllChecked(state) {
            return state.cartList.every(item => item.isChecked)
        }
    },
    actions: {
        getCartList(context) {
            getCartList().then((response) => {
                const res = response.data
                res.list.forEach((item) => {
                    item.isChecked = false
                })
                context.commit("setCartList", res.list)
            })
        },
        changeCountAction(context, obj) {
            const {goodsNum, goodsId, goodsSkuId} = obj
            //先本地修改
            context.commit('changeCount', {goodsId, goodsNum})
            //再调用后台
            changeCount(goodsId, goodsNum, goodsSkuId).then(response => {
                console.log(response)
            })
        },
        //删除购物车数据
        delSelect(context) {
            const selCartList = context.getters.selCartList
            const cartIds = selCartList.map(item => item.id)
            console.log(cartIds)
            delSelect(cartIds).then((response) => {
                console.log(response)
                Toast("删除成功")
                localStorage.removeItem("cartTotal")
                context.dispatch('getCartList')
            })
        }
    }
}
