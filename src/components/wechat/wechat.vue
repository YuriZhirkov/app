<template>
    <!--微信组件-->
  <div id="wechat">
    <ul class="wechat-list">
        <!--props传递消息对象 baseMsgObj -->
        <msg-item v-for="(baseMsgObj, index) in conversationList" :item="baseMsgObj" class="list-row line-bottom" :key="index"></msg-item>
    </ul>
  </div>
</template>
<script>
    import msgItem from "../wechat/msg-item"
    import { mapState } from 'vuex'
    import axios from "axios"
    export default {
        components: {
            msgItem
        },
        data() {
            return {
                "pageName": "微信"
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
        },
        // 页面挂着完毕时候调用
        mounted() {
            
            // this.tim.login({
            //     userID: this.userId,
            //     userSig: window.genTestUserSig(this.userId).userSig
            // })
            // .then((e) => {
            //     console.log(e, "******** 登录成功 ********")
            // })
            // .catch(imError => {
            //     if (imError.code === 2000) {
            //         alert(imError.message + ', 请检查是否正确填写了 SDKAPPID')
            //     } else {
            //         console.log(imError.message)
            //     }
            // })
            
            // // this.updateMyProfile() 修改当前登录的用信息
           

            // this.initListener()
            // alert(this.conversationList) 
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
                const options = {
                    avatar: 'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-2.png',
                    gender: 'Gender_Type_Male',
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
                    console.log(conversationList, ')))))))))))))))))))))')
                }
            },
            /**
             * 消息数据
             */
            onReceiveMessage({ data: messageList }) {
                console.log(messageList, "获取用户消息数据")
                // this.handleAt(messageList)
                this.$store.commit('pushCurrentMessageList', messageList)
                console.log(this.$store.state.currentMessageList, "处理后的消息数据")
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
        }
    }
</script>
<style>
    @import "../../assets/css/wechat.css";
</style>