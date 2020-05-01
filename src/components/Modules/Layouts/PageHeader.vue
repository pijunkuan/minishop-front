<template>
<div class="shop-header">
    <div class="shop-header-left">
        <shop-icon name="shangyiye" size="medium" type="square"></shop-icon>
    </div>
    <div class="shop-header-title">
        <slot name="title"></slot>
    </div>
    <div class="shop-header-right">
        <slot name="right"></slot>
    </div>
</div>
</template>

<script>
export default{
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.shop-header{
    height:49px;
    @include base-background(1);
}
.shop-header-left,.shop-header-title,.shop-header-right{
    display:inline-block;
    vertical-align:middle;
}
.shop-header-left{
    margin-top:3.5px;
}
.shop-header-right{
    width:39px;
}
.shop-header-title{
    width:calc(100% - 84px);
    text-align:center;
    color:#fff;
    font-size:$large-font-size;
    line-height:49px;
    overflow:hidden;
}
</style>