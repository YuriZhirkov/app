<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive :include="cache">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
      cache:[]
      // cache:['anotherPage','basicinfo']
    }
  }
};
</script>

<style>
@import "./assets/css/common";
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
</style>
