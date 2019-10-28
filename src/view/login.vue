<template>
  <div class="container login">
    <div class="t-wrap-bg" :style="{'width':width,'height':width}">
      <div class="t-bg">
        <img :src="bgimg" alt="">
      </div>
    </div>
    <div class="con relative">
      <div class="c-placeholder"></div>
      <div class="logoIcon">
        <img src="../assets/images/logo.jpg" alt="">
      </div>
      <ul class="formCom">
        <li>
          <template>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">手机号：</span>
            <yd-input slot="right" v-model="phoneNum" required regex="mobile" placeholder="请输入手机号码"></yd-input>
          </yd-cell-item>
          <yd-cell-item class="verifyWrap">
            <span @click="getPhoneValidateCode" slot="right">{{countCode != 60 ? '重新发送'+countCode+'秒':'验证码'}}</span>
            <yd-input slot="left" :show-error-icon="false" :show-success-icon="false"  v-model="verifyCode" regex="^\d{5,12}$" placeholder="校验码"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
      </template>
        </li>
      </ul>
    <div class="btnWarp flex"  @click='loginTo'>
        <span class="subBtn bold flex" style="font-size: .36rem;">登录</span>
    </div>

    <div class="bottom">
      <p class="limitLine">
        <span class="line"></span>
        <span class="txt">第三方登录</span>
        <span class="line"></span>
      </p>
        <div class="logWrap">
          <img class="iconfont iconwode" :src="wximg" alt="">
        </div>

    </div>
      <!-- <div class="forgetWarp">
        <span class="col6" @click="$router.push('/reg')">马上注册</span>
        <span class="fr col6" @click="$router.push('/forget')">忘记密码？</span>
      </div> -->
    </div>

    <div class="ad flex" v-if="adShow">
      <img :src="adImg" alt="">
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import { register, getPhoneValidateCode } from "@/servers/baseInfo";
import bgimg from '@/assets/images/bg1.jpg'
import wximg from '@/assets/images/wx.png'
import axios from "axios";

export default {
  name: "login",
  props: {},
  components: {},
  computed: {

  },
  data() {
    return {
      adImg:'',
      adShow:false,
      phoneNum: "",
      verifyCode: "",
      password: "",
      showPwd: true ,//开关--密码可见
      bgimg:bgimg,
      wximg:wximg,
      countCode:60,
      role:'',
      width:''
    };
  },
  mounted() {
    // console.log(this.register);
    // this.register();
    // this.getPhoneValidateCode();
    this.getAd()
    this.width = (document.documentElement.clientWidth+40)+'px'
  },
  watch: {},
  methods: {
    ...mapMutations(['setUserId']),
    getAd(){
      const self = this
      axios.get('/apis/home/page/getAdvertising')
      .then(function(e) {
        let res = e.data
        if(res.errCode != 200) return
        self.adImg = res.data
        self.adShow = true
        setTimeout(function(){
          self.adShow = false
        },2000)
      })
      .catch(function(response) {
        if(response == undefined){
          alert('网络或请求接口错误')
          return
        }
      })

      // this.get('home/page/getAdvertising','',function(e){
      //   if(e.errCode != 200) return
      //   self.adImg = e.data
      //   self.adShow = true
      //   console.log(e);
      //   setTimeout(function(){
      //     self.adShow = false
      //   },3000)
      // })
    },
    loginTo() {
      const self = this
      if(!(/^1[3456789]\d{9}$/.test(this.phoneNum))){
        this.$dialog.toast({mes:'请输入正确的手机号码',icon:'error'})
        return
      }
      if(this.verifyCode == ''){
        this.$dialog.toast({mes:'请输入收到的验证码'})
        return
      }
      this.post('user/baseInfo/register',{phone:this.phoneNum,role:1,validateCode:this.verifyCode},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.setUserId(e.data)

        self.$router.push("/plaza/dynamic?login=1");
      })

    },
    register() {
      register({
        phone: this.phoneNum,
        role: 1,
        validateCode: this.verifyCode
      })
        .then(res => {
          console.log("register", res);
        })
        .catch(err => {
          console.log("catch err", err);
        });
    },
    getPhoneValidateCode() {
      const self = this
      if(!(/^1[3456789]\d{9}$/.test(this.phoneNum))){
        this.$dialog.toast({mes:'请输入正确的手机号码',icon:'error'})
        return
      }
      if(this.countCode != 60) return

      this.get('user/baseInfo/getPhoneValidateCode',{phone:this.phoneNum},function(e){
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.$dialog.toast({mes:e.errMsg,icon:'success'})

        const si = setInterval(function(){
          self.countCode --
          if(self.countCode <= 0){
            clearInterval(si)
            self.countCode = 60
          }
        },1000)
      })
    }
  }
};
</script>
<style lang="less" scoped>
  /deep/ #app {
    padding-top: 0;
  }
  .ad{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 999999999;
    background: #FFFFFF;
  }
  .ad img{
    width: 100%;
    // height: 100%;
    // object-fit: cover;
  }

  .bottom{
    width: 100%;
    // position: fixed;
    bottom: 20px;
  }
  .t-wrap-bg{
    position: fixed;
    top: -40%;
    left: -20px;
    border-radius: 50%;
    overflow: hidden;
    transform: rotate(180deg);
  }

@background: -webkit-linear-gradient(left, #ad6cef, #846ff0);
/* Safari 5.1 - 6.0 */
@background: -o-linear-gradient(right, #ad6cef, #846ff0);
/* Opera 11.1 - 12.0 */
@background: -moz-linear-gradient(right, #ad6cef, #846ff0);
/* Firefox 3.6 - 15 */
@background: linear-gradient(to right, #ad6cef, #846ff0);
/* 标准的语法（必须放在最后） */
/deep/ .yd-cell-item{
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  margin-bottom: 15px;
}
.login {
  background:#ffffff;
  height:100%;
  position:fixed;
  width:100%;
  top:0;
  .con{
    z-index: 2;
  }

  .c-placeholder{
    height: 67px;
  }
  .logoIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px;
    img{
      width: 110px;
      height: 110px;
      border-radius: 50%;
      border: 2px solid #e1e1e1;
    }
  }
  .t-bg{
    position: absolute;
    .t-bg img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .formCom {
    padding: 0 0.3rem;
    /deep/.yd-cell {
      border-radius: 0.1rem;
      .verifyWrap {
        /deep/.yd-cell-left {
          width: 70%;
        }
        /deep/.yd-cell-right {
          // background: linear-gradient(to right, #ad6cef, #846ff0);
          justify-content: center;
          padding-right: 0;
          // color: #fff;
          border-bottom-right-radius: 0.1rem;
          width: 30%;
          height: 100%;
        }
      }
    }
  }
  .btnWarp {
    margin: 0.4rem auto;
    text-align: center;
    background: #ffd15b;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.1rem;
    width: 50%;
  }
  .limitLine {
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    margin-top: 0.4rem;
    .line {
      border-top: 1px solid #ccc;
      flex: 1;
    }

    .txt {
      color: #666;
      margin: 0 0.2rem;
    }
  }
  .logWrap {
    padding: 0 0.3rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-around;
    img{
      width: .9rem;
      height: .9rem;
    }
    b {
      font-size: 0.6rem;
    }
  }
}
</style>
