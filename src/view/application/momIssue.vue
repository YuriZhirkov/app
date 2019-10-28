<template>
    <div class="container">
        <topComponent title='红娘发布' :showLeft="true">
          <!-- <span slot="left" class="leftSolt">2452</span> -->
          <!-- <span slot="right" class="rightSolt">1354</span> -->
        </topComponent>
        <!-- <img src="@/assets/images/lj.png" alt=""> -->
        <ul>
            <li v-for="(item,index) in 6">
                <div class="aboveBlock">
                    <dl>
                        <dt><img src="@/assets/images/lj.png" alt=""></dt>
                        <dd>
                            <p>
                                <span class="name">胡歌</span>
                                <span>编号：666888</span>
                            </p>
                            <div class="signature">为了您的幸福，我正在努力成为更好的红娘,我正在努力成为更好的红娘</div>
                        </dd>
                    </dl>
                    <b class="iconfont iconenter"></b>
                </div>
                <div class="belowBlock">
                    <p><span>专属服务：</span><span>棒棒的</span></p>
                    <p><span>电话：</span><span>18868689999</span></p>
                    <p><span>微信：</span><span>18868689999</span></p>
                    <div class="personResume">
                        <p>
                            <span>个人简介：</span>
                            <span>专业从事红年工作6年，擅长帮助青年男女更好的寻找合适自己的另一半，专业从事红年工作6年，擅长帮助青年男女更好的寻找合适自己的另一半</span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
// import { testServer } from "@/servers/plaza";
export default {
  name: "momIssue",
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
    goActivities() {
      this.$router.push("/plaza/activities");
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  background: #fff;
  ul {
    padding: 0.3rem;
    display: flex;
    flex-flow: column;
    li {
      display: flex;
      margin-bottom: 0.6rem;
      display: flex;
      flex-flow: column;
      .aboveBlock {
        display: flex;
        align-items: center;
        margin-bottom: 0.2rem;
        dl {
          display: flex;
          dt {
            margin-right: 0.2rem;
            img {
              width: 1.4rem;
              height: 1.4rem;
              border-radius: 1.4rem;
            }
          }
          dd {
            p {
              margin-bottom: 0.1rem;
              .name {
                font-size: 0.36rem;
                font-weight: bold;
                margin-right: 0.2rem;
              }
            }
            .signature {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
      .belowBlock {
        & > p {
          margin-bottom: 0.1rem;
          span:first-child {
            color: #666;
          }
        }
        .personResume {
          p {
            display: flex;
            text-align: justify;
            span:last-child {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>

