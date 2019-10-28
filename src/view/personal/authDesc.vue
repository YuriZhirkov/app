<template>
  <div class="body">
   <topComponent title='' :showLeft='true' :bg="'transparent'" :color="'#000000'">
     <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
   </topComponent>

   <div class="w92">
     <h4 class="bold flexa">
       <div class="w"></div>
       为什么要认证
     </h4>
     <div class="con fmiddle">
       为了给大家创建一个真实安全优质的交友平台，每一个人都要完成实名制和学历双重认证，所有认证人工审核。已经累计拒绝50%以上的用户
     </div>
   </div>

   <div class="w92">
     <h4 class="bold flexa"><div class="w"></div>信息仅供审核</h4>
     <div class="con fmiddle">
       您提交的信息仅用于官方审核，我们不会泄露隐私
     </div>
   </div>


   <div class="bottom w100">
     <router-link to="/personal/authOption">
      <div class="flex"><div class="flex themeBg btn fbig bold">马上认证</div></div>
     </router-link>
     <div class="flex b-info fsmall">
       认证即同意
       <strong>雨过天晴</strong>
       <span class="blue">用户协议</span>
       和
       <span  class="blue">隐私政策</span>
     </div>
   </div>

  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},

  components: {},
  compute:{
	  ...mapState([])
  },

  mounted() {},

};
</script>
<style >
 body,.body{
    background: #FFFFFF;
  }
  .bottom{
    position: fixed;
    bottom: 5%;
  }
  .btn{
    margin: 10px auto;
    min-width: 60%;
    height: .8rem;
    border-radius: 3px;
  }
  .w{
    width: 4px;
    background: #6FCCE0;
    height: .4rem;
    margin-right: 8px;
  }
  .w92{
    margin: 16px ;
  }
  .con{
    color: #999999;
    margin-left: 12px;
  }
</style>
