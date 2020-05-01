<template>
<div id="container">
    <div class="type-search">
        <div class="search-bar" :class="{'is-searching':visible}">
            <form action="" v-on:submit.prevent="">
                <shop-input
                    ref="searchbar"
                    :placeholder="'大家都在搜 ' + placeholder"
                    type="search"
                    size="small" 
                    v-model="search"
                    @focus="handleFocus"
                    @keyup.enter.native="getSearch">
                    <shop-icon slot="prepend" size="mini" name="sousuo"></shop-icon>
                </shop-input>
            </form>
        </div>
        <div v-if="visible" class="search-btn">
            <span @click="handelCancel">取消</span>
        </div>
    </div>
    <div class="type-menu">
        <div class="type-menu-bar">
            <div 
                class="type-menu-bar__item" 
                :class="{'is-active':activeIndex === index}"
                v-for="(menu,index) in menus" :key="index"
                @click="changeMenu(index)">
                <div>{{ menu }}</div>
            </div>
        </div>
        <div class="type-content" id="content">
            <infinite-column
                :loading="loading"
                :nomore="noresult"
                :items="items"
                :width="width"
                :height="height"
                @load="getItems"
                @cart="addCart">
                <div slot="button">
                    <div class="add-cart-button"><i class="iconfont iconjiahao"></i></div>
                </div>
            </infinite-column>
        </div>
    </div>
    <shop-popup
        :show="popShow"
        size="large"
        @close="closePop">
        <div slot="content">
            <div style="margin-bottom:20px">
                <shop-image class="pop-item-image" :src="currentItem.src" :width="100" rounded type="fit">
                    <div class="product-image-error" slot="error"><i class="iconfont icontupian"></i></div>
                </shop-image>
                <div class="pop-item-title">{{ currentItem.title }}</div>
            </div>
            <div class="pop-item-content">
                <div class="pop-item-content__title">选择规格</div>
                <div class="pop-item-content__content">
                    <div v-for="(variable,index) in currentItem.variants" :key="index">
                        <shop-radio 
                            type="button"
                            bordered rounded
                            size="medium"
                            v-model="selectId" 
                            :label="variable.id" 
                            @change="changeVariant(variable)">
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
                加入购物车
            </shop-button>
        </div>
    </shop-popup>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import InfiniteColumn from '@/components/Modules/ProductList/InfiniteColumn'
export default{
    components:{
        InfiniteColumn
    },
    data(){
        return{
            search:'',
            placeholder:'',
            visible:false,
            menus:['全部商品','护肤品','化妆品'],
            items:[{ src:'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp', title:'全部商品',subTitle:'全部商品', price:20, saletag:'新品',variants:[{id:1,title:'1件装',limit:1,stock:2},{id:2,title:'2件装',limit:null,stock:2}] },{ src:'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp', title:'全部商品', price:20, saletag:'新品' }],
            activeIndex:1,
            width:0,
            height:0,
            loading:false,
            noresult:false,
            popShow:false,
            currentItem:{
                variants:[]
            },
            selectVariant:{},
            selectId:null,
            selectNum:0,
            btnLoading:false
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.width = document.getElementById('content').offsetWidth
            this.height = document.getElementById('container').offsetHeight - 50
        })
    },
    methods:{
        changeMenu(index){
            this.activeIndex = index
            this.items = []
            this.nomore = false
            this.loading = true
            this.getItems()
        },
        getItems(){
            setTimeout(()=>{
                let _data = []
                for(let i = 0; i<= 10; i++){
                    _data.push(i)
                }
                if(_data.length === 0){
                    this.loading = true
                    this.noresult = true
                }else{
                    this.loading = false
                    this.noresult = false
                    this.items = this.items.concat(_data)
                }
            },1000)
        },
        addCart(val){
            this.currentItem = val
            if(val.variants !== undefined){
                this.selectVariant = val.variants[0]
                this.selectId = this.selectVariant.id
            }
            this.popShow = true
        },
        closePop(){
            this.popShow = false
            this.selectId = null
            this.selectVariant = {}
            this.selectNum = 1
        },
        confirmAdd(){
            this.btnLoading = true
            setTimeout(()=>{
                Toast('成功加入购物车')
                this.btnLoading = false
            },500)
        },
        getSearch(){

        },
        handleFocus(){
            this.visible = true
        },
        handelCancel(){
            this.$refs.searchbar.clear()
            this.search = ''
            this.visible = false
        },
        changeVariant(item){
            this.selectVariant = item
            this.selectId = item.id
            this.selectNum = 1
        },
        getNum(val){
            this.selectNum = val
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.type-search{
    padding:7px 6px;
    border-bottom:1px solid $line-color;
}
.search-bar{
    display:inline-block;
    width:100%;
}
.search-bar.is-searching{
    width:calc(100% - 40px);
}
.search-btn{
    display:inline-block;
    width:40px;
    font-size:14px;
    color:$other-font-color;
    text-align:center;
}

.type-menu{
    display:flex;
}
.type-menu-bar{
    width:70px;
    overflow-y:scroll;
}
.type-menu-bar__item{
    width:70px;
    height:40px;
    line-height:40px;
    border-bottom:1px solid $line-color;
}
.type-menu-bar__item div{
    font-size:$middle-font-size;
    height:40px;
    line-height:40px;
    overflow:hidden;
    text-align:center;
    flex:2;
}
.type-menu-bar__item.is-active{
    display:flex;
    background-color:#fff;
    @include base-color(1);
}
.type-menu-bar__item.is-active:before{
    content:'';
    position:relative;
    height:40px;
    width:3px;
    left:0;
    @include base-background(1);
}

.type-content{
    flex:2;
    background-color:#fff;
}

.add-cart-button{
    width:30px;
    height:30px;
    line-height:30px;
    text-align:center;
    border-radius:50%;
    color:#fff;
    box-shadow:0 0 5px 2px rgba(0,0,0,.2);
    @include element-background(1);
}
.add-cart-button i{
    font-size:20px;
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