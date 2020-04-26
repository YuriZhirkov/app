<template>
    <div class="container">
        <topComponent title='' :showLeft="false">
           <!-- <div slot="left" class="leftSolt" v-show="!swSearch1">
                <router-link to='/personal/personalCenter'>
                    <i class="iconfont iconwode"></i>
                </router-link>
                <router-link to='/focus/matching'>
                    <span :class="$route.path=='/focus/matching'?'active':''">匹配</span>
                </router-link>
            </div>
            <div slot="right" class="rightSolt"  v-show="!swSearch1">
                <router-link to='/focus/qanda'>
                    <span :class="$route.path=='/focus/qanda'?'active':''">问答</span>
                </router-link>
                <i class="iconfont iconsousuo" @click="tapSearch"></i>
            </div> -->
            <div slot="left" class="leftSolt" v-show="!swSearch1">
                <router-link to='/personal/personalCenter'>
                    <i class="iconfont iconwode"></i>
                </router-link>
                <router-link to='/plaza/dynamic'>
                    <span class="fbig" :class="$route.path=='/plaza/dynamic'?'active':''">动态</span>
                </router-link>
            </div>
            <div slot="right" class="rightSolt" v-show="!swSearch1">
                <router-link to='/focus/matching'>
                    <span class="fbig" :class="$route.path=='/focus/matching'?'active':''">匹配</span>
                </router-link>
                <i class="iconfont iconsousuo" @click="tapSearch"></i>
            </div>

            <div slot='right' class="_search absolute flexs" :class="{'_search-active':swSearch1}">
              <div class="search flex">
                <i class="iconfont flex iconsousuo"></i>
                <yd-input class="fmiddle" max="20" placeholder="匹配一下" :show-error-icon="false" :show-success-icon="false"></yd-input>
              </div>
              <div class="s-exit fsmall flex relative" @click="tapCancelSearch">取消</div>
            </div>
        </topComponent>
        <h1 class="fmiddle flexa">
            <span><i class="iconfont2 fbig">&#xe629;</i>今日推荐</span>
        </h1>
        <ul>
            <li v-for="(d,i) in list" :key="i">
              <router-link :to="{path:'/personal/anotherPage',query:{uid:d.userId}}">
                <!-- <div class="imgWrap">
                    <div class="recommandLi" v-for="(item,index) in 3" :key="index">
                      <div class="flex r-img relative">
                        <img src="@/assets/images/lj.png" alt="">
                      </div>
                      <div class="r-body">
                        <div class="nickName fmiddle">昵称昵称</div>
                        <div class="fsmall r-info">29 <i class="iconfont2 fsmall">&#xe862;</i> 深圳</div>
                      </div>
                    </div>
                </div> -->
                <div class="personCard">
                    <div class="flex relative">
                      <div class="absolute _user flex fsmall" v-if="d.idFlag">
                        <i class="iconfont2 fmiddle _yellow">&#xe66c;</i>
                        <span>已认证身份</span>
                      </div>
                      <div class="u-img">
                        <img :src="d.headUrl" alt="">
                      </div>
                    </div>
                    <p>
                        <span class="emFont">{{d.nickName}}</span>
                        <span  v-if="d.loneLinessIndex" class="_yellow fmiddle"> <i class="iconfont2 fmiddle">&#xe68d;</i>{{d.loneLinessIndex}}</span>
                    </p>
                    <p class="fsmall">
                        <span v-if="d.gender">
                          {{d.gender}}<i class="iconfont2 fsmall">&#xe862;</i>
                        </span>
                        <span v-if="d.age && d.age > 1">
                         {{d.age}}岁<i class="iconfont2 fsmall">&#xe862;</i>
                        </span>
                        <span v-if="d.stature">
                          {{d.stature}}cm<i class="iconfont2 fsmall">&#xe862;</i>
                        </span>
                        <span v-if="d.salary">
                          月入{{d.salary}}<i class="iconfont2 fsmall">&#xe862;</i>
                        </span>
                        <span v-if="d.area">
                          居住地:{{d.area}}<i class="iconfont2 fsmall">&#xe862;</i>
                        </span>
                        <span v-if="d.educationalBackground">
                          {{d.educationalBackground}}<i class="iconfont2 fsmall">&#xe862;</i>
                        </span>
                    </p>
                    <p class="fmiddle" v-if="d.selfIntroduction">{{d.selfIntroduction}}</p>
                </div>
              </router-link>
            </li>
        </ul>
        <footComponent></footComponent>
    </div>
</template>
<script>

import { mapMutations, mapState, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "matching",
  props: {},
  components: {},
  computed: {
    ...mapState(['userId','flagEdit'])
  },
  data() {
    return {
      swSearch1 : false,
      offset:1,
      flag:true,
      list:[]
    };
  },
  watch: {},
  methods: {
    tapSearch(){
      this.swSearch1 = true
    },
    tapCancelSearch(){
      this.swSearch1 = false
    },
    getRecommend(){
      const self = this
      this.get('home/page/today/recommend',this.userId,function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        console.log(e);
      })
    },
    getList(){
      const self = this
      this.post('home/page/search',{userId:this.userId,pageNumber:this.offset,pageSize:20},function(e){
        if(!e) return
        if(e.errCode != 200){
          self.flag = true
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        const d = e.data.list
        self.offset += 1
        self.flag = true

        for (let i in d) {
          self.list.push(d[i])
        }
      })
    },
    baseHint() {
      const self = this;
      this.get(
        "user/extendInfo/hint",
        {
          userId: this.userId
        },
        res => {
          
          if (res.errCode == 200) {
            let status = res.data.substr(0, 2);
            if (status == "01") {
              let noAuth = res.data.substr(3);
              self.$dialog.toast({
                mes: noAuth,
                timeout: 2000,
                callback: () => {
                    self.$router.push({
                      path: "/personal/multiInfo",
                      query: {  i: 1 }
                  });
                }
              });
            }
          }
        }
      );
    },
    getTicket() {
      let url = 'https://www.ygtqzhang.cn/weChat/authorize?returnUrl=2';
      location.href = url;
    },
    loginByCache(){
      let userId = localStorage.getItem("userId")
      if(userId){
        this.$store.commit('setUserId',obj.userId);
        // this.userId = obj.userId;
        // 登录成功标识,设置tim登录
        this.$store.commit('toggleIsSDKReady', true)
      }
     },
  },
  mounted() {
    
    const self = this
    const obj = this.$route.query;
    console.log("obj=",obj);
    if (obj && JSON.stringify(obj) != "{}") {
      let errCode = obj.errCode;
      if (errCode && (errCode==200 || errCode=='200') ) {
        //微信登录成功
        this.$dialog.toast({ mes: "微信登录成功", icon: "success" });
        this.$store.commit('setUserId',obj.userId);
        // this.userId = obj.userId;
        // 登录成功标识,设置tim登录
        this.$store.commit('toggleIsSDKReady', true)
      } else {
        if (errCode == 400) {
          this.$dialog.toast({
            mes: "微信登录获取用户的信息失败",
            icon: "error"
          });
          return
        } else if (errCode == 401) {
          this.$dialog.toast({ mes: "微信登录异常", icon: "error" });
           return
        } else if (errCode == 402) {
          this.$dialog.toast({ mes: "微信登录异常", icon: "error" });
           return
        }
      }
    }

    //如果用户为空的话
    // if (!this.userId) {
    //   this.$router.push("/");
    // }
    
    if (!this.userId) {
      //this.$router.push("/");
      //微信授权登录
      this.getTicket();
      console.log("微信授权登录");


    } else {
      console.log("获取数据");
      this.getList();
      //this.baseHint();

    }

    const app = document.getElementById('app')
     app.addEventListener('scroll',function(e){

       let scrollHeight = app.scrollHeight
       let appHeight = app.clientHeight
       let apptHeight = app.scrollTop
       if((apptHeight+appHeight+1) > scrollHeight &&  self.flag ){
         self.flag = false
         self.getList()
         
       }
     })

  },
};
</script>
<style lang="less" scoped>
  ._user{
    left: 2%;
    top: 2%;
    background: rgba(0,0,0,.8);
    padding: 0 .1rem;
    border-radius: 20px;
    color: #ffffff;
  }
  .u-img{
    max-height: 215px;
    overflow: hidden;
  }
  .u-img{
    width: 100%;
  }
  ._yellow{
    color:#e4a000;
    position: absolute;
    right: 0;
  }
  ._search{
      width: 98%;
      opacity: 0;
      transform: translateX(100%);
      transition: all .25s;
    }
    ._search-active{
      opacity: 1;
      transform: translateX(0);
    }
  .search{
    width: 90%;
    height: 35px;
    right: 1%;
    background: #FFFFFF;
    z-index: 2;
    border-radius: 20px;
  }
  .search i{
    color: #888888;
    width: 50px;
  }
  .search /deep/ input{
    width: 90%;
    margin-left:3%;
  }
  ._search .s-exit{
    width: 10%;
  }

.container {
  .leftSolt {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: #fff;
      span {
        color: #ddd;
      }
      .active {
        color: #fff;
        font-weight: bolder;
      }
    }
  }
  .rightSolt {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: #fff;
      span {
        // font-size: 15px;
        color: #ddd;
      }
      .active {
        color: #fff;
        font-weight: bolder;
      }
    }
  }
  h1 {
    color: #fff;
    padding: 0 0.3rem;
    overflow: hidden;
    padding-top: 0.3rem;
    background: #fff;
    span {
      background-color: rgb(245, 221, 9);
      padding:  0 0.1rem;
      line-height:1.5;
      i {
        margin-right: 0.1rem;
      }
    }
  }
  li {
    padding: 0.3rem;
    margin-bottom: 0.3rem;
    background: #fff;
    .imgWrap {
      overflow: hidden;
      margin: 0.3rem 0;
      display: flex;
      flex-flow: wrap;
      .recommandLi {
        width: 32%;
        margin: 0 1% 2% 0;
        display: flex;
        flex-direction: column;
        border:1px solid #f1f1f1;
        .r-img{
          height: 130px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .r-body{
          padding: .1rem;
          .nickName{
            color: #000000;
          }
          .r-info{
            line-height: 1.5;
            color: #e4a000;
          }
        }
      }
    }
    .personCard {
      img {
        width: 100%;
        height: 100%;
        margin-bottom: 0.3rem;
      }
      p {
        display: flex;
        // justify-content: space-between;
        margin-top: 0.1rem;
        position:relative;
        align-items:center;
        .emFont {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
