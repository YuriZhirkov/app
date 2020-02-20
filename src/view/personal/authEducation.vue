<template>
  <div class="authEducation">
    <topComponent title='学历认证' :showLeft='true'>
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
    </topComponent>
    <div class="contentWrap">
        <div class="formWrap">
            <template>
                <yd-cell-item>
                    <span slot="left">学校名：</span>
                    <yd-input slot="right" required v-model="info.schoolName" max="20" placeholder="请输入学校名"></yd-input>
                </yd-cell-item>
                <div class="nameOption fmiddle" @click="show1 = true">
                    <span>学历：</span>
                    <span class="grey" v-if="!info.educationalBackground">请选择</span>
                    <span v-if="info.educationalBackground">{{info.educationalBackground}}</span>
                </div>
                <!-- <yd-cell-item>
                    <span slot="left">学历证书编号：</span>
                    <yd-input slot="right" type="text" v-model="info.educationalNum" placeholder="请输入学历证书编号"></yd-input>
                </yd-cell-item> -->
            </template>
        </div>
        <!-- <div class="fileBox">
            <dl class="fmiddle">
                <dd class="fmiddle">
                    <i v-if="!cover1" class="iconfont2">&#xeb55;</i>
                    <span v-if="!cover1">上传照片</span>
                    <input type="file" name="" @change="frontUpload($event)"  ref="frontInput"/>
                    <img v-if="cover1" :src="cover1" id="fistImg" class="uploadImg">
                </dd>
                <dt>学历证书照片</dt>
            </dl>
        </div> -->
        <div class="trip fsmall">
            <span>温馨提示：</span>
            打造100%真是交友平台，为了信息的真是准确定，每个人都需要完成实名认证才能开启交友功能
        </div>
        <div class="buttom">
            <button class="themeBg" @click="submit">确定</button>
        </div>


        <yd-actionsheet :items="items" v-model="show1" cancel="取消"></yd-actionsheet>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "authEducation",
  props: {},
  components: {},
  computed: { ...mapState(["userId"]) },
  data() {
    return {
      info: {
        educationalBackground: "",
        schoolName: "",
        educationalNum: ""
        // educationalUrl: ""
      },
      // cover1: "",
      items: [
        { label: "博士", callback: () => this.selected("博士") },
        { label: "硕士", callback: () => this.selected("硕士") },
        { label: "学士", callback: () => this.selected("学士") },
        { label: "大专", callback: () => this.selected("大专") },
        { label: "高中及以下", callback: () => this.selected("高中及以下") }
      ],
      show1: false
    };
  },
  mounted() {
    this.getInfo();
    //this.baseHint();
  },
  watch: {},
  methods: {
    getInfo() {
      const self = this;
      this.post(
        "user/baseInfo/get/authentication",
        { visitorId: this.userId },
        function(e) {
          if (e.errCode != 200) return;
          const d = e.data;

          self.info.educationalBackground = d.educationalBackground;
          self.info.schoolName = d.schoolName;
          self.info.educationalNum = d.educationalNum;
          // self.info.educationalUrl = d.educationalUrls;
          // self.cover1 = d.educationalUrls;
        }
      );
    },
    submit() {
      if (!this.chooseData()) return;
      const self = this;
      this.info.userId = this.userId;
      this.post(
        "user/baseInfo/educationBackgroundAuthentication",
        this.info,
        function(e) {
          if (e.errCode != 200) {
            self.$dialog.toast({ mes: e.errMsg, icon: "error" });
            return;
          }
          self.$dialog.toast({ mes: "提交成功 请等待审核", icon: "success" });
          let jump = self.$route.query.jump;
          if (!!jump && jump == 1) {
            self.$router.push("/plaza/dynamic?login=1");
          } else {
            self.$router.go(-1);
          }
        }
      );
    },
    chooseData() {
      if (!this.info.schoolName) {
        this.$dialog.toast({ mes: "请输入您学校名称" });
        return;
      }
      if (!this.info.educationalBackground) {
        this.$dialog.toast({ mes: "请选择您的学历" });
        return;
      }
      // if (!this.info.educationalNum) {
      //   this.$dialog.toast({ mes: "请输入您学历证书编号" });
      //   return;
      // }
      // if (!this.info.educationalUrl) {
      //   this.$dialog.toast({ mes: "请上传学历证书照片" });
      //   return;
      // }
      return true;
    },
    selected(e) {
      this.info.educationalBackground = e;
    },
    frontUpload(e) {
      if (!e.target.files[0]) return;
      const file = e.target.files[0];
      this.uploadImg(file);
    },

    uploadImg(file) {
      const self = this;
      const fd = new FormData();
      fd.append("file", file);
      axios({
        method: "post",
        url: this.host + "file/upload",
        data: fd
      })
        .then(function(e) {
          if (e.data && e.data.errCode != 200) {
            self.$dialog.toast({ mes: e.data.errMsdg, icon: "erroe" });
            return;
          }
          self.info.educationalUrl = "";
          self.info.educationalUrl = e.data.data;
          self.cover1 = e.data.data;
        })
        .catch(function(e) {
          if (!e) return;
          if (e.data && e.data.errCode != 200) {
            self.$dialog.toast({ mes: e.data.errMsdg, icon: "erroe" });
            return;
          }
          self.info.educationalUrl = "";
          self.info.educationalUrl = e.data.data;
        });
    },
    // baseHint() {
    //   const self = this;
    //   this.get(
    //     "user/extendInfo/hint",
    //     {
    //       userId: this.userId
    //     },
    //     res => {
    //       if (res.errCode == 200) {
    //         let status = res.data.substr(0, 2);
    //         if (status == "01") {
    //           let noAuth = res.data.substr(3);
    //           self.msg = noAuth;
    //           self.flag = 1;
    //         }
    //       }
    //     }
    //   );
    // }
  }
};
</script>
<style lang="less" scoped>
.authEducation {
  background: #fff;
  .contentWrap {
    .formWrap {
      .nameOption {
        margin-left: 0.24rem;
        display: flex;
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #ececec;
        select {
          flex: 1;
          border: none;
          font-size: 0.25rem;
        }
      }
      .verifCode {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 0.24rem;
        border-bottom: 1px solid #ececec;
        margin-left: 0.24rem;
        .yd-cell-item {
          padding-left: 0;
          &:after {
            height: 0;
          }
        }
        span {
          width: 30%;
        }
      }
    }
    .fileBox {
      display: flex;
      justify-content: space-around;
      margin-top: 0.3rem;
      dl {
        text-align: center;
        dd {
          border: 1px solid #f7f7f7;
          background: #f8f9fd;
          width: 2.4rem;
          height: 2.4rem;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 0.1rem;
          cursor: pointer;
          position: relative;
          i {
            font-size: 1rem;
            line-height: 1;
            color: #999999;
          }
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
            width: 2.4rem;
            height: 2.4rem;
            display: block;
            border-radius: 0.1rem;
          }
        }
        dt {
          margin-top: 0.2rem;
        }
      }
    }
    .trip {
      padding: 0 0.2rem;
      margin: 0.3rem 0 0.6rem;
      color: #999;
      span {
        color: #333;
      }
    }
    .buttom {
      text-align: center;
      padding-bottom: 0.4rem;
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
