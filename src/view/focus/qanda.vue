<template>
    <div class="container">
       <topComponent title='' :showLeft="true" title="问答">
           <!-- <div slot="left" class="leftSolt"  v-show="!swSearch1">
                <router-link to='/personal/personalCenter'>
                    <i class="iconfont iconwode"></i>
                </router-link>
                <router-link to='/focus/matching'>
                    <span   :class="$route.path=='/focus/matching'?'active':''">匹配</span>
                </router-link>
            </div> -->
           <div slot="right" class="rightSolt"  v-show="!swSearch1">
              <!--  <router-link to='/focus/qanda'>
                    <span :class="$route.path=='/focus/qanda'?'active':''">问答</span>
                </router-link> -->
                <i class="iconfont iconsousuo" @click="tapSearch"></i>
            </div>
            <div slot='right' class="_search absolute flexs" :class="{'_search-active':swSearch1}">
              <div class="search flex">
                <i class="iconfont flex iconsousuo"></i>
                <yd-input class="fmiddle" max="20" placeholder="搜索问答" :show-error-icon="false" :show-success-icon="false"></yd-input>
              </div>
              <div class="s-exit fsmall flex relative" @click="tapCancelSearch">取消</div>
            </div>
        </topComponent>

        <!-- <div>问答</div>
        <div @click="goDynamic">返回匹配页</div> -->
<!--
        <div class="item">
          <div class="w95">
            <router-link to="/focus/showAnswers">
              <h3 class="bold">有没有让人相见恨晚的我单位的我单位的我  问答的我的?</h3>
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
               <div class="fmiddle">融指货币的发行、流通和回笼，贷款的发放和收回，存款的存入和提取，汇兑的往来等经济活动。金融（FINANCE或FINAUNCE）就是对现有资源进行重新整合之后，实现价值和利润的等效流通。
               </div>
               <div class="i-zan flexs grey fmiddle">
                 <div>
                   <span>557赞同</span>
                   <i class="iconfont2 fsmall">&#xe862;</i>
                   <span>1评论</span>
                 </div>
                 <div><i class="iconfont2">&#xe60c;</i></div>
               </div>
             </router-link>
          </div>
        </div>

        <div class="item">
          <div class="w95">
            <h3 class="bold">有没有让人相见恨晚的我单位的我单位的我  问答的我的?</h3>
             <div class="fmiddle">融指货币的发行、流通和回笼，贷款的发放和收回，存款的存入和提取，汇兑的往来等经济活动。金融（FINANCE或FINAUNCE）就是对现有资源进行重新整合之后，实现价值和利润的等效流通。
             </div>
             <div class="i-zan flexs grey fmiddle">
               <div>
                 <span>aiwddwd的广告</span>
                 <i class="iconfont2 fsmall">&#xe862;</i>
                 <span>appstoree下载</span>
               </div>
               <div><i class="iconfont2">&#xe656;</i></div>
             </div>
          </div>
        </div>


        <div class="item">
          <div class="w95">
            <h3 class="bold">你对自己的长相满意嘛?</h3>
             <div class="flexs w100 c-con">
               <div class="c-body">
                 <div class="i-user flexa">
                   <div class="i-u-img">
                     <img src="@/assets/images/lj.png" alt="">
                   </div>
                   <p class="fmiddle i-u-name">小米手机</p>
                   <div class="i-rz fsmall">
                     <span class="grey">优质创作者 摄影爱好者</span>
                   </div>
                 </div>
                 <div class="fmiddle c-c-con">
                   <p>融指货币的发行、流通和回笼，贷款的发放和收回，存款的存入和提取，汇兑的往来等经济活动。金融（FINANCE或FINAUNCE）就是对现有资源进行重新整合之后，实现价值和利润的等效流通。</p>
                 </div>
               </div>
               <div class="c-img flex">
                 <img src="@/assets/images/lj.png" alt="">
               </div>
             </div>
             <div class="i-zan flexs grey fmiddle">
               <div>
                 <span>557赞同</span>
                 <i class="iconfont2 fsmall">&#xe862;</i>
                 <span>1评论</span>
               </div>
               <div><i class="iconfont2">&#xe60c;</i></div>
             </div>
          </div>
        </div> -->

<!-- 动态发布 -->
<!--        <router-link to='/focus/pose'>
            <div class="publishBtn flex themeBg"><i class="iconfont icontianjia"></i></div>
        </router-link> -->
        <!-- <footComponent></footComponent> -->
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "qanda",
  props: {},
  components: {},
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      swSearch1 : false,
      list:[]
    };
  },
  watch: {},
  methods: {
    tapSearch(){
      this.swSearch1 = true
    },
    tapCancelSearch(){
      this.swSearch1 = false
    },
    getQanda(){
      const self = this
      this.post('question/ask/list',{offset:1,count:20},function(e){
        if(!e)return
        if(e.errCode != 200 ){
          self.$dialog.toast({mes:e.errMsg,icon:error})
          return
        }
        console.log(e);
      })
    }
    // goDynamic() {
    //   this.$router.push("/focus/matching");
    // }
  },
  mounted() {
    this.getQanda()
    this.$dialog.toast({mes:'暂未开放'})
  },
};
</script>
<style lang="less" scoped>
  .publishBtn{
    position: fixed;
    bottom: 18%;
    right: 8%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #FFFFFF;
  }
  .c-c-con{
    max-height: 76px;
    overflow: hidden;
    }
  .c-con{
  }
  .c-body{
    width: 65%;
  }
  .c-img{
    width: 35%;
  }
  .c-img img{
    width: 90%;
    border-radius: 6px;
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
  .item{
    background: #FFFFFF;
    padding: 8px 0;
    margin-bottom: 9px;
  }
  ._search{
      width: 98%;
      opacity: 0;
      transform: translateX(100%);
      transition: all .25s;
    }
    ._search-active{
      opacity: 1;
      transform: translateX(0);
    }
  .search{
    width: 90%;
    height: 35px;
    right: 1%;
    background: #FFFFFF;
    z-index: 2;
    border-radius: 20px;
  }
  .search i{
    color: #888888;
    width: 50px;
  }
  .search /deep/ input{
    width: 90%;
    margin-left:3%;
  }
  ._search .s-exit{
    width: 10%;
  }
.container {
  .leftSolt {
    width: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: #fff;
      span {
        color: #ddd;
        font-size: 15px;
      }
      .active {
        color: #fff;
        font-weight: bolder;
      }
    }
  }
  .rightSolt {
    width: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: #fff;
      span {
        color: #ddd;
      }
      .active {
        color: #fff;
        font-weight: bolder;
      }
    }
  }
}
@background: linear-gradient(to right, #ad6cef, #846ff0);
/* 标准的语法（必须放在最后） */
.top {
  position: fixed;
  top: 0;
  width: 100%;
  background: @background;
  color: #fff;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.36rem;
  z-index: 666;
  .back {
    position: absolute;
    left: 0.2rem;
    span{
      font-size: .3rem;
    }
    // top: 0;
    i {
      float: left;
    }
  }
  .leftSolt {
    position: absolute;
    left: 0.2rem;
    // top: 0;
  }
  .rightSolt {
    position: absolute;
    right: 0.2rem;
    // top: 0;
  }
  h1 {
    text-align: center;
    font-size: .3rem;
  }
}

</style>
