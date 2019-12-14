<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div v-if="$route.path=='/wechat/dialogue'" class="outter hideLeft">
      <section class="app-content">
          <keep-alive>
            <router-view name="default" ></router-view>
          </keep-alive>
      </section>
    </div>
    <div v-else>
      <keep-alive :include="cache">
        <router-view/>
      </keep-alive>
    </div>
    
    <!--其他店内页集合 有过渡效果-->
    <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
      <router-view name="subPage" class="sub-page"></router-view>
    </transition> 
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
      cache:[],
      "pageName": "",
      "routerAnimate": false,
      "enterAnimate": "", //页面进入动效
      "leaveAnimate": "" //页面离开动效 
      // cache:['anotherPage','basicinfo']
    }
  },
   watch: {
      // 监听 $route 为店内页设置不同的过渡效果
      "$route" (to, from) {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          if (toDepth === 2) {
              this.$store.commit("setPageName", to.name)
          }
          //同一级页面无需设置过渡效果
          if (toDepth === fromDepth) {
              return;
          }
          this.enterAnimate = toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft"
          this.leaveAnimate = toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight"
              // 从店面页进入店内页 需要对店内页重新设置离开动效 因为他们处于不同 name 的 router-view
          if (toDepth === 3) {
              this.leaveAnimate = "animated fadeOutRight"
          }
      }
  },
  mounted() {
    
  }
};
</script>

<style>
@import "./assets/css/common";
 
 /*过渡效果需要的动画库*/   
@import "assets/css/lib/animate.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  padding-top: 1rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
input{
  color: #000000;
}
* { touch-action: pan-y; }
.outter.hideLeft {
    opacity: 0.75;
    transform: translate3d(-100%, 0, 0);
    transition: 1.0s;
    overflow: hidden;
}
</style>
