
<template>
  <div class="personalCenter">
    <topComponent :title='info.nickName' :showLeft='true'>
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
    </topComponent>
    <div class="imgBanner">
      <swiper ref="mySwiper"  :options="swiperOption">
          <!-- slides -->
          <swiper-slide v-for="(d,i) in swiperData">
            <img :src="d" alt="">
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>

    </div>
    <div class="oneBlock">
      <div class="flexs relative">
        <ul class="info w100">
            <li class="oneLine flexs">
                <div class="flexa">
                    <span>{{info.nickName}}</span>
                    <div class="flex bred r-icon" v-if="info2.gender == '男' || info2.gender == '女'">
                      <i v-if="info2.gender == '男'" class="iconfont2 ">&#xe6f9;</i>
                      <i  v-if="info2.gender == '女'"  class="iconfont2">&#xe649;</i>
                    </div>
                    <div v-if="info.idFlag == 1" class="flex bblue r-icon"><i class="iconfont2">&#xe60a;</i></div>

                    <div v-if="info2.isMember > 0" class="flex bzi r-icon"><i class="iconfont2">&#xe70b;</i></div>
                </div>

                <!-- <div class="fsmall flex like-wrap" @click="like">添加为心动对象</div> -->

                <div class="like">
                  <div class="flex fsmall" v-if="!like" @click="likeTo(1)">+关注TA</div>
                  <div class="flex fsmall" v-if="like"  @click="likeTo(0)"><i class="iconfont2 red">&#xe70d;</i>已关注</div>
                </div>
            </li>
            <li class="twoLine fmiddle flexs">
              <div class="flex">
                <span v-if="info2.age && info2.age > 1">
                  {{info2.age}}岁
                  <i class="iconfont2">&#xe862;</i>
                </span>
                <span v-if="info2.stature">
                  {{info2.stature}}cm
                </span>
                <span v-if="info2.area">
                  <i class="iconfont2">&#xe862;</i>
                  {{info2.area}}
                </span>
              </div>
              <div class="basic flex absolute">
                <router-link :to="{path:'/personal/basicInfo',query:{uid:touid}}">
                  <div class="_basic fmiddle">基本信息</div>
                </router-link>
              </div>
            </li>
            <li class="threeLine fmiddle bold">
     
                <span >{{fans}}粉丝</span>
            </li>
        </ul>

      </div>
      <div class="pasteLabel fsmall">
          <span v-if="info.role == 1">用户</span>
          <span v-if="info.role == 3">主持人</span>
          <span v-if="info.role == 2">红娘</span>
          <span v-if="info.role == 4">运营</span>
          <span v-if="info.role == 5">开发人员</span>
      </div>
    </div>

    <div class="state w100">
      <div class="w95">
        <h5>动态</h5>
        <div class="allBox">

            <div class="singleBlock"   v-for="(d,i) in dynamic" :key="i">
                <div class="leftBlock">
                    <div class="timeBlock">
                        <span>{{d.createTime|datedd}}</span>
                        <span class="fmiddle bold">{{d.createTime|datemm}}月</span>
                    </div>
                    <!-- <p class="address fsmall">深圳市福田区人民市政府</p> -->
                </div>
                <div class="_w100 flexa" :class="{'rightBlock-img':d.urlPicture&& d.urlPicture.length > 0}">
                    <!-- <div class="imgBox"> -->
                      <yd-lightbox v-if="d.urlPicture&& d.urlPicture.length > 0"   class="imgBox relative"  :class="{size1:d.urlPicture.length > 1}">
                              <yd-lightbox-img v-for="(d1,i1) in d.urlPicture" :key="i1" :src="d1"></yd-lightbox-img>
                              <div class="img-n fsmall absolute">共{{d.urlPicture.length}}张</div>
                      </yd-lightbox>
                      <!--  <img src="@/assets/images/lj.png" alt="">
                    </div> -->
                      <router-link class="fmiddle flexa h100" :class="{h120:d.urlPicture&& d.urlPicture.length > 0}" :to="{path:'/plaza/detail',query:{aid:d.id}}">
                             {{d.content}}
                      </router-link>
                </div>
            </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import 'swiper/dist/css/swiper.css'
import  { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: "anotherPage",
  props: {},
  components: {
    swiper,
    swiperSlide
  },
  computed: {  ...mapState(['userId','userName'])},
  data() {
    return {
      swiperOption:{
         pagination: {
                  el: '.swiper-pagination',
          }
      },
      info:[],
      info2:[],
      touid:'',
      like:false,
      dynamic:[],
      offset:1,
      flag:true,
      fans:0,
      swiperData:''
    };
  },
  watch: {},
  methods: {
    likeTo(i){
      const self = this
      // this.post('user/fans/set',{fansId:this.userId,userId:this.touid},function(e){
      //   if(e.errCode!=200){
      //     self.$dialog.toast({mes:e.errMsg,icon:'error'})
      //     return
      //   }
      //   self.getFans()
      // })
      this.post('im/friend/attention/addAndDel',{userId:this.userId,attentionId:this.touid},function(e){
        self.isLike()
        self.getFans()
        // self.like= !self.like
      })
    },
    isLike(){
      const self = this
      this.post('im/friend/attention/isFlag',{userId:this.userId,attentionId:this.touid},function(e){
        console.log(e.data == 'false');
        if(e.data){
          self.like = true
        }else{
          self.like = false
        }
        console.log(self.like);
      })
    },
    getUserInfo(touid){
      const self = this
      this.post('user/baseInfo/get/authentication',{'visitorId':this.userId,intervieweeId:touid},function(e){
        if(e.errCode!=200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.info =  e.data
        if(!self.swiperData){
          self.swiperData = []
          self.swiperData.push(self.info.headUrl)
        }
      })
    },
    getUserInfo2(touid){
      const self = this
      this.get('user/extendInfo/get',touid,function(e){
        if(e.errCode!=200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.info2 =  e.data
        if(self.info2.otherUrls){
          const _d = self.info2.otherUrls
          self.swiperData = _d.split(';')
        }
        console.log(self.swiperData);
      })
    },
    getDynamic(touid){
      const self = this
      this.flag = false
      this.get('dynamic/getList',touid,function(e){
        if(e.errCode!=200){
          // self.$dialog.toast({mes:e.errMsg,icon:'error'})
          self.flag = true
          return
        }

        self.offset += 1
        self.flag = true

          self.dynamic =e.data


        console.log(self.dynamic);

      })
    },
    getFans(){
      const self  = this
      this.get('user/fans/get',this.touid,function(e){
        if(!e) return
        if(e.errCode!=200) return
        self.fans = e.data
      })
    },
    getDescTitle(){
      const self = this;
      let info = self.info;
      console.log("desc0");
      console.log(info);
      let info2 = self.info2;
      console.log(info2);
      let title = "个人交友信息";
      let desc = "";
       console.log("desc1");
       console.log(info.nickName);
      //昵称|              性别 |       年纪 |      身高      | 居住地
      //info.nickName  info2.gender info2.age info2.stature info2.area
      if(info.nickName) {
        desc = desc + info.nickName +' | '
        console.log(desc);
      }

      if(!!info2.gender) {
        desc = desc + info2.gender +' | '
        console.log(desc);
      }

      if(!!info2.age) {
        desc = desc + info2.age +' | '

        console.log(desc);
      }
      if(!!info2.stature) {
        desc = desc + info2.stature +' | '
        console.log(desc);
      }
      if(!!info2.area) {
        desc = desc + info2.area
        console.log(desc);
      }
      console.log(desc);
    },
    weiXinShare(){
     
      const self = this;
      let info = self.info;
      let info2 = self.info2;
      let title = "个人交友信息";
      let desc = "";
      //昵称|              性别 |       年纪 |      身高      | 居住地
      //info.nickName  info2.gender info2.age info2.stature info2.area
      if(!!info.nickName) {
        desc = desc + info.nickName +' | '
      }

      if(!!info2.gender) {
        desc = desc + info2.gender +' | '
      }

      if(!!info2.age) {
        desc = desc + info2.age +' | '
      }
      if(!!info2.stature) {
        desc = desc + info2.stature +' | '
      }
      if(!!info2.area) {
        desc = desc + info2.area
      }
     
      // let url = encodeURIComponent(window.location.href);
      let urlEncode = window.location.href;
      //微信分享
      this.post('weiXinShare/getSignature',
      {url:urlEncode},
      function(e){
        console.log(e);
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }


        let date = e.data;
        let signature = date.signature;
        
        let nonceStr = date.nonceStr;
         let timestamp = date.timestamp;
        console.log("signature="+signature);
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
              desc: desc, // 分享描述
              link: urlEncode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: self.slides[0], // 分享图标
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
              imgUrl: self.slides[0], // 分享图标
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
              imgUrl: self.slides[0], // 分享图标
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
              imgUrl: self.slides[0], // 分享图标
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
    }
  },
  mounted() {
    const touid = this.$route.query.uid
    if(!touid){
      this.$router.back(-1)
    }
    this.touid = touid
    this.getUserInfo(touid)
    this.getUserInfo2(touid)
    this.getDynamic(touid)
    this.getFans()
    this.isLike()
    this.getDescTitle()
    //this.weiXinShare()


  },
//   created() {
//     const self = this
//     const app = document.getElementById('app')
//      app.addEventListener('scroll',function(e){
//
//        let scrollHeight = app.scrollHeight
//        let appHeight = app.clientHeight
//        let apptHeight = app.scrollTop
//        if((apptHeight+appHeight+1) > scrollHeight &&  self.flag && '/personal/anotherPage' == self.$route.path){
//          self.getDynamic()
//        }
//      })
//
//   }
};
</script>
<style lang="less" scoped>
  .h120{
    height: 120px;
  }
  a{
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .bzi{
    background: #cb2dff;
  }
  .imgBox img{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  ._w100{
    background: #F7F7F7;
    width: 100%;
  }
  .rightBlock-img{
    background: #FFFFFF;
    display: -webkit-box;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    overflow: hidden;
  }

  .img-n{
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 3px;
    padding: 0 4px;
    line-height: 1.8;
  }
  .imgBox{
    width: 120px;
    max-height: 120px;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .size1 img{
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
   /deep/ .swiper-container{
    max-height: 6rem;
  }
  .imgBanner{
    background: #FFFFFF;
  }
  .like-wrap{
    background: linear-gradient(to right, #e625e0, #e86ff0);
    border-radius: 30px;
    padding: 3px 10px;
    color: #ffffff;
  }
  .like-wrap i{
    font-size:17px;
    margin-right: 5px;
  }

  .dadada{
    color: #dadada;
  }
  .like{
    margin-left: 30px;
    height: 30px;
    border: 1px solid #F1F1F1;
    padding: 0 10px;
    border-radius: 30px;
  }
  .like i{
    font-size: 20px;
  }
  .state{
    margin-top: 8px;
    background: #FFFFFF;
    .w95{
      padding: 20px 0;
    }
  }
  .pasteLabel {
    padding: 0.3rem 0 ;
    span {
      background: #c9acff;
      color: #fff;
      border-radius: 0.05rem;
      padding: 0.1rem 0.2rem;
    }
  }

  .basic{
    width: 20%;
    right: 0;
  }
  ._basic{
    padding: 0 5px;
    border-radius: 30px;
    border:2px solid #ad6cef;
    color: #ad6cef;
  }
  h5{
    font-size: .27rem;
    font-weight: bold;
  }
  .iconfont2,.iconfont{
    font-size: 13px;
  }
 .bblue{
   background: #1ebcf1;
 }
 .bgreey{
   background: #57d222;
 }
 .bred{
   background: #FF2D66;
 }
.personalCenter {
  .iconenter {
    color: #999;
  }
  .imgBanner {
    max-height: 6rem;
    overflow:hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .oneBlock {
    background: #fff;
    padding: 0 .2rem .2rem 0.2rem;
    margin-bottom: 0.2rem;
    ul {
      li {
        // margin-bottom: 0.2rem;
        &:first-child {
          height: 80px;
        }
      }
      li.oneLine {
        display: flex;
        justify-content: space-between;
        .flexa{
          .r-icon{
            width: 20px;
            height:20px;
            border-radius: 50%;
            color: #FFFfff;
            margin-right: 4px;
            i{
              font-size: 14px;
            }
          }
        }
        div {
          display: flex;
          justify-content:center;
          span {
            margin-right: 0.2rem;
            font-weight: bold;
          }
          b {
            margin-right: 0.2rem;
          }
        }
      }
      li.twoLine {
        color: #666;
      }
      li.threeLine {
        // color: #888;
      }
    }
  }


}
.allBox {
    padding: 0.2rem;
    display: flex;
    flex-flow: column;
    .singleBlock {
      display: flex;
      align-items: center;
      margin-bottom: 0.4rem;
      .leftBlock {
        width: 20%;
        .timeBlock {
          span:nth-child(1) {
            font-size: 0.4rem;
            font-weight: bolder;
          }
        }
        .address {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          color: #999;
          line-height: 1.5;
          height: 38px;
          overflow: hidden;
          text-overflow: convert;
        }
      }
      .rightBlock {
        // flex: 1;
        display: flex;
        // height:80px;
        align-items:center;
        .fmiddle{
          background: #F7F7F7;
          padding: 0 10px;
          width: 100%;
        }
        .imgBox {
          width: 100px;
          height: 100px;
          overflow: hidden;
          margin-right: 0.2rem;
          img {
            width: 100%;
            height: 100%;
            object-fit:cover;
          }
        }
        .contextBox {
          flex: 1;
          line-height:1.5;
          p {
            text-align: justify;
            color: #000000;
          }
        }
      }
      .rightBlock-img{
        align-items: flex-start;
        .fmiddle{
          background: #FFFFff;
          max-height: 100px;
          overflow: hidden;
          width: 50%;
        }
      }
    }
  }

</style>
