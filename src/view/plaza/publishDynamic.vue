<template>
    <div class="publishDynamic">
        <topComponent title='发布动态' :showLeft='true'></topComponent>
        <div class="container">
            <textarea v-model="content" placeholder="分享新鲜事..."></textarea>

            <div class="flexa flexwrap">
              <div class="uploadFile fsmall">
                  <i  class="iconfont2">&#xe6c1;</i>
                  <span >照片/视频</span>
                  <input  type="file" multiple="multiple"  accept="image/*"    @change="imgChange($event)"/>
              </div>
              <div class="flexa flexwrap"  v-if="imgUpload" >
                <div class="uploadFile flexa" v-for="(d,i) in  imgsUrl" :key="i">
                  <div class="flex uploadFile2 flexwrap fsmall" v-if="d == 'mp4'">
                      <i  class="iconfont2 w100">&#xe62b;</i>
                      <div>视频</div>
                  </div>
                  <img  v-else :src="d"   class="uploadImg">
                </div>
              </div>
              <!-- <div class="fsmall flexa audio">
                <div class="w100">
                  <div class="flex"><i  class="iconfont2">&#xe61d;</i></div>
                  <span class="flex">语音</span>
                </div>
              </div> -->
            </div>
           <!-- <div class="dynamicSet flexs">
                <p class="fsmall">
                    <i class="iconfont2">&#xe6f7;</i>
                    <span>添加地点</span>
                </p>
                <p class="fsmall">
                    <i class="iconfont2">&#xe648;</i>
                    <span>公开</span>
                </p>
            </div> -->
            <div class="buttom">
                <button class="themeBg" @click="submit">发布</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "publishDynamic",
  props: {},
  components: {},
  computed: {...mapState(['userId'])},
  data() {
    return {
      dynamicContent: "",
      content:'',
      imgs:[],
      imgsUrl:[],
      imgUpload:false,
      imgUploadUrl:[]
    };
  },
  mounted() {

  },
  watch: {},
  methods: {
    submit(){
      const self = this
      if(!this.chooseData()) return
      this.$dialog.loading.open('发布中')

      this.post('dynamic/publish',{userId:this.userId,content:this.content,urlPicture:this.imgUploadUrl,type:1},function(e){
        self.$dialog.loading.close()
        if(e.errCode != 200){
          self.$dialog.toast({mes:errMsg.msg,icon:'error'})
          return
        }
        self.$dialog.toast({mes:'动态发布成功',icon:'success'})
        self.$router.go(-1)
      })
    },
    chooseData(){
      if(this.content == ''){
        this.$dialog.toast({mes:'请填写动态',icon:'error'})
        return false
      }
      // if(!this.imgUpload || this.imgUploadUrl[0] == null){
      //   this.$dialog.toast({mes:'至少上传一张照片',icon:'error'})
      //   return
      // }
      return true
    },

    imgChange(e) {
     if(!e.target.files) return
       const files = e.target.files
       const len = files.length
       this.fileupload(files)
      for (let i = 0; i< len;i++) {
        this.imgsUrl.push(this.getObjectURL(files[i]))
      }
    },
    getObjectURL(file) {
            if(file.type == 'video/mp4') return 'mp4'
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
    fileupload(files) {
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
          console.log(e);
          if(e.data && e.data.errCode != 200){
            debugger
            self.imgsUrl.slice(i,1)
            self.$dialog.toast({mes:e.date.errMsg,icon:'error'})
            return
          }
        
         
          self.imgUploadUrl.push.apply(self.imgUploadUrl , e.data.data)
          //self.imgUploadUrl= e.data.data
          self.imgUpload = true
        })
        .catch(function(e){
          if(e == undefined){
            alert('网络或请求接口错误')
            return;
          }
          if(e.data && e.data.errCode != 200){
            self.imgsUrl.slice(i,1)
            self.$dialog.toast({mes:e.date.errMsg,icon:'error'})
            return
          }
          self.imgUploadUrl= e.data.data
          self.imgUpload = true
        })
    
    }
  }
};
</script>
<style lang="less" scoped>
.publishDynamic {
  background: #fff;
  min-height: 100%;
  .container {
    padding: 0.3rem;
    textarea {
      width: 100%;
      min-height: 5.4rem;
      padding: 0.1rem;
      border: none;
    }
     color: #888888;
    .audio{
       background: #f1f1f1;
       width: 1.5rem;
       height: 1.5rem;
       /deep/ i{
         font-size: .5rem;
         line-height: .8;
       }
    }
    .uploadFile {
      background: #f1f1f1;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;
      margin: 0.3rem 0;
      margin-right: 10px;
      position: relative;
      input {
        cursor: pointer;
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
      }
      .uploadImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: 0.1rem;
      }
      i{
        font-size: .6rem;
        line-height: .8;
      }
      .uploadFile2{
        width: 100%;
        height: 100%;
        background: #020202;
        color: #ffffff;
      }
    }
    .dynamicSet {
      display: flex;
      justify-content: space-between;
      p{
          background: #f1f1f1;
          border-radius: 10px;
          line-height: 1.8;
          padding: 0 10px 0 3px;
          i{
            font-size: 13px;
          }
      }
    }
    .buttom {
      text-align: center;
      padding: 0.6rem 0;
      button {
        width: 60%;
        color: #fff;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 0.1rem;
      }
    }
  }
}
</style>
