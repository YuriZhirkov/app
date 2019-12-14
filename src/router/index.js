import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    hashbang: false,
    mode:'history',
    scrollBehavior: function (to, from, savedPosition) {
        return {
            "x": 0,
            "y": 0
        }
    },
    routes: [
        // {
        //   path: '/',
        //   name: 'HelloWorld',
        //   component: HelloWorld
        // }

        {
            path: '/',
            meta: {
                // title: ''
            },
            component: resolve => require(['../view/login'], resolve),
        },
        {
            path: '/personal/authDesc',
            meta: {
                // title: '认证'
            },
            component: resolve => require(['../view/personal/authDesc'], resolve)
        },
        {
            path: '/personal/editBasicInfo',
            meta: {
                // title: '基础信息'
            },
            component: resolve => require(['../view/personal/editBasicInfo'], resolve)
        },
        {
            path: '/personal/multiInfo',
            meta: {
                // title: '基础信息'
            },
            component: resolve => require(['../view/personal/multiInfo'], resolve)
        },
        {
            path: '/personal/editLabel',
            meta: {
                // title: '我的标签'
            },
            component: resolve => require(['../view/personal/editLabel'], resolve)
        },
        {
            path: '/personal/editMateSelection',
            meta: {
                // title: '择偶标准'
            },
            component: resolve => require(['../view/personal/editMateSelection'], resolve)
        },
        {
            path: '/',
            redirect: '/focus/matching'
        },

        // 广场
        {
            path: '/plaza/dynamic',
            meta: {
                // title: '广场'
            },
            component: resolve => require(['../view/plaza/dynamic'], resolve),
        },
        {
            path: '/plaza/detail',
            meta: {
                // title: '详情'
            },
            component: resolve => require(['../view/plaza/detail'], resolve),
        },
        {
            path: '/personal/anotherPage',
            meta: {
                // title: '好友页面'
            },
            component: resolve => require(['../view/personal/anotherPage'], resolve),
        },
        {
            path: '/message/chat',
            meta: {
                // title: '聊天'
            },
            component: resolve => require(['../view/message/chat'], resolve),
        },
        {
            path: '/personal/basicInfo',
            meta: {
                // title: '基本信息'
            },
            component: resolve => require(['../view/personal/basicInfo'], resolve),
        },
        {
            path: '/focus/pose',
            meta: {
                // title: '提问'
            },
            component: resolve => require(['../view/focus/pose'], resolve),
        },
        {
            path: '/focus/answer',
            meta: {
                // title: '回答提问'
            },
            component: resolve => require(['../view/focus/answer'], resolve),
        },
        {
            path: '/focus/showAnswers',
            meta: {
                // title: '详情'
            },
            component: resolve => require(['../view/focus/showAnswers'], resolve),
        },
        {
            path: '/personal/myActivity',
            meta: {
                // title: '我的活动'
            },
            component: resolve => require(['../view/personal/myActivity'], resolve),
        },
        {
            path: '/personal/issueActivity',
            meta: {
                // title: '发布活动'
            },
            component: resolve => require(['../view/personal/issueActivity'], resolve),
        },
        {
            path: '/plaza/activities',
            meta: {
                // title: '活动'
            },
            component: resolve => require(['../view/plaza/activities'], resolve)
        },
        {
            path: '/plaza/dynamic/publishDynamic',
            meta: {
                // title: '发布动态'
            },
            component: resolve => require(['../view/plaza/publishDynamic'], resolve)
        },
        {
            path: '/plaza/activity/activityDetail',
            meta: {
                // title: '活动详情'
            },
            component: resolve => require(['../view/plaza/activityDetail'], resolve)
        },
        // 看点
        {
            path: '/focus/matching',
            meta: {
                // title: '看点'
            },
            component: resolve => require(['../view/focus/matching'], resolve)
        },
        {
            path: '/focus/qanda',
            meta: {
                // title: '问答'
            },
            component: resolve => require(['../view/focus/qanda'], resolve)
        },

        // 消息
        {
            path: '/message',
            meta: {
                // title: '消息'
            },
            component: resolve => require(['../view/message/index'], resolve)
        },

        // 应用
        {
            path: '/application',
            meta: {
                // title: '应用'
            },
            component: resolve => require(['../view/application/index'], resolve)
        },
        {
            path: '/application/momIssue',
            meta: {
                // title: '红娘发布'
            },
            component: resolve => require(['../view/application/momIssue'], resolve)
        },
        {
            path: '/application/ideaTest',
            meta: {
                // title: '三观测试'
            },
            component: resolve => require(['../view/application/ideaTest'], resolve)
        },
        {
            path: '/application/funnyGames',
            meta: {
                // title: '趣味游戏'
            },
            component: resolve => require(['../view/application/funnyGames'], resolve)
        },
        {
            path: '/application/nearbyPeople',
            meta: {
                // title: '附近的人'
            },
            component: resolve => require(['../view/application/nearbyPeople'], resolve)
        },
        {
            path: '/application/nearbyPeopleList',
            meta: {
                // title: '附近的人列表'
            },
            component: resolve => require(['../view/application/nearbyPeopleList'], resolve)
        },
        {
            path: '/application/anonymity',
            meta: {
                // title: '匿名专送'
            },
            component: resolve => require(['../view/application/anonymity'], resolve)
        },
        {
            path: '/application/anonymitySend',
            meta: {
                // title: '匿名发送'
            },
            component: resolve => require(['../view/application/anonymitySend'], resolve)
        },
        {
            path: '/application/lovePlan',
            meta: {
                // title: '恋爱方案'
            },
            component: resolve => require(['../view/application/lovePlan'], resolve)
        },
        {
            path: '/application/planContext',
            meta: {
                // title: '方案内容'
            },
            component: resolve => require(['../view/application/planContext'], resolve)
        },
        {
            path: '/application/sponsor',
            meta: {
                // title: '赞助商'
            },
            component: resolve => require(['../view/application/sponsor'], resolve)
        },
        {
            path: '/application/productList',
            meta: {
                title: '商品列表'
            },
            component: resolve => require(['../view/application/productList'], resolve)
        },

        // 个人中心
        {
            path: '/personal/personalCenter',
            meta: {
                // title: '个人中心'
            },
            component: resolve => require(['../view/personal/personalCenter'], resolve)
        },
        {
            path: '/personal/personalDetail',
            meta: {
                // title: '个人详情'
            },
            component: resolve => require(['../view/personal/personalDetail'], resolve)
        },
        {
            path: '/personal/member',
            meta: {
                // title: '会员'
            },
            component: resolve => require(['../view/personal/member'], resolve)
        },
        {
            path: '/personal/authOption',
            meta: {
                // title: '认证'
            },
            component: resolve => require(['../view/personal/authOption'], resolve)
        },
        {
            path: '/personal/authIdentity',
            meta: {
                // title: '身份认证'
            },
            component: resolve => require(['../view/personal/authIdentity'], resolve)
        },
        {
            path: '/personal/authEducation',
            meta: {
                // title: '学历认证'
            },
            component: resolve => require(['../view/personal/authEducation'], resolve)
        },
        {
            path: '/personal/authHoustCar',
            meta: {
                // title: '房车认证'
            },
            component: resolve => require(['../view/personal/authHoustCar'], resolve)
        },
        {
            path: '/personal/photoAlbum',
            meta: {
                // title: '我的相册'
            },
            component: resolve => require(['../view/personal/photoAlbum'], resolve)
        },
        { // 聊天信息
            path: '/wechat/dialogue',
              name: "",
              components: {
                "default": resolve => require(["../view/message/index.vue"], resolve),
                "subPage": resolve => require(["../components/wechat/dialogue.vue"], resolve)
              }
        },
        // { // 聊天详情
        //     path: '/wechat/dialogue/dialogue-info',
        //     name: "",
        //     components: {
        //         "subPage": resolve => require(["../components/dialogue-info.vue"], resolve)
        //     }
        // },
    ]
})
