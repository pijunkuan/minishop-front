<template>
    <mt-swipe
        :show-indicators="indicator"
        :auto="auto"
        :speed="speed"
        :defaultIndex="index"
        :style="{height: (height ? height : width) + 'px' }">
        <mt-swipe-item v-if="images.length === 0">
            <slot></slot>
            <div 
                v-if="!$slots.default"
                class="image-carousel-placeholder"
                :style="{ height: (height ? height : styleWidth) + 'px', width: styleWidth + 'px' }">
            </div>
        </mt-swipe-item>
        <mt-swipe-item v-for="(item,index) in images" :key="index">
            <shop-image
                :src="item"
                :width="styleWidth"
                :height="height"
                :type="type">
                <div slot="error" class="image-carousel-placeholder" :style="{ height: (height ? height : styleWidth) + 'px', width: styleWidth + 'px'}"></div>
            </shop-image>
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default{
    props:{
        images:Array,
        indicator:{
            type:Boolean,
            default:true
        },
        auto:{
            type:Number,
            default:0,
        },
        speed:{
            type:Number,
            default:4000
        },
        index:{
            type:Number,
            default:0
        },
        width:{
            type:Number,
            default:0
        },
        height:{
            type:Number,
            default:300
        },
        type:{
            type:String,
            default:'center'
        }
    },
    data(){
        return{
            styleWidth:0
        }
    },
    watch:{
        width:{
            immediate:true,
            handler:function(){
                if(this.width) this.styleWidth = this.width
                    else this.styleWidth = window.innerWidth
            }
        }
    }
}
</script>

<style lang="scss">
.mint-swipe-indicator.is-active{
    @include element-background(1);
}
</style>
<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.image-carousel-placeholder{
    background-color:$line-color;
}
.swipe-image{
    display:block;
    transform:none;
}
</style>