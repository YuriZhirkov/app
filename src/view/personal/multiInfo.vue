<template>
  <div class="">
    <topComponent title='' :showLeft='true'>
      <div class="flex w100 t-wrap" slot="left">

        <div @click="i = 1" slot="left" class="t-title flexa bold fbig" :class="{at:i==1}">基本信息</div>
        <div @click="i=2" slot="right" class="t-title flexa bold fbig" :class="{at:i==2}">择偶标准</div>
      </div>
    </topComponent>

    <div v-if="i == 1 ">
      <editInfo></editInfo>
    </div>
    <div  v-if="i == 2 ">
      <mateSelect></mateSelect>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import editInfo from '@/components/page/editInfo.vue'
import mateSelect from '@/components/page/mateSelection.vue'
export default {
  name: "",
  data() {
    return {
      i:1
    };
  },
  methods: {},

  components: {
    editInfo,mateSelect
  },
  computed:{
	  ...mapState(['userId'])
  },

  mounted() {

    console.log(this.$route);
      this.i =  this.$route.query.i
  }

};
</script>
<style  scoped>
  .t-wrap{
    position: absolute;
    right: 0;
    width: 65%;
  }
  .t-title{
    width: 50%;
    color: rgba(255, 255, 255, 0.35);
  }
  .at{
    color: #FFFFFF;
  }
</style>
