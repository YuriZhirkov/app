<template>
    <div class="container">
        <topComponent title='匿名发送' :showLeft="true">
          <!-- <span slot="left" class="leftSolt">2452</span> -->
          <!-- <span slot="right" class="rightSolt">1354</span> -->
        </topComponent>
        <div>匿名发送</div>
        <footComponent></footComponent>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
// import { testServer } from "@/servers/plaza";
export default {
  name: "anonymitySend",
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
  overflow: hidden;
  min-height: 100%;
}
</style>

