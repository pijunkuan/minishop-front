<template>
<div>
    <div class="item-block-5__title">
        <div class="item-block-5__title-title">{{ title }}</div>
        <div class="item-block-5__title-time">
            <div class="item-time-timeblock">{{ day }}</div>
            <div>:</div>
            <div class="item-time-timeblock">{{ hour }}</div>
            <div>:</div>
            <div class="item-time-timeblock">{{ minute }}</div>
            <div>:</div>
            <div class="item-time-timeblock">{{ second }}</div>
        </div>
    </div>
    <horizon-list :items="items" :loading="loading"></horizon-list>
</div>
</template>

<script>
import HorizonList from '../ProductList/HorizonList'
export default{
    components:{
        HorizonList
    },
    props:{
        title:String,
        items:Array,
        endTime:String,
        loading:Boolean
    },
    data(){
        return{
            day:0,
            hour:0,
            minute:0,
            second:0,
            end: this.endTime ? new Date(this.endTime) : new Date()
        }
    },
    mounted(){
        if(!this.endTime) return
        this.timeCount()
    },
    methods:{
        getTime(){
            let _now = new Date()
            let _left = this.end.getTime() - _now.getTime()
            this.day = Math.floor(_left / 1000 / 60 / 60 / 24).toFixed(0)
            this.hour = Math.floor(_left / 1000 / 60 / 60 - this.day * 24).toFixed(0)
            this.minute = Math.floor(_left / 1000 / 60 - this.hour * 60 - this.day * 24 * 60).toFixed(0)
            this.second = Math.floor(_left / 1000 - this.minute * 60 - this.hour * 60 * 60 - this.day * 24 * 60 * 60).toFixed(0)
        },
        timeCount(){
            setTimeout(()=>{
                this.timeCount()
                this.getTime()
            },1000)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.item-block-5__title{
    padding:10px;
    border-bottom:1px solid $line-color;
    background-color:#fff;
    font-size:$normal-font-size;
    color:$main-font-color;
}
.item-block-5__title-title,.item-block-5__title-time{
    display:inline-block;
}
.item-block-5__title-title{
    width:calc(100% - 120px);
}
.item-block-5__title-time{
    font-size:$small-font-size;
    width:120px;
    text-align:right;
}
.item-block-5__title-time>div{
    display:inline-block;
    vertical-align:middle;
}
.item-time-timeblock{
    margin:0 2px;
    width:20px;
    height:20px;
    line-height:20px;
    text-align:center;
    background-color:$sub-font-color;
    color:#fff;
}
.item-time-timeblock:last-child{
    @include sale-background(1);
}
</style>