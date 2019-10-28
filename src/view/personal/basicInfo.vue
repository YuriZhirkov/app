<template>
  <div class="personalCenter">
    <topComponent title='基本信息' :showLeft='true'>
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
    </topComponent>


    <div class="twoBlock">
        <h5>基本资料</h5>
        <router-link to="#">
            <div class="fmiddle">
                <span v-if="user.age">{{user.age}}岁</span>
                <span v-if="user.gender">{{user.gender}}</span>
                <span v-if="user.stature">{{user.stature}}cm</span>
                <span v-if="user.marriedStatus">{{user.marriedStatus}}</span>
                <span v-if="user.nativePlace">{{user.nativePlace}}</span>
                <span v-if="user.area">{{user.area}}</span>
                <span v-if="user.educationalBackground">{{user.educationalBackground}}</span>
                <span v-if="user.housing">{{user.housing}}</span>
                <span v-if="user.playGame">{{user.playGame}}</span>
                <span v-if="user.smoke">{{user.smoke}}</span>
                <span v-if="user.salary">{{user.salary}}</span>
                <span v-if="user.automobile">{{user.automobile  }}</span>
                <span v-if="user.weight">{{user.weight}}KG</span>
            </div>

        </router-link>
    </div>
    <div class="sixBlock">
        <h5>择偶标准</h5>
        <router-link to="#" >
            <div class="fmiddle grey"  v-if="emptyMate">暂无</div>
            <div class="fmiddle" v-if="!emptyMate">
                <span v-if="mate.ageMin">最小{{mate.ageMin}}岁</span>
                <span v-if="mate.ageMax">最大{{mate.ageMax}}岁</span>
                <span v-if="mate.area">居住{{mate.area}}优先</span>
                <span v-if="mate.statureMax">最高{{mate.statureMax}}cm</span>
                <span v-if="mate.statureMin">最低{{mate.statureMin}}cm</span>
                <span v-if="mate.educationalBackground">{{mate.educationalBackground}}</span>
                <span v-if="mate.marriedStatus && mate.marriedStatus != '保密' ">{{mate.marriedStatus }}</span>
                <span v-if="mate.weigh">{{mate.weight}}</span>
                <span v-if="mate.nativePlace">家乡{{mate.nativePlace}}优先</span>
                <span v-if="mate.salaryMin">收入至少{{mate.salaryMin}}</span>
                <span v-if="mate.salaryMax">收入至多{{mate.salaryMax}}</span>
                <span v-if="mate.housing && mate.housing != '保密'">{{mate.housing}}</span>
                <span v-if="mate.automobile && mate.automobile != '保密'">{{mate.automobile}}</span>
                <span v-if="mate.smoke && mate.smoke != '保密'">{{mate.smoke}}</span>
                <span v-if="mate.drink && mate.drink != '保密'">{{mate.drink}}</span>
                <span v-if="mate.hopeMarriedTime">{{mate.hopeMarriedTime}}</span>
                <span v-if="mate.isCookDinner">{{mate.isCookDinner}}</span>
            </div>
        </router-link>
    </div>
    
    <div class="threeBlock">
        <router-link to="#">
          <div class="w100" v-if="user.selfIntroduction">
            <h5>自我介绍</h5>
            <div class="flexs">
                <p class="fsmall">{{user.selfIntroduction }}</p>
            </div>
          </div>
        </router-link>
    </div>
    <div class="fourBlock">
        <router-link to="#">
          <div class="w100">
            <h5>心动对象</h5>
            <p class="grey fsmall" v-if="!user.heartBeatObject">暂无</p>
            <p class="fsmall"  v-if="user.heartBeatObject">{{user.heartBeatObject}}</p>
          </div>
        </router-link>
    </div>
    <div class="fiveBlock" v-if="!labelsEmpty">
        <h5>TA的标签</h5>
        <ul>
            <li v-for="(d,i) in labels" :key="i">
                <router-link to="#"  class="flexa w100">
                    <span>{{i}}</span>
                    <div class="flex">
                        <p v-for="(d1,i1) in d" :key="i1" v-if="d1 && d1.isEnable == 0">
                            <span>{{d1.descWord}}</span>
                        </p>

                    </div>
                </router-link>
            </li>
        </ul>
    </div>
  
  </div>
</template>
<script>
  import {mapState} from 'vuex'
export default {
  name: "basicinfo",
  props: {},
  components: {},
  computed: {...mapState(['userId'])},
  data() {
    return {
      user:{},
      touid:'',
      mate:[],
      emptyMate:false,
      labels:[],
      labelsEmpty:false,
      heart:{}
    };
  },
  methods: {


    getUserInfo(){
      const self = this
      this.get('user/extendInfo/get',this.touid,function(e){
        if(!e) return
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.user = e.data
        if(self.user.heartBeatObject != ''){
          self.heartBeatObject(self.user.heartBeatObject)
        }
      })
    },
    heartBeatObject(uid){
      const self = this
      this.post('user/baseInfo/moreInfo',{userId:uid},function(e){
        if(!e) return
        if(e.errCode != 200){
          return
        }
        self.heart = e.data
      })
    },
    getMate(){
      const self = this
      this.get('user/get/mateSelection',this.touid,function(e){
        if(!e) return
        if(e.errCode != 200){
          // self.$dialog.toast({mes:e.errMsg,icon:'error'})
          self.emptyMate = true
          return
        }
        self.mate = e.data
        self.emptyMate = false
      })
    },
    getLabels(){
      const self = this
      this.get('label/my/get',this.touid,function(e){
        if(!e) return
        if(e.errCode != 200){
          self.labelsEmpty = true
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
        self.labelsEmpty = false
        console.log(self.labels = _d2);
      })
    }
  },
  mounted() {
    const touid = this.$route.query.uid
    if(!touid){
      this.$router.back(-1)
    }
    this.touid = touid
    this.getUserInfo()
    this.getMate()
    this.getLabels()
  }
};
</script>
<style lang="less" scoped>
.heart{
  border-radius: 50%;
  width: 50px;
  height:50px;
  object-fit: cover;
}
  .pasteLabel {
    span {
      background: #c9acff;
      color: #fff;
      border-radius: 0.05rem;
      padding: 0.1rem 0.2rem;
    }
  }

  h5{
    font-size: .27rem;
    font-weight: bold;
  }
  .iconfont2,.iconfont{
    font-size: 13px;
  }
 .blue{
   background: #1ebcf1;
 }
 .greey{
   background: #57d222;
 }
 .red{
   color: #FF2D66;
 }
.personalCenter {
  .twoBlock {
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
      margin-bottom: 0.2rem;
      font-weight: bold;
    }
    ul {
      li {
        a {
          display: flex;
          justify-content: space-between;
          & > span {
            color: #999;
            margin-right: 0.2rem;
            font-size: 14px;
          }
          div {
            flex: 1;
            display: flex;
            justify-content: flex-start;
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
