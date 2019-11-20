<template>
  <div class="authIdentity">
    <topComponent title="身份认证" :showLeft="true">
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
    </topComponent>
    <div class="contentWrap">
      <div class="formWrap">
        <template>
          <yd-cell-item>
            <span slot="left">您的姓名</span>
            <yd-input slot="right" required v-model="info.realName" max="20" placeholder="请输入用户名"></yd-input>
          </yd-cell-item>
          <div class="nameOption flexa w100 fmiddle">
            <yd-radio-group v-model="info.gender" size="20" class="small flex">
              <yd-radio class="flex" val="男">男</yd-radio>
              <yd-radio class="flex" val="女">女</yd-radio>
            </yd-radio-group>
          </div>
          <yd-cell-item>
            <span slot="left">微信</span>
            <yd-input slot="right" v-model="info.weChat" placeholder="请输入微信号"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">QQ</span>
            <yd-input slot="right" type="number" v-model="info.qq" placeholder="请输入QQ号"></yd-input>
          </yd-cell-item>
          <yd-cell-item  v-if="isShowPhone">
                <span slot="left">手机号：</span>
                <yd-input
                  slot="right"
                  v-model="info.phone"
                  required
                  regex="mobile"
                  placeholder="请输入手机号码"
                ></yd-input>
          </yd-cell-item>
          <yd-cell-item v-if="isShowPhone">
                <span
                  @click="getPhoneValidateCode"
                  slot="right"
                >{{countCode != 60 ? '重新发送'+countCode+'秒':'验证码'}}</span>
                <yd-input slot="left" 
                  :show-error-icon="false"
                  :show-success-icon="false"
                  regex="^\d{5,12}$"
                  v-model="info.validateCode" placeholder="校验码"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">身份证号</span>
            <yd-input slot="right" v-model="info.idCare" placeholder="请输入身份证号"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">出生日期</span>
            <yd-datetime :start-year="1970" type="date" v-model="info.dateOfBirth" slot="right"></yd-datetime>
          </yd-cell-item>
          
        </template>
      </div>
      <div class="fileBox">
        <dl>
          <!-- <div class="fileBox" @click="$refs.inputer.click()"> -->
          <dd class="fmiddle">
            <i v-if="!cover1" class="iconfont2 grey">&#xeb55;</i>
            <span v-if="!cover1">上传照片</span>
            <input type="file" name @change="frontUpload($event)" ref="frontInput" />
            <img v-if="cover1" :src="cover1" id="fistImg" class="uploadImg" />
          </dd>
          <dt class="fmiddle">身份证正面</dt>
        </dl>
        <dl>
          <dd class="fmiddle">
            <i v-if="!cover2" class="iconfont2 grey">&#xeb55;</i>
            <span v-if="!cover2">上传照片</span>
            <input type="file" name @change="behindUpload($event)" ref="behindInput" />
            <img v-if="cover2" :src="cover2" class="uploadImg" />
          </dd>
          <dt class="fmiddle">身份证反面</dt>
        </dl>
      </div>
      <div class="trip fsmall">
        <span>温馨提示</span>
        打造100%真是交友平台，为了信息的真是准确定，每个人都需要完成实名认证才能开启交友功能
      </div>
      <div class="buttom">
        <button class="themeBg" @click="submit">完成</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "authIdentity",
  props: {},
  components: {},
  computed: {},
  data() {
    return {
      code: "",
      cover1: "",
      cover2: "",
      info: {
        dateOfBirth: "1990-10-10",
        idCareUrl: [],
        validateCode: "",
        phone: ""
      },
      flag: 0,
      msg: "",
      countCode: 60,
      isShowPhone: 0
    };
  },
  watch: {},
  methods: {
    submit() {
      const self = this;
      let arr = [];
      arr.push(this.cover1);
      arr.push(this.cover2);

      this.info.idCareUrl = arr;
      if (!this.chooseData()) return;
      const data = {
        userId: this.userId,
        realName: this.info.realName,
        gender: this.info.gender,
        idCare: this.info.idCare,
        idCareUrl: arr,
        phone: this.info.phone,
        validateCode: this.info.validateCode,
        dateOfBirth: this.info.dateOfBirth,
        weChat: this.info.weChat,
        flag: this.isShowPhone,
        qq: this.info.qq
      };
      this.post("user/baseInfo/identityAuthentication", data, function(e) {
        if (e.errCode != 200) {
          self.$dialog.toast({ mes: e.errMsg, icon: "error" });
          return;
        }
        // self.$dialog.toast({ mes: "提交成功 请等待审核", icon: "success" });
        // setTimeout(function(){
        // this.educationBackgroundAuthenticationHint();
        //判断一下jump 是否为1
        // jump = 1 调用用 educationBackgroundAuthenticationHint

        let jump = self.$route.query.jump;
        let msg = self.msg;
        console.log("submit-jump");
        console.log(jump);
        console.log("submit-msg");
        console.log(msg);
        console.log("submit-self.flag");
        console.log(self.flag);

        if (!!jump && jump == 1) {
          if (self.flag == 1) {
            self.$dialog.toast({
              mes: msg,
              timeout: 1000,
              callback: () => {
                self.$router.push({
                  path: "/personal/authEducation",
                  query: { jump: 1 }
                });
              }
            });
          } else {
            router.push("/personal/personalDetail");
          }
        } else {
          // 否则调用
          self.$router.go(-1);
        }

        // },3000)
        // self.$router.push('/personal/authEducation')
      });
    },
    getPhoneValidateCode() {
      const self = this;
      let phone = self.info.phone;
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.$dialog.toast({ mes: "请输入正确的手机号码", icon: "error" });
        return;
      }
      if (this.countCode != 60) return;

      this.get("user/baseInfo/getPhoneValidateCode", { phone: phone }, function(
        e
      ) {
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
      });
    },
    chooseData() {
      if (!this.info.realName) {
        this.$dialog.toast({ mes: "请填写您的姓名" });
        return;
      }
      if (!this.info.idCare) {
        this.$dialog.toast({ mes: "请填写您的身份证号码" });
        return;
      }
      if (!this.info.gender) {
        this.$dialog.toast({ mes: "请选择您的性别" });
        return;
      }
      if (!this.info.idCareUrl) {
        this.$dialog.toast({ mes: "请上传您的身份证正反面照片" });
        return;
      }
      if (!this.info.idCareUrl[0] || !this.info.idCareUrl[1]) {
        this.$dialog.toast({ mes: "请上传您的身份证正反面照片" });
        return;
      }
      if (!this.info.dateOfBirth) {
        this.$dialog.toast({ mes: "请选择您的出生日期" });
        return;
      }
      if (this.isShowPhone == 1) {
        if (!this.info.phone) {
          this.$dialog.toast({ mes: "请填写手机号" });
          return;
        }
        if (!this.info.validateCode) {
          this.$dialog.toast({ mes: "请填写验证码" });
          return;
        }
      }
      if (!this.info.weChat) {
        this.$dialog.toast({ mes: "请填写您的微信号" });
        return;
      }

      if (!this.info.qq) {
        this.$dialog.toast({ mes: "请填写您的QQ" });
        return;
      }
      return true;
    },

    frontUpload(e) {
      if (!e.target.files[0]) return;
      const file = e.target.files[0];

      this.uploadImg(file, 0);
    },
    behindUpload(e) {
      const file = e.target.files[0];
      this.uploadImg(file, 1);
    },
    uploadImg(file, i) {
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
          if (i == 0) {
            self.cover1 = e.data.data;
          } else if (i == 1) {
            self.cover2 = e.data.data;
          }
        })
        .catch(function(e) {
          if (!e) return;
          if (e.data && e.data.errCode != 200) {
            self.$dialog.toast({ mes: e.data.errMsdg, icon: "erroe" });
            return;
          }
          if (i == 0) {
            self.cover1 = e.data.data;
          } else if (i == 1) {
            self.cover2 = e.data.data;
          }
        });
    },
    getInfo() {
      const self = this;
      
      this.post(
        "user/baseInfo/get/authentication",
        { visitorId: this.userId },
        e => {
          if (!e) return;
          if (e.errCode != 200) return;
          
          const d = e.data;
          self.info = d;

          const t = d.dateOfBirth;
          self.info.dateOfBirth = t;
       
          if (d.phone == undefined || d.phone == "" || d.phone == null) {
            self.isShowPhone = 1;
          } 
          // console.log();
          /*
        realName:this.info.realName,
        gender:this.info.gender,
        idCare:this.info.idCare,
        IdCareUrl:this.info.IdCareUrl,
        // phone:this.info.phone,
        dateOfBirth:this.info.dateOfBirth,
        weChat:this.info.weChat,
        qq:this.info.qq
        */
          // self.info.realName = d.realName
          // self.info.gender = d.gender
          // self.info.idCare = d.idCare
          // self.info.phone = d.phone
          // self.info.weChat = d.weChat
          // self.info.qq = d.qq
          // debugger
          if (typeof d.idCareUrl == "string") {
            // ''  null unde !!
            if (d.idCareUrl) {
              let urls = d.idCareUrl + "";
              let imgUrl = urls.split(";");
              self.cover1 = imgUrl[0];
              self.cover2 = imgUrl[1];
            }
          } else {
            self.cover1 = "";
            self.cover2 = "";
          }
        }
      );
    },
    educationBackgroundAuthenticationHint() {
      const self = this;
      this.get(
        "user/baseInfo/educationBackgroundAuthentication/hint",
        {
          userId: this.userId
        },
        res => {
          console.log("res", res);
          if (res.errCode == 200) {
            let status = res.data.substr(0, 2);
            if (status == "00" || status == "02") {
              let noAuth = res.data.substr(3);
              self.flag = 1;
              self.msg = noAuth;
            }
          }
        }
      );
    }
  },
  mounted() {
    this.getInfo();
    this.educationBackgroundAuthenticationHint();
  },
  computed: { ...mapState(["userId"]) }
};
</script>
<style lang="less" scoped>
/deep/ .yd-cell-left {
  width: 23%;
}
.authIdentity {
  background: #fff;
  overflow: hidden;
  width: 100%;
  .contentWrap {
    .formWrap {
      .nameOption {
        .small {
          margin-left: 23%;
          .yd-radio {
            min-width: 2rem;
            justify-content: flex-start;
          }
        }
        margin-left: 0.24rem;
        display: flex;
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #ececec;
        select,
        option {
          color: #555;
          border: none;
          display: flex;
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
          width: 2.4rem;
          height: 2.4rem;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 0.1rem;
          background: #f8f9fd;
          cursor: pointer;
          position: relative;
          i {
            font-size: 0.8rem;
            line-height: 1;
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
