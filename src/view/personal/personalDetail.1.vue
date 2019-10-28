<template>
  <div class="personalCenter">
    <topComponent title='详细信息' :showLeft='true'>
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
    </topComponent>
    <div class="imgBanner relative">
        <img :src="user.headUrl" alt="">
        <!-- <input class="absolute" type="file"  @change="setUserimg($event)" accept="image/*"> -->
    </div>
    <div class="u-imgs relative flexa">
      <div class="w100 u-imgs flexa">
        <div class="u-img flex u-update relative">
          <i class="iconfont2">&#xeb55;</i>
          <input type="file" multiple="multiple" accept="image/*"  @change="imgChange($event)">
        </div>
        <div class="u-img relative flex" v-for="(d1,i1) in imgsUrl">
          <img :src="d1" alt="">
          <i @click="delImg(i1)" class="u-close absolute flex iconfont2">&#xe656;</i>
        </div>
        <div class="u-img relative flex" v-for="(d1,i1) in imgsUrl2">
          <i @click="delImg2(d1)" class="u-close absolute flex iconfont2">&#xe656;</i>
          <img :src="d1" alt="">
          <!-- <i @click="delImg(i1)" class="u-close absolute flex iconfont2">&#xe656;</i> -->
        </div>
      </div>
      <div @click="uploadImages" class="w100 flexe" v-if="imgsUrl.length > 0">
        <div class="u-upload flexe themeBg fmiddle">完成上传</div>
      </div>
    </div>
    <div class="oneBlock">
        <ul>
            <li class="oneLine">
                <div class="flexa">
                    <span>{{user.nickName}}</span>
                    <div v-if="user2.gender == '男'" class="flex bblue"><i class="iconfont2">&#xe6f9;</i></div>
                    <div  v-if="user2.gender == '女'"  class="flex bred"><i class="iconfont2">&#xe649;</i></div>
                    <div v-if="user.idFlag == 1" class="flex bluebg"><i class="iconfont2">&#xe60a;</i></div>
                    <!-- <div v-if="user.phoneFlag" class="flex bluebg"><i class="iconfont2">&#xe785;</i></div> -->
                    <div v-if="user2.isMember > 0" class="flex bzi"><i class="iconfont2">&#xe70b;</i></div>
                </div>
                <router-link to="#">
                    <!-- <b class="iconfont iconenter fmiddle"></b> -->
                </router-link>
            </li>
            <li class="twoLine fmiddle">
                <span>{{user2.age ? user2.age+'岁': '占无年龄'}}</span>
                <i class="iconfont2">&#xe862;</i>
                <span>{{user2.stature ? user2.stature+'cm': '占无保密'}}</span>
                <i class="iconfont2">&#xe862;</i>
                <span>{{user2.area ? user2.area: '占无现居'}}</span>
            </li>
            <li class="threeLine fmiddle bold">
                <span>{{fans}}粉丝</span>
            </li>
        </ul>
    </div>
    <div class="twoBlock">
        <h5>基本资料</h5>
            <div class="fmiddle">
                <div class="flexa flexwrap">
                  <span v-if="user2.stature">{{user2.stature}}cm</span>
                  <span v-if="user2.age">{{user2.age}}岁</span>
                  <span v-if="user2.marriedStatus">{{user2.marriedStatus}}</span>
                  <span v-if="user2.nativePlace">{{user2.nativePlace}}</span>
                  <span v-if="user2.area">{{user2.area}}</span>
                  <span v-if="user2.industry">{{user2.industry}}</span>
                  <span v-if="user2.salary">月收入:{{user2.salary}}</span>
                  <span v-if="user2.housing">{{user2.housing}}</span>
                  <span v-if="user2.automobile">{{user2.automobile}}</span>
                  <span v-if="user2.smoke">{{user2.smoke}}</span>
                  <span v-if="user2.drink">{{user2.drink}}</span>
                  <span v-if="user2.playGame">{{user2.playGame}}</span>
                  <span v-if="user2.hopeMarriedTime">{{user2.hopeMarriedTime}}</span>
                  <span v-if="user2.lonelinessIndex">{{user2.lonelinessIndex}}</span>
                  <span v-if="user2.isCookDinner	">{{user2.isCookDinner}}</span>

                </div>

                <!-- <div  class="flexs" @click="updateBasicInfo"> -->
                  <router-link class="w100 flexs" to="/personal/editBasicInfo?i=1">
                    <p class="grey fsmall">编辑个人信息</p>
                    <b class="iconfont iconenter"></b>
                  </router-link>
                <!-- </div> -->
            </div>
    </div>
    <div class="sixBlock">
        <h5>择偶标准</h5>
        <div class="_l" v-if="!emptyMate">
          <span class="fmiddle" v-if="mate.ageMin">最小{{mate.ageMin}}岁</span>
          <span class="fmiddle" v-if="mate.ageMax">最大{{mate.ageMax}}岁</span>
          <span class="fmiddle" v-if="mate.area">居住{{mate.area}}优先</span>
          <span class="fmiddle" v-if="mate.statureMax">最高{{mate.statureMax}}cm</span>
          <span class="fmiddle" v-if="mate.statureMin">最低{{mate.statureMin}}cm</span>
          <span class="fmiddle" v-if="mate.educationalBackground">{{mate.educationalBackground}}</span>
          <span class="fmiddle" v-if="mate.marriedStatus && mate.marriedStatus != '保密' ">{{mate.marriedStatus }}</span>
          <span class="fmiddle" v-if="mate.weigh">{{mate.weight}}</span>
          <span class="fmiddle" v-if="mate.nativePlace">家乡{{mate.nativePlace}}优先</span>
          <span class="fmiddle" v-if="mate.salaryMin">收入至少{{mate.salaryMin}}</span>
          <span class="fmiddle" v-if="mate.salaryMax">收入至多{{mate.salaryMax}}</span>
          <span class="fmiddle" v-if="mate.housing && mate.housing != '保密'">{{mate.housing}}</span>
          <span class="fmiddle" v-if="mate.automobile && mate.automobile != '保密'">{{mate.automobile}}</span>
          <span class="fmiddle" v-if="mate.smoke && mate.smoke != '保密'">{{mate.smoke}}</span>
          <span class="fmiddle" v-if="mate.drink && mate.drink != '保密'">{{mate.drink}}</span>
          <span class="fmiddle" v-if="mate.hopeMarriedTime">{{mate.hopeMarriedTime}}</span>
          <span class="fmiddle" v-if="mate.isCookDinner">{{mate.isCookDinner}}</span>
        </div>
        <router-link to="/personal/editBasicInfo?i=2">
            <p  class="noLabel fmiddle">编辑择偶标准</p>
            <b class="iconfont iconenter"></b>
        </router-link>
    </div>
    <div class="threeBlock">
        <router-link to="#">
          <div class="w100">
            <h5>自我介绍</h5>
            <div class="flexs" @click="updateSelfIntroduction(1)">
              <div>
                <p class="fmiddle" v-if="user1.selfIntroduction">{{user1.selfIntroduction}}</p>
                <p  v-if="!user1.selfIntroduction" class="grey fsmall">添加自我介绍</p>
              </div>
              <b class="iconfont iconenter"></b>
            </div>
          </div>
        </router-link>
    </div>
    <div class="fourBlock">
        <router-link to="#">
          <div class="w100">
            <h5>心动对象</h5>
            <div class="flexs"  @click="updateSelfIntroduction(2)">
              <div>
                <p v-if="!user2.heartBeatObject" class="grey fsmall">待添加</p>
                <p v-if="user2.heartBeatObject"  class="fmiddle">
                  {{user2.heartBeatObject}}
                </p>
              </div>
              <b class="iconfont iconenter"></b>
            </div>
          </div>
        </router-link>
    </div>
    <div class="fiveBlock">
        <div class="flexs">
          <h5>我的标签</h5>
          <router-link to="/personal/editLabel">
            <div class="fsmall blue edit-label">定制标签</div>
          </router-link>
        </div>
        <ul>
            <li>
                <div  class="flexa w100 fmiddle" v-for="(d,i) in labels" :key="i">
                    <p class="flexa label-title">{{i}}</p>
                    <div class="flex label" @click="openCheckbox('个性')">
                          <span class="fmiddle" v-for="(d1,i1) in d" :key="i1" v-if="d1 && d1.isEnable == 0">
                            {{d1.descWord}}
                          </span>
                    </div>
                </div>
            </li>


        </ul>
    </div>



    <!-- 自我介绍 -->
    <yd-popup v-model="showPopup1"   position="bottom" height="50%">
      <div class="w90">
          <yd-textarea v-if="edit == 1" v-model="user1.selfIntroduction"  placeholder="添加自我介绍"></yd-textarea>
          <yd-textarea  v-if="edit == 2" v-model="user2.heartBeatObject"  placeholder="描述心动对象"></yd-textarea>
          <div class="btn" @click="updateSelfIntroductionDone">
            <div class="flex themeBg fbig bold">确定</div>
          </div>
      </div>
    </yd-popup>

  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex"
import axios from "axios";

export default {
  name: "personalCenter",
  props: {},
  components: {},
  computed: {...mapState(['userId'])},
  data() {
    return {
      nickName:'',
      userNum:'',
      user:[],
      user1:[],
      user2:[],
      mate:[],
      emptyMate:false,
      fans:0,
      edit:1,

      labels:[],
      showPopup:false,
      showPopup1:false,
      showPopup2:false,
      showPopup3:false,
      info:[],

      checkbox1:[],
      checkboxData:[],
      imgsUrl:[],
      imgsUrl2:[],
      imgUploadUrl:[]
    };
  },
  methods: {
    setUserimg(e){
      const self = this
        if(!e.target.files[0]) return
        const file = e.target.files[0]
        this.user.headUrl = this.getObjectURL(file)
      
        this.uploadUserimg(file)
    
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
    delImg2(url){
      const self = this
      this.post('user/extendInfo/deleteOtherUrls',{otherUrl:url,userId:this.userId},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
         self.getUserInfo2()
      })
    },
    delImg(i){
      this.imgsUrl.splice(i,1)
      this.imgUploadUrl.splice(i,1)
    },
    uploadImages(){
      const self = this
      this.post('user/extendInfo/uploadingOtherUrls',{userId:this.userId,otherUrls:this.imgUploadUrl},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
        self.$dialog.toast({mes:'上传完成'})
        self.imgsUrl = []
        self.imgUploadUrl = []
        self.getUserInfo2()
      })
    },
    imgChange(e) {
     if(!e.target.files) return
       const files = e.target.files
       const len = files.length
       this.fileupload(files)
      for (let i = 0; i< len;i++) {
        this.imgsUrl.push(this.getObjectURL(files[i]))
      }
    },
    getObjectURL(file) {
            if(file.type == 'video/mp4') return 'mp4'
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
    fileupload(files) {
      const self = this
      const fd = new FormData()
      const len = files.length
      for (let i = 0; i< len;i++) {
        fd.append('files', files[i])
        }
        axios({
            method: 'post',
            url: this.host+'file/uploadBatch',
            data: fd
        })
        .then(function(e){
          console.log(e);
          if(e.data && e.data.errCode != 200){
            self.imgsUrl.slice(i,1)
            self.$dialog.toast({mes:e.date.errMsg,icon:'error'})
            return
          }
          self.imgUploadUrl= e.data.data
        })
        .catch(function(e){
          if(e == undefined){
            alert('网络或请求接口错误')
            return;
          }
          if(e.data && e.data.errCode != 200){
            self.imgsUrl.slice(i,1)
            self.$dialog.toast({mes:e.date.errMsg,icon:'error'})
            return
          }
          self.imgUploadUrl  = e.data.data
        })

    },
    openCheckbox(type){
      const self = this
      this.showPopup2 = true
      this.post('label/get',{type:type},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
        self.checkboxData = e.data
      })
    },


    updateSelfIntroduction(i){
      this.edit = i
       this.showPopup1 = true
    },
    updateSelfIntroductionDone(){
      const  self = this
      if(this.edit == 1){
        this.post('user/extendInfo/addSelfIntroduction',{userId:this.userId,selfIntroduction:this.user1.selfIntroduction},function(e){
          if(e.errCode != 200){
            self.$dialog.toast({mes:e.errMsg,icon:"error"})
            return
          }
          self.showPopup1 = false
        })
      }else{
        this.post('user/extendInfo/addHeartBeatObject',{userId:this.userId,heartBeatObject:this.user2.heartBeatObject},function(e){
          if(e.errCode != 200){
            self.$dialog.toast({mes:e.errMsg,icon:"error"})
            return
          }
          self.showPopup1 = false
        })
      }
    },
    getUserInfo(){
      const  self = this
      this.post('user/baseInfo/get/authentication',{visitorId:this.userId},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
        self.user = e.data
      })
    },
    getUserInfo1(){
      const  self = this
      this.post('user/baseInfo/moreInfo',{userId:this.userId,nickName:this.nickName,userNum:this.userNum},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
        self.user1 = e.data
      })
    },
    getUserInfo2(){
      const  self = this
      this.get('user/extendInfo/get',this.userId,function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
        self.user2 = e.data
        if(self.user2.otherUrls){
          self.imgsUrl2 = self.user2.otherUrls.split(';')
          console.log(self.imgsUrl2 );
        }
        console.log(self.user2);
      })
    },
    getFans(){
      const  self = this
      this.get('user/fans/get',this.userId,function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
        self.fans= e.data
      })
    },

    getLabels(){
      const  self = this
      this.get('label/my/get',this.userId,function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:"error"})
          return
        }
        const d = e.data

         let _d = {}
        for (let i in d) {
          _d[i] = []
          for (let i1 in d[i]) {
            if(d[i][i1].isEnable != 0) continue
                _d[i][i1] = d[i][i1]
          }
        }
        let _d2 = {}
        for (let i in _d) {
          if(_d[i].length >= 1){
            _d2[i] = _d[i]
          }
        }
        console.log(self.labels = _d2);
      })
    },
    getMate(){
      const self = this
      this.get('user/get/mateSelection',this.userId,function(e){
        if(!e) return
        if(e.errCode != 200){
          // self.$dialog.toast({mes:e.errMsg,icon:'error'})
          self.emptyMate = true
          return
        }
        self.mate = e.data
        self.emptyMate = false
      })
    }

  },
  mounted(e) {
    if(!this.userId){
      this.$router.push('/')
    }
    const u = this.$route.query
    if(!u.nickName) this.$router.go(-1)
    this.userNum = u.userNum
    this.nickName = u.nickName
    this.getUserInfo()
    this.getUserInfo1()
    this.getUserInfo2()
    this.getFans()
    this.getMate()
    this.getLabels()
  },
};
</script>
<style lang="less" scoped>
  .imgBanner input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
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
  .bzi{
    background: #cb2dff;
  }
   ._l{
     display: flex;
     flex-wrap: wrap;
   }
  ._l span{
    padding: 0 0.2rem;
    border: 1px solid #ad6cef;
    border-radius: 0.05rem;
    margin: 0.1rem 0.2rem 0.1rem 0;
    color: #ad6cef;
    border-radius: 20px;
  }
  .u-upload{
   border-radius: 20px;
   padding: 0 10px;
   color: #ffffff;
   font-weight: bold;
  }
  .u-close{
    z-index: 2;
    background: rgba(0, 0, 0, 0.79);
    width: 19px;
    height: 19px;
    right: 0;
    top: 0;
    border-radius: 50%;
    color: #ffffff;
    font-size: 22px;
    font-weight: bold;
  }
  .u-imgs{
    background: #FFFFFF;
    border-bottom: 1px solid #F1F1F1;
    flex-wrap: wrap;
    padding: 15px 10px;
  }
  .u-img{
    width: 23%;
    margin: 0 1% 5px 0;
    height: 90px;
    overflow: hidden;
  }
    .u-img img{
      width: 100%;
    }
  .u-update{
    border: 1px solid #e1e1e1;
  }
  .u-update input{
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    z-index: 2;
  }
  .u-update i{
    font-size: 30px;
    font-weight: bold;
  }
  .personalCenter{
    background: #F7F7F7;
  }
  .label-title{
    color: #333333;
    min-width: 12%;
  }
  .label span{
    padding: 0 0.2rem;
    border: 1px solid #ad6cef;
    border-radius: 0.05rem;
    margin: 0.1rem 0.2rem 0.1rem 0;
    color: #ad6cef;
    border-radius: 20px;
  }
  .edit-label{
    border: 1px solid;
    padding: 0 10px;
    border-radius: 1rem;
  }
  .btn{
    position: absolute;
    bottom: 5%;
    width: 90%;
  }
  .btn div{
    height: 45px;
    border-radius: .1rem;
  }
  h5{
    font-size: .27rem;
    font-weight: bold;
  }
  .iconfont2,.iconfont{
    font-size: 13px;
  }
 .bluebg{
   background: #1ebcf1;
 }
 .greey{
   background: #57d222;
 }
 .red{
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
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    ul {
      li {
        margin-bottom: 0.2rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
      li.oneLine {
        display: flex;
        justify-content: space-between;
        .flexa{
          div{
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
  .twoBlock {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    h5 {
      font-weight: bold;
    }
      div {
        /deep/ span {
          padding: 0 0.2rem;
          border: 1px solid #ad6cef;
          border-radius: 0.05rem;
          margin: 0.1rem 0.2rem 0.1rem 0;
          color: #ad6cef;
          border-radius: 20px;
        }
      }
  }
  .threeBlock {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    a {
      display: flex;
      justify-content: space-between;
    }
  }
  .fourBlock {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    a {
      display: flex;
      justify-content: space-between;
    }
  }
  .fiveBlock {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    h5 {
      font-weight: bold;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ul {
      li {
        a {
          display: flex;
          justify-content: space-between;
          & > span {
            // color: #999;
            margin-right: 0.2rem;
            font-size: 14px;
          }
          div {
            flex: 1;
            display: flex;
            justify-content: space-between;
            height: 1rem;
            // border-bottom: 1px solid #dfdfdf;
            p.noLabel {
              color: #999;
            }
            p {
              span {
                padding:.1rem 0.2rem;
                border: 1px solid #ad6cef;
                border-radius: 0.05rem;
                margin-right: 0.2rem;
                font-size: 0.25rem;
                color: #ad6cef;
                border-radius: 20px;
              }
            }
          }
        }
      }
    }
  }
  .sixBlock {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    h5 {
      margin-bottom: 0.2rem;
      font-weight: bold;
    }
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        display: flex;
        flex-flow: wrap;
        span {
          padding: 0 0.2rem;
          border: 1px solid #ad6cef;
          border-radius: 0.05rem;
          margin: 0.1rem 0.2rem 0.1rem 0;
          color: #ad6cef;
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
