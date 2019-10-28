<template>
    <div class="container">
        <topComponent title='三观测试' :showLeft="true">
          <!-- <span slot="left" class="leftSolt">2452</span> -->
          <!-- <span slot="right" class="rightSolt">1354</span> -->
        </topComponent>
        <div class="allBox">
            <h1>
                <span>1、</span>
                <span>你认为爱情最重要的是什么？</span>
            </h1>
            <ul>
                <li>
                    <input type="checkbox" id="q1" value="性格" v-model="checkOption[0]">
                    <label for="q1">
                        <b v-if="!checkOption[0]" class="iconfont iconyuanxingweixuanzhong"></b>
                        <b v-else class="iconfont iconselected-copy"></b>
                        A、性格
                    </label>
                </li>
                <li>
                    <input type="checkbox" id="q2" value="三观" v-model="checkOption[1]">
                    <label for="q2">
                        <b v-if="!checkOption[1]" class="iconfont iconyuanxingweixuanzhong"></b>
                        <b v-else class="iconfont iconselected-copy"></b>
                        B、三观
                    </label>
                </li>
                <li>
                    <input type="checkbox" id="q3" value="外貌" v-model="checkOption[2]">
                    <label for="q3">
                        <b v-if="!checkOption[2]" class="iconfont iconyuanxingweixuanzhong"></b>
                        <b v-else class="iconfont iconselected-copy"></b>
                        C、外貌
                    </label>
                </li>
                <li>
                    <input type="checkbox" id="q4" value="物质基础" v-model="checkOption[3]">
                    <label for="q4">
                        <b v-if="!checkOption[3]" class="iconfont iconyuanxingweixuanzhong"></b>
                        <b v-else class="iconfont iconselected-copy"></b>
                        D、物质基础
                    </label>
                </li>
            </ul>
        </div>
        <footer>
            <div>
                <b class="iconfont iconreturn"></b>
                <span>上一题</span>
            </div>
            <div>2/10</div>
        </footer>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
// import { testServer } from "@/servers/plaza";
export default {
  name: "ideaTest",
  props: {},
  components: {},
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      checkOption: ["", "", "", ""]
    };
  },
  mounted() {},
  watch: {
    checkOption: function() {
      console.log(this.checkOption);
    }
  },
  methods: {
    goActivities() {
      this.$router.push("/plaza/activities");
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  .allBox {
    padding: 0.3rem;
    background: #fff;
    ul {
      margin-top: 0.3rem;
      li {
        height: 0.8rem;
        line-height: 0.8rem;
        input {
          display: none;
        }
        label {
          display: flex;
          align-items: center;
          b {
            margin-right: 0.2rem;
            color: #ad6cef;
          }
        }
      }
    }
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0 0.3rem;
    div {
      display: flex;
      align-items: center;
    }
  }
}
</style>

