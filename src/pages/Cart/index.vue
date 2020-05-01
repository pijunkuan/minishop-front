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
                <div>{{ item.variant.title }}</div>
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
    height:$middle-font-height * 2;
    overflow:hidden;
}
</style>