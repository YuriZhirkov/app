<template>
  <div class="c">
    <topComponent title='提问' :showLeft='true'>
      <div @click="submit" class="fmiddle issue absolute bold"  slot="right">发布问题</div>
    </topComponent>

     <div class="w92">
       <div class="title flexa bold">
         <yd-input class="h1" v-model="title" :show-error-icon="false" :show-success-icon="false" placeholder="输入问题并以问号结尾"></yd-input>
       </div>
      </div>




    <div class="w100 relative" :style="{height:height}">
      <div class="absolute setting flex" @click="show = true">
        <i class="iconfont2">&#xe69c;</i>
        <span class="fsmall">{{isAnonymity == 0 ? '非匿名':'匿名'}}</span>
      </div>
      <editor class="relative" @change="editChange" :content="content"></editor>
      <!-- <vue-html5-editor   class="relative" :content="content">
      </vue-html5-editor> -->
    </div>

     <yd-actionsheet :items="myItems" v-model="show" cancel="取消"></yd-actionsheet>

  </div>
</template>
<script>
 var imgs = []
import { mapActions, mapState, mapGetters } from "vuex";
import VueHtml5Editor from 'vue-html5-editor'

const options = {
   visibleModules: [
          "text",
          // "color",
          "font",
          // "align",
          // "list",
          // "link",
          // "unlink",
          // "tabulation",
          "image",
          // "hr",
          // "eraser",
          // "undo",
          "full-screen",
      ],
      // config image module
      image: {
          // 文件最大体积，单位字节  max file size
          sizeLimit:1024 * 1024 *100,
          // 上传参数,默认把图片转为base64而不上传
          // upload config,default null and convert image to base64
          upload: {
              url: 'https://www.ygtqzhang.cn/file/upload',
              // headers: {},
              // params: {},
              fieldName:'file'
          },
          // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
          // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
          // set null to disable compression
          // compress: {
          //     width: 1000,
          //     height: 1000,
          //     quality: 80
          // },
          // 响应数据处理,最终返回图片链接
          // handle response data，return image url
          uploadHandler(responseText){
              //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
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
      title:'',
      content:'问题补充说明',
      height:'',
      isAnonymity:0,
      show:false,
      myItems: [
                  {
                      label: '匿名',
                      callback: () => this.nm(1)
                  },
                  {
                      label: '非匿名',
                      callback: () =>this.nm(0)
                  }
              ]
    };
  },
  methods: {
    nm(i){
      this.isAnonymity = i
    },
    submit(){
      if(!this.chooseData()) return
      const self = this
      const data  ={
        userId:this.userId,
        addTime:new Date(),
        isAnonymity:0,
        question:this.title,
        questionDesc:this.content,
        questionPictureUrl:imgs,
        isAnonymity:this.isAnonymity
      }
      this.post('question/add',data,function(e){

      })
    },
    chooseData(){
      if(this.title == '' || this.title.length < 5){
        this.$dialog.toast({mes:'请输入问题并以问号结尾'})
        return
      }
      if(this.content == '问题补充说明' || this.content == ''){
        this.$dialog.toast({mes:'请描述问题详情 '})
        return
      }
      if(!imgs[0]){
        this.$dialog.toast({mes:'至少需要一张图片'})
        return
      }
      return  true
    },
    editChange(e){
      this.content = e
      document.querySelector('.content').scrollTop = document.querySelector('.content').scrollHeight
    }
  },

  components: {editor},
  compute:{
	  ...mapState(['userId'])
  },

  mounted() {
    this.height = document.body.clientHeight-80 - (document.querySelector('.top').clientHeight)
    document.querySelector('.content').style.height = this.height+'px'

  },

};
</script>
<style  scoped>
  .edit{
    height: 600px;
  }
  .setting{
    right: 5%;
    z-index: 1002;
    bottom: 0;
    position: fixed;
  }
    .setting span{
      height: 20px;
    }
  .setting i{
    font-size: 18px;
  }
  /deep/ .content{
    border-top: 1px solid #f7f8f9;
    height: 600px;
   overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 300px;
  }
  /deep/ .content /deep/ img{
    width: 100%;
  }
/deep/ .toolbar{
   position: fixed;
    bottom:0;
    z-index: 222222;
    left: 0;
    background: #f8f9fd;
    width: 100%;
    text-align: center;
  }
  /deep/ .vue-html5-editor>.toolbar>.dashboard{
    position: relative;
  }
  /deep/ .vue-html5-editor{
    border: none;
    overflow: auto;
  }
  /deep/ .vue-html5-editor>.toolbar>ul{
    border-top: 1px solid #ddd;
  }
  .c{
    /* position: fixed; */
    width: 100%;
    height: 100%;
    background: #FFFFFF;
  }
  .issue{
    right: 5%;
  }
  .title{
    height: 80px;
  }
  .title /deep/ input{
    font-weight: bold;
    font-size: 18px;
  }
  /deep/ ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  			color: #bdbdbd;
  }
</style>
