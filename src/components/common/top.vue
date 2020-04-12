<template>
    <div class="top flex"  :style="{background:bg?bg:'',color:color?color:''}" >
        <div class="back flex" @click="goBack" v-if="isShow" :style="{background:bg?bg:'',color:color?color:''}">
            <i class="iconfont iconreturn"></i>
            <span>{{backTit}}</span>
        </div>
        <slot name="left" class="left" @click.prvent></slot>
        <h1>{{title}}</h1>
        <slot name="right" @click.prvent></slot>
    </div>
</template>
<script>
export default {
  props: ["title", "back", "showLeft",'bg','color'],
  data() {
    return {
      backTit: "返回",
      isShow: true
    };
  },
  mounted() {
    this.propsVal();
  },
  methods: {
    // 控制top的显示
    propsVal() {
      if (this.$props.back) {
        this.backTit = this.back;
      }
      if (!this.showLeft) {
        this.isShow = this.showLeft;
      }
    },
    goBack() {
      this.$router.back();
      this.$emit("goBack");
    }
  }
};
</script>
<style lang="less" scoped>
@background: -webkit-linear-gradient(left, #ad6cef, #846ff0);
/* Safari 5.1 - 6.0 */
@background: -o-linear-gradient(right, #ad6cef, #846ff0);
/* Opera 11.1 - 12.0 */
@background: -moz-linear-gradient(right, #ad6cef, #846ff0);
/* Firefox 3.6 - 15 */
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
  z-index: 6666;
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
