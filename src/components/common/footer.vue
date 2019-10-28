<template>
  <div class="footerCls">
        <div style="width: 100%;height:1rem;"></div>
        <div class="itemBox flex">
            <div>
                <router-link v-if="$route.path=='/focus/matching'" to='/focus/matching' :default-active="$route.path" replace>
                     <i class="iconfont2">&#xe648;</i>
                    <p>匹配</p>
                </router-link>
                <router-link v-else="$route.path=='/plaza/dynamic'" to='/plaza/dynamic' :default-active="$route.path" replace>
                    <i class="iconfont2">&#xe648;</i>
                    <p>广场</p>
                </router-link>
            </div>
            <div>
              <router-link   to='/plaza/activities' :default-active="$route.path" replace>
                  <i class="iconfont2">&#xe611;</i>
                  <p>活动</p>
              </router-link>
            <!--    <router-link v-if="$route.path=='/focus/qanda'" to='/focus/qanda' :default-active="$route.path" replace>
                    <i class="iconfont2">&#xe611;</i>
                    <p>看点</p>
                </router-link> -->
        <!--        <router-link v-else="$route.path=='/focus/matching'" to='/focus/matching' :default-active="$route.path" replace>
                    <i class="iconfont2">&#xe611;</i>
                    <p>看点</p>
                </router-link> -->
            </div>
            <div>
                <router-link to='/message' :default-active="$route.path" replace>
                    <i class="iconfont2">&#xe610;</i>
                    <p>消息</p>
                </router-link>
            </div>
            <div>
                <router-link to='/application' :default-active="$route.path" replace>
                    <i class="iconfont2">&#xe635;</i>
                    <p>应用</p>
                </router-link>
            </div>

        </div>
  </div>
</template>
<script>
export default {
  name: "footerCls",
  props: {},
  components: {},
  computed: {},
  data() {
    return {};
  },
  mounted() {
  },
  watch: {},
  methods: {}
};
</script>
<style lang="less" scoped>
.footerCls {
  .itemBox {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;

    height: .9rem;
    line-height: .9rem;
    box-sizing: border-box;
    div {
      line-height: 1;
      margin-top: .3rem;
      text-align: center;
      a {
        color: #999999;
        line-height: .6;
        text-align: center;
        b {
          font-size: 0.5rem;
        }
        i{
          font-size: 25px;
          line-height: 0;
        }
        p{
          font-size: 10px;
          line-height: 1;
        }
      }
      .router-link-active {
        color: #ad6cef;
      }
    }
  }
}
</style>
