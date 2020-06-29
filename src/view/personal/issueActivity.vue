<template>
  <div class="">
     <topComponent title='发布活动' :showLeft='true'>
       <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
     </topComponent>

     <div class="item flex">
        <div class="relative">
          <!-- <div class="bg absolute">
            <img :src="bg" alt="">
          </div> -->
          <div class="relative h100 relative">
            <div class="flex bg-icon w100">
              <input class="absolute" type="file" @change="imgChange($event)" multiple="multiple" accept="image/*">
              <i class="iconfont2 relative">&#xeb55;</i>
              <span class="fsmall w100 flex">活动封面</span>
            </div>
            <div class="flexa i-img-wrap">
              <div class="i-img"  v-for="(d,i) in imgs" :key="i">
                <img  :src="d" alt="">
              </div>
            </div>
          </div>
        </div>
     </div>

     <div class="item flexs">
       <div class="i-name flexs fmiddle">活动标题</div>
       <div class="i-input flex fmiddle">
         <yd-input class="fmiddle" v-model="info.activityTheme" max="30" placeholder="请输入活动标题" :show-error-icon="false" :show-success-icon="false"></yd-input>
       </div>
     </div>

     <div class="item flexs">
       <div class="i-name flexs fmiddle">活动简介</div>
       <div class="i-input flex fmiddle">
         <yd-input class="fmiddle" v-model="info.activityBriefIntroduction"  placeholder="简要介绍活动" :show-error-icon="false" :show-success-icon="false"></yd-input>
       </div>
     </div>

     <div class="item flexs">
       <div class="i-name flexs fmiddle">活动金额(元)</div>
       <div class="i-input flex fmiddle">

         <yd-input class="fmiddle"  v-model="info.activityCost" type="number" max="30" placeholder="请输入活动费用(可选)" :show-error-icon="false" :show-success-icon="false"></yd-input>
       </div>
     </div>
    <div class="item flexs">
       <div class="i-name flexs fmiddle">活动总人数</div>
       <div class="i-input flex fmiddle">
         <yd-input class="fmiddle" v-model="info.activityJoinPerson"  placeholder="参加活动的总人数" :show-error-icon="false" :show-success-icon="false"></yd-input>
       </div>
     </div>
<!--     <div class="item flexs">
       <div class="i-name flexs fmiddle">活动收款账户</div>
       <div class="i-input flex fmiddle">

         <yd-input class="fmiddle"   placeholder="请输入活动收款人(可选)" :show-error-icon="false" :show-success-icon="false"></yd-input>
       </div>
     </div> -->

     <div class="item flexs">
       <div class="i-name flexs fmiddle">活动开始时间</div>
       <div class="i-input flex fmiddle">
          <yd-datetime type="datetime" v-model="info.activityStartTime"></yd-datetime>
       </div>
     </div>

     <div class="item flexs">
       <div class="i-name flexs fmiddle">活动结束时间</div>
       <div class="i-input flex fmiddle">
          <yd-datetime type="datetime" v-model="info.activityEndTime"></yd-datetime>
       </div>
     </div>
     <div class="item _item flexs">
       <div class="i-name flexs fmiddle">发布时地址</div>
       <div class="i-input flexs fmiddle" @click="addressShow1 = true">
         <yd-input disabled v-model="info.publishAddress" placeholder='发布地址选择'></yd-input>
          <yd-cityselect v-model="addressShow1" :callback="address1" :items="district1"></yd-cityselect>
       </div>
     </div>


     <div class="item _item flexs">
       <div class="i-name flexs fmiddle">活动时地址</div>
       <div class="i-input flexs fmiddle" @click="addressShow = true">
         <yd-input disabled v-model="info.activityAddress" placeholder='活动地址选择'></yd-input>
          <yd-cityselect v-model="addressShow" :callback="address" :items="district"></yd-cityselect>
       </div>
     </div>
     <div class="item _item flexs">
       <div class="i-name flexs fmiddle"></div>
       <div class="i-input flexs fmiddle">
         <yd-input class="fmiddle" v-model="info.site"   max="50" placeholder="详细地址" :show-error-icon="false" :show-success-icon="false"></yd-input>
       </div>
     </div>

     <div class="item _item flexs">
       <div class="i-name flexs fmiddle">活动详情</div>
     </div>
     <div class="item _item flexs">

       <div class="w100 edit flexs fmiddle">
         <editor class="relative w100" @change="editChange" :content="info.activityDetails"></editor>
       </div>
     </div>

     <div class="item flexs">
       <div class="i-name flexs fmiddle">活动提示</div>
       <div class="i-input flex fmiddle">

         <yd-input class="fmiddle" v-model="info.activityTips"   placeholder="请输入活动提示(可选)" :show-error-icon="false" :show-success-icon="false"></yd-input>
       </div>
     </div>
     <div class="item flexs">
       <div class="i-name flexs fmiddle">活动说明</div>
       <div class="i-input flex fmiddle">

         <yd-input class="fmiddle" v-model="info.activitySpecification	"   placeholder="请输入活动提示(可选)" :show-error-icon="false" :show-success-icon="false"></yd-input>
       </div>
     </div>

     <div class="item flexs">
       <div class="i-name flexs fmiddle">活动特色</div>
       <div class="i-input flex fmiddle">

         <yd-input class="fmiddle" v-model="info.activityFeature"    placeholder="请输入活动特色(可选)" :show-error-icon="false" :show-success-icon="false"></yd-input>
       </div>
     </div>




    <div class="flex bgf">
      <div class="flex btn themeBg bold fbig" @click="submit">
        发布
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import bg from '@/assets/images/bg.jpg';
import District from 'ydui-district/dist/jd_province_city_area_id';
import District1 from 'ydui-district/dist/jd_province_city_area_id';
import axios from 'axios'
import VueHtml5Editor from 'vue-html5-editor'

const options = {
   visibleModules: [
      "text",
      "color",
      "font",
      // "image",
      "hr",
      "eraser",
      "undo",
      ],
      // config image module
      image: {
          // 文件最大体积，单位字节  max file size
          sizeLimit:1024 * 1024 *10,
          // 上传参数,默认把图片转为base64而不上传
          upload: {
              url: 'https://www.ygtqzhang.cn/file/upload',
              headers: {},
              params: {},
              fieldName:'file'
          },
          // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
          compress: {
              width: 1000,
              height: 1000,
              quality: 80
          },
          // 响应数据处理,最终返回图片链接
          uploadHandler(responseText){
              var json = JSON.parse(responseText)
              if (json.errCode != 200) {
                  alert(json.errMsg)
              } else {
                  imgs.push(json.data)
                  console.log(imgs);
                  return json.data
              }
          }
      },
  language: "zh-cn",
  i18n: {
    "zh-cn": {
      "align": "对齐方式",
      "image": "图片",
      "list": "列表",
      "link": "链接",
      "unlink": "去除链接",
      "table": "表格",
      "font": "文字",
      "full screen": "全屏",
      "text": "排版",
      "eraser": "格式清除",
      "info": "关于",
      "color": "颜色",
      "please enter a url": "请输入地址",
      "create link": "创建链接",
      "bold": "加粗",
      "italic": "倾斜",
      "underline": "下划线",
      "strike through": "删除线",
      "subscript": "上标",
      "superscript": "下标",
      "heading": "标题",
      "font name": "字体",
      "font size": "文字大小",
      "left justify": "左对齐",
      "center justify": "居中",
      "right justify": "右对齐",
      "ordered list": "有序列表",
      "unordered list": "无序列表",
      "fore color": "前景色",
      "background color": "背景色",
      "row count": "行数",
      "column count": "列数",
      "save": "确定",
      "upload": "上传",
      "progress": "进度",
      "unknown": "未知",
      "please wait": "请稍等",
      "error": "错误",
      "abort": "中断",
      "reset": "重置"
    }
  }
}

const editor = new VueHtml5Editor(options)

export default {
  name: "",
  data() {
    return {
      info:{activityStartTime:this.dateFormat(),activityEndTime:this.dateFormat(),activityPictureUrls:[],activityJoinPerson:0},
      bg:bg,
      imgs:[],
      addressShow:false,
      addressShow1:false,
      district: District,
      district1: District1,
      content: '活动详情',



  }},
  methods: {
    submit(){
      const self = this
      if(!this.chooseData()) return
      console.log("(this.info.activityStartTime = ",this.info.activityStartTime+':00');
      console.log("(this.info.activityEndTime = ",this.info.activityEndTime+':00');
      const data = {
        userId:this.userId,
        // publishDate:new Date(),
        activityTheme:this.info.activityTheme,
        activityStartTime:this.info.activityStartTime+':00',
        activityEndTime:this.info.activityEndTime+':00',
        activityAddress:this.info.activityAddress+' '+(this.info.site ? this.info.site:''),
        publishAddress:this.info.publishAddress+' '+(this.info.site ? this.info.site:''),
        activityBriefIntroduction:this.info.activityBriefIntroduction,
        activityTips:this.info.activityTips,
        activityFeature:this.info.activityFeature,
        activityDetails:this.info.activityDetails,
        activityPictureUrls:this.info.activityPictureUrls,
        activityCost:this.info.activityCost,
        activitySpecification:this.info.activitySpecification,
        activityJoinPerson:this.info.activityJoinPerson
      }
      self.$dialog.loading.open('发布活动中..')
      this.post('activity/publish',data,function(e){
        self.$dialog.loading.close()
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.$dialog.toast({mes:e.errMsg,icon:'success'})
        self.$router.go(-1)
      })
    },
    chooseData(){
      if(!this.info.activityPictureUrls[0]){
        this.$dialog.toast({mes:'请上传活动封面图'})
        return
      }
      if(!this.info.activityTheme){
        this.$dialog.toast({mes:'请填写活动标题'})
        return
      }
      if(!this.info.activityBriefIntroduction){
        this.$dialog.toast({mes:'请填写活动简介'})
        return
      }
      if(!this.info.activityStartTime){
        this.$dialog.toast({mes:'请选择活动开始时间'})
        return
      }
      if(!this.info.activityEndTime){
        this.$dialog.toast({mes:'请选择活动结束时间'})
        return
      }
      if(!this.info.activityAddress){
        this.$dialog.toast({mes:'请选择活动地址'})
        return
      }
      if(!this.info.publishAddress){
        this.$dialog.toast({mes:'请选择活动发布地址'})
        return
      }
      if(!this.info.activityDetails){
        this.$dialog.toast({mes:'请填写活动详情'})
        return
      }
      // if(!this.info.activitySpecification){
      //   this.$dialog.toast({mes:'请填写活动说明'})
      //   return
      // }
      // if(!this.info.activityTips){
      //   this.$dialog.toast({mes:'请填写活动提示'})
      //   return
      // }
      return  true

    },
    editChange(e){
      console.log(e);
      this.info.activityDetails = e
    },
    tapSelectAddr(){
      this.addressShow = true
    },
    address(e){
     this.info.activityAddress = e.itemName1 +' '+ e.itemName2 +' '+  e.itemName3
    },
    tapSelectAddr1(){
      this.addressShow1 = true
    },
    address1(e){
     this.info.publishAddress = e.itemName1 +' '+ e.itemName2 +' '+  e.itemName3
    },
    imgChange(e){
      if(!e.target.files) return
      let files = e.target.files
      console.log(files);
      for (let i in files) {
        if(files.hasOwnProperty(i)){
          this.imgs.push(this.getObjectURL(files[i]))
        }
      }
      this.uploadImg(files)
    },
    uploadImg(files){
      const self = this

      const fd = new FormData()

      const len = files.length
      for (let i = 0; i< len;i++) {
        fd.append('files', files[i])
      }


      axios({
          method: 'post',
          url: this.host+'file/uploadBatch',
          data: fd
      })
      .then(function(e){
        if(e.data.errCode != 200){
          self.$dialog.toast({mes:e.date.errMsg,icon:'error'})
          return
        }

         console.log(e.data.data, "ajax");
        self.info.activityPictureUrls.push.apply(self.info.activityPictureUrls , e.data.data)
        console.log(self.info.activityPictureUrls, "[]");
        // self.info.activityPictureUrls = e.data.data
       })
       .catch(function(e){
         if(!e) return
         self.info.activityPictureUrls = e.data.data
       })
    },
    getObjectURL(file) {
            var url = null ;
            if (window.createObjectURL!=undefined) { // basic
              url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) { // mozilla(firefox)
              url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // webkit or chrome
              url = window.webkitURL.createObjectURL(file) ;
            }
            return url ;
    },
  },

  components: {editor},
  computed:{
	  ...mapState(['userId'])
  },

  mounted() {
    document.getElementById('app').scrollTop = 0
  },

};
</script>
<style scoped>
  /deep/ .content{
    border-top: 1px solid #f7f8f9;
    height: 300px;
   overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  /deep/ input{
    color: #000000;
  }
  .i-img-wrap{
    flex-wrap: wrap;
  }
  .i-img{
    width: 23%;
    border-radius: 5px;
    height:90px;
    margin: 5px 1% 0 0;
  }
  .i-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .btn{
    margin: 30px auto;
    width: 50%;
    height: 45px;
    border-radius: 3px;
    color: #FFFFFF;
  }
  .edit{
    background: #f8f9fd;
  }
  button{
    box-shadow: none;
  }
  .i-name{
    width: 25%;
  }
  .i-input{
    width: 80%;
  }
  .item{
    margin: auto;
    background: #FFFFFF;
    padding: 16px 10px;
    min-height: 65px;
  }
  ._item{
    min-height: 40px;
    padding: 0 10px;
  }
  .bg{
    width: 100px;
    height: 100px;
    object-fit: cover;
    overflow: hidden;
  }
 .bg > .absolute img{
   filter: blur(10px);
 }
  .issue{
    right: 5%;
    color: #FFFFFF;
  }
  .bg-icon{
    border: 1px dashed #d2d2d2;
    flex-wrap: wrap;
    color: #888888;
    width: 100px;
    height: 100px;
  }
  .bg-icon input{
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
  }
  .bg-icon i{
    font-size: 50px;
    line-height: 1;
  }
  .bg-icon p{
    margin:0 auto;
    line-height: 1;
  }
  .bg-icon img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
