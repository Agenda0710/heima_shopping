import {getInfo, setInfo} from '@/utils/storage'

export default {
    namespaced: true,
    //提供数据的
    state() {
        return {
            userInfo: getInfo()
        }
    },
    //Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            setInfo(userInfo)
        }
    },
    //异步
    actions: {
        logOut(context) {
            //个人信息重置
            context.commit('setUserInfo', {})
            //购物车历史信息重置
            context.commit('cart/setCartList', [],{root: true})
        }
    },
    //计算属性
    getters: {}
}
