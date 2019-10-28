export const state = {
    plazaStatus: {
        lawStatus: false,
        userInfo: false,
    },
    focusStatus: {
        otherFile: false,
    },
    messageStatus: {
        otherFile: false,
    },
    applicationStatus: {
        otherFile: false,
    },

    creditDatas: {}, //保存信用中心数据的	
    loanIcons: { //贷款详情页里面的小图标
        micro: false,
        small: false,
        large: false
    },

    mutations: {
        set_law(state, payload) {
            state.lawStatus = payload
        },
    },
    actions: {
        setLaw({
            commit
        }, payload) {
            commit('set_law', payload)
        },
    },
}
