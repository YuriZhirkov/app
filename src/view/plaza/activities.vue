<template>
    <div class="container">
        <topComponent  :showLeft="false" title="活动">
          <!--  <div slot="left" class="leftSolt"  v-show="!swSearch">
                <router-link to='/personal/personalCenter'>
                    <i class="iconfont iconwode"></i>
                </router-link>
                <router-link to='/plaza/dynamic'>
                    <span :class="$route.path=='/plaza/dynamic'?'active':''">动态</span>
                </router-link>
            </div> -->
            <div slot="right" class="rightSolt"  v-show="!swSearch">
                <!-- <router-link to='/plaza/activities'>
                    <span :class="$route.path=='/plaza/activities'?'active':''">活动</span>
                </router-link> -->
                <i class="iconfont iconsousuo"  @click="tapSearch"></i>
            </div>
            <div slot='right' class="_search absolute flexs" :class="{'_search-active':swSearch}">
              <div class="search flex">
                <div class="s-select w100 flexs fmiddle h100" >
                  <span @click="selectIndex = 1" :class="{'s-active':selectIndex == 1}">全部</span>
                  <span @click="selectIndex = 2"  :class="{'s-active':selectIndex == 2}">同城</span>
                  <span  @click="selectIndex = 3" :class="{'s-active':selectIndex == 3}">自己</span>
                </div>
              </div>
              <div class="s-exit fsmall flex relative" @click="tapCancelSearch">取消</div>
            </div>
        </topComponent>
        <div>
            <ul>
               <li  v-for="(d,i) in list" :key="i">
                      <router-link :to="{path:'/plaza/activity/activityDetail',query:{aid:d.id}}">
                        <div class="flex i-img">
                          <img :src="d.activityPictureUrl" alt="">
                        </div>
                       </router-link>
                        <div class="flexs">
                          <p class="fbig">
                              <span class="activityStatus">{{d.isEnable==1?'【报名中】':'【已结束】' }}</span>{{d.activityTheme}}
                          </p>
                          <p v-if="userId == d.userId" @click="del(d.userId,d.id,i)">
                            <span class="fsmall red">删除</span>
                          </p>
                        </div>
                       <router-link :to="{path:'/plaza/activity/activityDetail',query:{aid:d.id}}">
                        <div class="fmiddle flexs">
                            <span>目的地：{{d.activityAddress}}</span>
                            <div class="flex red" v-if="d.activityCost">
                              <span>¥</span>
                              <span class="money">{{d.activityCost}}</span>
                            </div>
                        </div>
                        <div class="flexs">
                          <p class="fsmall grey">
                              <i class="iconfont2 fmiddle">&#xe68e;</i>
                              <span>发布日期{{d.activityStartTime|dateformat}}</span>
                          </p>
                          <p class="fsmall grey">
                              <i class="iconfont2 fmiddle">&#xe68e;</i>
                              <span>截止{{d.activityEndTime|dateformat}}</span>
                          </p>

                        </div>
                    </router-link>
               </li>
            </ul>
        </div>
        <footComponent></footComponent>

        <router-link to='/personal/issueActivity' v-if="user.role != 1 && user.role != 5">
            <div class="publishBtn themeBg"><i class="iconfont icontianjia"></i></div>
        </router-link>

    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "activities",
  props: {},
  components: {},
  computed: {
    ...mapState(["userId"])
  },
  data() {
    return {
      swSearch: false,
      list: [],
      flag: true,
      offset: 1,
      user: [],
      selectIndex: 1,
      firstIndex: 1
    };
  },

  watch: {
    selectIndex() {
      this.getActivities();
    }
  },
  methods: {
    
    del(uid, id, i) {
      if (confirm("是否删除活动")) {
        const self = this;
        this.post("activity/delete", { userId: uid, id: id }, function(e) {
          if (!e) return;
          if (e.errCode != 200) {
            self.$dialog.toast({ mes: e.errMsg, icon: "error" });
            return;
          }
          self.list.splice(i, 1);
          self.$dialog.toast({ mes: "删除成功" });
        });
      }
    },
    getActivities() {
      const self = this;
      if (self.selectIndex != self.firstIndex) {
        self.list = [];
        self.offset = 1;
        self.firstIndex = self.selectIndex;
      }
      this.post(
        "activity/search",
        {
          offset: this.offset,
          count: 20,
          userId: this.userId,
          type: this.selectIndex
        },
        function(e) {
          if (!e) return;
          if (e.errCode != 200) {
            // self.$dialog.toast({mes:e.errMsg,icon:'error'})
            self.$dialog.toast({ mes: "暂无更多活动", icon: "error" });
            return;
          }
          const data = e.data;
          self.offset++;

          for (let i in data) {
            self.list.push(data[i]);
          }
          console.log(self.list);
        }
      );
    },
    goDynamic() {
      this.$router.push("/plaza/dynamic");
    },
    tapSearch() {
      this.swSearch = true;
    },
    tapCancelSearch() {
      this.swSearch = false;
    },
    getUserInfo() {
      const self = this;
      this.post("user/baseInfo/moreInfo", { userId: this.userId }, function(e) {
        if (e.errCode != 200) {
          self.$dialog.toast({ mes: e.errMsg, icon: "error" });
          return;
        }
        self.user = e.data;
        console.log(self.user);
      });
    }
  },
  mounted() {
    if (!this.userId) {
      this.$router.push("/");
    } else {
      this.getActivities();
      this.getUserInfo();
      const self = this;
      const app = document.getElementById("app");
      app.addEventListener("scroll", function(e) {
        let scrollHeight = app.scrollHeight;
        let appHeight = app.clientHeight;
        let apptHeight = app.scrollTop;
        if (
          apptHeight + appHeight + 1 > scrollHeight &&
          self.flag &&
          "/plaza/activities" == self.$route.path
        ) {
          self.getActivities();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
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

.publishBtn {
  position: fixed;
  right: 0.5rem;
  bottom: 2rem;
  width: 1rem;
  height: 1rem;
  color: #fff;
  border-radius: 50%;
  .icontianjia {
    padding-left: 0.3rem;
    line-height: 1rem;
  }
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
.i-img {
  max-height: 230px;
  overflow: hidden;
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
  width: 50px;
}
.search /deep/ input {
  width: 90%;
  margin-left: 3%;
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
        font-size: 15px;
      }
      .active {
        color: #fff;
        font-weight: bolder;
      }
    }
  }
  .rightSolt {
    width: 6%;
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
}
ul {
  li {
    background-color: #fff;
    margin-bottom: 0.3rem;
    padding: 0.3rem;
    img {
      width: 100%;
      overflow: hidden;
    }
    p {
      margin-top: 0.2rem;
      .activityStatus {
        font-weight: bold;
      }
      .money {
        color: red;
      }
    }
  }
}
</style>
