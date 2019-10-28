<template>
  <div class="">
     <topComponent title='我的活动' :showLeft='true'>
       <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
       <div class="flexe issue absolute" slot="right">
         <div v-if="role >= 2 && role < 5">
           <router-link to="/personal/issueActivity">
             <span class="fmiddle">发布活动</span>
           </router-link>
         </div>
       </div>
     </topComponent>

     <div>
       <ul>
          <li  v-for="(d,i) in list" :key="i">
               <router-link :to="{path:'/plaza/activity/activityDetail',query:{aid:d.id}}">
                    <div class="a-img">
                     <img :src="d.activityPictureUrl" alt="">
                    </div>
                   <p class="fbig">
                       <span class="activityStatus">【报名中】</span>{{d.activityTheme}}
                   </p>
                   <div class="fmiddle flexs">
                       <span>目的地：{{d.activityAddress}}</span>
                       <div class="flex red" v-if="d.activityCost">
                         <span>¥</span>
                         <span class="money">{{d.activityCost}}</span>
                       </div>
                   </div>
                   <div class="flexs">
                     <p class="fsmall grey">
                         <i class="iconfont2 fmiddle">&#xe68e;</i>
                         <span>发布日期{{d.activityStartTime|dateformat}}</span>
                     </p>
                     <p class="fsmall grey">
                         <i class="iconfont2 fmiddle">&#xe68e;</i>
                         <span>截止{{d.activityEndTime|dateformat}}</span>
                     </p>

                   </div>
               </router-link>
          </li>
       </ul>
     </div>


  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      role:0,
      offset:1,
      list:[],
      flag :true
    };
  },
  methods: {
    getActivity(){
      const self = this
      this.post('activity/search',{userId:this.userId,type:3,offset:this.offset,count:20},function(e){
        if(e.errCode != 200){
          self.flag = true
           return
        }

        self.offset += 1
        self.flag = true

        const d = e.data
        for (let i in d) {
          // let _d = {user:'',activity:''}
          // _d.activity = d[i].activitySimpleOutput
          // _d.user = d[i].userInfoOutput
          self.list.push(d[i])
        }
        console.log(self.list);
      })
    }
  },

  components: {},

  computed:{
	  ...mapState(['userId'])
  },

  mounted() {
    this.role = this.$route.query.role

    this.getActivity()

    const self = this

    const app = document.getElementById('app')
     app.addEventListener('scroll',function(e){

       let scrollHeight = app.scrollHeight
       let appHeight = app.clientHeight
       let apptHeight = app.scrollTop
       if((apptHeight+appHeight+1) > scrollHeight &&  self.flag && self.$route.path == '/personal/myActivity'){
         self.flag = false
         self.getActivity()
       }
     })
  },



};
</script>
<style lang="less"  scoped>
  .a-img{
    max-height: 250px;
    overflow: hidden;
  }
  .issue {
    right: 5%;
  }
  .issue .fmiddle{
    color: #FFFFFF;
  }
  li {
    background-color: #fff;
    margin-bottom: 0.3rem;
    padding: 0.3rem;
    img {
      width: 100%;
    }
    p {
      margin-top: 0.2rem;
      .activityStatus {
        font-weight: bold;
      }
      .money {
        color: red;
      }
    }
  }
</style>
