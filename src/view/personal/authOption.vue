<template>
  <div class="authOption">
    <topComponent title='认证' :showLeft='true'>
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
    </topComponent>
    <ul>
        <li>
            <router-link to="/personal/authIdentity" v-if="user.idFlag != 1">
                <div class="fmiddle flexa">
                    <i class="iconfont2 greey">&#xe60a;</i>
                    <span>身份认证</span>
                </div>
                <b class="iconfont iconenter"></b>
            </router-link>
            <div class="flexs w90" v-else>
              <div class="fmiddle flexa">
                  <i class="iconfont2 greey">&#xe60a;</i>
                  <span>身份认证</span>
              </div>
              <span class="blue fsmall">已认证</span>
            </div>
        </li>
        <li>
            <router-link to="/personal/authEducation" v-if="user.educationalFlag!=1">
                <div class="fmiddle flexa">
                    <i class="iconfont2 blue">&#xe613;</i>
                    <span>学历认证</span>
                </div>
                <b class="iconfont iconenter"></b>
            </router-link>
            <div class="flexs w90" v-else>
              <div class="fmiddle flexa">
                  <i class="iconfont2 blue">&#xe613;</i>
                  <span>学历认证</span>
              </div>
              <span class="blue fsmall">已认证</span>
            </div>
        </li>
     <!--   <li>
            <router-link to="/personal/authHoustCar">
                <div class="fmiddle flexa">
                    <i class="iconfont2 yellow">&#xe605;</i>
                    <span>房车认证</span>
                </div>
                <b class="iconfont iconenter"></b>
            </router-link>
        </li> -->
    </ul>
  </div>
</template>
<script>
  import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "authOption",
  props: {},
  components: {},
  computed: {
    ...mapState(['userId'])
  },
  data() {
    return {
      user:[]
    };
  },
  methods: {
    getAuth(){
      const self = this
      this.post('user/baseInfo/get/authentication',{visitorId:this.userId},function(e){
        if(e.errCode != 200) return
        self.user = e.data
      })
    }
  },
  mounted() {
    this. getAuth()

  }
};
</script>
<style lang="less" scoped>
.authOption {
  ul {
    background: #fff;
    margin: 0.3rem 0;
    li {
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dfdfdf;
        width: 90%;
        margin: auto;
        height: 0.9rem;
        line-height: 0.9rem;

        div {
          display: flex;
          i {
            margin-right: 0.2rem;
          }
        }
      }
      .w90{
        border-bottom: 1px solid #dfdfdf;
        height: 0.9rem;
        line-height: 0.9rem;
      }
    }
  }
}
</style>
