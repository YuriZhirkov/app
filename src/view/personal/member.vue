<template>
  <div class="member">
    <topComponent title='会员' :showLeft='true'>
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
    </topComponent>
    <div class="priceWrap">
        <h1>会员价格</h1>
        <ul>
            <li>
                <span>一星期</span>
                <span>体验价7元</span>
            </li>
            <li>
                <span>包月</span>
                <span>30元</span>
            </li>
            <li>
                <span>包季</span>
                <span>80元</span>
            </li>
            <li>
                <span>包年</span>
                <span>250元</span>
            </li>
        </ul>
    </div>
    <div class="rightsWrap">
        <h1>会员价格</h1>
        <ul>
            <li>
                <b class="iconfont iconyuanxingxuanzhong"></b>
                <span>开启互动</span>
            </li>
            <li>
                <b class="iconfont iconyuanxingxuanzhong"></b>
                <span>看点浏览</span>
            </li>
            <li>
                <b class="iconfont iconyuanxingxuanzhong"></b>
                <span>参与活动</span>
            </li>
            <li>
                <b class="iconfont iconyuanxingxuanzhong"></b>
                <span>高级搜索</span>
            </li>
            <li>
                <b class="iconfont iconyuanxingxuanzhong"></b>
                <span>红娘专属服务</span>
            </li>
            <li>
                <b class="iconfont iconyuanxingxuanzhong"></b>
                <span>专属标记</span>
            </li>
            <li>
                <b class="iconfont iconyuanxingxuanzhong"></b>
                <span>好友不限</span>
            </li>
            <li>
                <b class="iconfont iconyuanxingxuanzhong"></b>
                <span>查看附近的人</span>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "member",
  props: {},
  components: {},
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>
<style lang="less" scoped>
.member {
  .priceWrap {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    h1 {
      margin-bottom: 0.2rem;
      font-weight: bold;
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        height: 0.9rem;
        line-height: 0.9rem;
        border-bottom: 1px solid #dfdfdf;
        span:first-child {
          color: #666;
        }
      }
    }
  }
  .rightsWrap {
    background: #fff;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    h1 {
      margin-bottom: 0.2rem;
      font-weight: bold;
    }
    ul {
      display: flex;
      flex-flow: wrap;
      li {
        display: flex;
        flex-flow: column;
        text-align: center;
        width: 33.3%;
        margin: 0.2rem 0;
        b{
            font-size: 0.6rem;
        }
      }
    }
  }
}
</style>
