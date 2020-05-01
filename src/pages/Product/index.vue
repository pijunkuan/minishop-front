<template>
<div>
    <div class="product-container">
        <page-loading :loading="loading"></page-loading>
        <img-carousel
            :height="width"
            :indicator="false"
            :images="item.images">
            <div class="product-item-placeholder" :style="{height:width + 'px',lineHeight:width + 'px'}">
                <i class="iconfont icontupian"></i>
            </div>
        </img-carousel>
        <div class="product-detail">
            <div class="product-detail-title">{{ item.title }}</div>
            <div class="product-detail-desc" v-if="item.desc">{{ item.desc }}</div>
            <div>
                <div class="product-detail-price">
                    <span class="product-detail-price__price">¥ <strong>{{ item.price ? item.price : '-' }}</strong></span>
                    <span class="product-detail-price__oriprice" v-if="item.oriprice">¥ {{ item.oriprice }}</span>
                </div>
            </div>
            <div class="product-detail-sale">{{ item.sale }}人已购买</div>
        </div>
        <div class="product-content" style="margin-bottom:0">
            <div class="product-content-title">商品详情</div>
            <div class="product-content-content">
                <div v-if="item.content">{{ item.content }}</div>
                <div style="height:100px"></div>
            </div>
        </div>
    </div>
    <div class="product-footer">
        <div class="product-footer-icon" @click="shareShow = true">
            <div>
                <shop-icon name="fenxiang" size="small" class="product-footer-icon__icon"></shop-icon>
                分享
            </div>
        </div>
        <div class="product-footer-button">
            <shop-button type="border" :rounded="false" @click="toAdd('direct')">立即购买</shop-button>
        </div>
        <div class="product-footer-button">
            <shop-button :rounded="false" @click="toAdd('cart')">加入购物车</shop-button>
        </div>
    </div>
    <shop-popup :show="shareShow"
        size="medium"
        @close="shareShow = false">
        <div slot="title">分享至</div>
        <div slot="content"></div>
        <div slot="button">
            <shop-button :rounded="false" @click="shareShow = false"><i class="iconfont iconguanbi" style="font-size:22px"></i></shop-button>
        </div>
    </shop-popup>
    <shop-popup :show="variantShow" @close="closeVariant">
        <div slot="content">
            <div style="margin-bottom:20px">
                <shop-image class="pop-item-image" :src="item.src" :width="100" rounded type="fit">
                    <div class="product-image-error" slot="error"><i class="iconfont icontupian"></i></div>
                </shop-image>
                <div class="pop-item-title">{{ item.title }}</div>
            </div>
            <div class="pop-item-content">
                <div class="pop-item-content__title">选择规格</div>
                <div class="pop-item-content__content">
                    <div v-for="(variable,index) in item.variants" :key="index">
                        <shop-radio 
                            type="button"
                            bordered rounded
                            size="medium"
                            v-model="selectId" 
                            :label="variable.id" 
                            @change="changeVariant(index)">
                            {{ variable.title }}
                        </shop-radio>
                    </div>
                </div>
            </div>
            <div class="pop-item-content pop-item-content-quantity">
                <div class="pop-item-content__title">选择数量</div>
                <div class="pop-item-content__content">
                    <shop-input-num
                        :value="selectNum"
                        :max="selectVariant.limit ? selectVariant.limit : selectVariant.stock"
                        :min="1"
                        :disabled="!selectVariant.stock"
                        @change="getNum">
                    </shop-input-num>
                </div>
            </div>
        </div>
        <div slot="button">
            <shop-button 
                :rounded="false" 
                :loading="btnLoading"
                :disabled="!selectVariant.stock" 
                @click="confirmAdd">
                确 定
            </shop-button>
        </div>
    </shop-popup>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import ImgCarousel from '@/components/Modules/ImgTxtBlock/ImgCarousel'
export default{
    components:{
        ImgCarousel
    },
    data(){
        return{
            loading:false,
            width:0,
            item:{
                images:[]
            },
            shareShow:false,
            variantShow:false,
            selectVariant:{},
            selectId:null,
            selectNum:1,
            btnLoading:false
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.width = window.innerWidth
        })
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail(){
            this.loading = true
            setTimeout(()=>{
                this.item = {
                    images:[],
                    title:'测试商品',
                    desc:'香港直邮，正品保证',
                    price:200,
                    oriprice:150,
                    sale:20,
                    variants:[{ id:1,title:'test', stock:20, limit:10 },{ id:2,title:'test2', stock:10, limit:null }]
                }
                this.loading = false
            },1000)
        },
        toAdd(type){
            if(this.item.variants.length > 1){
                this.variantShow = true
                this.selectVariant = this.item.variants[0]
                this.selectId = this.selectVariant.id
                return
            }
            if(this.item.variants[0].stock < 1){
                Toast('库存不足，逛逛别的吧')
                return
            }
            setTimeout(()=>{
                Toast('成功加入购物车')
                if(type === 'direct') this.$router.push({name:'Checkout'})
            },1000)
        },
        changeVariant(index){
            this.selectVariant = this.item.variants[index]
            this.selectId = this.selectVariant.id
            this.selectNum = 1
        },
        getNum(val){
            this.selectNum = val
        },
        closeVariant(){
            this.variantShow = false
            this.selectNum = 0
            this.selectVariant = {}
            this.selectId = null
        },
        confirmAdd(){

        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.product-container{
    position:absolute;
    top:0;
    right:0;
    left:0;
    bottom:44px;
    overflow-y:scroll;
}

.product-item-placeholder{
    text-align:center;
    background-color:$line-color;
}
.product-item-placeholder i{
    font-size:200px;
    color:$background-color;
}

.product-detail,.product-content{
    margin-bottom:10px;
    padding:10px;
    background-color:#fff;
}
.product-detail-title{
    font-size:$normal-font-size;
    font-weight:500;
    color:$main-font-color;
    line-height:$normal-font-height;
    max-height:$normal-font-height * 2;
    overflow:hidden;
}
.product-detail-desc{
    font-size:$small-font-size;
    color:$other-font-color;
    line-height:$small-font-height;
    max-height:$small-font-height * 2;
    overflow:hidden;
}

.product-detail-price__price{
    font-size:$small-font-size;
    @include price-color(1);
}
.product-detail-price__price strong{
    font-size:$large-font-size;
}
.product-detail-price__oriprice{
    margin-left:10px;
    font-size:$small-font-size;
    color:$disabled-color;
    text-decoration:line-through;
}

.product-detail-sale{
    margin:5px 0;
    font-size:$small-font-size;
    color:$other-font-color;
}

.product-footer{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    display:flex;
    height:44px;
    background-color:#fff;
}
.product-footer>div{
    vertical-align:middle;
}
.product-footer-icon{
    flex:1.5;
    line-height:44px;
    text-align:center;
    border-top:1px solid $line-color;
    font-size:$normal-font-size;
    color:$sub-font-color;
}
.product-footer-icon__icon{
    position:relative;
    top:2px;
}
.product-footer-button{
    flex:2;
}

.product-content-title{
    font-size:$middle-font-size;
    line-height:30px;
    border-bottom:1px solid $line-color;
}

.product-image-error{
    height:98px;
    border:1px solid $line-color;
    border-radius:5px;
    background-color:$background-color;
}
.product-image-error i{
    font-size:30px;
    color:$line-color;
}

.pop-item-image{
    display:inline-block;
    vertical-align:middle;
}
.pop-item-title{
    display:inline-block;
    vertical-align:middle;
    font-size:$normal-font-size;
    color:$main-font-color;
    margin-left:10px;
}

.pop-item-content{
    margin:10px 0;
    padding:20px 0 10px;
    border-top:1px solid $line-color;
}
.pop-item-content__title{
    font-size:$middle-font-size;
    color:$sub-font-color;
}
.pop-item-content__content{
    margin:10px 0;
}
.pop-item-content__content>div{
    display:inline-block;
    margin-bottom:5px;
}
.pop-item-content-quantity>div{
    display:inline-block;
    vertical-align:middle;
}
.pop-item-content-quantity>div:first-child{
    width:80px;
}
.pop-item-content-quantity>div:last-child{
    width:calc(100% - 80px);
    text-align:right;
}
</style>