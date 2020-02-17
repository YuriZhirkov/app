<template>
    <div class="availableContainer">
        <topComponent title='十点有空' :showLeft="true"></topComponent>
        <div class="mainTitle">十点有空,我等你哦</div>
        <div class="mianContent">
            <ul>
                <li :class="{'typeA':type==1}">全部</li>
                <li :class="{'typeB':type==2}">表白</li>
                <li :class="{'typeC':type==3}">吐槽</li>
                <li :class="{'typeD':type==4}">心愿</li>
                <li :class="{'typeE':type==5}">知乎</li>
            </ul>
            <div class="searchContent">
                <!-- <yd-button  bgcolor="#313737" color="#FFF"><yd-icon name="search" size=".2rem" color="#fff"></yd-icon>搜索</yd-button>     -->
                <yd-search v-model="searchValue" :on-submit="submitSearch"></yd-search>
            </div>
            <div class="msgContent">
                <div class="MsgInput">
                <yd-input slot="right"  v-model="sendMsg" max="20" placeholder="说点什么呢~"></yd-input>
                </div>
                <div class="MsgBtn">
                   <yd-button  bgcolor="#7CABDA" color="#FFF">发布</yd-button>
                 </div>
            </div>
            <div class="tabContent">
                <ul>
                    <li :class="{'typeStyle':subType==1}">我的</li>
                    <li :class="{'typeStyle':subType==2}">最新</li>
                    <li :class="{'typeStyle':subType==3}">新回复</li>
                    <li :class="{'typeStyle':subType==4}">最热</li>
                </ul>
            </div>
            <div class="listContent">
                <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="4" slot="list">
                    <yd-list-item v-for="(item, index) in list" :key="index">
                        <yd-list-other slot="other">
                            <div class="wordMsg">
                                <div class="MsgTop">{{item.name}}|{{item.type}}<p>{{item.time}}</p></div>
                                <div class="MsgCenter">{{item.content}}</div>
                                <div class="MsgBottom">
                                    <div class="actionBox flexs">
                                       <div class="flexs w100 grey">
                                         <div class="fmiddle flex" :class="{red:item.isFlag}">
                                             <i class="iconfont2" v-if="!item.isFlag" >&#xe600;</i>
                                             <i class="iconfont2 red"  v-if="item.isFlag" >&#xe600;</i>
                                              {{item.likes ? item.likes : ''}}
                                         </div>
                                           <div class="flex fmiddle">
                                             <i class="iconfont2">&#xe665;</i>
                                               {{item.commentLens[i]?item.commentLens[i]:''}}
                                           </div>
                                         
                                       </div>
                                     </div>
                                </div>
                            </div>
                        </yd-list-other>
                    </yd-list-item>
                </yd-list>

        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">没有数据啦~~</span>

        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="path/img/loading.svg"/>

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
        type:'1',//全部，表白，吐槽，心愿，知乎
        subType:'1',//我的，最新，新回复，最热
        searchValue:'',//搜索内容
        sendMsg:'',//用户发表的信息
        page: 1,
        pageSize: 10,
        list:[
           {
            name:'sx',
            type:'心愿',
            content:'Ceshish策划书四十是',
            time:'2小时前', 
            isFlag:'',
            likes:'',
            commentLens:['cess','ces'],
           },
           {
           name:'sx',
           type:'心愿',
           content:'Ceshish策划书四十是',
           time:'2小时前', 
           commentLens:['cess','ces'],
            }
        ]
    };
  },
  mounted() {},
  watch: {},
  methods: {
    
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
       margin:0rem 0.2rem;
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
       }
   }
   .searchContent{
    //    margin:0.3rem 0rem;
    //    position: absolute;
    //    right:0%;
   }
   .tabContent{
        margin:0.3rem 0rem;
        ul{
            height:0.7rem;
            padding:0 0.1rem;
            background: #fff;
            li{
                float: left;
                width:25%;
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
            width:100%;
            // background-color:rgba(240,119,167,0.2);
            .MsgTop{
                color:#000;
                p{
                    float: right;
                    padding-right:0.2rem;
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

