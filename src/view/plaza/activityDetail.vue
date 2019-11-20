<template>
   <div class="activityDetail">
       <topComponent title='活动详情' :showLeft='true'></topComponent>
       <!-- 分页轮播 -->
            <div class="slides">
        <swiper ref="mySwiper"  :options="swiperOption">
            <!-- slides -->
              <swiper-slide v-for="(d,i) in slides">
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
                {{info.activity.activityStartTime|dateformat}}至{{info.activity.createTime|dateformat}}
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
                <span>{{info.activity.activityBriefIntroduction}}</span>
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
                <img v-for="(d,i) in users.users" :src="d.headUrl">
            </div>
        </div>
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
                <div @click="join" class="w100 h100 flex" v-if="!info.isJoin">马上预订</div>
                <div class="w100 h100 flex" v-if="info.isJoin">已加入</div>
               
            </div>
             <div class="fenxiang" @click="weiXinShare(info.activity.id)">分享</div>
              
        </div>
   </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import 'swiper/dist/css/swiper.css'
import  { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
  name: "activityDetail",
  props: {},
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    ...mapState(['userId'])
  },
  data() {
    return {
      swiperOption:{
         pagination: {
                  el: '.swiper-pagination',
          }
      },
      aid:'',
      info:{activity:{},user:{},isJoin:false},
      slides: [],
      users:{users:[],usersLen:''}
    };
  },
  methods: {
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
    weiXinShare(aid){
      const self = this
      //微信分享
      this.post('activity/delete',{activityId:aid},function(e){
        //if(e.errCode != 200){
          //self.$dialog.toast({mes:e.errMsg,icon:'error'})
          //return
        //}
        //self.$dialog.toast({mes:'活动删除成功',icon:'success'})
        //self.$router.go(-1)
        console.log("微信分享");
      })
    },
    join(){
      const self = this
      this.post('activity/join',{activityId:this.aid,userId:this.userId,activityCost:this.info.activity.activityCost},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.getActivityDetail(self.aid)
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
        self.info.activity = d.activityMoreInfo
        self.info.user = d.userInfoOutput
        self.isJoin = e.isJoin
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
        if(e.errCode != 20)return
        self.users.users = e.data
        self.users.usersLen = e.data.length
      })
    }
  },
  mounted() {
    const aid  = this.$route.query.aid
    console.log(aid);
    if(!aid) this.$router.go(-1)
    this.aid = aid

    this.getActivityDetail(aid)
    this.getUsers(aid)
  },
  watch: {},
};
</script>
<style lang="less" scoped>
  .slides{
    max-height: 6rem;
    position: relative;
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
