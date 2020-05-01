<template>
<div>
    <div class="item-block-2__title">{{ title }}</div>
    <div class="item-block-2__placeholder" v-if="loading && items.length === 0">加载中...</div>
    <div class="item-block-2__error" v-if="!loading && items.length === 0">暂无结果</div>
    <div class="item-block-2__content" v-for="(item,index) in items" :key="index">
        <div>
            <shop-image style="margin-top:15px" :src="item.src" :width="80" type="fit" circled></shop-image>
        </div>
        <div>
            <div class="item-block-2__content-title">{{ item.title }}</div>
            <div v-if="item.subTitle"><span class="item-block-2__content-subtitle">{{ item.subTitle }}</span></div>
            <div class="item-block-2__content-hot">{{ item.sale }}人已购买</div>
            <div class="item-block-2__content-price">¥ <strong>{{ item.price }}</strong></div>
        </div>
    </div>
</div>
</template>

<script>
export default{
    props:{
        title:{
            type:String,
            default:'精选商品'
        },
        subTitle:{
            type:String,
            default:'selected'
        },
        items:Array,
        loading:Boolean
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.item-block-2__title{
    padding:10px;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    border-bottom:1px solid $line-color;
    background-color:#fff;
    font-size:$normal-font-size;
    color:$main-font-color;
}
.item-block-2__placeholder,.item-block-2__error{
    background-color:#fff;
    height:390px;
    line-height:390px;
    text-align:center;
    font-size:$normal-font-size;
    @include element-color(3);
}
.item-block-2__error{
    color:$disabled-color!important;
}
.item-block-2__content{
    height:120px;
    padding:5px 10px;
    background-color:#fff;
}
.item-block-2__content:after{
    position:absolute;
    content:'';
    left:0;
    margin-top:125px;
    width:100%;
    border-bottom:1px solid $line-color;
}
.item-block-2__content>div{
    display:inline-block;
    height:110px;
    vertical-align:middle;
}
.item-block-2__content>div:last-child{
    width:calc(100% - 95px);
    margin-left:15px;
    padding:5px 0;
    height:110px;
}
.item-block-2__content-title{
    font-size:$middle-font-size;
    line-height:$middle-font-height;
    height:$middle-font-height * 2;
    overflow:hidden;
    word-break:break-all;
    color:$main-font-color;
}
.item-block-2__content-subtitle{
    padding:3px 5px;
    border-radius:25px;
    font-size:$mini-font-size;
    line-height:$mini-font-height;
    height:$mini-font-height;
    overflow:hidden;
    color:#fff;
    @include sale-background(1);
    opacity:0.8;
}
.item-block-2__content-hot{
    font-size:$mini-font-size;
    margin-top:10px;
    line-height:$mini-font-height;
    color:$other-font-color;
}
.item-block-2__content-price{
    margin-top:3px;
    font-size:$middle-font-size;
    @include price-color(1);
}
.item-block-2__content-price strong{
    font-size:$large-font-size;
}
</style>