<template>
    <div 
        class="shop-image"
        :style="{ height: height + 'px', width: width + 'px' ,lineHeight:height+'px'}"
        :class="[
            type + '-image',
            {
                'rounded':rounded
            }
        ]">
        <slot v-if="loading" name="placeholder">
            <div class="shop-image__placeholder">加载中...</div>
        </slot>
        <slot v-else-if="error" name="error">
            <div class="shop-image__error">加载失败...</div>
        </slot>
        <img
            v-else
            class="shop-image__inner"
            :src="src" />
    </div>
</template>

<script>
    export default{
        name:"ShopImage",
        props:{
            src:String,
            height:Number,
            width:Number,
            type:{
                type:String,
                default:"square"
            },
            rounded:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                loading:true,
                error:false,
                show:false,
            }
        },
        watch:{
            src(){
                this.loadImage()
            },
            show(val){
                val && this.loadImage()
            }
        },
        mounted(){
            this.loadImage()
        },
        methods:{
            loadImage(){
                if(this.$isServer) return
                this.loading=true
                this.error=false

                const img = new Image()
                img.onload = e => this.handleLoad(e)
                // img.onerror = this.handleError.bind(this)

                img.src = this.src

            },
            handleLoad(e) {
                this.loading = false
                console.log(e)
            },
            handleError(e) {
                console.log(e)
                this.loading = false
                this.error = true
                this.$emit('error', e)
            },
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/base.scss";
.shop-image__inner{
    max-width:100%;
    max-height:100%;
}
.shop-image{
    text-align: center;
}
.shop-image__placeholder,.shop-image__error{
    color:$other-font-color;
}
.round-image{
    display: inline-block;
    overflow: hidden;
    border-radius: 50%;
}


</style>