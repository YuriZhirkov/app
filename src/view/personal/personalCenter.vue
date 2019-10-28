<template>
  <div class="personalCenter">
    <topComponent title='个人中心' :showLeft='true'>
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
    </topComponent>
    <div class="infoWrap relative">
       <div class="flex w100">
          <div class="flexa rb-top w95">
              <div class="flex u-img relative" >
                <img :src="user.headUrl" alt="">
                <p class="updateimg absolute">更换头像</p>
                <input type="file"  @change="setUserimg($event)" accept="image/*">
              </div>
              <div class="h100 w50">
                <div class="flexs">
                  <div class="flexa">
                      <span class="nr bold">{{user.nickName}}</span>
                      <div class="flexa updatename" @click="setUserName"><i class="iconfont2">&#xe713;</i></div>
                  </div>
                  <div class="flex fmiddle">
                    <span>编号:</span>{{user.userNum}}
                  </div>
                </div>
                <div class="flexa fsmall"  @click="setQm">
                    <div class="flexa grey"><i class="iconfont2 fmiddle">&#xe713;</i></div>
                    <span v-if="user.monologue">{{user.monologue}}</span>
                    <span  class="grey" v-if="!user.monologue">我的独白 个性签名</span>
                </div>
              </div>
        </div>
        <div class="i-right absolute">
          <router-link :to="{path:'/personal/personalDetail?nickName='+user.nickName+'&userNum='+user.userNum}"  class="headline flex">
              <!-- <span class="fsmall">编辑更多</span> -->
              <b class="iconfont iconenter fmiddle"></b>
          </router-link>
        </div>
       </div>
        <div class="pasteLabel fsmall">
            <span v-if="user.role == 1">用户</span>
            <span v-if="user.role == 3">主持人</span>
            <span v-if="user.role == 2">红娘</span>
            <span v-if="user.role == 4">运营</span>
            <span v-if="user.role == 5">开发人员</span>
        </div>
    </div>

   <div class="vip w100">
      <router-link class="w100 flexs" to="/personal/member">
       <div class="w90">
         <div class="flex flex fmiddle"><i class="iconfont2 flex fbig red">&#xe622;</i>会员</div>
         <div class="w100">
           <p class="flex bold">{{vip.days ? vip.days : 0}}</p>
           <p class="flex fmiddle">剩余天数</p>
         </div>
         <div class="flex">
           <p class=" fmiddle" v-if="vip.inDate">有效期至{{vip.inDate|dateformat}}</p>
           <p class=" fmiddle" v-if="!vip.inDate">有效期至无</p>
         </div>
       </div>
       <div class="flex w10">
        <b class="iconfont iconenter fmiddle"></b>
       </div>
      </router-link>
   </div>

    <ul>

        <li>
            <router-link to="/personal/authOption">
                <div class="leftB">
                    <i class="iconfont2 blue">&#xe68c;</i>
                    <span>认证</span>
                </div>
                <div class="rightB">
         <!--           <span v-if="user.idFlig || user.phoneFlsg || user.educationalFlag || user.realNameFlag">已认证</span>
                    <span v-else>未做任何认证</span> -->
                    <b class="iconfont iconenter"></b>
                </div>
            </router-link>
        </li>
        <li>
            <router-link :to="{path:'/personal/myActivity',query:{role:user.role}}">
                <div class="leftB">
                    <i class="iconfont2 yellow">&#xe66f;</i>
                    <span>我的活动</span>
                </div>
                <div class="rightB">
                    <!-- <span>已参与8个活动</span> -->
                    <b class="iconfont iconenter"></b>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="/personal/photoAlbum">
                <div class="leftB">
                    <i class="iconfont2 greey">&#xe6ad;</i>
                    <span>我的相册</span>
                </div>
                <div class="rightB">
                    <!-- <span>8条动态</span> -->
                    <b class="iconfont iconenter"></b>
                </div>
            </router-link>
        </li>
    <!--    <li>
            <router-link to="#">
                <div class="leftB">
                    <i class="iconfont2 blue">&#xe6a9;</i>
                    <span>我的问题</span>
                </div>
                <div class="rightB">
                    <span>参与6次问答</span>
                    <b class="iconfont iconenter"></b>
                </div>
            </router-link>
        </li> -->
    </ul>
  </div>
</template>
<script>
  import { mapState, mapActions, mapGetters } from "vuex";
  import axios from 'axios'
export default {
  name: "personalCenter",
  props: {},
  components: {},
  computed: {},
  data() {
    return {
      user:[],
      img:'',
      imgUploadUrl:'',
      vip:[]
    };
  },

  methods: {
    getVip(){
      const self =this
      this.get('member/user/get',this.userId,function(e){
        if(!e) return
        if(e.errCode != 200)return
        self.vip = e.data
      })
    },
    setQm(){
      const v = prompt('谈谈自己独白或心情！')
      console.log(name);
      if(v == null || v  == '') return
      const self = this
      this.post('user/extendInfo/updateMonologue',{userId:this.userId,monologue:v},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.user.monologue = v
      })
    },
    setUserimg(e){
      const self = this
        if(!e.target.files[0]) return
        const file = e.target.files[0]
        this.user.headUrl = this.getObjectURL(file)
  
        this.uploadUserimg(file)
    
    },
    getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    },
    uploadUserimg(file){
      const self = this
      const fd = new FormData()
      fd.append('file', file) 
      axios({
          method: 'post',
          url: this.host+'file/upload',
          data: fd
      })
      .then(function(e){
        if(e.data.errCode != 200){
          self.$dialog.toast({mes:e.date.errMsg,icon:'error'})
          return
        }

        self.post('user/baseInfo/updateHeadUrl',{userId:self.userId,headUrl:e.data.data},function(e){
          if(e.errCode != 200){
            self.$dialog.toast({mes:e.errMsdg,icon:'erroe'})
            return
          }
        })
        self.imgUploadUrl = e.data
      })
      .catch(function(e){
        if(e == undefined){
          alert('网络或请求接口错误')
          return;
        }
        if(e.data.errCode != 200){
          self.$dialog.toast({mes:e.date.errMsg,icon:'error'})
          return
        }

        self.post('user/baseInfo/updateHeadUrl',{userId:self.userId,headUrl:e.data.data},function(e){
          if(e.errCode != 200){
            self.$dialog.toast({mes:e.errMsdg,icon:'erroe'})
            return
          }
        })
        self.imgUploadUrl = e.data
      })
    },
    setUserName(){
      const  self = this
      // if(this.user.nickName == (this.user.phone.substr(0,8))){
        const name = prompt('给自己设置一个昵称吧！')
        console.log(name);
        if(name == null || name  == '') return

        this.post('user/baseInfo/updateNickName',{userId:this.userId,nickName:name},function(e){
          if(e.errCode != 200){
            self.$dialog.toast({mes:e.errMsg,icon:"error"})
            return
          }
          self.user.nickName = name
        })
      // }
    },
    getUserInfo(){
      const  self = this
      this.post('user/baseInfo/moreInfo',{userId:this.userId},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
        self.user = e.data
        console.log(self.user);
      })
    },
    getActivity(){
      const  self = this
      this.post('activity/search',{userId:this.userId},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
        console.log(e);
      })
    }
  },
  computed:{...mapState(['userId'])},
  mounted() {
    const self = this
    if(!this.userId){
      this.$router.push('/')
    }
    this.getUserInfo()
    this.getVip()
    // this.getActivity()

    // setTimeout(function(){
    //   self.setUserName()
    // },1500)
  },

};
</script>
<style lang="less" scoped>
  .vip{
    background: #ffffff;
    margin-bottom: .2rem;
    padding: 10px 0;
  }
  .w10{
    width:10%;
  }
  .w50{
    min-width: 50%;
  }
  .u-img{
   width: 1.3rem;
   height: 1.3rem;
   border-radius: 0.1rem;
   overflow: hidden;
  }
  .u-img input{
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    z-index: 2;
  }
 .rb-top img{
   width: 100%;
   height: 100%;
   object-fit: cover;
 }
.rb-top .h100{
  margin-left: 18px;
}
 .updatename{
   margin-left: 8px;
 }
 .updateimg{
   font-size: 11px;
   padding: 0 5px;
   right: 0;
   bottom: 0;
   background: rgba(0,0,0,.5);
   border-radius: .1rem 0 0 0;
   color: #FFFFFF;
 }
 .i-right{
   right: 0;
 }
.personalCenter {
  .infoWrap {
    background: #fff;
    margin-bottom: 0.3rem;
    padding-top:15px;
    .headline {
      padding: 0.3rem;
      display: flex;
      .rightBox {
        flex: 1;
        display: flex;
        div {
          flex: 1;
          p {
            color: #999;
            margin-bottom: 0.2rem;
            .nr {
              font-size: 0.36rem;
              color: #333;
            }
          }
        }
      }
    }
    .pasteLabel {
      padding: 0.3rem;
      span {
        background: #c9acff;
        color: #fff;
        border-radius: 0.05rem;
        padding: 0.1rem 0.2rem;
      }
    }
  }
  ul {
    background: #fff;
    li {
      margin-left: 0.4rem;
      border-bottom: 1px solid #dfdfdf;
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size:.25rem;
        div {
          display: flex;
          align-items: center;
        }
        .leftB {
          display:flex;
          align-items:center;
          i {
            margin-right: 3px;
            font-size: .35rem;
          }
        }
        .rightB {
          display:flex;
          align-items:center;
          padding-right: 0.3rem;
          span {
            color: #888;
          }
          b {
            margin-left: 0.2rem;
            font-size: .25rem;
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
