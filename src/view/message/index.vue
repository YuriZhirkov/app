<template>
    <div class="container">
        <topComponent title='消息' :showLeft="false">
          <!-- <span slot="left" class="leftSolt">2452</span> -->
          <!-- <span slot="right" class="rightSolt">1354</span> -->
        </topComponent>

        <div class="item flexa relative">
          <div class="i-img flex relative">
            <div class="absolute dot"></div>
            <div class="i-img-icon  bgblue  flex">
              <i class="iconfont2">&#xe610;</i>
            </div>
          </div>
          <div class="i-info">
            <p class="fbig">系统消息</p>
            <div class="fsmall grey nowrap">亲爱的朋友 欢迎加入我们</div>
          </div>
          <div class="i-othe absolute">
            <i class="iconfont2">&#xe6d2;</i>
          </div>
        </div>


        <div class="item flexa relative">
          <div class="i-img flex relative">
            <router-link :to="{path:'/personal/anotherPage',query:{uid:'1169883516792475649'}}">
              <div class="absolute flex fsmall dot dot2">5</div>
              <img src="@/assets/images/lj.png" alt="">
            </router-link>
          </div>
          <div class="i-info">
            <router-link to="/message/chat">
              <p class="fbig">心动</p>
              <div class="fsmall grey">查看对你心动的人和对你心动的人</div>
            </router-link>
          </div>
          <div class="i-othe absolute">
            <span class="fsmall grey fsmall">3天前</span>
          </div>
        </div>

        <div class="item flexa relative">
          <div class="i-img flex relative">
            <img src="@/assets/images/lj.png" alt="">
          </div>
          <div class="i-info">
            <p class="fbig">小红帽</p>
            <div class="fsmall grey nowrap">查看对你心的味道我的我的我的动的人和对你心动的人</div>
          </div>
          <div class="i-othe absolute">
            <span class="fsmall grey fsmall">3天前</span>
          </div>
        </div>




        <router-link to='#'>
            <div class="publishBtn flex themeBg fmiddle">客服</div>
        </router-link>
        <footComponent></footComponent>
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
    return {};
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>
<style scoped>
  .publishBtn{
    position: fixed;
    bottom: 18%;
    right: 8%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #FFFFFF;
  }

  .dot{
    width: 10px;
    height: 10px;
    background: #FF2D66;
    border-radius: 50%;
    right: 7%;
    top: 3%;
    z-index: 2;
  }
  .dot2{
    width: 16px;
    height: 16px;
    color: #FFFFFF;
  }
  .item{
    background: #FFFFFF;
    padding: 12px 0;
    border-bottom: 1px solid #F1F1F1;
  }
  .i-img{
    width: 18%;
  }
  .i-img{
  }
  .i-img img{
    width:50px;
    height: 50px;
    border-radius: 50%;
  }
  .i-img-icon{
    width:50px;
    height: 50px;
    border-radius: 50%;
  }
  .i-info{
    width: 68%;
  }
  .i-info p{

  }
  .i-info .grey{
    line-height: 1;
  }
  .i-othe{
    right: 3%;
  }
  .i-img i{
    font-size: 28px;
    line-height: 1;
    color: #FFFFFF;
  }
  .bgred{
    background: linear-gradient(45deg, #fa1837, #e600bf);
  }
  .bggreen{
    background: linear-gradient(45deg, #18fa7d, #00e6b1);
  }
  .bgblue{
    background: linear-gradient(45deg, #187dfa, #00a6e6);
  }
</style>
