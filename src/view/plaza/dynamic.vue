<template>
    <div class="container">
        <topComponent title='' :showLeft="false">
            <div slot="left" class="leftSolt" v-show="!swSearch">
                <router-link to='/personal/personalCenter'>
                    <i class="iconfont iconwode"></i>
                </router-link>
                <router-link to='/plaza/dynamic'>
                    <span class="fbig" :class="$route.path=='/plaza/dynamic'?'active':''">动态</span>
                </router-link>
            </div>
            <div slot="right" class="rightSolt" v-show="!swSearch">
                <router-link to='/focus/matching'>
                    <span class="fbig" :class="$route.path=='/focus/matching'?'active':''">匹配</span>
                </router-link>
                <i class="iconfont iconsousuo" @click="tapSearch"></i>
            </div>
            <div slot='right' class="_search absolute flexs" :class="{'_search-active':swSearch}">
              <div class="search relative flex">
                <div class="s-select w100 flexs fmiddle h100" >
                  <span @click="selectIndex = 1" :class="{'s-active':selectIndex == 1}">全部</span>
                  <span @click="selectIndex = 2"  :class="{'s-active':selectIndex == 2}">关注</span>
                  <span  @click="selectIndex = 3" :class="{'s-active':selectIndex == 3}">好友</span>
                  <span  @click="selectIndex = 9" :class="{'s-active':selectIndex == 9}">同城</span>
                  <span  @click="selectIndex = 6" :class="{'s-active':selectIndex == 6}">自己</span>
                </div>
              </div>
              <div class="s-exit fsmall flex relative" @click="tapCancelSearch">取消</div>
            </div>
        </topComponent>
        <ul>
            <li v-for="(d,i) in list" :key="i">
              <div class="wrap">
                <router-link :to="{path:'/personal/anotherPage',query:{uid:d.user.userId}}">
                  <div class="flexa">
                    <div class="i-img">
                      <img :src="d.user.headUrl" alt="">
                    </div>
                    <div class="i-body">
                      <div class="flexs">
                        <div class="name fbig">{{d.user.nickName}}</div>
                        <div class="fsmall grey">{{d.dynamic.createTime|totime}}</div>
                      </div>
                      <div class="fourInfo flexa grey fsmall">
                          <span v-if="d.user.age" >{{d.user.age}}岁</span>
                          <i v-if="d.user.area" class="iconfont2">&#xe862;</i>
                          <span v-if="d.user.area" >{{d.user.area}}</span>
                          <i class="iconfont2" v-if="d.user.stature">&#xe862;</i>
                          <span v-if="d.user.stature">{{d.user.stature}}cm</span>
                          <i v-if="d.user.educationalBackground" class="iconfont2">&#xe862;</i>
                          <span v-if="d.user.educationalBackground">{{d.user.educationalBackground}}</span>
                          <i v-if="d.user.gender" class="iconfont2">&#xe862;</i>
                          <span v-if="d.user.gender">{{d.user.gender}}</span>
                          <i v-if="d.user.salary" class="iconfont2">&#xe862;</i>
                          <span v-if="d.user.salary">薪资:{{d.user.salary}}</span>

                      </div>
                    </div>
                  </div>
                </router-link>
                <div class="w100">
                  <div class="belowBlock fbig">
                      <router-link :to="{path:'/plaza/detail',query:{aid:d.dynamic.id}}">
                        <p>{{d.dynamic.content}}</p>
                      </router-link>
                      <yd-lightbox class="imgBox" v-if="d.dynamic.urlPicture" :class="{imgBox1:d.dynamic.urlPicture.length < 2}">
                          <yd-lightbox-img v-for="(d1,i1) in d.dynamic.urlPicture" :key="i1" :src="d1" alt=""></yd-lightbox-img>
                      </yd-lightbox>
                      <div class="actionBox flexs">
                        <div class="flexs w100 grey">
                          <div class="fmiddle flex" :class="{red:d.isFlag}" @click="tapComment(0,d.dynamic.id,d.user.userId,d.user.nickName,i)">
                              <i class="iconfont2" v-if="!d.isFlag" >&#xe600;</i>
                              <i class="iconfont2 red"  v-if="d.isFlag" >&#xe600;</i>
                               {{d.likes ? d.likes : ''}}
                          </div>
                          
                          <!-- <router-link :to="{path:'/plaza/detail',query:{aid:d.dynamic.id,comment:true}}"> -->
                            <div class="flex fmiddle" @click="tapComment(1,d.dynamic.id,d.user.userId,d.user.nickName,i,d.user.nickName,d.comment.commentId)">
                              <i class="iconfont2">&#xe665;</i>
                                {{commentLens[i]?commentLens[i]:''}}
                            </div>

                            <div v-if="d.user.userId==userId" class="flex">
                            <i  class="iconfont2">
                              <p  @click="dynamicDelItme(d.user.userId,d.dynamic.id,i)">
	                                <span class="fsmall red">删除</span>
                              </p>
                            </i>
                          </div>
                          <!-- </router-link> -->
                          
                          <!-- <div v-if="userId == d.user.userId" class="flex icon20 bold grey" @click="openSelect(d.user.userId,d.dynamic.id,i)">
                            <i class="iconfont2">&#xe60c;</i>
                          </div> -->
                        </div>
                      </div>
                      <!-- comment -->
                      <!-- <router-link :to="{path:'/plaza/detail',query:{aid:d.dynamic.id}}"> -->
                      <div class="li-comment">
                        <div class="c-i flexa"  v-for="(d2,i2) in d.comment" :key="i2" v-if="i2 < 5" @click="twoComment(d2,i,i2)">
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
                      <!-- </router-link> -->

                      <!-- emdct -->
                  </div>
                </div>
              </div>

            </li>
        </ul>
        <!-- 动态发布 -->
        <router-link to='/plaza/dynamic/publishDynamic'>
            <div class="publishBtn themeBg flex"><i class="iconfont icontianjia"></i></div>
        </router-link>
        <footComponent></footComponent>

        <div class="loading flex" v-if="showLoading">
          <span>加载中..</span>
        </div>

        <yd-actionsheet :items="dynamicItems" v-model="showAction" cancel="取消"></yd-actionsheet>

        <!-- 评论 -->
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

        <!-- 这是一个弹出框 用户 绑定 手机号-->
        <yd-popup v-model="isShowPhone" position="center" width="90%">
            <div style="background-color:#fff;">
                <yd-cell-item>
                    <span slot="left">手机号：</span>
                    <yd-input slot="right" v-model="phoneNum" required regex="mobile" placeholder="请输入手机号码"></yd-input>
                </yd-cell-item>
                <yd-cell-item class="verifyWrap">
                    <span @click="getPhoneValidateCode" slot="right">{{countCode != 60 ? '重新发送'+countCode+'秒':'验证码'}}</span>
                    <yd-input slot="left" :show-error-icon="false" :show-success-icon="false" v-model="verifyCode" regex="^\d{5,12}$" 
                    placeholder="校验码"></yd-input>
                </yd-cell-item>
                <div style="text-align: center;">
                  <yd-button type="primary" style="margin-left:10px" @click.native="cancel" >取消</yd-button>
                  <yd-button type="primary"   style="margin-right:10px" @click.native="bindingPhone">绑定</yd-button>
                </div>
            </div>
        </yd-popup> 
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { register, getPhoneValidateCode } from "@/servers/baseInfo";
// import { testServer } from "@/servers/plaza";
// import topComponent from ""
export default {
  name: "dynamic",
  props: {},
  components: {},
  computed: {
    ...mapState(["userId"],{
      userId: state => state.userId
    })
  },
  data() {
    return {
      swSearch: false,
      list: [],

      userName: "",
      showLoading: true,
      showComment: false,
      commentContent: "",
      commentInfo: [],
      commentLens: [],
      offset: 1,
      flag: true,
      selectIndex: 1,
      firstIndex: 1,
      ydPlaceholder: "写评论",

      showAction: false,
      delId: "",
      uid: "",
      idFlag:0,
      dynamicIndex: "",
      dynamicItems: [
        {
          label: "删除动态",
          callback: this.dynamicDel
        }
      ],
      isShowPhone: false,
      phoneNum: "",
      countCode: 60,
      verifyCode: ""
    };
  },
  watch: {
    selectIndex() {
      this.getDynamic();
    }
  },
  methods: {
    ...mapMutations(["setUserName","setUserId"]),
    twoComment(d, i, i2) {
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
    delComment(uid, id, index, i2) {
      const self = this;
      this.post(
        "comment/delete",
        { formUserId: uid, id: id, type: 0 },
        function(e) {
          if (!e) return;
          if (e.errCode != 200) {
            self.$dialog.toast({ mes: e.errMsg });
            return;
          }
          self.$dialog.toast({ mes: "删除成功" });

          self.list[index].comment.splice(i2, 1);
          self.$set(self.commentLens, index, self.commentLens[index] - 1);
          self.showComment = false;
        }
      );
    },
    selected(i) {
      this.selectIndex = i;
    },
    closeComment() {
      this.showComment = false;
    },
    openSelect(uid, aid, index) {
      if (!uid || !aid) return;
      this.delId = aid;
      this.uid = uid;
      this.dynamicIndex = index;
      this.showAction = true;
    },
    dynamicDel() {
      if (this.uid != this.userId) {
        alert(" 删除失败");
        return;
      }

      const self = this;
      this.post(
        "dynamic/delete",
        { userId: this.userId, id: this.delId },
        function(e) {
          if (!e) return;
          if (e.errCode != 200) {
            self.$dialog.toast({ mes: e.errMsg });
            return;
          }
          self.list.splice(self.dynamicIndex, 1);
          self.commentLens.splice(self.dynamicIndex, 1);
          self.$dialog.toast({ mes: "已删除" });

          self.delId = "";
          self.uid = "";
          self.dynamicIndex = "";
        }
      );
    },


    dynamicDelItme(userId,dynimicId,i) {
      const self = this;
      this.post(
        "dynamic/delete",
        { userId: userId, id: dynimicId },
        function(e) {
          if (!e) return;
          if (e.errCode != 200) {
            self.$dialog.toast({ mes: e.errMsg });
            return;
          }
          self.list.splice(i, 1);
          self.commentLens.splice(i, 1);
          self.$dialog.toast({ mes: "已删除" });

        }
      );
    },
    tapComment(type, dynimicId, toId, toName, i, formUserName = "", commentId) {
      console.log(commentId);

      const self = this;
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
              formUserName: this.userName,
              toUserId: toId,
              toUserName: toName,
              commentType: 0,
              type: 0
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
    cancelZan(userid, dynimicId) {
      this.post(
        "comment/cancel/like",
        { formUserId: userid, correlationId: dynimicId, type: 0 },
        function() {}
      );
    },
    sendComment() {
      const self = this;
      if (!this.commentInfo) location.reload();

      const c = this.commentInfo;

      if (this.commentContent == "") {
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
            type: 0,
            commentContent: self.commentContent
          },
          function(e) {
            if (!e) return;
            if (e.errCode != 200) {
              self.$dialog.toast({ mes: e.errMsg });
              return;
            }

            const con = self.commentContent;
            if (self.list[c["index"]].comment == null) {
              self.list[c["index"]].comment = [];
            }
            self.list[c["index"]].comment.unshift({
              commentContent: con,
              formUserId: self.userId,
              formUserName: self.userName,
              correlationId: c.correlationId,
              type: 0,
              toUserId: c.toUserId,
              toUserName: c.toUserName,
              id: e.data,
              commentId: e.data
            });
            self.$set(
              self.commentLens,
              self.commentInfo["index"],
              self.commentLens[self.commentInfo["index"]] + 1
            );
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
            type: 0,
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
            if (self.list[c["index"]].comment == null) {
              self.list[c["index"]].comment = [];
            }
            // self.list[c['index']].comment.unshift({commentContent:con,formUserId:self.userId,formUserName:self.userName,correlationId:c.correlationId,type:0})
            self.list[c["index"]].comment.unshift({
              commentContent: con,
              formUserId: self.userId,
              formUserName: self.userName,
              correlationId: c.correlationId,
              type: 0,
              toUserId: c.formUserId,
              toUserName: c.formUserName,
              id: e.data,
              commentId: e.data
            });

            self.$set(
              self.commentLens,
              self.commentInfo["index"],
              self.commentLens[self.commentInfo["index"]] + 1
            );
            self.commentInfo = [];
            self.showComment = false;
          }
        );
      }
    },
    // openDetail(id,e){
    //   console.log(e);
    //   if(e.path[0].className == 'imgBox' || e.path[0].nodeName == 'P'|| e.path[2].className == 'li-comment'|| e.path[0].className == 'c-i flexa'){
    //       this.$router.push('/plaza/detail?aid='+id)
    //   }
    // },
    getDynamic() {
      const self = this;
      if (self.selectIndex != self.firstIndex) {
        self.list = [];
        self.commentLens = [];
        self.offset = 1;
        self.firstIndex = self.selectIndex;
      }
      this.post(
        "dynamic/search",
        {
          type: this.selectIndex,
          userId: this.userId,
          offset: this.offset,
          count: 20
        },
        function(e) {
          self.flag = true;
          if (!e) return;

          if (e.errCode != 200) {
            self.$dialog.toast({ mes: "没有更多动态" });
            self.showLoading = false;
            return;
          }
          let data = e.data;
          self.offset++;

          const len = data.length;
          for (let i in data) {
            let _d = {
              commentLen: 0,
              likes: "",
              isFlag: "",
              comment: [],
              dynamic: [],
              user: []
            };
            let _cl = 0;
            if (data[i].commentOutputs) _cl = data[i].commentOutputs.length;
            if (data[i].commentOutputs)
              _d.commentLen = data[i].commentOutputs.length;

            _d.likes = data[i].likes;
            _d.isFlag = data[i].isFlag;
            _d.comment = data[i].commentOutputs;
            _d.dynamic = data[i].dynamicOutput;
            _d.user = data[i].getUserInfoOutput;
            self.showLoading = false;
            self.list.push(_d);
            self.commentLens.push(_cl);
          }

          // self.getCommentUserInfo(self.list)
        }
      );
    },

    identityAuthenticationHint() {
      const self = this;
      this.get(
        "user/baseInfo/identityAuthentication/hint",
        {
          userId: this.userId
        },
        res => {
          if (res.errCode == 200) {
            let status = res.data.substr(0, 2);
            if (status == "00" || status == "02") {
              let noAuth = res.data.substr(3);
              self.$dialog.toast({mes: noAuth,timeout: 1000,
                  callback: () => {
                      self.$router.push({
                        path: "/personal/authIdentity",
                        query: { jump: 1 }
                      });
                  }
              });

            } 
          } 
        }
      );
    },
    // educationBackgroundAuthenticationHint() {
    //   const self = this;
    //   this.get(
    //     "user/baseInfo/educationBackgroundAuthentication/hint",
    //     {
    //       userId: this.userId
    //     },
    //     res => {
    //       if (res.errCode == 200) {
    //         let status = res.data.substr(0, 2);
    //         if (status == "00" || status == "02") {
    //           let noAuth = res.data.substr(3);
    //           self.$dialog.toast({
    //             mes: noAuth,
    //             timeout: 2500,
    //             callback: () => {
    //                 self.$router.push({
    //                   path: "/personal/authEducation",
    //                   query: { jump: 1 }
    //               });
    //             }
    //           });
    //         }
    //       }
    //     }
    //   );
    // },

    baseHint() {
      const self = this;
      this.get(
        "user/extendInfo/hint",
        {
          userId: this.userId
        },
        function(e) {
          if (e.errCode == 200) {
            let status = e.data.substr(0, 2);
            if (status == "01" && self.idFlag !=0) {
              let noAuth = e.data.substr(3);
              
              self.$dialog.confirm({
                title: '基本信息缺失',
                mes: noAuth,
                opts: () => {
                    self.$dialog.toast({mes: '去补充',timeout: 1000,
                        callback: () => {
                            self.$router.push({
                              path: "/personal/multiInfo",
                              query: { i: 1 }
                            });
                        }
                    });
                }
              });
            }
          }
        }
      );
    },

    getCommentUserInfo(list) {
      const self = this;
      if (!list) return;
      for (let i in list) {
        if (list[i].comment != null || list[i].comment != "") {
          for (let i2 in list[i].comment) {
            if (i2 > 4) break;
            this.post(
              "user/baseInfo/moreInfo",
              { userId: list[i].comment[i2].formUserId },
              function(e) {
                self.$set(self.list[i].comment[i2], "user", e.data);
              }
            );
          }
        }
      }
    },

    tapSearch() {
      this.swSearch = true;
    },
    tapCancelSearch() {
      this.swSearch = false;
    },
    // 获取用户的信息，判断用户信息中是否存在手机号或者openId
    //1. 如果手机号为空则绑定手机号,跳出一个对话框提示用户绑定
    //2. 如果openId为空则获取到openId,
    //使用window.location.href = 
    //http://www.ygtqzhang.cn/weChat/authorize?returnUrl=http://www.ygtqzhang.cn:8090/plaza/dynamic?login=1&userId=325642568258263868

      getUserInfo() {
        const self = this;
        this.post(
          "user/baseInfo/get/authentication",
          { visitorId: this.userId },
          function(e) {
            if (e.errCode != 200) return;
            let dataRet = e.data;
            self.setUserName(dataRet.nickName);
            self.userName = dataRet.nickName;
            self.idFlag = dataRet.idFlag;
            //打印用户的信息
           
            if (dataRet.phone == undefined || dataRet.phone == "" || dataRet.phone == null) {
                // console.log("dataRet.phone=");
                // console.log(dataRet.phone);
                self.isShowPhone = true;
            }


            //这是绑定微信的
            if (dataRet.weChatId == undefined || dataRet.weChatId == "" || dataRet.weChatId == null) {
                 debugger;
                let queryUserId = self.$route.query.userId;
                if(queryUserId == null || queryUserId == undefined || queryUserId == "") {
                    console.log("self.userId=",self.userId);
                    let url = 'https://www.ygtqzhang.cn/weChat/authorize?returnUrl=A'+self.userId;
                    location.href = url;
                }

            }
          }
        );
      },
      getPhoneValidateCode() {
        const self = this;
        if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
          this.$dialog.toast({ mes: "请输入正确的手机号码", icon: "error" });
          return;
        }
        if (this.countCode != 60) return;
        this.get("user/baseInfo/getPhoneValidateCode",{ phone: this.phoneNum },
            function(e) {
                console.log("e=");
                console.log(e);
                if (e.errCode != 200) {
                  self.$dialog.toast({ mes: e.errMsg, icon: "error" });
                  return;
                }
                self.$dialog.toast({ mes: e.errMsg, icon: "success" });
                const si = setInterval(function() {
                  self.countCode--;
                  if (self.countCode <= 0) {
                    clearInterval(si);
                    self.countCode = 60;
                  }
                }, 1000);
              }
        );
      },
      bindingPhone() {
        const self = this;
        self.isShowPhone = false;
        if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
          this.$dialog.toast({ mes: "请输入正确的手机号码", icon: "error" });
          return;
        }
        if (this.verifyCode == "") {
          this.$dialog.toast({ mes: "请输入收到的验证码" });
          return;
        }
        this.post(
          "user/baseInfo/bindingPhone",
          { userId: this.userId,phone: this.phoneNum, validateCode: this.verifyCode },
          function(e) {
            console.log("e=");
            console.log(e);
            if (e.errCode != 200) {
              self.$dialog.toast({ mes: e.errMsg, icon: "error" });
              return;
            }
            self.$dialog.toast({ mes: e.errMsg, icon: "success" });
            return;
            

          }
        );
      },
      cancel(){
         const self = this;
         self.isShowPhone=false;
      },
  },
  mounted() {
   
    const self = this;
    //获取 http://www.ygtqzhang.cn:8090/plaza/dynamic?login=1&userId='+ this.userId 中用户id
    let queryUserId = self.$route.query.userId;
    let errCode = self.$route.query.errCode;
    console.log("errCode=",errCode);
    if(queryUserId != null && queryUserId != undefined && queryUserId != "") {
         console.log(queryUserId);
         //this.userId=queryUserId;
         if(errCode && (errCode==200 || errCode=='200') ){
           self.setUserId(queryUserId);
           self.$dialog.toast({ mes: "绑定微信成功", icon: "success" });
         } else {
            self.$dialog.toast({ mes: "绑定微信失败", icon: "error" });
         }
         

    }
    if (!this.userId) {
      this.$router.push("/");
    } else {
      this.getUserInfo();
      this.getDynamic();
      //这个认证放在一个对话框中
      // this.identityAuthenticationHint();
      // this.baseHint();
      
    }

    const app = document.getElementById("app");
    app.addEventListener("scroll", function(e) {
      let scrollHeight = app.scrollHeight;
      let appHeight = app.clientHeight;
      let apptHeight = app.scrollTop;
      if (
        apptHeight + appHeight + 1 > scrollHeight &&
        self.flag &&
        self.$route.path == "/plaza/dynamic"
      ) {
        self.flag = false;
        self.getDynamic();
      }
    });
  }
};
</script>
<style lang="less" scoped>
.c-send .w100 {
  min-height: 60px;
}
.actionBox {
}
.actionBox .flex {
  width: 25%;
}
.s-select {
  color: #888888;
  width: 95%;
  margin: auto;
}
.s-select span {
  width: 20%;
  text-align: center;
}
.s-active {
  background: #866ef0;
  color: #ffffff;
  border-radius: 20px;
  font-weight: bold;
}
.iconsousuo {
  position: absolute;
  right: 0;
}
.li-comment {
  background: #f9f9f9;
  border-radius: 3px;
  padding: 0 10px;
}
.li-comment div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.c-i-name {
  color: #0168c3;
}
.c-close {
  position: absolute;
  right: 2%;
  top: 0;
  width: 20px;
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
.showComment {
  transform: translateY(0);
}
.c-input {
  width: 70%;
  padding: 0 10px;
  background: #ffffff;
}
.c-send {
  width: 20%;
}

.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #ffffff;
  z-index: 7;
  top: 0;
}
._search {
  width: 98%;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.25s;
}
._search-active {
  opacity: 1;
  transform: translateX(0);
}
.search {
  width: 90%;
  height: 35px;
  right: 1%;
  background: #ffffff;
  z-index: 2;
  border-radius: 20px;
}
.search i {
  color: #888888;
}
.search /deep/ input {
  width: 100%;
  display: flex;
  align-items: center;
}
._search .s-exit {
  width: 10%;
}
.container {
  .leftSolt {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: #fff;
      span {
        color: #ddd;
      }
      .active {
        color: #fff;
        font-weight: bolder;
      }
    }
  }
  .rightSolt {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: #fff;
      span {
        color: #ddd;
        // font-size: 15px;
      }
      .active {
        transition: all 0.25s;
        color: #fff;
        font-weight: bolder;
      }
    }
  }
  ul {
    display: flex;
    flex-flow: column;
    li {
      display: flex;
      margin-bottom: 0.3rem;
      display: flex;
      flex-flow: column;
      padding: 0.3rem;
      background: #fff;
      .wrap {
        align-items: flex-start;
        .i-img {
          width: 20%;
          img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 50%;
          }
        }
        .i-body {
          width: 80%;
          .fourInfo {
            i {
              font-size: 9px;
            }
          }
          .belowBlock {
            .actionBox {
              .icon80 {
                width: 65%;
                span {
                  // min-width: 45px;
                  text-align: left;
                }
                /deep/ i {
                  font-size: 20px;
                }
              }
              .icon20 {
                width: 10%;
              }
            }
          }
        }
      }

      .belowBlock {
        .imgBox {
          overflow: hidden;
          margin: 0.3rem 0;
          display: flex;
          flex-flow: wrap;
          //   img {
          //     width: 3.6rem;
          //   }
          img {
            width: 32%;
            max-height: 3rem;
            object-fit: cover;
            margin: 0 1% 1% 0;
            &:nth-child(3n) {
              margin: 0;
            }
          }
        }
      }
      .actionBox {
        display: flex;
        border-top: 1px solid #f1f1f1;
        & > span {
          margin-right: 0.4rem;
        }
        & > i {
          margin-right: 0.4rem;
        }
      }
    }
  }
  .publishBtn {
    position: fixed;
    right: 0.5rem;
    bottom: 2rem;
    width: 1rem;
    height: 1rem;
    color: #fff;
    border-radius: 50%;
  }
}
.container ul li .belowBlock .imgBox1 img {
  width: 100%;
  max-height: 6rem;
}
</style>
