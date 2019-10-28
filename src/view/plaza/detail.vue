<template>
  <div class="detail">
    <topComponent title='详情' :showLeft='true'>
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
      <div class="t-more" slot="right">
        <i class="iconfont2">&#xe60c;</i>
      </div>
    </topComponent>


    <div class="wrap">
      <div class="w95 flexs">
        <router-link class="i-img" :to="{path:'/personal/anotherPage',query:{uid:info.user.userId}}">
        <div class="w100 flex">
          <img :src="info.user.headUrl" alt="">
        </div>
        </router-link>
        <div class="i-body">
          <div class="flexs">
            <div class="name fbig">{{info.user.nickName}}</div>
            <!-- <div class="fsmall grey">+关注</div> -->
          </div>
          <div class="fourInfo flexa grey fsmall">
              <span v-if="info.user.age" >{{info.user.age}}岁</span>
              <i v-if="info.user.area" class="iconfont2">&#xe862;</i>
              <span v-if="info.user.area" >{{info.user.area}}</span>
              <i class="iconfont2" v-if="info.user.stature">&#xe862;</i>
              <span v-if="info.user.stature">{{info.user.stature}}cm</span>
              <i class="iconfont2" v-if="info.user.stature">&#xe862;</i>
              <span>{{info.dynamic.createTime|totime}}</span>
          </div>

        </div>
        <div class="belowBlock fbig w90">
            <p>{{info.dynamic.content}}</p>
            <yd-lightbox class="imgBox" :num="parseInt(Math.random()*10)">
                <yd-lightbox-img v-for="(d1,i1) in info.dynamic.urlPicture" :key="i1" :src="d1"  alt=""></yd-lightbox-img>
            </yd-lightbox>
        </div>
      </div>

    </div>


    <!-- 评论列表 -->

    <div class="list">
      <div class="l-top flexs w95">
        <div class="l-comment fsmall">
          评论{{info.commentLen ? info.commentLen :0}}
        </div>
        <div class="l-zan fsmall">
          赞{{info.likes ? info.likes : 0}}
        </div>
      </div>

      <div class="l-list">
        <div class="l-i-i flex relative w95" v-for="(d,i) in comment" :key="i">
          <router-link class="i-img" :to="{path:'/personal/anotherPage',query:{uid:info.user.userId}}">
            <div class="w100 flex">
              <img :src="d.user.headUrl" alt="">
            </div>
           </router-link>
          <div class="i-body">
            <div class="flexs">
              <div class="name fmiddle">{{d.user.nickName}}</div>
              <div class="t-more" @click="openSelect(d.user.userId,d.commentId,i)">
                <i class="iconfont2 fmiddle">&#xe60c;</i>
              </div>
            </div>
            <div class="fourInfo flexa grey fsmall">
                <span v-if="d.user.age" >{{d.user.age}}岁</span>
                <i v-if="d.user.area" class="iconfont2">&#xe862;</i>
                <span v-if="d.user.area" >{{d.user.area}}</span>
                <i class="iconfont2" v-if="d.user.stature">&#xe862;</i>
                <span v-if="d.user.stature">{{d.user.stature}}cm</span>
            </div>
            <div v-if="d.comment.formUserId == info.user.userId" class="w100 c-content fmiddle" @click="twoComment(d,i)">{{d.content}}</div>
            <div v-else class="w100 c-content fmiddle flexa" @click="twoComment(d,i)">回复<p class="blue"><router-link class="i-img" :to="{path:'/personal/anotherPage',query:{uid:d.comment.toUserId}}">{{d.comment.toUserName}}</router-link></p>:{{d.content}}</div>
          </div>
        </div>
      </div>
      <div class="l-i-i"></div>
    </div>


    <!-- 功能区 -->
    <div class="actionBox flexs w100">
      <div class="fmiddle flex" :class="{red:info.isFlag}" @click="tapComment(0,info.dynamic.id,info.user.userId,info.user.nickName)">
        <i class="iconfont2" v-if="!info.isFlag" >&#xe600;</i>
        <i class="iconfont2 red"  v-if="info.isFlag" >&#xe600;</i>
         {{info.likes ? info.likes : ''}}
      </div>
      <div class="fmiddle a-two flex" @click="showComment = true;sendType = 1;ydPlaceholder='评论:'">
          <i class="iconfont2">&#xe665;</i>
           {{info.commentLen?info.commentLen:''}}
      </div>
      <div class="fmiddle flex">
          <i class="iconfont2">&#xe610;</i>
      </div>
    </div>

    <!-- 评论 -->
    <div class="comment w100 flex" :class="{showComment:showComment}">
        <div class="c-input flex">
          <yd-textarea slot="right" v-model="commentContent" :placeholder="ydPlaceholder" maxlength="100"></yd-textarea>
        </div>

        <div v-if="sendType == 1" class="c-send flex" @click="tapComment(1,info.dynamic.id,info.user.userId,info.user.nickName)">
          <div class="blue fmiddle bold">发送</div>
        </div>
        <div v-if="sendType == 2" class="c-send flex" @click="twoSendComment()">
          <div class="blue fmiddle bold">发送</div>
        </div>

        <div class="w100 c-close fmiddle grey" @click="closeComment"><i class="iconfont2">&#xe656;</i></div>
    </div>




    <yd-actionsheet :items="commentItems" v-model="showAction" cancel="取消"></yd-actionsheet>
  </div>
</template>
<script>
import {mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "detail",
  props: {},
  data() {
    return {
      info:{likes:0,isFlag:'',commentLen:'',user:{},comment:{},dynamic:{urlPicture:[]}},
      imgs:[],
      sendType:1,
      aid:'',
      comment:{},
      commentContent:'',
      showComment:false,
      showAction:false,
      delId:'',
      uid:'',
      commentIndex:'',

      commentItems:[
        {
            label: '删除评论',
            callback:this.commentDel
        }
      ],
      commentInfo:[],
      ydPlaceholder:'写评论'
    };
  },
  computed:{...mapState(['userId'])},
  methods: {
    twoComment(d,i){
      console.log(d);
      console.log(i);
      this.sendType = 2
      this.commentContent = ''
      this.commentInfo = d
      this.commentInfo['index'] = i
      this.showComment = true
      this.ydPlaceholder = '回复'+d.comment.formUserName+':'
    },
    twoSendComment(){
      const self = this
      if(this.commentContent == ''){
        self.$dialog.toast({mes:'随便发点什么吧!'})
        return
      }
      const c = this.commentInfo
      this.post('comment/add',{correlationId:this.info.dynamic.id,formUserId:this.userId,toUserId:c.comment.formUserId,toUserName:c.comment.formUserName,commentType:1,type:0,commentContent:this.commentContent},function(e){
        if(!e) return
        self.showComment = false
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg,icon:'error'})
          return
        }
        self.getDetail(self.info.dynamic.id)
      })
    },
    openSelect(uid,aid,index){
      if(!uid || !aid) return
      this.delId = aid
      this.uid = uid
      this.commentIndex = index
      this.showAction = true
    },
    commentDel(){
      if(this.uid != this.userId){
        alert(' 删除失败')
        return
      }
      const self = this
      this.post('comment/delete',{formUserId:this.userId,id:this.delId,type:0},function(e){
        if(!e) return
        if(e.errCode != 200){
          self.$dialog.toast({mes:e.errMsg})
          return
        }
        self.comment.splice(self.commentIndex,1)
        self.info.commentLen -= 1

        self.delId = ''
        self.commentIndex = ''
      })
    },

    closeComment(){
      this.showComment = false
    },
    getDetail(aid){
      const self = this
      this.post('dynamic/info',{id:aid,userId:this.userId},function(e){
        if(!e) return
        if(e.errCode != 200){
          self.$route.go(-1)
          return
        }
        const d = e.data

        if(d.commentOutputs){
          self.info.commentLen = d.commentOutputs.length
          self.$set(self.info,'comment',d.commentOutputs)
          self.getComment(d.commentOutputs)
        }else{
          self.info.commentLen = 0
        }
        self.$set(self.info,'dynamic',d.dynamicOutput)
        self.$set(self.info,'user',d.getUserInfoOutput)
        self.info.isFlag = d.isFlag
        self.info.likes = d.likes

      })
    },
    getComment(c){
      if(!c) return
      const self = this
      for (let i in c) {
        this.post('user/baseInfo/moreInfo',{userId:c[i].formUserId},function(e){
          if(e.errCode != 200) return
          self.$set(self.comment,i,{})
          self.comment[i].content= c[i].commentContent
          self.comment[i].comment= c[i]
          self.comment[i].commentId= c[i].commentId
          self.comment[i].user =e.data

        })
      }
    },
    tapComment(type,dynimicId,toId,toName,i){
      const self = this
      if(type == 0){
        if(this.info.isFlag){
          this.cancelZan(this.userId,dynimicId)
          this.info.isFlag= false
          this.$set(this.info,'likes',this.info.likes -1)
          // this.info.likes=  this.info.likes -1
        }else{
          this.post('comment/add',{correlationId:dynimicId,formUserId:this.userId,formUserName:this.userName,toUserId:toId,toUserName:toName,commentType:0,type:0},function(){})
          self.info.isFlag  = true
          self.info.likes=  self.info.likes +1
        }
      }else{
        if(this.commentContent == ''){
          self.$dialog.toast({mes:'随便发点什么吧!'})
          return
        }
        this.post('comment/add',{correlationId:dynimicId,formUserId:this.userId,formUserName:this.userName,toUserId:toId,toUserName:toName,commentType:1,type:0,commentContent:this.commentContent},function(e){
          if(!e) return
          self.showComment = false
          if(e.errCode != 200){
            self.$dialog.toast({mes:e.errMsg,icon:'error'})
            return
          }
          self.getDetail(dynimicId)
        })
      }
    },
    cancelZan(userid,dynimicId){
      this.post('comment/cancel/like',{formUserId:userid,correlationId:dynimicId,type:0},function(){})
    }
  },

  components: {
  },


  mounted() {
    const aid =  this.$route.query.aid

    if(!aid){
      this.$route.go(-1)
      return
    }
    this.aid = aid
    this.getDetail(aid)
    if(this.$route.query.comment) this.showComment = true
  },

};
</script>
<style  scoped>
  .c-close{
    position: absolute;
    right: 2%;
    top: 0;
    width: 20px;
  }
  .comment{
    position: fixed;
    bottom: 0;
    background: #F5F5F5;
    z-index: 9;
    padding: 8px 0;
    transform: translateY(150%);
    transition: all .3s;
  }
  .showComment{
    transform: translateY(0);
  }
  .c-input{
    width:70%;
    padding:0 10px;
    background: #FFFFFF;
  }
  .c-send{
    width: 20%;
  }
  .l-i-i{
    flex-wrap: wrap;
    margin: 15px auto;
    align-items: flex-start;
    min-height: 80px;
  }
  .c-content{
    margin: 10px  auto;
  }
  .imgBox{
    display: flex;
    flex-wrap: wrap;
  }
  .imgBox img{
    width: 32%;
    height: 2rem;
    object-fit: cover;
    margin: 0 1% 1% 0;
  }
  .list{
    margin-top: 8px;
    background: #FFFFFF;
    padding: 10px 0;
    min-height: 400px;
  }
  .l-top{
    border-bottom: 1px solid #F1F1F1;
  }
  .belowBlock{
    margin: 10px auto;
  }
  .fourInfo{
    line-height: 1.3;
  }
  .fourInfo i{
    font-size: 10px;
  }
  .wrap{
    background: #FFFFFF;
    padding: 15px 0;
  }
  .wrap .w95{
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .i-img{
    width: 20%;
  }
  .i-img img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
 .i-body{
    width: 80%;
  }
  .list .i-body{
    border-bottom: 1px solid #f1f1f1;
  }
  .actionBox{
    position: fixed;
    bottom: 0;
    background: #fbfbfb;
    height: 46px;
    border-top: 1px solid #e8e8e8;
    color: #888888;
  }
  .actionBox .fmiddle{
    height: 60%;
  }
  .actionBox .a-two{
     border-left: 1px solid #e8e8e8;
     border-right: 1px solid #e8e8e8;
  }
  .actionBox .flex{
    width: 33%;
  }
  .t-more{
    position: absolute;
    right: 5%;
  }
</style>
