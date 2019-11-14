<template>
  <div class="content">
 


   <div class="b-item flexa w95">
      <h4 class="bold flexa">基本信息</h4>
      <p class="grey fsmall">-填写越多越能匹配您心仪对象</p>
    </div>
    <div class="b-item flexs">
      <div class="b-name">身高(cm)</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="您的身高单位CM"  v-model="info.stature"  type="number" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
      </div>
    </div>
    <div class="b-item flexs">
      <div class="b-name">年龄(岁)</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="您的年龄"   v-model="info.age"  type="number" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
      </div>
    </div>
    <div class="b-item flexs">
      <div class="b-name">体重(千克)</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="您的体重(千克)"   v-model="info.weight"  type="number" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
      </div>
    </div>
    <div class="b-item flexs">
      <div class="b-name">性别</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-radio-group class="flexe" v-model="info.gender">
              <yd-radio class="flex sex" val="男">男</yd-radio>
              <yd-radio class="flex sex" val="女">女</yd-radio>
          </yd-radio-group>
        </div>
      </div>
    </div>
    <div class="b-item flexs">
      <div class="b-name">婚史</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle" @click="openSelect('marriedStatus')">
          <yd-input placeholder="请选择"  :class="{none:info.marriedStatus=='保密'}"  v-model="info.marriedStatus" disabled   :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs" @click="openAddr('nativePlace')">
      <div class="b-name">户口所在地</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择" disabled v-model="info.nativePlace" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs"  @click="openAddr('area')">
      <div class="b-name">居住地</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择" disabled v-model="info.area" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs">
      <div class="b-name">公司名</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请填写您供职公司名" v-model="info.company" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
      </div>
    </div>
    <div class="b-item flexs">
      <div class="b-name">行业</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="您填写您所在行业"  v-model="info.industry"    :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
      </div>
    </div>
    <div class="b-item flexs">
      <div class="b-name">月薪(元)</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="您月薪"   type="number" v-model="info.salary" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
      </div>
    </div>
    <div class="b-item flexs"   @click="openSelect('housing')">
      <div class="b-name">住房</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择"  :class="{none:info.housing=='保密'}"   disabled v-model="info.housing"  :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs"  @click="openSelect('automobile')">
      <div class="b-name">汽车</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择"  :class="{none:info.automobile=='保密'}"   disabled v-model="info.automobile" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs"   @click="openSelect('smoke')">
      <div class="b-name">吸烟</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择"  :class="{none:info.smoke=='保密'}"   disabled v-model="info.smoke" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs" @click="openSelect('drink')">
      <div class="b-name">喝酒</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择"  :class="{none:info.drink=='保密'}"   disabled v-model="info.drink" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs"  @click="openSelect('playGame')">
      <div class="b-name">打游戏</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择" :class="{none:info.playGame=='保密'}"  disabled v-model="info.playGame"  :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs" @click="openSelect('hopeMarriedTime')">
      <div class="b-name">期望结婚时间</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择"  disabled v-model="info.hopeMarriedTime"  :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs"  @click="openSelect('lonelinessIndex')">
      <div class="b-name">孤独指数</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择"  disabled v-model="info.lonelinessIndex" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>
    <div class="b-item flexs"   @click="openSelect('isCookDinner')">
      <div class="b-name">是否会厨艺</div>
      <div class="b-input flexs">
        <div class="_b-input fmiddle">
          <yd-input placeholder="请选择"  disabled v-model="info.isCookDinner" :show-error-icon="false" :show-success-icon="false"></yd-input>
        </div>
        <i class="iconfont2 fbig">&#xe6d2;</i>
      </div>
    </div>

    <div class="b-item b-item-no"></div>
    <div class="b-item b-item-no"></div>
    <div class="b-item b-item-no"></div>

    <div class="bottom b-item-no flex">
      <div class="flex themeBg w90 submit fbig" @click="submit">
        保存
      </div>
    </div>

    <yd-popup v-model="selectShow"  height="50%">
      <div class="w90 s-tip"><h6 class="bold"><i class="iconfont2 fmiddle">&#xe653;</i>请选择</h6></div>
       <div class="s-item flex fmiddle" v-for="(d,i) in selectData" :key="i" :val="i" @click="selected(d,i)">{{d}}</div>
    </yd-popup>
    <yd-cityselect v-model="addrShow" :callback="addrResult" :items="district"></yd-cityselect>
  </div>

</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import District from "ydui-district/dist/jd_province_city_id.js";

export default {
  name: "",
  data() {
    return {
      info: [],
      district: District,
      marriedStatus: [
        "保密",
        "无婚史",
        "离异无孩",
        "离异有孩",
        "丧偶无孩",
        "丧偶有孩"
      ],
      housing: [
        "保密",
        "有房有贷",
        "有房无贷",
        "需要时购房",
        "暂未购房",
        "与父母同住"
      ],
      automobile: ["保密", "暂未购车", "经济型车", "中档型车", "豪华型车"],
      smoke: ["保密", "从不吸烟", "偶尔吸烟", "经常吸烟", "应酬吸烟"],
      drink: ["保密", "从不喝酒", "偶尔喝酒", "经常喝酒", "应酬喝酒"],
      playGame: ["保密", "从不打游戏", "偶尔打游戏", "经常打游戏"],
      hopeMarriedTime: ["1年内", "2年内"],
      lonelinessIndex: [
        "偶尔想找个人聊",
        "看电影想找个人",
        "生病想找个人",
        "吃饭想找个人",
        "想结束单身"
      ],
      isCookDinner: ["不会做", "不太会", "一般", "还可以", "满意", "非常好"],
      selectData: [],
      selectType: "",
      addrType: "",
      selectShow: false,
      addrShow: false,
      selectok: ""
    };
  },
  methods: {
    submit() {
      if (!this.chooseData()) return;
      const self = this;
      this.$dialog.loading.open("保存中..");
      const data = {
        userId: this.userId,
        stature: this.info.stature,
        weight: this.info.weight,
        age: this.info.age,
        gender: this.info.gender,
        marriedStatus: this.info.marriedStatus,
        nativePlace: this.info.nativePlace,
        area: this.info.area,
        company: this.info.company,
        industry: this.info.industry,
        salary: this.info.salary,
        housing: this.info.housing,
        automobile: this.info.automobile,
        smoke: this.info.smoke,
        drink: this.info.drink,
        playGame: this.info.playGame,
        hopeMarriedTime: this.info.hopeMarriedTime,
        lonelinessIndex: this.info.lonelinessIndex,
        isCookDinner: this.info.isCookDinner
      };
      this.post("user/extendInfo/editAndUpdate", data, function(e) {
        self.$dialog.loading.close();
        if (e.errCode != 200) {
          self.$dialog.toast({ mes: e.errMsg });
          return;
        }
        //personalDetail
        //self.$router.go(-1)
        self.$dialog.toast({
          mes: "保存成功",
          timeout: 2000,
          callback: () => {
            self.$router.push({
              path: "/personal/personalDetail"
            });
          }
        });
      });
    },
    chooseData() {
      if (!this.info.stature) {
        this.$dialog.toast({ mes: "请填写您的身高" });
        return;
      }
      // if (!this.info.marriedStatus) {
      //   this.$dialog.toast({ mes: "请选择您的婚史" });
      //   return;
      // }
      if (!this.info.nativePlace) {
        this.$dialog.toast({ mes: "请选择您户口所在地" });
        return;
      }
      if (!this.info.area) {
        this.$dialog.toast({ mes: "请选择您当前居住地" });
        return;
      }
      if (!this.info.housing) {
        this.$dialog.toast({ mes: "请选择您住房状况" });
        return;
      }
      return true;
    },
    addrResult(e) {
      this.info[this.addrType] = e.itemName1 + " " + e.itemName2;
    },
    openAddr(type) {
      this.addrType = type;
      this.addrShow = true;
      this.selectShow = false;
    },
    openSelect(type) {
      this.selectType = type;
      this.selectData = this[type];
      this.selectShow = true;
      this.addrShow = false;
    },
    selected(data, index) {
      this.info[this.selectType] = this[this.selectType][index];
      this.selectShow = false;
    },
    getUserInfo2() {
      const self = this;
      this.get("user/extendInfo/get", this.userId, function(e) {
        if (e.errCode != 200) {
          return;
        }
        self.info = e.data;
      });
    }
  },

  components: {},
  computed: {
    ...mapState(["userId"])
  },

  mounted() {
    this.getUserInfo2();
    document.getElementById("app").scrollTop = 0;
  }
};
</script>
<style  scoped>
.bottom {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #f5f5f5;
  z-index: 8;
}
.content {
  background: #ffffff;
}
.s-item {
  min-height: 45px;
}
.s-tip {
  line-height: 4;
  font-size: 15px;
}
.submit {
  margin: 20px auto;
  height: 43px;
  border-radius: 1rem;
  color: #ffffff;
}
.sex {
  margin-left: 25px;
}
.b-item h4 {
  line-height: 4;
}
.b-item {
  min-height: 50px;
  width: 90%;
  margin: auto;
  border-bottom: 1px solid #f1f1f1;
}
.b-name {
  font-size: 14px;
  width: 30%;
}
.b-input {
  width: 70%;
}
._b-input {
  width: 100%;
}
/deep/ input {
  color: #000000;
  text-align: right;
}
.yd-input /deep/ input {
  color: #f09d00;
}
.none /deep/ input {
  color: #7b7b7b;
}
._b-input input {
  font-size: 15px;
}
.b-input i {
  font-size: 15px;
}
.b-item-no {
  border: none;
}
</style>
