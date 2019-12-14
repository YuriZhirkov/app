<template>
    <div class="container">
        <topComponent title='雷军' :showLeft="true">
          <!-- <span slot="left" class="leftSolt">2452</span> -->
          <!-- <span slot="right" class="rightSolt">1354</span> -->
        </topComponent>

        <div class="chat relative" :style="{height:chatHeight,'scrollTop':chatScrollTop}">
          <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
             <ul>
                <li v-for="(item, key) in messages" :key="key">
                  <div class="flexa m-i" v-if="item.type == 1">
                    <div class="m-img"><img src="@/assets/images/headIcon.jpg" alt=""></div>
                    <div class="m-msg m-msg-left fmiddle">{{item.text}}</div>
                  </div>
                  <div class="flexe m-i"  v-if="item.type == 2">
                    <div class="flexs">
                      <div v-if="!item.isimg"  class="m-msg m-msg-right fmiddle">{{item.text}}</div>
                      <div v-if="item.isimg" class="m-msg m-msg-right m-msg-right-img fmiddle">
                        <img :src="item.text" alt="">
                      </div>
                      <div class="m-img"><img src="@/assets/images/headIcon.jpg" alt=""></div>
                    </div>
                  </div>
              </li>
            </ul>
          </yd-pullrefresh>
        </div>
        <div class="input w100">
          <div class="flexs w95">
            <yd-input :show-clear-icon="false" v-model="msg" :on-focus="focusinput" :show-error-icon="false" :show-success-icon="false" placeholder="输入新信息" @keyup.enter.native="enterInput"></yd-input>
            <div class="i-send flex fmiddle" @click="enterInput">发送</div>
          </div>
          <div class="w95 flex i-action">
            <div class="i-file flex">
              <input type="file"  @change="imgChange($event)"  name="f1" accept="image/*">
              <i class="iconfont2 flex">&#xe609;</i>
            </div>
            <div class="i-file flex">
              <input type="file" name="f2"  @change="imgChange($event)"  accept="image/*">
              <i class="iconfont2 flex">&#xe612;</i>
            </div>
          </div>
        </div>

    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "index",
  props: {},
  components: {},
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      msg:'',
      chatHeight:'500px',
      chatScrollTop:'500px',
      messages:[{text:'hello',type:1,isimg:false},{text:'hello',type:2,isimg:false}],
      // meImg:'@/assets/images/headIcon.jpg',
      // otherImg:'/assets/images/headIcon.jpg'




    }
  },
  mounted() {
    const toph= document.querySelector(".top").clientHeight
    const ih = document.querySelector(".input").clientHeight
    const wh =Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)
    this.chatHeight = (wh - toph - ih) + 'px'

  },

  watch: {
    messages:function(){
      this.$nextTick(() => {

          const div = document.querySelector(".chat")

          div.scrollTop = div.scrollHeight

        })
    }
  },
  methods: {
    imgChange(e){
      if(!e.target.files[0]) return
      const file = e.target.files[0]
      const img = this.getObjectURL(file)
      this.messages.push({text:img,type:2,isimg:true})
      this.messages.push({text:'好图',type:1})
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
    enterInput(){
      if(this.msg =='')return
      this.messages.push({text:this.msg,type:2})
      this.messages.push({text:this.msg+'?',type:1})
      this.msg = ''
      // document.querySelector(".chat").scollTop = (document.querySelector(".chat").scrollHeight)+'px'
      // console.log(this.chatScrollTop);
    },
    focusinput(){

      // setTimeout(function(){
      // 	document.body.scrollTop = document.body.scrollHeight;
      // },300);
    },
    loadList(){
      const self = this
      setTimeout(function(){
        self.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
      },1000)
    }
  }
};
</script>
<style scoped>
  .i-file{
    width: 50%;
    position: relative;
  }
  .i-file input{
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
  }
  .input{
    position: fixed;
    bottom: 0;
    left: 0;
    background: #f1f1f1;
    padding: 10px 0;
    border-top: 1px solid #e0e0e0;
    z-index: 8;
  }
  .input /deep/ input{
    background: #FFFFFF;
    border-radius: 3px;
    height:38px;
    width: 94%;
    text-indent: 9px;
    font-size: 14px;
  }
  .i-send{
    width: 80px;
    border-radius: 3px;
    height: 33px;
    background: #5dd049;
    color: #FFFFFF;
  }
  /deep/ .yd-pullrefresh-dragtip{
    background: transparent;
    z-index: 2;
  }
  .m-i{
    align-items: flex-start;
    margin: 10px auto;
  }
  .m-i .flexs{
    align-items: flex-start;
  }
  .m-msg{
    border-radius: 10px;
    padding: 3px 8px;
    max-width: 250px;
    min-width: 40px;
    min-height: 34px;
    word-break: break-all;
  }
  .m-msg-left{
    background: #FFFFFF;
    position: relative;
    left: 10px;
  }
  .m-msg-left:before{
     position: absolute;
     content: "";
     width: 0;
     height: 0;
     right: 99%;
     top: 7px;
     border-top: 5px solid transparent;
     border-right: 10px solid #ffffff;
     border-bottom: 5px solid transparent;
  }
  .m-msg-right{
    background: #66e250;
    position: relative;
    right: 10px;
  }
  .m-msg-right:after{
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    left: 99%;
    top: 7px;
    border-top: 5px solid transparent;
    border-left: 10px solid #66e350;
    border-bottom: 5px solid transparent;
  }
  .m-msg-right-img{
    background: #FFFFFF;
  }
  .m-msg-right-img:after{
    content: '';
    border-left: 10px solid #FFFFFF;
  }
  .chat{
    left: 3%;
    width: 94%;
    padding: 10px 0;
    overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  }
  .m-img{
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
  }
  .m-i img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .container{

  }
</style>
