<template>
  
    <div class="container">
        <topComponent title='附近的人' :showLeft="true">
          <!-- <span slot="left" class="leftSolt">2452</span> -->
          <!-- <span slot="right" class="rightSolt">1354</span> -->
        </topComponent>
            <yd-tab v-model="tab1">
              <yd-tab-panel label="地图模式">
              
                 <div id="mapContainer"></div>
              </yd-tab-panel>
              <yd-tab-panel label="列表模式">
                 暂无数据
              </yd-tab-panel>
            </yd-tab>
        <footComponent></footComponent>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
// import { async } from 'q';
// import { testServer } from "@/servers/plaza";

export default {
  name: "nearbyPeople",
  props: {},
  components: {},
  computed: {
    ...mapState(["userId"])
  },
  data() {
    return {
      tab1: 0,
    };
  },
  mounted() {
    this.loaderMap();
  },
  watch: {},
  methods: {
    loaderMap(){
       const self = this;
        var map = new AMap.Map('mapContainer', {
            center:[114.01809,22.641872],
            zoom:13,
            zIndex:0,
            viewMode:'3D',
            opacity:1,
            visible:true
        });
        // var icon = new AMap.Icon({
        //     size: new AMap.Size(752, 566),    // 图标尺寸
        //     image: 'http://ygtqzhang.cn/ygtq/20190909235746/f0c0e6a36ac14e309f8160ed8d6085d8.jpg',  // Icon的图像
        //     imageOffset: new AMap.Pixel(0, -10),  // 图像相对展示区域的偏移量，适于雪碧图等
        //     imageSize: new AMap.Size(150, 112)   // 根据所设置的大小拉伸或压缩图片
        // });
        let imgUrl = "http://ygtqzhang.cn/ygtq/20190914134500/6c2afbdb5c2c48ab99ea9f0590a10e98.jpg";
        let htmlStr = `<img  style="border-radius:1000px;width:60px;height:60px" src=`+imgUrl+" />";
        var marker = new AMap.Marker({
            position: new AMap.LngLat(114.01809,22.688985),
            offset: new AMap.Pixel(-10, -10),
            // icon: icon, // 添加 Icon 实例
            content:htmlStr,
            title: '深圳',
            zoom: 13,
            extData:'11212112',
            bubble: true
        });

        //这个绑定函数要设置在marker.setMap(map); 之前
        marker.on('click', function(){
           //这个要跳到用户的详情页面
           self.$router.push({
                    path: "/personal/anotherPage",
                    query: { uid: self.userId }
           });
        });
        
        marker.setMap(map);
        //marker.on('click', this.getUserIds); 这个无效
        
    },
  
  }
};
</script>
<style lang="less" scoped>
.container {
  overflow: hidden;
  min-height: 100%;
  display: flex;
  flex-flow: column;
  /deep/.yd-tab{
    flex: 1;
    display: flex;
    flex-flow: column;
    .yd-tab-panel{
      flex: 1;
      display: flex;
      flex-flow: column;
    }
    .yd-tab-panel-item{
      flex: 1;
    }
  }
}

#mapContainer {
  width: 100%; 
  height: 13.4rem;
} 
</style>

