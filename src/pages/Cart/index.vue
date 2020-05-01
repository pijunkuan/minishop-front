<template>
<div>
    <page-loading :loading="loading"></page-loading>
    <div class="cart-functional">
        <shop-checkbox v-model="selectAll" @change="checkAll">全选</shop-checkbox>
        <div>编辑</div>
    </div>
    <div class="cart-list">
        <div class="cart-list-item" v-for="(item,index) in items" :key="index">
            <shop-checkbox v-model="selected" :label="item.id"></shop-checkbox>
            <shop-image :src="item.src" rounded type="fit" :width="80">
                <div class="cart-image-placeholder" slot="error"><i class="iconfont icontupian"></i></div>
                <div class="cart-image-placeholder" slot="placeholder"><i class="iconfont icontupian"></i></div>
            </shop-image>
            <div class="cart-list-item__info">
                <div class="cart-list-item__info-title">{{ item.title }}</div>
                <div class="cart-list-item__info-subtitle"><div>{{ item.variant.title }}</div></div>
                <div>¥ {{ item.price }}</div>
                <div>
                    <shop-input-num
                        :value="item.quantity"
                        :max="item.limit ? item.limit : item.stock"
                        :min="1"
                        :disabled="!item.stock"
                        @change="changeNum(item)">
                    </shop-input-num>
                </div>
            </div>
        </div>
    </div>
    <div class="cart-footer">
        <div>
            总计：<span>¥ <strong>{{ total }}</strong></span>
        </div>
        <div class="cart-footer-button"><shop-button size="medium">确认订单</shop-button></div>
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            loading:false,
            items:[
                { id:1, title:'测试商品', quantity:1, price:20, variant:{ title:'1件装'}},
                { id:2, title:'测试商品', quantity:1, price:20, variant:{ title:'1件装'}},
                { id:3, title:'测试商品', quantity:1, price:20, variant:{ title:'1件装'}},
                { id:4, title:'测试商品', quantity:1, price:20, variant:{ title:'1件装'}},
            ],
            selected:[],
            selectAll:false
        }
    },
    created(){
        this.getItems()
    },
    computed:{
        total(){
            let amount = 1
            return amount
        }
    },
    methods:{
        getItems(){
            this.loading = true
            setTimeout(()=>{
                this.loading = false
            },1000)
        },
        checkAll(){
            this.selected = []
            if(!this.selectAll) return
            this.items.map(v=>{
                this.selected.push(v.id)
            })
        },
        changeNum(item){
            console.log(item)
        }
    },
    watch:{
        selected:{
            deep:true,
            handler:function(){
                if(this.selected.length === 0) this.selectAll = false
                    else if(this.selected.length === this.items.length) this.selectAll = true
                        else if(this.selected.length !== this.items.length) this.selectAll = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.cart-functional{
    background-color:#fff;
    margin-bottom:10px;
    padding:5px;
    display:flex;
    font-size:$middle-font-size;
}
.cart-functional>div{
    flex:1;
}
.cart-functional>div:last-child{
    text-align:right;
}
.cart-list{
    background-color:#fff;
    margin:10px 0;
}
.cart-list-item{
    padding:10px;
    border-bottom:1px solid $line-color;
}
.cart-list-item>div{
    display:inline-block;
    vertical-align:middle;
}

.cart-image-placeholder{
    background-color:$line-color;
    border-radius:5px;
    height:80px;
}
.cart-image-placeholder i{
    font-size:24px;
    color:$disabled-color;
}

.cart-list-item__info{
    margin-left:10px;
    width:calc(100% - 118px);
}
.cart-list-item__info-title{
    font-size:$middle-font-size;
    line-height:$middle-font-height;
    max-height:$middle-font-height * 2;
    overflow:hidden;
    color:$main-font-color;
    margin-bottom:5px;
}
.cart-list-item__info-subtitle{
    font-size:$small-font-size;
    line-height:$small-font-height;
    height:$small-font-height;
    overflow:hidden;
    display:inline-block;
    padding:3px 7px;
    background-color:$line-color;
    border-radius:3px;
    color:$sub-font-color;
}
.cart-footer{
    position:fixed;
    display:flex;
    height:44px;
    bottom:0;
    right:0;
    left:0;
    padding:0 10px;
    background-color:#fff;
    border-top:1px solid $line-color;
    box-shadow: 0 -1px 5px 2px rgba(0,0,0,0.1);
}
.cart-footer>div{
    flex:1;
}
.cart-footer .cart-footer-button{
    text-align:right;
}
.cart-footer .cart-footer-button button{
    margin-top:4px;
    height:35px;
    border-radius:25px;
}
</style>