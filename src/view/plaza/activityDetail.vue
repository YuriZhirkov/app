<template>
   <div class="activityDetail">
       <topComponent title='活动详情' :showLeft='true' @goBack="goBack"></topComponent>
       <!-- 分页轮播 -->
            <div class="slides">
        <swiper ref="mySwiper"  :options="swiperOption">
            <!-- slides -->
              <swiper-slide v-for="(d,i) in slides" :key="i">
                <img :src="d" alt="">
              </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
            </div>

        <div class="storeInfo">
            <p class="fbig">
                <span>{{info.activity.activityTheme}}</span>
            </p>
            <p class="activityPrice red" v-if="info.activity.activityCost">¥{{info.activity.activityCost}}</p>
            <p class="fmiddle grey">
                <i class="iconfont2">&#xe781;</i>
                {{info.activity.activityStartTime|dateformat}}至{{info.activity.activityEndTime|dateformat}}
            </p>
            <div class="flexs">
              <p class="fmiddle grey">
                  <i class="iconfont2">&#xe6f7;</i>{{info.activity.activityAddress}}
              </p>
              <div><i class="iconfont2">&#xe6d2;</i></div>
            </div>
        </div>
        <div class="foodInfo">
            <h1>活动详情</h1>
            <div class="fmiddle"  v-html="info.activity.activityDetails" >
			<!-- {{info.activity.activityDetails}} -->
              
            </div>
        </div>
        <div class="tripInfo">
            <h1>懒人提示</h1>
            <p class="fmiddle">{{info.activity.activityTips}}</p>
        </div>
        <div class="reserveInfo">
            <h1>预定需知</h1>
            <div class="orderContent fmiddle">
                <span>{{info.activity.activitySpecification}}</span>
            </div>
        </div>
        <div class="reserveInfo">
            <h1>活动总人数</h1>
            <div class="orderContent fmiddle">
                <span>{{info.activity.activityJoinPerson}}人</span>
            </div>
        </div>
        <div class="collectInfo">
            <div class="collectTitle flexs">
                <p class="fmiddle flex grey" :class="{red:info.isJoin}"><i class="iconfont2 fbig">&#xe629;</i>{{users.usersLen}}预定</p>
              <!--  <p class="fsmall grey">全部
                   <i class="iconfont2">&#xe6d2;</i>
                </p> -->
            </div>
            <div class="fmiddle"  v-if="!users.usersLen">暂无人预定</div>
            <div class="collectPeoples">
                <img v-for="(d,i) in users.users" :src="d.headUrl" :key="i">
            </div>
        </div>

        <!-- 这个是用户的评论 开始-->
        <div class="actionBox flexs">
          <div class="flexs w100 grey">   
            <!-- type, dynimicId, toId, toName, i, formUserName = "", commentId -->
            <div class="fmiddle flex" :class="{red:info.isLike}" @click="tapComment(0,aid,'','','','')">
              <i class="iconfont2" v-if="info.isLike==0" >&#xe600;</i>
              <i class="iconfont2 red"  v-if="info.isLike==1" >&#xe600;</i>
              {{info.likeNum ? info.likeNum : ''}}
            </div>
            <div class="flex fmiddle" @click="tapComment(1,aid,info.user.userId,info.user.nickName,'','')">
              <i class="iconfont2">&#xe665;</i>
                <!-- 评论的长度 -->
                {{commentNum?commentNum:''}}
            </div>
          </div>
        </div>
        <!-- comment -->
        <!-- <router-link :to="{path:'/plaza/detail',query:{aid:d.dynamic.id}}"> -->
        <div class="li-comment">
          <div class="c-i flexa"  v-for="(d2,i2) in info.comments" :key="i2" @click="twoComment(d2,i2)">
            <div class="flexa" v-if="d2.formUserId == d2.toUserId">
              <p class="c-i-name fmiddle">{{d2.formUserName}}:</p>
              <div class="c-i-body fmiddle">{{d2.commentContent}} </div>
            </div>
            <div class="flexa" v-else>
              <p class="fmiddle"><span class="c-i-name">{{d2.formUserName}}</span>回复<span  class="c-i-name">{{d2.toUserName}}</span>:</p>
              <div class="c-i-body fmiddle">{{d2.commentContent}} </div>
            </div>
          </div>
        </div>
        <!-- 这个是用户的评论 结束 -->
        <div class="place"></div>
        <div class="activityBottom flexs">
            <div class="leftBootom flexs">
                <div class="user-tel" v-if="userId == info.user.userId" @click="del(info.activity.id, info.user.userId)">
                  <!-- <a class="w100 h100" :href="'tel:'+info.user.phone"><i class="iconfont2">&#xe785;</i></a> -->
                  <i class="iconfont2">&#xe614;</i>
                </div>
                <div class="user-img">
                  <router-link :to="{path:'/personal/anotherPage',query:{uid:info.user.userId}}">
                    <img :src="info.user.headUrl"/>
                  </router-link>
                </div>
            </div>
            <div class="rightBottom themeBg h100 flex bold fbig">
                <div @click="join" class="w100 h100 flex" v-if="info.isJoin==0 && isEnable==1">马上预订</div>
                <div @click="groupChat" class="w100 h100 flex" v-if="info.isJoin==1 && isEnable==1">群聊</div>
                <div @click="finished" class="w100 h100 flex" v-if="isEnable==0">已结束</div>
               
            </div>  
        </div>
        <!-- 评论 输入框 开始 :class="{showComment:showComment}"-->
        <div class="comment w100 flex" :class="{showComment:showComment}">
            <div class="c-input flex">
              <yd-textarea slot="right" v-model="commentContent" :placeholder="ydPlaceholder" maxlength="100"></yd-textarea>
            </div>
            <div class="c-send h100">
              <div class="w100 flex" @click="sendComment()">
                <div class="blue fmiddle bold">发送</div>
              </div>
              <div v-if="userId == commentInfo.formUserId && commentInfo.type==2" class="w100 flex" @click="delComment(commentInfo.formUserId,commentInfo.id,commentInfo.index2)">
                <div class="red fmiddle bold">删除</div>
              </div>
            </div>
            <div class="w100 c-close fmiddle grey" @click="closeComment"><i class="iconfont2">&#xe656;</i></div>
        </div>
        <!-- 评论 输入框 结束-->
   </div>


</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import 'swiper/dist/css/swiper.css'
import  { swiper, swiperSlide } from 'vue-awesome-swiper'
import wx from 'weixin-js-sdk';

export default {
  name: "activityDetail",
  props: {},
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    ...mapState(['userId','userName'])
  },
  data() {
    return {
      swiperOption:{
         pagination: {
                  el: '.swiper-pagination',
          }
      },
      aid:'',
      info:{activity:{},user:{},isJoin:false,comments:{},isLike:0,likeNum:0},
      slides: [],
      users:{users:[],usersLen:''},
      joinBeforeFlag:0,
      joinBeforeMsg:"",
      commentNum:0,
      commentContent: "",
      commentInfo: [],
      showComment: false,
      ydPlaceholder: "写评论",
      isEnable:0

    };
  },
  methods: {
    ...mapMutations(["setUserId"]),
    del(id,uid){
      const self = this
      this.post('activity/delete',{userId:uid,activityId:id},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.$dialog.toast({mes:'活动删除成功',icon:'success'})
        self.$router.go(-1)
      })
    },
    goBack(){
      this.$router.push({path:'/plaza/activities'});

    },
    weiXinShare(aid){
     
      const self = this;
      // let url = encodeURIComponent(window.location.href);
      let urlEncode = window.location.href;
      //微信分享
      this.post('weiXinShare/getSignature',
      {url:urlEncode,flag:1,id:aid},
      function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }

        let data = e.data;
        let signature = data.signature;
        let title = data.title;
        let desc = data.desc;
        let imgUrl = data.picture;
        let nonceStr = data.nonceStr;
         let timestamp = data.timestamp;
        if(signature == null || signature ==''){
            self.$dialog.toast({mes:"分享失败",icon:'error'})
            return
        }
        wx.config({
              debug: false,
              appId: 'wxebd08b5782d5a00d', // 和获取Ticke的必须一样------必填，公众号的唯一标识
              timestamp:timestamp, // 必填，生成签名的时间戳
              nonceStr: nonceStr, // 必填，生成签名的随机串
              signature: signature,// 必填，签名，见附录1
              //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
              jsApiList: [
                  'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'
                  //'updateAppMessageShareData','updateTimelineShareData'
              ]
          });

        wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
            //则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
            // wx.updateAppMessageShareData({
            //     title: "测试微信分享", // 分享标题
            //     //desc: activity.activityDetails, // 分享描述
            //     desc: "分享描述", // 分享描述
            //     link: urlEncode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            //     // imgUrl: self.slides[0], // 分享图标
            //     success: function success(res) {
            //       console.log('分享成功=='+JSON.stringify(res));
            //       self.$dialog.toast({mes:JSON.stringify(res),icon:'success'})
            //     },
            //     cancel: function cancel(res) {
            //       console.log('分享取消=='+JSON.stringify(res));
            //       self.$dialog.toast({mes:JSON.stringify(res),icon:'error'})
            //     },
            //     fail: function fail(res) {
            //       console.log('分享失败=='+JSON.stringify(res));
            //       self.$dialog.toast({mes:JSON.stringify(res),icon:'error'})
            //     }
            // });
            // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
            // wx.updateTimelineShareData({ 
            //   title: "测试微信分享", // 分享标题
            //   link: urlEncode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            //   // imgUrl: self.slides[0], // 分享图标
            //   success: function success(res) {
            //     console.log('分享成功=='+JSON.stringify(res));
            //     self.$dialog.toast({mes:JSON.stringify(res),icon:'success'})
            //   },
            //   cancel: function cancel(res) {
            //     console.log('分享取消=='+JSON.stringify(res));
            //     self.$dialog.toast({mes:JSON.stringify(res),icon:'error'})
            //   },
            //   fail: function fail(res) {
            //     console.log('分享失败=='+JSON.stringify(res));
            //     self.$dialog.toast({mes:JSON.stringify(res),icon:'error'})
            //   }
            // });
            //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: urlEncode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function success(res) {
                self.$dialog.toast({mes:'分享成功',icon:'success'})
              },
              cancel: function cancel(res) {
                self.$dialog.toast({mes:'分享取消',icon:'error'})
              },
              fail: function fail(res) {
                self.$dialog.toast({mes:'分享失败',icon:'error'})
              }
            });
            //获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: urlEncode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function success(res) {
                self.$dialog.toast({mes:'分享成功',icon:'success'})
              },
              cancel: function cancel(res) {
                self.$dialog.toast({mes:'分享取消',icon:'error'})
              },
              fail: function fail(res) {
                self.$dialog.toast({mes:'分享失败',icon:'error'})
              }
            });
            //获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
            wx.onMenuShareQQ({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: urlEncode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function success(res) {
                self.$dialog.toast({mes:'分享成功',icon:'success'})
              },
              cancel: function cancel(res) {
                self.$dialog.toast({mes:'分享取消',icon:'error'})
              },
              fail: function fail(res) {
                self.$dialog.toast({mes:'分享失败',icon:'error'})
              }
            });
            //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
            wx.onMenuShareQZone({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: urlEncode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function success(res) {
                self.$dialog.toast({mes:'分享成功',icon:'success'})
              },
              cancel: function cancel(res) {
                self.$dialog.toast({mes:'分享取消',icon:'error'})
              },
              fail: function fail(res) {
                self.$dialog.toast({mes:'分享失败',icon:'error'})
              }
            });
            
        });
        wx.error(function(res){
            // config信息验证失败会执行error函数，
            //如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            self.$dialog.toast({mes:'微信验证失败',icon:'error'})
        });
      
      });
    },
    // 加入活动之前要先检查该用户是否符合加入活动的要求
    joinBefore(){
      const self = this
      this.post('activity/joinBefore',{userId:this.userId,activityId:this.aid},function(e){
        if(e.errCode != 200){
          self.joinBeforeFlag = 0;
        } else {
          self.joinBeforeFlag = 1;
        }
        self.joinBeforeMsg = e.errMsg;
        
      })
    },
    groupChat(){
      this.$dialog.toast({mes:'群聊开发中',icon:'success'});
    },
    finished(){
      this.$dialog.toast({mes:'活动已结束',icon:'success'});
    },
    join(){
      const self = this
      if(self.joinBeforeFlag==0) {

        
        if(!!self.joinBeforeMsg && self.joinBeforeMsg=='用户未认证不能参加活动') {
            self.$dialog.confirm({
                title: '身份认证',
                mes: self.joinBeforeMsg,
                opts: () => {
                    self.$dialog.toast({mes: '去认证',timeout: 1000,
                        callback: () => {
                            self.$router.push({
                              path: "/personal/authIdentity"
                            });
                        }
                    });
                }
            });
        } else {
          self.$dialog.toast({mes:self.joinBeforeMsg,icon:'error'})
        }
        return;
      }
      this.post('activity/join',{activityId:this.aid,userId:this.userId,activityCost:this.info.activity.activityCost},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        } else {
          //self.getActivityDetail(self.aid);
          //产生订单之后就是支付，支付成功之后要回调到这个页面，需要带的参数有orderId returnUrl 用户id在订单详情里取
          console.log("订单id=");
          console.log(e.data);
          //将用户的id放在userId= self.userId,在后台解析
          let url = 'http://www.ygtqzhang.cn/pay/create?orderId='+e.data
                            +'&returnUrl=http://www.ygtqzhang.cn:8090/plaza/activity/activityDetail?aid='
                            + self.aid+"userId="
                            + self.userId;
          location.href = url;
        }

        
      })
    },
    getActivityDetail(aid){
      const self = this
      this.post('activity/detailInfo',{userId:this.userId,id:aid},function(e){
        if(!e) return
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        
        const d = e.data
        console.log("e.data",e.data);
        self.info.activity = d.activityMoreInfo
        self.isEnable =  d.activityMoreInfo.isEnable
        self.info.user = d.userInfoOutput
        self.info.isJoin = d.isJoin
        self.info.comments = d.commentOutputs
        self.info.isLike = d.isLike
        self.info.likeNum = d.likeNum
        if (d.commentOutputs != null &&  d.commentOutputs != undefined) {
            self.commentNum = d.commentOutputs.length;
        }
        const  urls = d.activityMoreInfo.activityPictureUrl
        if(urls){
          for (let i in urls) {
            self.slides.push(urls[i])
          }
        }
        console.log(self.info);
        console.log(self.slides);
      })
    },
    getUsers(aid){
      const self = this
      this.get('activity/join/get',aid,function(e){
        console.log("e=",e)
        if(e.errCode != 200)
        return
        self.users.users = e.data
        self.users.usersLen = e.total
      })
    },
    tapComment(type, aid, toId, toName, formUserName = "", commentId) {
      const self = this;
     
      if (type == 0) {
        //判断用户是否点赞了 如果点赞了则取消点赞 否则就点赞
        if (this.info.isLike===1) {
          this.cancelZan(this.userId, aid);
          this.info.isLike = 0;
          this.info.likeNum = this.info.likeNum - 1;
        } else {
          console.log("点赞1");
          this.post(
            "comment/add",
            {
              correlationId: aid,
              formUserId: this.userId,
              formUserName: this.userName,
              toUserId: toId,
              toUserName: toName,
              commentType: 0,
              type: 1
            },
            function() {}
          );
          console.log("点赞1");
          this.info.isLike = 1;
          this.info.likeNum = this.info.likeNum + 1;
        }
      }
      if (type == 1) {
        this.commentContent = "";
        this.commentInfo["correlationId"] = aid;
        this.commentInfo["toUserId"] = toId;
        this.commentInfo["toUserName"] = toName;
        this.commentInfo["formUserName"] = formUserName;
        this.commentInfo["type"] = 1;
        this.commentInfo["id"] = commentId;
        this.ydPlaceholder = "评论:";
        this.showComment = true;
      }
    },
    cancelZan(userid, aid) {
      this.post(
        "comment/cancel/like",
        { formUserId: userid, correlationId: aid, type: 1 },
        function() {}
      );
    },
    twoComment(d,i2) {
      if (!d) location.reload();
      this.commentContent = "";
      this.commentInfo["correlationId"] = d.correlationId;
      this.commentInfo["formUserId"] = d.formUserId;
      this.commentInfo["formUserName"] = d.formUserName;
      this.commentInfo["toUserId"] = d.toUserId;
      this.commentInfo["toUserName"] = d.toUserName;
      this.commentInfo["index2"] = i2;
      this.commentInfo["type"] = 2;
      this.commentInfo["id"] = d.commentId;
      this.ydPlaceholder = "回复" + d.formUserName + ":";
      this.showComment = true;
    },
    sendComment() {
      const self = this;
      if (!this.commentInfo) location.reload();

      const c = this.commentInfo;

      if (this.commentContent == "") {
        self.$dialog.toast({ mes: "写点什么吧！" });
        return;
      }

      if (c.type == 1) {
        
        this.post(
          "comment/add",
          {
            correlationId: c.correlationId,
            formUserId: self.userId,
            formUserName: self.userName,
            toUserId: c.toUserId,
            toUserName: c.toUserName,
            commentType: 1,
            type: 1,
            commentContent: this.commentContent
          },
          function(e) {
            if (!e) return;
            if (e.errCode !== 200) {
              self.$dialog.toast({ mes: e.errMsg });
              self.commentInfo = [];
              self.showComment = false;
              return;
            }

            const con = self.commentContent;
            if (self.info.comments == null) {
              self.info.comments = [];
            }
            self.info.comments.unshift({
              commentContent: con,
              formUserId: self.userId,
              formUserName: self.userName,
              correlationId: c.correlationId,
              type: 1,
              toUserId: c.toUserId,
              toUserName: c.toUserName,
              id: e.data,
              commentId: e.data
            });
            self.commentNum = self.commentNum+1;
            self.commentInfo = [];
            self.showComment = false;
          }
        );
      } else {
        this.post(
          "comment/add",
          {
            correlationId: c.correlationId,
            formUserId: self.userId,
            formUserName: self.userName,
            toUserId: c.formUserId,
            toUserName: c.formUserName,
            commentType: 1,
            type: 1,
            commentContent: self.commentContent
          },
          function(e) {
            if (!e) return;
            if (e.errCode != 200) {
              self.$dialog.toast({ mes: e.errMsg });
              return;
            }
            // console.log(self.commentInfo);
            debugger
            const con = self.commentContent;
            if (self.info.comments == null) {
              self.info.comments = [];
            }
            // self.list[c['index']].comment.unshift({commentContent:con,formUserId:self.userId,formUserName:self.userName,correlationId:c.correlationId,type:0})
            self.info.comments.unshift({
              commentContent: con,
              formUserId: self.userId,
              formUserName: self.userName,
              correlationId: c.correlationId,
              type: 1,
              toUserId: c.formUserId,
              toUserName: c.formUserName,
              id: e.data,
              commentId: e.data
            });
            self.commentNum = self.commentNum + 1;
            
            self.commentInfo = [];
            self.showComment = false;
          }
        );
      }
    },
    delComment(uid, id, i2) {
      const self = this;
      this.post(
        "comment/delete",
        { formUserId: uid, id: id, type: 1 },
        function(e) {
          if (!e) return;
          if (e.errCode != 200) {
            self.$dialog.toast({ mes: e.errMsg });
            return;
          }
          self.$dialog.toast({ mes: "删除成功" });

          self.info.comments.splice(i2, 1);
          self.commentNum--;
        
          self.showComment = false;
        }
      );
    },
    closeComment() {
      this.showComment = false;
    },
  },
  mounted() {
    const aid  = this.$route.query.aid
    console.log(aid);
    if(!aid) this.$router.go(-1)
    this.aid = aid

    const userId  = this.$route.query.userId
    console.log("userId= ");
    console.log(userId);
    if(userId != null && userId != undefined && userId != "") {
      //  self.setUserId(userId);
       this.$store.commit('setUserId',userId);
       //this.userId = userId;
    }

    this.getActivityDetail(aid)
    this.getUsers(aid)
    this.weiXinShare(aid)
    this.joinBefore()
  },
  watch: {},
};
</script>
<style lang="less" scoped>
  .slides{
    max-height: 6rem;
    position: relative;
  }
  .actionBox {
  }
  .actionBox .flex {
    width: 25%;
  }
  .showComment {
    transform: translateY(0) !important;
  }
  .c-send .w100 {
    min-height: 60px;
  }
  .c-close {
    position: absolute;
    right: 2%;
    top: 0;
    width: 20px;
  }
  .c-input {
    width: 70%;
    padding: 0 10px;
    background: #ffffff;
  }
  .c-send {
    width: 20%;
  }
  .comment {
    position: fixed;
    bottom: 0;
    background: #f5f5f5;
    z-index: 9;
    padding: 8px 0;
    transform: translateY(150%);
    transition: all 0.3s;
  }
  .c-i-name {
    color: #0168c3;
  }
  .li-comment {
    background: #f9f9f9;
    border-radius: 3px;
    padding: 20px 10px;
  }
  .li-comment div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .fenxiang{
    width: 3rem;
    background-color:#fff;
    text-align: center;
    font-weight: bold;
    background:linear-gradient(to right, #ad6cef, #846ff0);
    line-height: 3.2;
  }
  .slides /deep/ img{
    width: 100%;
    height: 6rem;
    max-height: 6rem;
  }
  .user-tel i{
    font-size: 29px;
  }
  .user-tel a{
    min-width: 30px;
  }
  .user-img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background: #d8d8d8;
  }
.user-img img{
  width: 100%;
}
/*common*/
.activityDetail {
  .storeInfo {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    p {
      min-height: .7rem;
    }
    .activityPrice {
      color: red;
    }
  }
  .foodInfo {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    h1 {
      font-size: 0.36rem;
      font-weight: bold;
    }
    img {
      width: 100%;
      margin: 0.3rem 0;
    }
  }
  .tripInfo {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    h1 {
      font-size: 0.36rem;
      font-weight: bold;
      margin-bottom: 0.2rem;
    }
  }
  .reserveInfo {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    h1 {
      font-size: 0.36rem;
      font-weight: bold;
      margin-bottom: 0.2rem;
    }
  }

  .collectInfo {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.3rem;
    .collectTitle {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.2rem;
    }
    .collectPeoples {
      display: flex;
      flex-wrap: wrap;
      img {
        width: 0.9rem;
        height: 0.9rem;
        margin: 0 0.2rem 0.2rem 0;
        border-radius: 1rem;
      }
    }
  }
  .place{
    min-height: 1rem;
  }
  .activityBottom {
    background: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
    height: 1rem;
    line-height: 1rem;
    display: flex;
        box-shadow: 5px 0 10px gainsboro;
    .leftBootom {
      width: 50%;
      display: flex;
      justify-content: space-around;
    }
    .rightBottom {
      width: 50%;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
