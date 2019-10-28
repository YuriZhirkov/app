<template>
  <div class="c">
    <topComponent title='详情' :showLeft='true'>
    </topComponent>


    <div class="issue">
      <div class="w92">
        <h2 class="flexa bold">如何看待6.18日曾轶可在首都机场鱼安检人员发送政治意识?</h2>
        <div class="i-img w100 flexs">
          <img src="@/assets/images/lj.png" alt="">
          <img src="@/assets/images/lj.png" alt="">
        </div>
        <div class="i-desc fmiddle  relative" :class="{'i-desc-active':swIssue,'i-desc-none':!swIssue}">
           <p>
             时间北京在15日下午，紫外灯发文周到首都机场人员吊打你就拿到近五年的第五代我的我的我的我的我拿到近五年的第五代我的我的我的我的拿到近五年的第五代我的我的我的我的拿到近五年的第五代我的我的我的我的的味道我
           </p>
          <div class="absolute flex fmiddle grey i-desc-a" @click="tapIssue">
            <span v-if="swIssue">收起问题</span>
            <span v-if="!swIssue">展开问题描述</span>
             <i class="iconfont2">&#xe6d0;</i>
          </div>
        </div>
         <div class="like flexa">
           <div class="fsmall l-n">255人关注</div>
           <div class="fsmall l-n">109条评论</div>
         </div>
      </div>
    </div>

    <div class="i-n">
      <div class="w95 flexs">
        <div class="fmiddle flex">5个回答</div>
        <div class="fmiddle flex">按质量排序<i class="iconfont2">&#xe6d0;</i></div>
      </div>
    </div>

    <div class="reply">
      <div class="w92">
        <div class="i-user flexa">
           <div class="i-u-img">
             <img src="@/assets/images/lj.png" alt="">
           </div>
           <p class="fmiddle i-u-name">小米手机</p>
           <div class="i-rz fsmall">
             <i class="iconfont2 blue fmiddle">&#xe870;</i>
             <span class="grey">已认证的官方账号</span>
           </div>
         </div>
         <div class="flex">
           <p class="fmiddle i-reply">现代娱乐可被看作是一种通过表现喜怒哀乐或自己和他人的技巧而使与受者喜悦、放松，并带有一定启发性的活动。很显然，这种定义是广泛的，它包含了悲喜剧、各种比赛和游戏、音乐</p>
         </div>
         <div class="flexa grey fsmall">
           <span>557赞同</span>
           <i class="iconfont2 fsmall">&#xe862;</i>
           <span>53感谢</span>
           <i class="iconfont2 fsmall">&#xe862;</i>
           <span>1评论</span>
           <i class="iconfont2 fsmall">&#xe862;</i>
           <span>2小时前</span>
         </div>
      </div>
    </div>

    <div class="reply">
      <div class="w92">
        <div class="i-user flexa">
           <div class="i-u-img">
             <img src="@/assets/images/lj.png" alt="">
           </div>
           <p class="fmiddle i-u-name">小米手机</p>
           <div class="i-rz fsmall">
             <i class="iconfont2 blue fmiddle">&#xe870;</i>
             <span class="grey">已认证的官方账号</span>
           </div>
         </div>
         <div class="flexs i-imgs">
           <div class="w33">
             <img src="@/assets/images/lj.png" alt="">
           </div>
           <div class="w33">
             <img src="@/assets/images/lj.png" alt="">
           </div>
           <div class="w33 relative">
             <div class="i-img-more absolute flex">
               <i class="iconfont2">&#xeb55;</i>4
             </div>
             <img src="@/assets/images/lj.png" alt="">
           </div>
         </div>
         <div class="flex">
           <p class="fmiddle i-reply">现代娱乐可被看作是一种通过表现喜怒哀乐或自己和他人的技巧而使与受者喜悦、放松，并带有一定启发性的活动。很显然，这种定义是广泛的，它包含了悲喜剧、各种比赛和游戏、音乐</p>
         </div>
         <div class="flexa grey fsmall">
           <span>557赞同</span>
           <i class="iconfont2 fsmall">&#xe862;</i>
           <span>53感谢</span>
           <i class="iconfont2 fsmall">&#xe862;</i>
           <span>1评论</span>
           <i class="iconfont2 fsmall">&#xe862;</i>
           <span>2小时前</span>
         </div>
      </div>
    </div>


    <!-- 动态发布 -->
    <router-link to='/focus/answer'>
        <div class="publishBtn flex themeBg"><i class="iconfont icontianjia"></i></div>
    </router-link>


  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      swIssue:false,
    };
  },
  methods: {
    tapIssue(){
      this.swIssue = !this.swIssue
    }
  },

  components: {},
  compute:{
	  ...mapState([])
  },

  mounted() {},

};
</script>
<style  scoped>
  .publishBtn{
    position: fixed;
    bottom: 18%;
    right: 8%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #FFFFFF;
  }

  .i-img-more{
    width: 100%;
    height: 100%;
    font-size: 22px;
    font-weight: bold;
    background: rgba(0,0,0,.5);
    color: #FFFFFF;
  }
  .w33{
    width: 33%;
  }
  .w33 img{
    width: 100%;
    height:80px;
    border-radius: 2px;
    overflow: hidden;
    object-fit: cover;
  }
  .i-reply{
    line-height: 1.8;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 75px;
  }
  .i-u-name{
    margin-right: 9px;
    color: #666666;
  }
  .i-u-img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 3px;
  }
  .i-u-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .i-n{
    background: #F1F1F1;
    color: #989898;
  }

  .l-n{
    min-width: 80px;
    color:#333333;
    font-weight: 500;
  }

  h2{
    min-height: 90px;
  }
  .i-img{
    height: 90px;
    overflow: hidden;
  }
  .i-img img{
    width: 50%;
    height: 100%;
    object-fit: cover;
  }
  .i-desc{
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px 0;
  }
  .i-desc-none{

    max-height: 53px;
  }
  .i-desc-active{
    max-height: auto;
  }
  .i-desc-a{
    right: 0;
    bottom: 0;
    padding: 0 3px 0 8px;
    line-height: 1.5;
    background: #FFFFFF;
  }
 .i-desc-active i{
   transform: rotate(180deg);
 }
 .issue{
    background: #FFFFFF;
   padding: 16px 0;
 }
 .reply{
   background: #FFFFFF;
   padding: 16px 0;
   margin-bottom: 10px;
 }
 .bg{
 }
</style>
