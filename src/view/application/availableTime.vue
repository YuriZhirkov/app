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
                                <div class="close" @click="deleteThis(item.leaveMessageOutput.id)">X</div>
                                <div class="MsgTop">{{item.leaveMessageOutput.nickname==''?'匿名':item.leaveMessageOutput.nickname}}|{{subTypeData[item.leaveMessageOutput.subType].name}}<p>{{item.leaveMessageOutput.createTime|totime}}</p></div>
                                <div class="MsgCenter">{{item.leaveMessageOutput.content}}</div>
                                <div class="MsgBottom">
                                    <div class="actionBox flexs">
                                       <div class="flexs w100 grey">
                                         <div class="fmiddle flex" :class="{red:item.isFlag}">
                                             <i class="iconfont2" v-if="!item.isFlag" >&#xe600;</i>
                                             <i class="iconfont2 red"  v-if="item.isFlag" >&#xe600;</i>
                                              <!-- {{item.likes ? item.likes : ''}} -->
                                         </div>
                                           <div class="flex fmiddle">
                                             <i class="iconfont2">&#xe665;</i>
                                               <!-- {{item.commentLens[i]?item.commentLens[i]:''}} -->
                                           </div>
                                         
                                       </div>
                                     </div>
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
    </div>
</template>
<script>
import { mapMutations, mapState, mapGetters } from "vuex";
// import { testServer } from "@/servers/plaza";
export default {
  components: {},
  computed: {
    ...mapState(['userId'])
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

