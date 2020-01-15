<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div v-if="$route.path=='/wechat/dialogue'" class="outter hideLeft">
      <section class="app-content">
          <keep-alive>
            <router-view name="default" ></router-view>
          </keep-alive>
      </section>
    </div>
    <div v-else>
      <keep-alive :include="cache">
        <router-view/>
      </keep-alive>
    </div>
    
    <!--其他店内页集合 有过渡效果-->
    <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
      <router-view name="subPage" class="sub-page"></router-view>
    </transition> 
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "App",
  data(){
    return{
      cache:[],
      "pageName": "",
      "routerAnimate": false,
      "enterAnimate": "", //页面进入动效
      "leaveAnimate": "" //页面离开动效 
      // cache:['anotherPage','basicinfo']
    }
  },
   watch: {
      // 监听 $route 为店内页设置不同的过渡效果
      "$route" (to, from) {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          if (toDepth === 2) {
              this.$store.commit("setPageName", to.name)
          }
          //同一级页面无需设置过渡效果
          if (toDepth === fromDepth) {
              return;
          }
          this.enterAnimate = toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft"
          this.leaveAnimate = toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight"
              // 从店面页进入店内页 需要对店内页重新设置离开动效 因为他们处于不同 name 的 router-view
          if (toDepth === 3) {
              this.leaveAnimate = "animated fadeOutRight"
          }
      },
      getSearchKey: {
          handler(newValue,oldValue){  //当词条改变时执行事件
              console.log('new',newValue)
              console.log('old',oldValue)
              if(newValue) {
                this.tim.login({
                    userID: this.userId,
                    userSig: window.genTestUserSig(this.userId).userSig
                })
                .then((e) => {
                    console.log(e, "******** 登录成功 ********")
                })
                .catch(imError => {
                    if (imError.code === 2000) {
                        this.$dialog.toast({mes:imError.message + ', 请检查是否正确填写了 SDKAPPID',icon:'error'})
                    } else {
                        console.log(imError.message)
                    }
                })

                this.initListener()
              }
          }
      }
  },
  computed: {
      ...mapState({
          conversationList: state => state.conversation.conversationList,
          currentUserProfile: state => state.user.currentUserProfile,
          currentConversation: state => state.conversation.currentConversation,
          isLogin: state => state.user.isLogin,
          isSDKReady: state => state.user.isSDKReady,
          userId: state => state.userId
      }),
      getSearchKey(){
        return this.isSDKReady
      }
  },
  mounted() {
   
  },
  methods: {
    /**
     * 获取用户信息
     */
    getUserInfo : async function () {
        return await  axios.post(this.host + "user/baseInfo/get/authentication", {'visitorId':this.userId})
    },
    /**
     * 修改用户信息，同步
     */
    async updateMyProfile() {
        let res = await this.getUserInfo()
        console.log(res, '用户信息')
        let obj = res.data.data
        let headUrl = obj.headUrl ? obj.headUrl : 'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-2.png'
        const options = {
            avatar: headUrl,
            gender: 'Gender_Type_Unknown',
            nick: obj.nickName
        }
        this.tim.updateMyProfile(options)
            .then((e) => {
                console.log(e, '修改用户信息')
            })
            .catch(imError => {
                console.log(imError)
            })
    },
    initListener() {
        // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
        this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
        // SDK NOT READT
        this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)

        // 收到新消息
        this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)

        // 会话列表更新
        this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
            console.log(event.data, '会话列表数据')
            this.$store.commit('updateConversationList', event.data)
        })

        // 群组列表更新
        this.tim.on(this.TIM.EVENT.GROUP_LIST_UPDATED, event => {
            // console.log(event.data , '群组列表更新 *****')
            this.$store.commit('updateGroupList', event.data)
        })
    },
    // 获取用户数据
    onReadyStateUpdate({name}) {
        const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
        if (isSDKReady) {
            // 获取当前用户信息
            this.tim.getMyProfile().then(({ data }) => {
                console.log(data, 'getMyProfile 数据')
                this.$store.commit('updateCurrentUserProfile', data)
                this.$store.commit('toggleIsSDKReady', isSDKReady)
            })

            // 遍历会话列表据，有群聊的会话，将群成员信息添加上去 
            let conversationList = this.conversationList
            conversationList.forEach(element => {
                if(element.type == "GROUP") {
                     // 获取群人员信息
                    tim.getGroupMemberList({
                        groupID: element.groupProfile.groupID,
                        offset: 0,
                        count: 30
                    }).then((imResponse) => {
                        element.groupMemberList = imResponse.data.memberList
                    })
                }
            })
            // 修改用户头像
            this.updateMyProfile()
        }
    },
    /**
     * 消息数据
     */
    onReceiveMessage({ data: messageList }) {
        console.log(messageList, "获取用户消息数据")
        // this.handleAt(messageList)
        this.$store.commit('pushCurrentMessageList', messageList)
    },

    /**
     * 处理 @ 我的消息
     * @param {Message[]} messageList
     */
    handleAt(messageList) {
        // 筛选有 @ 符号的文本消息
        const atTextMessageList = messageList.filter(
            message => message.type === this.TIM.TYPES.MSG_TEXT && message.payload.text.includes('@')
        )
        for (let i = 0; i < atTextMessageList.length; i++) {
            const message = atTextMessageList[i]
            const matched = message.payload.text.match(/@\w+/g)
            if (!matched) {
                continue
            }
            // @ 我的
            if (matched.includes(`@${this.currentUserProfile.userID}`)) {
                // 当前页面不可见时，调用window.Notification接口，系统级别通知。
                if (document.hidden) {
                    this.notifyMe(message)
                }
                Notification({
                    title: `有人在群${message.conversationID.slice(5)}提到了你`,
                    message: message.payload.text,
                    duration: 3000
                })
                this.$bus.$emit('new-messsage-at-me', {
                    data: { conversationID: message.conversationID }
                })
            }
        }
    }
  },
  destroyed() {
    this.$store.commit('toggleIsSDKReady')
  }
};
</script>

<style>
@import "./assets/css/common";
 
 /*过渡效果需要的动画库*/   
@import "assets/css/lib/animate.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  padding-top: 1rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
input{
  color: #000000;
}
* { touch-action: pan-y; }
.outter.hideLeft {
    opacity: 0.75;
    transform: translate3d(-100%, 0, 0);
    transition: 1.0s;
    overflow: hidden;
}
</style>
