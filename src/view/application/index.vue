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
                <router-link to="/application/nearbyPeople" >
                
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
            <li>
                <router-link to="/application/availableTime">
                    <div class="leftB">
                        <b class="iconfont iconyuanxingxuanzhong"></b>
                        <span>十点有空</span>
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
import axios from "axios";
import wx from 'weixin-js-sdk';
export default {
  name: "index",
  props: {},
  components: {},
  computed: {
    ...mapState(["userId"])
  },
  data() {
    return {
      longitude:0.0,
      latitude:0.0
    };
  },
  mounted() {
    this.getLongitudeAndLatitude();
  },
  watch: {},
  methods: {
    noDev() {
      this.$dialog.toast({
        mes: "暂未开放，敬请期待...",
        timeout: 1000
      });
      //   console.log("暂未开放，敬请期待...");
    },
    // 获取经纬度的数据传到后台
    saveLongitudeAndLatitude: async function(userId,longitude,latitude){
      //将经纬度数据传入后台
      return await axios.post(this.host+'user/baseInfo/saveLongitudeAndLatitude',{userId:userId,latitude:latitude,longitude:longitude});

    },
    getSignatureGeneral: async function(url){
      //将经纬度数据传入后台
      return await axios.post(this.host+'weiXinShare/getSignatureGeneral',{url:url});

    },

    // 获取经纬度的数据传到后台async
    async getLongitudeAndLatitude(){
  
      console.log("this.userId=",this.userId);
      const self = this;
      let urlEncode = window.location.href;
      let e = await self.getSignatureGeneral(urlEncode);
      let data = e.data;
      console.log("e=",data);
      if(data.errCode != 200){
        self.$dialog.toast({mes:data.errMsg,icon:'error'})
        return
      }
      let dataret = e.data.data;
      console.log("dataret=");
      console.log(dataret);
      let signature = dataret.signature;
      let nonceStr = dataret.nonceStr;
      let timestamp = dataret.timestamp;
      if(signature == null || signature ==''){
          self.$dialog.toast({mes:"定位失败",icon:'error'})
          return
      }
      // wx.config({
      //       debug: false,
      //       appId: 'wxebd08b5782d5a00d', // 和获取Ticke的必须一样------必填，公众号的唯一标识
      //       timestamp:timestamp, // 必填，生成签名的时间戳
      //       nonceStr: nonceStr, // 必填，生成签名的随机串
      //       signature: signature,// 必填，签名，见附录1
      //       //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
      //       jsApiList: [
      //           'openLocation','getLocation'
      //       ]
      // });
      // wx.ready(function(){
      //     // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
      //     //则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      //     //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
      //     let latitude;
      //     let longitude;
      //     let speed;
      //     let accuracy;
      //     debugger;
      //     console.log("获取经纬度");
      //     wx.getLocation({
      //           type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //           success: function (res) {
      //             let msg = JSON.stringify(res);
      //             console.log("msg="+msg);
      //             latitude = Number(res.latitude); // 纬度，浮点数，范围为90 ~ -90
      //             longitude = Number(res.longitude); // 经度，浮点数，范围为180 ~ -180。
      //             speed = Number(res.speed); // 速度，以米/每秒计
      //             accuracy = Number(res.accuracy); // 位置精度
      //             self.$dialog.toast({mes:'获取经纬度成功'+latitude,icon:'success'})
      //             self.longitude = longitude;
      //             self.latitude = latitude;
                  
      //           }
      //     });
          
      // });
      // wx.error(function(res){
      //     // config信息验证失败会执行error函数，
      //     //如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      //     self.$dialog.toast({mes:'微信验证失败',icon:'error'})
      // });   
      

          
      //调用存储地址经纬度的数据
      await  self.saveLongitudeAndLatitude("1208651071254228994","122.336","22.33");
      
    },
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


