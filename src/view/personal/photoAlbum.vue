<template>
    <div class="photoAlbum">
        <topComponent title='我的相册' :showLeft="true">
          <!-- <span slot="left" class="leftSolt">2452</span> -->
          <span slot="right" class="rightSolt">
              <!-- <template>
                   <yd-datetime type="date" v-model="dateTime" slot="right"></yd-datetime>
              </template> -->
          </span>
        </topComponent>
        <div class="allBox">
            <div class="singleBlock"   v-for="(d,i) in dynamic" :key="i">
                <div class="leftBlock">
                    <div class="timeBlock">
                        <span>{{d.dynamic.createTime|datedd}}</span>
                        <span class="fmiddle bold">{{d.dynamic.createTime|datemm}}月</span>
                    </div>
                    <!-- <p class="address fsmall">深圳市福田区人民市政府</p> -->
                </div>
                <div class="_w100 flexa" :class="{'rightBlock-img':d.dynamic.urlPicture &&d.dynamic.urlPicture.length > 0}">
                    <!-- <div class="imgBox"> -->
                      <yd-lightbox v-if="d.dynamic.urlPicture &&d.dynamic.urlPicture.length > 0"   class="imgBox relative" :class="{size1:d.dynamic.urlPicture.length > 1}">

                         <yd-lightbox-img v-for="(d1,i1) in d.dynamic.urlPicture" :key="i1" :src="d1"></yd-lightbox-img>
                          <div class="img-n fsmall absolute">共{{d.dynamic.urlPicture.length}}张</div>
                      </yd-lightbox>
                      <!--  <img src="@/assets/images/lj.png" alt="">
                    </div> -->
                    <router-link v-if="!(d.dynamic.urlPicture &&d.dynamic.urlPicture.length > 0)" class="w100 flexa" :to="{path:'/plaza/detail',query:{aid:d.dynamic.id}}">
                       <p class="fmiddle flexa h100" :class="{h100:!d.dynamic.urlPicture}">{{d.dynamic.content}}</p>
                    </router-link>
                    <router-link v-else class="w100 flexa" :to="{path:'/plaza/detail',query:{aid:d.dynamic.id}}">
                       <p class="fmiddle flexa">{{d.dynamic.content}}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { convertDate } from "@/utils/moment";
export default {
  name: "photoAlbum",
  props: {},
  components: {},
  computed: {
    ...mapState(['userId'])
  },
  data() {
    return {
      dateTime: this.formatTime(new Date()),
      dynamic:[],
      commentLens:[],
      flag:true,
      offset:1
    };
  },
  watch: {},
  methods: {
    getDynamic(){
      const self = this
      this.flag = false
      this.post('dynamic/search',{userId:this.userId,type:6,offset:this.offset,count:20},function(e){
        self.flag = true
        if(e.errCode!=200){
          self.$dialog.toast({mes:'没有更多动态 :)',icon:'error'})
          return
        }
        let data = e.data
        self.offset ++

        const len = data.length
        for (let i in data) {
          let _d = {commentLen:0,likes:'',isFlag:'',comment:[],dynamic:[],user:[]}
          let _cl = 0
           if(data[i].commentOutputs)_cl = data[i].commentOutputs.length
           if(data[i].commentOutputs)_d.commentLen = data[i].commentOutputs.length

           _d.likes = data[i].likes
           _d.isFlag = data[i].isFlag
           _d.comment = data[i].commentOutputs
           _d.dynamic = data[i].dynamicOutput
           _d.user = data[i].getUserInfoOutput
           self.showLoading = false
           self.dynamic.push(_d)
           self.commentLens.push(_cl)
        }

      })
    },
    goDynamic() {
      this.$router.push("/plaza/dynamic");
    },
    // 格式化时间
    formatTime(time) {
      if (!!time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month < 10 ? (month = "0" + month) : month;
        day < 10 ? (day = "0" + day) : day;
        return year + "-" + month + "-" + day;
      }
    }
  },
  mounted() {
    this.getDynamic()
    const self = this

    const app = document.getElementById('app')
     app.addEventListener('scroll',function(e){

       let scrollHeight = app.scrollHeight
       let appHeight = app.clientHeight
       let apptHeight = app.scrollTop
       if((apptHeight+appHeight+1) > scrollHeight &&  self.flag && self.$route.path == '/personal/photoAlbum'){
         self.flag = false
         self.getDynamic()
       }
     })

  },
};
</script>
<style lang="less" scoped>
  a{
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  ._w100{
    background: #efefef;
    width: 100%;
    padding: 0 10px;
  }
  .img-n{
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 3px;
    padding: 0 4px;
    line-height: 1.8;
  }
  .imgBox{
    width: 120px;
    max-height: 120px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .size1 img{
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
  .rightBlock-img{
    align-items: flex-start;
    background: #FFFFFF;
    display: -webkit-box;
    align-items: flex-start;
    overflow: hidden;
  }
.photoAlbum {
  background: #fff;
  .yd-datetime-input {
    height: 0.8rem;
    line-height: 0.8rem;
    margin-top: 0.1rem;
    background: #ad6cef;
    padding: 0 0.1rem;
    border-radius: 0.1rem;
  }
  .allBox {
    padding: 0.3rem;
    display: flex;
    flex-flow: column;
    .singleBlock {
      display: flex;
      margin-bottom: 0.4rem;
      .leftBlock {
        width: 20%;
        margin-right: 0.2rem;
        .timeBlock {
          span:nth-child(1) {
            font-size: 0.4rem;
            font-weight: bolder;
          }
        }
        .address {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          color: #999;
          line-height: 1.5;
          height: 38px;
          overflow: hidden;
          text-overflow: convert;
        }
      }
      .rightBlock {
        flex: 1;
        display: flex;
        height:80px;
        align-items:flex-start;
        .imgBox {
          width: 30%;
          height: 100%;
          margin-right: 0.2rem;
          img {
            width: 100%;
            height: 100%;
            object-fit:cover;
          }
        }
        .contextBox {
          flex: 1;
          line-height:1.5;
          p {
            text-align: justify;
            color: #000000;
          }
        }
      }
    }
  }
}
</style>
