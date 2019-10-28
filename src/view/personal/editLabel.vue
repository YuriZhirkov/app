<template>
  <div class="label">
    <topComponent title='我的标签' :showLeft='true'>
    </topComponent>

    <div class="item" v-for="(d,i) in list" :key="i">
      <div class="w90">
        <h5>{{i}}</h5>
        <div class="i-body">
          <yd-checklist  v-model="labels[i]">
            <yd-checklist-item :val="d1.id" v-for="(d1,i1) in d" :key="i1">
                <div >{{d1.descWord}}</div>
            </yd-checklist-item>
          </yd-checklist>
        </div>
      </div>
    </div>

    <div class="item item-none"></div>
    <div class="item"></div>


    <div class="bottom w100 flex">
      <div class="flex submit themeBg" @click="submit">确定</div>
    </div>




  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      list:[],
      labels:{}
    };
  },
  methods: {
    submit(){
        let arr = []
        for (let i in this.labels) {
          if(this.labels[i].length < 1)continue
          for (let i2 in this.labels[i]) {
              arr.push(this.labels[i][i2])
          }
        }
  

        if(arr.length < 1){
          this.$dialog.toast({mes:'选点自己喜欢的标签吧！'})
          return
        }

        const self = this
        this.post('label/my/set',{userId:this.userId,ids:arr},function(e){
          if(e.errCode != 200){
            self.$dialog.toast({mes:e.errMsg,icon:'error'})
            return
          }

          self.$dialog.toast({mes:'设置成功',icon:'success'})
          self.$router.go(-1)
        })
    },
    getLabel(){
      const self = this
      this.get('label/my/get',this.userId,function(e){
          if(!e)return
          if(e.errCode != 200){
            self.$dialog.toast({mes:e.errMsg,icon:'error'})
            return
          }

          self.list = e.data
          for (let i in e.data) {
            self.$set(self.labels,i,[])
          }
          console.log(self.list);

          self.hasLabel(self.list)

      })
    },
    hasLabel(list){
      if(!list) return
      for (let i in list) {
        for (let i2 in list[i]) {
            if(list[i][i2].isEnable == 0){
              this.labels[i].push(list[i][i2].id)
            }
        }
      }
    }
  },

  components: {},
  computed:{
	  ...mapState(['userId'])
  },

  mounted() {
    this.getLabel()
  },

};
</script>
<style  scoped>
  .bottom{
    background: #FFFFFF;
    /* height: 50px; */
    z-index: 8;
    position: fixed;
    bottom: 0;
  }
  .submit{
    height: 43px;
    width: 80%;
    border-radius: 1rem;
    color: #FFFFFF;
    margin: 10px auto;
  }
  .label{
    /* background: #FFFFFF; */
  }
  .item{
    background: #FFFFff;
    padding: 20px 0;
    margin-bottom: 8px;
    font-size: 15px;
  }
  /deep/ .yd-checklist-icon{
    width: 16px;
    height: 16px;
  }
  /deep/ .yd-checklist-item{
    align-items: center;
    border: 1px solid #f1f1f1;
    border-radius: 1rem;
    height: 35px;
    padding: 0 10px;
    margin: 10px 20px 10px 0;
  }
  /deep/ .yd-checklist{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .item-none{
    margin: auto;
  }
</style>
