<template>
    <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
        <div class="slide-img">
            <a :href="slides[nowIndex].href">
                <transition name="slide-trans">
                    <img v-if="isShow" :src="slides[nowIndex].src">
                </transition>
                <transition name="slide-trans-old">
                    <img v-if="!isShow" :src="slides[nowIndex].src">
                </transition>
            </a>
        </div>
        <h2>{{slides[nowIndex].title}}</h2>
        <ul class="slide-pages">
            <!-- <li @click="goto(prevIndex)">&lt;</li> -->
            <li v-for="(item,index) in slides" @click="goto(index)">
                <a :class="{on :index===nowIndex}"></a>
            </li>
            <!-- <li @click="goto(nextIndex)">&gt;</li> -->
        </ul>
    </div>
</template>
<script>
import { setTimeout, setInterval, clearInterval } from 'timers';
export default {
    props:{
        slides:{
            type:Array,
            // default:[]
        },
        inv:{
            type:Number,
            default:2000
        }
    },
    data(){
        return {
            nowIndex:0,
            isShow:true
        }
    },
    computed:{
        prevIndex(){
            if(this.nowIndex===0){
                return this.slides.length-1
            }
            else{
                return this.nowIndex-1
            }
        },
        nextIndex(){
            if(this.nowIndex===this.slides.length-1){
                return 0
            }
            else{
                return this.nowIndex+1
            }
        }
    },
    methods:{
        goto(index){
            this.isShow=false;
            setTimeout(()=>{
                this.isShow=true;
                this.nowIndex=index;
            });
        },
        runInv(){
          // if(this.slides.length > 1){
            this.invId=setInterval(()=>{
                this.goto(this.nextIndex)
            },this.inv);

          // }
        },
        clearInv(){
            clearInterval(this.invId)
        }
    },
    mounted(){
        this.runInv();
    }
}
</script>
<style lang="less" scoped>
.slide-show{
    height: 4.5rem;
    position: relative;
    overflow: hidden;
    .slide-img{
        height:100%;
        width:100%;
        .slide-trans-enter-active{
            transition: all .5s;
        }
        .slide-trans-enter {
            transform: translateX(3rem);
        }
        .slide-trans-old-leave-active {
            transition: all .5s;
            transform: translateX(3rem);
        }
        img{
            height:100%;
            width:100%;
            object-fit: cover;
        }
    }
    .slide-pages{
        position: absolute;
        bottom: 0.1rem;
        width: 2rem;
        margin-left: -1rem;
        left:50%;
        // right:50%;
        li{
            display: inline-block;
            padding: 0 0.2rem;
            cursor: pointer;
            color: #ad6cef;
            font-size: 16px;
            a{
                display: inline-block;
                width:0.1rem;
                height:0.1rem;
                background-color: #000;
                border-radius: 50%;
            }
            .on{
                background-color:#ad6cef;

            }
        }
    }

}

</style>
