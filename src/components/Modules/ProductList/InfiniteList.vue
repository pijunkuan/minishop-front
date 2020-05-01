<template>
<div :style="{height:height + 'px'}">
    <ul
        class="infinite-shop-list"
        :style="{height:height - 1 + 'px'}"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check>
        <li v-for="(item,index) in items" :key="index" :style="{width:width + 'px', height:width + 90 + 'px'}">
            <div>
                <shop-image :src="item.src" rounded type="fit" :width="width - 20">
                    <div class="product-image-error" :style="{height:width - 20 + 'px'}" slot="error"><i class="iconfont icontupian"></i></div>
                </shop-image>
            </div>
            <div>
                <div class="infinite-shop-content__title">{{ item.title }}</div>
                <div>
                    <span class="infinite-shop-content__price">¥ <strong>{{ item.price ? item.price : '-' }}</strong></span>
                    <span v-if="item.oriPrice" class="infinite-shop-content__oriprice">¥ {{ item.oriPrice }}</span>
                </div>
                <div class="infinite-shop-content__sale">{{ item.sale ? item.sale : 0 }}人已购买</div>
            </div>
        </li>
        <div
            v-if="!nomore"
            class="infinite-shop-list__placeholder">
            加载中...
        </div>
        <div 
            v-if="nomore"
            class="infinite-shop-list__error">
            没有更多了
        </div>
    </ul>
</div>
</template>

<script>
export default{
    props:{
        items:Array,
        height:{
            type:Number,
            default:500
        },
        loading:Boolean,
        nomore:Boolean
    },
    data(){
        return{
            width:0
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.width = window.innerWidth / 2 - 10
        })
    },
    methods:{
        loadMore(){
            this.$emit('load')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.infinite-shop-list__placeholder{
    height:50px;
    line-height:50px;
    font-size:$small-font-size;
    text-align:center;
    color:$other-font-color;
}
.infinite-shop-list__error{
    text-align:center;
    color:$disabled-color;
}
.infinite-shop-list__error-icon{
    display:block!important;
    color:$disabled-color!important;
    position:absolute;
    left:50%;
    margin-left:-20px;
}
.infinite-shop-list{
    margin:0;
    padding:0;
    list-style:none;
    overflow:scroll;
}
.infinite-shop-list li{
    display:inline-block;
    vertical-align:middle;
    margin:5px;
    overflow:hidden;
    background-color:#fff;
    border-radius:5px;
}
.infinite-shop-list li>div:first-child{
    padding:10px;
}
.infinite-shop-list li>div:last-child{
    padding:0 6px;
}
.infinite-shop-content__title{
    font-size:$middle-font-size;
    line-height:$middle-font-height;
    height:$middle-font-height * 2;
    overflow:hidden;
    word-break:break-all;
    color:$main-font-color;
}
.infinite-shop-content__price{
    font-size:$small-font-size;
    @include price-color(1);
}
.infinite-shop-content__price strong{
    font-size:$large-font-size;
}
.infinite-shop-content__oriprice{
    margin-left:5px;
    font-size:$small-font-size;
    color:$disabled-color;
    text-decoration:line-through;
}
.infinite-shop-content__sale{
    font-size:$small-font-size;
    color:$other-font-color;
    text-align:right;
}

.product-image-error{
    border-radius:5px;
    background-color:$background-color;
}
.product-image-error i{
    font-size:30px;
    color:$line-color;
}
</style>