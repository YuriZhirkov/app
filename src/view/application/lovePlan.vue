<template>
    <div class="container">
        <topComponent title='恋爱方案' :showLeft="true">
          <!-- <span slot="left" class="leftSolt">2452</span> -->
          <!-- <span slot="right" class="rightSolt">1354</span> -->
        </topComponent>
        <ul>
            <li v-for="(item,index) in 5" :key="index">
                <div class="contentBox">
                    <h1>发展感情的大招发展感情的大招发展感情的大招</h1>
                    <p>首页 HTML CSS JAVASCRIPT JQUERY BOOTSTRAP SQL MYSQL PHP PYTHON2 PYTHON3 C C++ C# JAVA 本地书签</p>
                </div>
                <img src="@/assets/images/lj.png" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
// import { testServer } from "@/servers/plaza";
export default {
  name: "lovePlan",
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
    li {
      display: flex;
      padding: 0.3rem;
      border-bottom: 1px solid #eee;
      .contentBox {
        flex: 1;
        h1 {
          font-weight: bold;
          margin-bottom: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 5rem;
        }
        p {
          text-align: justify;
        }
      }
      img {
        width: 1.6rem;
        height: 1.6rem;
        margin-left: 0.2rem;
      }
    }
  }
}
</style>

