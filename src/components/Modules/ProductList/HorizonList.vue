<template>
<div class="item-horizon-list">
    <div 
        v-if="loading && items.length === 0" 
        class="item-horizon-list__placeholder">
        加载中...
    </div>
    <div 
        v-if="!loading && items.length === 0" 
        class="item-horizon-list__error">
        <shop-icon class="item-horizon-list__error-icon" name="putong" size="small"></shop-icon>
        暂无结果
    </div>
    <ul class="item-horizon-list-content" v-if="!loading && items.length !== 0">
        <li v-for="(item,index) in items" :key="index" class="item-horizon-list__content">
            <div>
                <shop-image :src="item.src" :width="100" type="fit" rounded></shop-image>
            </div>
            <div>
                <div class="item-horizon-list__content-title">{{ item.title }}</div>
                <div>
                    <span class="item-horizon-list__content-price">¥ <strong>{{ item.price }}</strong></span>
                    <span class="item-horizon-list__content-oriprice">¥ {{ item.oriPrice }}</span>
                </div>
                <div class="item-horizon-list__content-sale">{{ item.sale }}人已抢</div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default{
    props:{
        items:Array,
        loading:Boolean
    },
    data(){
        return{
            imgWidth:0
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.item-horizon-list-content{
    margin:0;
    padding:0;
    width:100%;
    white-space:nowrap;
    overflow-x:scroll;
    overflow-y:hidden;
    background-color:#fff;
}
.item-horizon-list::-webkit-scrollbar{
    display:none;
}

.item-horizon-list__placeholder,.item-horizon-list__error{
    width:100%;
    text-align:center;
    @include base-color(3);
    background-color:#fff;
    height:110px;
    line-height:110px;
    font-size:$normal-font-size;
}
.item-horizon-list__error,.item-horizon-list__error-icon{
    color:$disabled-color!important;
}
.item-horizon-list__error-icon{
    vertical-align:middle;
    margin-top:-3px;
}

.item-horizon-list__content{
    display:inline-block;
    width:255px;
    margin:10px;
    height:100px;
    padding:10px 0;
    vertical-align:middle;
}
.item-horizon-list__content>div{
    display:inline-block;
    vertical-align:middle;
}
.item-horizon-list__content>div:last-child{
    width:calc(100% - 110px);
    margin-left:10px;
}

.item-horizon-list__content-title{
    margin-bottom:5px;
    font-size:$middle-font-size;
    line-height:$middle-font-height;
    max-height:$middle-font-height * 2;
    overflow:hidden;
    white-space:initial;
    color:$main-font-color;
}
.item-horizon-list__content-price{
    @include price-color(1);
    font-size:$small-font-size;
}
.item-horizon-list__content-price strong{
    font-size:$large-font-size;
}
.item-horizon-list__content-oriprice{
    margin-left:5px;
    color:$disabled-color;
    font-size:$small-font-size;
    text-decoration:line-through;
}
.item-horizon-list__content-sale{
    margin-top:5px;
    font-size:$small-font-size;
    color:$other-font-color;
}
</style>