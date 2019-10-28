<template>
    <div class="container">
        <topComponent title='应用' :showLeft="false">
          <span slot="left" class="leftSolt">
                <router-link to='/personal/personalCenter'>
                    <b class="iconfont iconwode"></b>
                </router-link>
          </span>
          <span slot="right" class="rightSolt">
                <router-link to='#'>
                    <b class="iconfont iconsousuo"></b>
                </router-link>
          </span>
        </topComponent>
        <ul>
          <li>
              <router-link to="/focus/qanda">
                  <div class="leftB">
                      <b class="iconfont iconyuanxingxuanzhong"></b>
                      <span>问答</span>
                  </div>
                  <div class="rightB">
                      <!-- <span>详细信息</span> -->
                      <b class="iconfont iconenter"></b>
                  </div>
              </router-link>
          </li>
            <li>
                <router-link to="/application/momIssue">
                    <div class="leftB">
                        <b class="iconfont iconyuanxingxuanzhong"></b>
                        <span>红娘发布</span>
                    </div>
                    <div class="rightB">
                        <!-- <span>详细信息</span> -->
                        <b class="iconfont iconenter"></b>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/application/ideaTest">
                    <div class="leftB">
                        <b class="iconfont iconyuanxingxuanzhong"></b>
                        <span>三观测试</span>
                    </div>
                    <div class="rightB">
                        <!-- <span>详细信息</span> -->
                        <b class="iconfont iconenter"></b>
                    </div>
                </router-link>
            </li>
            <li>
                <!-- <router-link to="/application/funnyGames"> -->
                <router-link to="" @click.native="noDev">
                    <div class="leftB">
                        <b class="iconfont iconyuanxingxuanzhong"></b>
                        <span>趣味游戏</span>
                    </div>
                    <div class="rightB">
                        <!-- <span>详细信息</span> -->
                        <b class="iconfont iconenter"></b>
                    </div>
                </router-link>
            </li>
            <li>
                <!-- <router-link to="/application/nearbyPeople"> -->
                <router-link to="" @click.native="noDev">
                    <div class="leftB">
                        <b class="iconfont iconyuanxingxuanzhong"></b>
                        <span>附近的人</span>
                    </div>
                    <div class="rightB">
                        <!-- <span>详细信息</span> -->
                        <b class="iconfont iconenter"></b>
                    </div>
                </router-link>
            </li>
            <li>
                <!-- <router-link to="/application/anonymity"> -->
                <router-link to="" @click.native="noDev">
                    <div class="leftB">
                        <b class="iconfont iconyuanxingxuanzhong"></b>
                        <span>匿名专送</span>
                    </div>
                    <div class="rightB">
                        <!-- <span>详细信息</span> -->
                        <b class="iconfont iconenter"></b>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/application/lovePlan">
                    <div class="leftB">
                        <b class="iconfont iconyuanxingxuanzhong"></b>
                        <span>恋爱方案</span>
                    </div>
                    <div class="rightB">
                        <!-- <span>详细信息</span> -->
                        <b class="iconfont iconenter"></b>
                    </div>
                </router-link>
            </li>
            <li>
                <!-- <router-link to="/application/sponsor" @click.native="noDev"> -->
                <router-link to="" @click.native="noDev">
                    <div class="leftB">
                        <b class="iconfont iconyuanxingxuanzhong"></b>
                        <span>赞助展示</span>
                    </div>
                    <div class="rightB">
                        <!-- <span>详细信息</span> -->
                        <b class="iconfont iconenter"></b>
                    </div>
                </router-link>
            </li>
        </ul>
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
  methods: {
    noDev() {
      this.$dialog.toast({
        mes: "暂未开放，敬请期待...",
        timeout: 1000
      });
      //   console.log("暂未开放，敬请期待...");
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  .leftSolt {
  }
  ul {
    background: #fff;
    li {
      margin-left: 0.4rem;
      border-bottom: 1px solid #dfdfdf;
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.9rem;
        line-height: 0.9rem;
        div {
          display: flex;
          align-items: center;
        }
        .leftB {
          b {
            margin-right: 0.2rem;
          }
        }
        .rightB {
          padding-right: 0.3rem;
          span {
            color: #888;
          }
          b {
            margin-left: 0.2rem;
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>


