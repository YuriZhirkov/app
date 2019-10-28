<template>
  <div class="c">
    <topComponent title='回答' :showLeft='true'>

      <div class="fmiddle issue absolute bold"  slot="right"><i class="iconfont2">&#xe61e;</i></div>
    </topComponent>
     <div class="_item">
       <div class="w92">
         <div class="title flexa bold">
          <div class="fbig bold">{{title}}</div>
         </div>
        </div>
     </div>




    <div class="w100">
         <quill-editor
                   v-model="content"
                   ref="myQuillEditor"
                   :options="editorOption"
                   @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                   @change="onEditorChange($event)">
         </quill-editor>

    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      title:'如何看待6.18日曾轶可在首都机场鱼安检人员发送政治意识?',
      content:'',
      editorOption: {
        placeholder: '对问题补充说明，可以更快获得解答(选填)',
            modules:{
                toolbar:[
                  ['bold'],    //加粗，斜体，下划线，删除线
                  [{ 'header': [2, 3, 4, 5, 6, false] }],     //几级标题
                  ['image','video']    //上传图片、上传视频
                ]
              },
              theme:'snow'
            },

    };
  },
  methods: {
    onEditorBlur(){

    },
    onEditorFocus(){

    },
    onEditorChange(){

    }
  },

  components: {},
  compute:{
	  ...mapState([])
  },

  mounted() {},

};
</script>
<style  scoped>
  /deep/ .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: 300px;
  }
  /deep/ .ql-toolbar.ql-snow{
        padding: 0;
        position: fixed;
        bottom: 0;
        height: 47px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: #f8f9fd;
  }
  /deep/ .ql-editor.ql-blank::before{
    color: #bdbdbd;
  }
  /deep/ .ql-snow .ql-picker.ql-expanded .ql-picker-options{
    bottom: 100%;
    top: inherit;
  }
  .c{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
  }
  .issue{
    right: 5%;
  }
  .title{
    height: 80px;
  }
  ._item{
    border-bottom: 8px solid #f1f1f1;
  }
  .title /deep/ input{
    font-weight: bold;
    font-size: 18px;
  }
  /deep/ ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  			color: #bdbdbd;
  }
</style>
