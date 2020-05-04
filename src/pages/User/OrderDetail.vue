<template>
<div>
    <page-loading :loading="loading"></page-loading>
    <div class="order-detail-content" :style="{height:height + 'px'}">
        <div class="order-detail-header">
            <div>
                <div>{{ order.status_value }}</div>
                <div class="order-detail-header-content" v-if="!loading">{{ order.status === 'pending' ? '您拍下的宝贝未支付，还在等着您哦～' : (order.status === 'processing' ? '订单已经接收，正在抓紧为您包装理货' : (order.status === 'sent' ? '包裹已经坐上火箭朝您飞来～' : (order.status === 'received' ? '宝贝已经到达，期待您留下宝贵意见' : (order.status === 'cancel' ? '订单已经取消' : '退换货正在处理中')))) }}</div>
            </div>
            <div>
                <i v-if="!loading" class="iconfont" :class="order.status === 'pending' ? 'icondaifukuan' : (order.status === 'processing' ? 'icondaifahuo' : (order.status === 'sent' ? 'icondaishouhuo' : (order.status === 'received' ? 'icondaipingjia' : (order.status === 'cancel' ? 'iconjianshao2' : 'iconshouhou'))))"></i>
            </div>
        </div>
        <div style="position:relative">
            <div class="order-detail-basic">
                <div><shop-icon name="dingwei" size="small"></shop-icon></div>
                <div>
                    <div><strong>{{ order.address.name }}</strong></div>
                    <div><strong>{{ order.address.mobile }}</strong></div>
                    <div class="order-detail-basic__address">{{ order.address.address }}</div>
                </div>
            </div>
        </div>
        <div class="order-detail-items">
            <div><strong>订单详情</strong></div>
            <div class="order-detail-items-item" v-for="(item,index) in order.items" :key="index">
                <div>
                    <shop-image :src="item.img_url" type="stretch" :width="60" rounded>
                        <div slot="error" class="order-detail-item-placeholder"></div>
                        <div slot="placeholder" class="order-detail-item-placeholder"></div>
                    </shop-image>
                </div>
                <div>
                    <div class="order-detail-items-item__title">{{ item.product_title }}</div>
                    <div class="order-detail-items-item__subtitle">{{ item.variant_title }}</div>
                    <div class="order-detail-items-item__price">¥ <strong>{{ item.price }}</strong></div>
                    <div class="order-detail-items-item__amount">x {{ item.quantity }}</div>
                </div>
            </div>
            <div class="order-detail-items-service"><shop-icon name="kefu" size="small"></shop-icon>联系客服</div>
        </div>
        <div class="order-detail-info">
            <div>
                <div><strong>订单编号</strong></div>
                <div>{{ $route.query.no }}</div>
            </div>
            <div>
                <div><strong>下单时间</strong></div>
                <div>{{ order.created_at }}</div>
            </div>
            <div>
                <div><strong>支付方式</strong></div>
                <div>
                    <div v-if="order.payments.length === 0"> - </div>
                    <div v-for="(payment,index) in order.payments" :key="index">
                        <div>{{ payments[payment.payment_method] }}</div>
                    </div>
                </div>
            </div>
            <div v-if="order.pay_at">
                <div><strong>支付时间</strong></div>
                <div>{{ order.pay_at }}</div>
            </div>
            <div>
                <div><strong>配送信息</strong></div>
                <div>
                    <div v-if="order.shipments.length === 0"> - </div>
                    <div v-for="(shipment,index) in order.shipments" :key="index">
                        <div>{{ shipment }}</div>
                    </div>
                </div>
            </div>
            <div v-if="order.send_at">
                <div><strong>配送时间</strong></div>
                <div>{{ order.send_at }}</div>
            </div>
        </div>
        <div class="order-detail-price">
            <div>
                <div><strong>商品总额</strong></div>
                <div>¥ <strong>{{ order.items_amount ? order.items_amount : '-' }}</strong></div>
            </div>
            <div>
                <div><strong>运费</strong></div>
                <div>¥ <strong>{{ order.shipments_amount ? order.shipments_amount : '-' }}</strong></div>
            </div>
            <div>
                <div><strong>优惠</strong></div>
                <div>¥ <strong>{{ order.discounts_amount ? order.discounts_amount : '-' }}</strong></div>
            </div>
            <div>
                <div>共 {{ order.total_quantity ? order.total_quantity : '-' }} 件商品，合计：<span>¥ <strong>{{ order.amount ? order.amount : '-' }}</strong></span></div>
            </div>
        </div>
    </div>
    <div class="order-detail-bottom" v-if="order.status !== 'cancel'">
        <shop-button size="small" v-if="order.status === 'sent'">确认收货</shop-button>
        <shop-button size="small" v-if="order.status !== 'pending' && order.status !== 'refunding'">退换货</shop-button>
        <shop-button size="small" v-if="order.status === 'pending'" :disabled="btnLoading" @click="toClose">关闭订单</shop-button>
    </div>
</div>
</template>

<script>
import { get_order, change_order_status } from '@/api/order'
import { Toast, MessageBox } from 'mint-ui'
export default{
    data(){
        return{
            loading:false,
            height:0,
            order:{
                address:{},
                items:[],
                payments:[],
                shipments:[]
            },
            btnLoading:false,
            payments:{
                wallet:'钱包支付'
            }
        }
    },
    created(){
        this.getDetail()
    },
    beforeRouteLeave(to,from,next){
        if(to.name === 'UserOrder') to.meta.keepAlive = true
            else to.meta.keepAlive = false
        next()
    },
    methods:{
        getDetail(){
            this.loading = true
            get_order(this.$route.query.no).then(r=>{
                this.order = r.data.body
                this.order['total_quantity'] = 0
                this.order.items.map(v=>{
                    this.order.total_quantity += v.quantity
                })
                this.order.payments = this.order.payments.filter((val)=>{return val.status === 'success'})
                if(this.order.status === 'cancel') this.height = window.innerHeight - 49
                    else this.height = window.innerHeight - 95
                this.loading = false
            }).catch(e=>{
                this.loading = false
                if(e.response.status === 401){
                    this.$store.dispatch('logout')
                    this.$router.push({name:'Login',query:{from:'UserOrder'}})
                }
            })
        },
        toClose(){
            MessageBox.confirm('是否确认关闭?').then(()=>{
                this.btnLoading = true
                change_order_status(this.$route.query.no,{status:'cancel'}).then(()=>{
                    Toast('订单已关闭')
                    this.getDetail()
                    this.btnLoading = false
                })
            }).catch(()=>{})
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.order-detail-content{
    overflow-y:scroll;
}

.order-detail-header{
    padding:20px 20px 50px;
    color:#fff;
    font-size:$large-font-size;
    @include base-background(1);
}
.order-detail-header-content{
    margin-top:10px;
    font-size:$small-font-size;
    color:$line-color;
}
.order-detail-header>div{
    display:inline-block;
    vertical-align:middle;
}
.order-detail-header>div:first-child{
    width:calc(100% - 50px);
}
.order-detail-header>div:last-child{
    width:50px;
    text-align:right;
}
.order-detail-header>div:last-child i{
    font-size:$special-font-size;
    @include base-color(3.5);
}

.order-detail-basic{
    position:absolute;
    margin:-30px 10px 10px;
    padding:10px;
    width:calc(100% - 40px);
    background-color:#fff;
    border-radius:8px;
    box-shadow:0 0 5px 3px rgba(0,0,0,0.1);
}
.order-detail-basic>div{
    display:inline-block;
    vertical-align:middle;
    font-size:$middle-font-size;
    color:$main-font-color;
}
.order-detail-basic>div:first-child{
    width:30px;
    margin-right:10px;
    text-align:center;
}
.order-detail-basic>div:last-child{
    width:calc(100% - 40px);
}

.order-detail-basic__address{
    line-height:$middle-font-height;
    height:$middle-font-height * 2;
    overflow:hidden;
}
.order-detail-items{
    margin:80px 0 10px;
    font-size:$middle-font-size;
    color:$main-font-color;
    background-color:#fff;
}
.order-detail-items>div:first-child{
    margin:0 10px;
    line-height:40px;
    border-bottom:1px solid $line-color;
}
.order-detail-items-item{
    padding:10px 0;
    margin:0 10px;
    border-bottom:1px solid $line-color;
}
.order-detail-items-item>div{
    display:inline-block;
    vertical-align:middle;
}
.order-detail-items-item>div:last-child{
    margin-left:10px;
    width:calc(100% - 70px);
}
.order-detail-item-placeholder{
    height:60px;
    width:60px;
    background-color:$line-color;
}
.order-detail-items-item__title{
    max-height:$middle-font-height * 2;
    line-height:$middle-font-height;
}
.order-detail-items-item__subtitle{
    color:$sub-font-color;
}
.order-detail-items-item__price{
    @include price-color(1);
}
.order-detail-items-item__price strong{
    font-size:$normal-font-size;
}
.order-detail-items-item__amount{
    color:$sub-font-color;
    text-align:right;
}
.order-detail-items-service{
    text-align:center;
    line-height:40px;
}
.order-detail-items-service .shop-icon{
    position:relative;
    top:2px;
    margin-right:3px;
}

.order-detail-info,.order-detail-price{
    margin:10px 0;
    background-color:#fff;
    padding:0 10px;
    font-size:$middle-font-size;
    color:$main-font-color;
}
.order-detail-price{
    padding:10px;
}
.order-detail-info>div{
    padding:10px 0;
    border-bottom:1px solid $line-color;
}
.order-detail-price>div{
    padding:5px 0;
}
.order-detail-info>div:last-child{
    border-bottom:none;
}
.order-detail-price>div:last-child{
    border-top:1px solid $line-color;
    text-align:right;
}
.order-detail-info>div>div,.order-detail-price>div>div{
    display:inline-block;
    vertical-align:top;
}
.order-detail-info>div>div:first-child,.order-detail-price>div>div:first-child{
    width:75px;
}
.order-detail-info>div>div:last-child,.order-detail-price>div>div:last-child{
    width:calc(100% - 75px);
}
.order-detail-price>div>div:last-child{
    text-align:right;
}

.order-detail-bottom{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    padding:10px;
    height:25px;
    border-top:1px solid $line-color;
    background-color:#fff;
    text-align:right;
    box-shadow:0 -1px 4px 2px rgba(0,0,0,0.1);
}
</style>