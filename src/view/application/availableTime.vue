<template>
    <div class="availableContainer">
        <topComponent title='十点有空' :showLeft="true"></topComponent>
        <div class="mainTitle">十点有空,我等你哦</div>
        <div class="mianContent">
            <ul>
                <li v-for="(item,index) in subTypeData" :key="index" :class="{typeA:item.subType==subType}" @click="changeSubType(item.subType)">{{item.name}}</li>
                <!-- <li :class="{'typeB':subType==2}">表白</li>
                <li :class="{'typeC':subType==3}">吐槽</li>
                <li :class="{'typeD':subType==4}">心愿</li>
                <li :class="{'typeE':subType==5}">知乎</li> -->
            </ul>
            <!-- <div class="searchContent">
                <yd-search v-model="searchValue" :on-submit="submitSearch"></yd-search>
            </div> -->
            <div class="msgContent">
                <div class="MsgInput">
                <yd-input slot="right"  v-model="sendMsg" max="20" placeholder="说点什么呢~"></yd-input>
                </div>
                <div class="MsgBtn">
                    <select style="width:40px" v-model="subTypeChage">
                        <option v-for="(item,index) in subTypeList" :value="item.subType" :key="index" :label="item.name" name="subTypeChage">
                        </option>
                   </select>

                   <input v-show="!anonyChecked" type="input" placeholder="请输入昵称" class="nickName" v-model="nickName"/>
                   <input type="checkbox" name="checkbox" v-model="anonyChecked" /><span class="anonymous">匿名</span>
                   <button type="button" class="publishBtn" @click="publish">发布</button>
                 </div>
            </div>
            <div class="tabContent">
                <ul>
                    <li v-for="(item,index) in flags" :key="index" :class="{typeA:item.flag==flag}" @click="changeFlags(item.flag)">{{item.name}}</li>
                    <!-- <li :class="{'typeStyle':flag==1}">我的</li>
                    <li :class="{'typeStyle':flag==2}">最新</li>
                    <li :class="{'typeStyle':flag==3}">最热</li> -->
                </ul>
            </div>
            <div class="listContent">
                <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="4" slot="list">
                    <yd-list-item v-for="(item, index) in list" :key="index">
                        <yd-list-other slot="other">
                            <div class="wordMsg">
                                <div class="close" @click="deleteThis(item.leaveMessageOutput.id)">x</div>
                                <div class="MsgTop">{{item.leaveMessageOutput.nickname==''?'匿名':item.leaveMessageOutput.nickname}}|{{subTypeData[item.leaveMessageOutput.subType].name}}<p>{{item.leaveMessageOutput.createTime|totime}}</p></div>
                                <div class="MsgCenter">{{item.leaveMessageOutput.content}}</div>
                                <div class="MsgBottom">
                                    <!-- 这个是用户的评论 开始-->
                                    <div class="actionBox flexs">
                                        <div class="flexs w100 grey">   
                                            <!-- type, dynimicId, toId, toName, i, formUserName = "", commentId -->
                                            <div class="fmiddle flex" :class="{red:item.isFlag}" @click="tapComment(0,item.leaveMessageOutput.id,'','',index)">
                                                <i class="iconfont2" v-if="item.isFlag==0" >&#xe600;</i>
                                                <i class="iconfont2 red"  v-if="item.isFlag==1" >&#xe600;</i>
                                                {{item.likes ? item.likes : ''}}
                                            </div>
                                            <div class="flex fmiddle" @click="tapComment(1,item.leaveMessageOutput.id,userId,'',index,nickname,'')">
                                                <i class="iconfont2">&#xe665;</i>
                                                    <!-- 评论的长度 -->
                                                    {{item.commentOutputs.length?item.commentOutputs.length : ''}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="li-comment">
                                        <div class="c-i flexa"  v-for="(d2,i2) in item.commentOutputs" :key="i2" v-if="i2 < 5" @click="twoComment(d2,index,i2)">
                                        <div class="flexa" v-if="d2.formUserId == d2.toUserId">
                                            <p class="c-i-name fmiddle">{{d2.formUserName}}:</p>
                                            <div class="c-i-body fmiddle">{{d2.commentContent}} </div>
                                        </div>
                                        <div class="flexa" v-else>
                                            <p class="fmiddle"><span class="c-i-name">{{d2.formUserName}}</span>回复<span  class="c-i-name">{{d2.toUserName}}</span>:</p>
                                            <div class="c-i-body fmiddle">{{d2.commentContent}} </div>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 这个是用户的评论 结束 -->
                                </div>
                            </div>
                        </yd-list-other>
                    </yd-list-item>
                </yd-list>

        <!-- 数据全部加载完毕显示 -->
        <!-- <span slot="doneTip">没有数据啦~~</span> -->

        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img v-show="more" slot="loadingTip" src="../../assets/images/timg.gif"/>

    </yd-infinitescroll>
                <!-- <yd-timeline>
                     <yd-timeline-item>
                         <div class="msgCard">

                         </div>
                     </yd-timeline-item>
                     <yd-timeline-item>
                         
                     </yd-timeline-item>
                     <yd-timeline-item>
                        
                     </yd-timeline-item>
                </yd-timeline> -->
            </div>
        </div>
        <!-- 评论 输入框 开始 :class="{showComment:showComment}"-->
        <div class="comment w100 flex" :class="{showComment:showComment}">
            <div class="c-input flex">
              <yd-textarea slot="right" v-model="commentContent" :placeholder="ydPlaceholder" maxlength="100"></yd-textarea>
            </div>
            <div class="c-send h100">
              <div class="w100 flex" @click="sendComment()">
                <div class="blue fmiddle bold">发送</div>
              </div>
              <div v-if="userId == commentInfo.formUserId && commentInfo.type==2" class="w100 flex" @click="delComment(commentInfo.formUserId,commentInfo.id,commentInfo.index,commentInfo.index2)">
                <div class="red fmiddle bold">删除</div>
              </div>
            </div>
            <div class="w100 c-close fmiddle grey" @click="closeComment"><i class="iconfont2">&#xe656;</i></div>
        </div>
        <!-- 评论 输入框 结束-->
    </div>
</template>
<script>
import { mapMutations, mapState, mapGetters } from "vuex";
// import { testServer } from "@/servers/plaza";
export default {
  components: {},
  computed: {
    ...mapState(['userId','userName'])
  },
  data() {
    return {
        subTypeData:[
            {name:'全部',subType:0},
            {name:'表白',subType:1},
            {name:'吐槽',subType:2},
            {name:'心愿',subType:3},
            {name:'知乎',subType:4},
        ],
        subTypeList:[
          {name:'表白',subType:1},
          {name:'吐槽',subType:2},
          {name:'心愿',subType:3},
          {name:'知乎',subType:4},
        ],
        subTypeChage:1,
        subType:0,//全部，表白，吐槽，心愿，知乎
        flags:[
            {name:'我的',flag:1},
            {name:'最新',flag:2},
            {name:'最热',flag:3},
        ],
        flag:1,//我的，最新，最热
        sendMsg:'',//用户发表的信息
        pageSize: 10,
        anonyChecked:false,
        nickName:'',
        list:[],
        comment:[],//评论
        isFlag:'',//是否点赞
        pageNumber:1,//页面的页数
        more:true,//是否有更多数据
        commentContent: "",
        commentInfo: [],
        showComment: false,
        ydPlaceholder: "写评论"
    };
  },
  created(){
    let that=this;
    //获取列表
    that.getList();
  },
  mounted() {
      //获取用户信息
      this.getUserInfo();

  },
  watch: {},
  methods: {
      //获取所有的列表信息
     getList(){
         let that=this;
         that.post("leaveMessage/getLeaveMessageList", 
         { flag: that.flag, 
           pageNumber:that.pageNumber,
           pageSzie: 5,
           subType:that.subType,
           type:1,
           userId:that.userId,
         }, function(e) {
          if (e.errCode != 200) {
            that.$dialog.toast({ mes: e.errMsg, icon: "error" });
            that.list=[];
            return;
          }
         that.list=e.data;
        //   for(let i=0;i<e.data.length;i++){
        //       that.list.push(e.data[i].leaveMessageOutput);
        //   }
        });
     },
     getUserInfo() {
        const self = this;
        this.post(
          "user/baseInfo/get/authentication",
          { visitorId: this.userId },
          function(e) {
            if (e.errCode != 200) return;
            let dataRet = e.data;
            self.nickName =  dataRet.nickName;
          }
        );
     },
     //改变tab栏目的状态
     changeSubType(subType){
         let that=this;
         
         that.subType=subType;
         that.getList();

     },
     changeFlags(flag){
         let that=this;
        
         that.flag=flag;
         that.getList();
     },
     //删除本个
     deleteThis(id){
         let that=this;
         that.post("leaveMessage/delete", 
         { 
             "id": id,
             "type": 1,
             "userId": that.userId
         }, function(e) {
          if (e.errCode != 200) {
            that.$dialog.toast({ mes: e.errMsg, icon: "error" });
            return;
          }
          that.$dialog.toast({ mes: e.errMsg, icon: "success"});
          //这个要注意一下
          that.getList();
        });
     },
     //发布说说
     publish(){
         let that=this;
         let leaveMessageId='';
         if(that.sendMsg==''|| that.sendMsg==""){
             that.$dialog.toast({ mes: '请先输入你想说的话之后再发表哦', icon: "error" });
             return;
         }
         that.post("leaveMessage/publish", 
         { 
           content: that.sendMsg, 
           nickname:that.anonychecked?'匿名':that.nickName,
           subType: that.subTypeChage,
           type:1,
           userId:that.userId
         }, function(e) {
          if (e.errCode != 200) {
            that.$dialog.toast({ mes: e.errMsg, icon: "error" });
            return;
          }
          that.$dialog.toast({ mes: e.errMsg, icon: "success" });
          leaveMessageId = e.data;
          that.sendMsg='';//清空之前写的内容
          //发布成功之后要把结果存在list之中
          that.getList();
        });
     },
     tapComment(type, dynimicId, toId, toName, i, formUserName = "", commentId) {
      const self = this;
      // type= 0 表示点赞 type = 1 表示评论
      if (type == 0) {
        if (this.list[i].isFlag) {
          this.cancelZan(this.userId, dynimicId);
          this.list[i].isFlag = false;
          this.list[i].likes = this.list[i].likes - 1;

          this.list.sort();
        } else {
          this.post(
            "comment/add",
            {
              correlationId: dynimicId,
              formUserId: this.userId,
              formUserName: this.nickName,
              toUserId: toId,
              toUserName: toName,
              commentType: 0,
              type: 4
            },
            function() {}
          );
          this.list[i].isFlag = true;
          this.list[i].likes = this.list[i].likes + 1;
          this.list.sort();
        }
      }
    
      if (type == 1) {
        this.commentContent = "";
        this.commentInfo["correlationId"] = dynimicId;
        this.commentInfo["toUserId"] = toId;
        this.commentInfo["toUserName"] = toName;
        this.commentInfo["formUserName"] = formUserName;
        this.commentInfo["index"] = i;
        this.commentInfo["type"] = 1;
        this.commentInfo["id"] = commentId;
        this.ydPlaceholder = "评论:";

        this.showComment = true;
      }
    },
    twoComment(d, i, i2) {
        debugger;
      if (!d) location.reload();
      this.commentContent = "";
      this.commentInfo["correlationId"] = d.correlationId;
      this.commentInfo["formUserId"] = d.formUserId;
      this.commentInfo["formUserName"] = d.formUserName;
      this.commentInfo["toUserId"] = d.toUserId;
      this.commentInfo["toUserName"] = d.toUserName;
      this.commentInfo["index"] = i;
      this.commentInfo["index2"] = i2;
      this.commentInfo["type"] = 2;
      this.commentInfo["id"] = d.commentId;
      this.ydPlaceholder = "回复" + d.formUserName + ":";
      this.showComment = true;
    },
    cancelZan(userid, aid) {
      this.post(
        "comment/cancel/like",
        { formUserId: userid, correlationId: aid, type: 1 },
        function() {}
      );
    },
    delComment(uid, id, index, i2) {
      debugger;
      const self = this;
      this.post(
        "comment/delete",
        { formUserId: uid, id: id, type: 4 },
        function(e) {
          if (!e) return;
          if (e.errCode != 200) {
            self.$dialog.toast({ mes: e.errMsg });
            return;
          }
          self.$dialog.toast({ mes: "删除成功" });
          self.list[index].commentOutputs.splice(i2, 1);
          self.showComment = false;
        }
      );
    },
    closeComment() {
      this.showComment = false;
    },
    sendComment() {
      const self = this;
      if (!this.commentInfo) location.reload();

      const c = this.commentInfo;

      if (this.commentContent == "" || this.commentContent == '') {
        self.$dialog.toast({ mes: "写点什么吧！" });
        return;
      }

      if (c.type == 1) {
        this.post(
          "comment/add",
          {
            correlationId: c.correlationId,
            formUserId: self.userId,
            formUserName: self.userName,
            toUserId: c.toUserId,
            toUserName: c.toUserName,
            commentType: 1,
            type: 4,
            commentContent: self.commentContent
          },
          function(e) {
            if (!e) return;
            if (e.errCode != 200) {
              self.$dialog.toast({ mes: e.errMsg });
              return;
            }

            const con = self.commentContent;
            if (self.list[c["index"]].commentOutputs == null) {
              self.list[c["index"]].commentOutputs = [];
            }
            self.list[c["index"]].commentOutputs.unshift({
              commentContent: con,
              formUserId: self.userId,
              formUserName: self.userName,
              correlationId: c.correlationId,
              type: 4,
              toUserId: c.toUserId,
              toUserName: c.toUserName,
              id: e.data,
              commentId: e.data
            });
            // self.$set(
            //   self.commentLens,
            //   self.commentInfo["index"],
            //   self.commentLens[self.commentInfo["index"]] + 1
            // );
            self.commentInfo = [];
            self.showComment = false;
          }
        );
      } else {
        this.post(
          "comment/add",
          {
            correlationId: c.correlationId,
            formUserId: self.userId,
            formUserName: self.userName,
            toUserId: c.formUserId,
            toUserName: c.formUserName,
            commentType: 1,
            type: 4,
            commentContent: self.commentContent
          },
          function(e) {
            if (!e) return;
            if (e.errCode != 200) {
              self.$dialog.toast({ mes: e.errMsg });
              return;
            }
            // console.log(self.commentInfo);

            const con = self.commentContent;
            if (self.list[c["index"]].commentOutputs == null) {
              self.list[c["index"]].commentOutputs = [];
            }
            // self.list[c['index']].comment.unshift({commentContent:con,formUserId:self.userId,formUserName:self.userName,correlationId:c.correlationId,type:0})
            self.list[c["index"]].commentOutputs.unshift({
              commentContent: con,
              formUserId: self.userId,
              formUserName: self.userName,
              correlationId: c.correlationId,
              type: 4,
              toUserId: c.formUserId,
              toUserName: c.formUserName,
              id: e.data,
              commentId: e.data
            });

            // self.$set(
            //   self.commentLens,
            //   self.commentInfo["index"],
            //   self.commentLens[self.commentInfo["index"]] + 1
            // );
            self.commentInfo = [];
            self.showComment = false;
          }
        );
      }
    },
    //加载更多
    loadList(){
        let that=this;
         that.post("leaveMessage/getLeaveMessageList", 
         { flag: that.flag, 
           pageNumber:++that.pageNumber,
           pageSzie: 5,
           subType:that.subType,
           type:1,
           userId:that.userId,
         }, function(e) {
          if (e.errCode != 200) {
            that.$dialog.toast({ mes: e.errMsg, icon: "error" });
            return;
          }
          if(e.data.length=0){
              that.more=false;
              return;
          }
        //  console.log("哈哈哈",that.list);
          for(let i=0;i<e.data.length;i++){
              that.list.push(e.data[i]);
          }
        });
     }
  }
};
</script>
<style lang="less" scoped>
.availableContainer{
  overflow: hidden;
//   height: 100%;
//   width: 100%;
background-image: url('../../assets/images/appBg1.jpg');
    background-repeat: no-repeat;   //不重复
    background-size: 100% 100%;     // 满屏
//   background:url('../../assets/images/appBg1.jpg')  100% center no-repeat;
}
.mainTitle{
   text-align: center;
   color:#F077A7; 
   font-size: 0.4rem;
   font-weight: bold;
   margin:0.3rem 0;
}
.mianContent{
   margin:0.3rem 0.3rem;
   ul{
       height:0.7rem;
       padding:0 0.1rem;
       background: #fff;
       li{
           float: left;
           width:20%;
           text-align: center;
           line-height:0.7rem;
           
       }
       .typeA{
           border-top:0.1rem solid #F077A7;
           line-height: 0.5rem;
       }
       .typeB{
           border-top:0.1rem solid #E68D2D;
           line-height: 0.5rem;
       }
       .typeC{
           border-top:0.1rem solid #2DE0E6;
           line-height: 0.5rem;
       }
       .typeD{
           border-top:0.1rem solid #7D2DE6;
           line-height: 0.5rem;
       }
       .typeE{
           border-top:0.1rem solid #679D98;
           line-height: 0.5rem;
       }
   }
   .msgContent{
       margin:0 0 0.2rem 0;
       padding-right:0.1rem;
       height:2rem;
       background: #fff;
       .MsgInput{
           height:1rem;
           padding:0.3rem;
       }
       .MsgBtn{
           float: right;
           margin-top:0.2rem;
           .anonymous{
               color:#000;
               font-size:12px;
           }
           .nickName{
               width:1.8rem;
           }
           .publishBtn{
               background-color: #3390D4;
               border-radius: 0.1rem;
               width:0.8rem;
               height:0.6rem;
           }
       }
   }
   
   .tabContent{
        margin:0.3rem 0rem;
        ul{
            height:0.7rem;
            padding:0 0.1rem;
            background: #fff;
            li{
                float: left;
                width:33%;
                text-align: center;
                line-height:0.7rem; 
            }
            .typeStyle{
                border-bottom:0.1rem solid #F077A7;
                line-height: 0.6rem;
            }
        }
    }
    .listContent{
        .wordMsg{
            position: relative;
            width:100%;
            .close{
                cursor: pointer;
                position: absolute;
                right:0.2rem;
                top:-0.1rem;
                font-size:19px;
                color:#fff;
            }
            // background-color:rgba(240,119,167,0.2);
            .MsgTop{
                padding:0.2rem 0 0 0.3rem;
                color:#000;
                p{
                    float: right;
                    padding-right:0.5rem;
                }
            }
            .MsgCenter{
                color:#fff;
                padding:0.2rem 0 0.2rem 0.3rem;
            }
            .MsgBottom{
                .actionBox .flex {
                  width: 25%;
                }
            }
        }
    }
}
.showComment {
    transform: translateY(0) !important;
  }
  .c-send .w100 {
    min-height: 60px;
  }
  .c-close {
    position: absolute;
    right: 2%;
    top: 0;
    width: 20px;
  }
  .c-input {
    width: 70%;
    padding: 0 10px;
    background: #ffffff;
  }
  .c-send {
    width: 20%;
  }
  .comment {
    position: fixed;
    bottom: 0;
    background: #f5f5f5;
    z-index: 9;
    padding: 8px 0;
    transform: translateY(150%);
    transition: all 0.3s;
  }
  .c-i-name {
    color: #0168c3;
  }
  .li-comment {
    border-radius: 3px;
    padding: 20px 10px;
  }
  .li-comment div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
<style lang="less">
.availableContainer{
     .yd-list-theme4 .yd-list-item .yd-list-img{
        width:0 !important;
        height:0 !important;
    }
    .yd-list-img img, .yd-list-mes{
        background-color:rgba(240,119,167,0.5);
    }
    .yd-list-theme4{
        background-color: transparent !important;
    }
}


   
</style>

