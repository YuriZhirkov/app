<template>
  <div class="authHoustCar">
    <topComponent title='房车认证' :showLeft='true'>
      <!-- <span class="back" @click='goCancel' slot="left">取消</span> -->
    </topComponent>
    <div class="contentWrap">
        <div class="nameOption">
            <span>购车情况：</span>
            <select name="" id="" v-model="buyCarInfo">
                <option value="" selected disabled>购车信息</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="更多...">更多...</option>
            </select>
        </div>
        <div class="myDescr">
            <textarea maxlength="200" @input="descCarInput" v-model="carDescInfo" placeholder="可以简述您的车子或对购车面的看法，200字内..."/>
            <span>{{textareaWord1}}/200</span>
        </div>
        <p class="tripWord fmiddle">可上传您爱车照片</p>
        <div class="fileBox">
            <dl class="fmiddle">
                <dd>
                    <i v-if="!firstImageUrl" class="iconfont2">&#xeb55;</i>
                    <span v-if="!firstImageUrl">上传照片</span>
                    <input type="file" name="" @change="frontUpload($event)"  ref="frontInput"/>
                    <img v-if="firstImageUrl" :src="firstImageUrl" id="fistImg" class="uploadImg">
                </dd>
                <!-- <dt>证书正面</dt> -->
            </dl>
            <dl class="fmiddle">
                <dd>
                    <i v-if="!secondImageUrl" class="iconfont2">&#xeb55;</i>
                    <span v-if="!secondImageUrl">上传照片</span>
                    <input type="file" name="" @change="behindUpload($event)"  ref="behindInput"/>
                    <img v-if="secondImageUrl" :src="secondImageUrl" class="uploadImg">
                </dd>
                <!-- <dt>身份证反面</dt> -->
            </dl>
        </div>
        <div class="nameOption">
            <span>购房情况：</span>
            <select name="" id="" v-model="buyHouseInfo">
                <option value="" selected disabled>购房信息</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="更多...">更多...</option>
            </select>
        </div>
        <div class="myDescr">
            <textarea maxlength="200" @input="descHouseInput" v-model="houseDescInfo" placeholder="可以简述您的房子或对购房方面的看法，200字内..."/>
            <span>{{textareaWord2}}/200</span>
        </div>
        <div class="trip fsmall">
            <span>温馨提示：</span>
            打造100%真是交友平台，为了信息的真是准确定，每个人都需要完成实名认证才能开启交友功能
        </div>
        <div class="buttom">
            <button class="themeBg">确定</button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "authHoustCar",
  props: {},
  components: {},
  computed: {},
  data() {
    return {
      buyCarInfo: "",
      carDescInfo: "",
      buyHouseInfo: "",
      houseDescInfo: "",
      textareaWord1: 0,
      textareaWord2: 0,
      firstFile: "",
      secondFile: "",
      firstImageUrl: "",
      secondImageUrl: ""
    };
  },
  mounted() {
    // console.log(this.$route);
  },
  watch: {},
  methods: {
    descCarInput() {
      //   console.log("carDescInfo", this.carDescInfo);
      this.textareaWord1 = this.carDescInfo.length;
    },
    descHouseInput() {
      this.textareaWord2 = this.houseDescInfo.length;
    },
    frontUpload(event) {
      let inputDom = this.$refs.frontInput;
      // 通过DOM取文件数据
      this.firstFile = inputDom.files[0];
      console.log("firstFile", this.firstFile);
      if (this.firstFile) {
        let picname = this.firstFile.name;
        let picsize = this.firstFile.size / 1024 / 1024;
        let pictype = this.firstFile.type;
        // console.log('inputDom',event)
        // console.log(picname, picsize, picsizeM, pictype);
        let frReader = new FileReader();
        frReader.onload = () => {
          this.firstImageUrl = frReader.result;
          //  document.getElementById("fistImg").setAttribute = frReader.result
        };
        frReader.readAsDataURL(this.firstFile);
        // debugger
      } else {
        return false;
      }
    },
    behindUpload(event) {
      let inputDom = this.$refs.behindInput;
      this.secondFile = inputDom.files[0];
      if (this.secondFile) {
        let frReader = new FileReader();
        frReader.onload = () => {
          this.secondImageUrl = frReader.result;
        };
        frReader.readAsDataURL(this.secondFile);
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.authHoustCar {
  background: #fff;
  .contentWrap {
    .nameOption {
      margin-left: 0.24rem;
      display: flex;
      height: 1rem;
      line-height: 1rem;
      font-size: .25rem;
      border-bottom: 1px solid #ececec;
      select,option{
        font-size: .25rem;
        flex: 1;
        border: none;
      }
    }
    .myDescr {
      display: flex;
      flex-flow: column;
      padding: 0.24rem;
      textarea {
        margin-bottom: 0.2rem;
        border: 1px solid #eee;
        border-radius: 0.1rem;
        padding: 0.1rem;
        min-height: 2rem;
        font-size: .3rem;
      }
      span {
        text-align: right;
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
    .tripWord {
      padding: 0 0.24rem;
    }
    .fileBox {
      display: flex;
      justify-content: space-around;
      margin: 0.3rem 0;
      dl {
        text-align: center;
        dd {
          border: 1px solid #F7F7F7;
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
