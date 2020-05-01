<template>
<div>
	<page-loading :loading="loading"></page-loading>
	<div style="overflow-y:scroll" :style="{height:height + 'px'}">
		<div class="checkout-address">
			<div class="checkout-address-icon">
				<shop-icon name="ditu" size="small"></shop-icon>
			</div>
			<div v-if="address" class="checkout-address-info">
				<div>
					<div>收件人：</div>
					<div>{{ address.name }}</div>
				</div>
				<div>
					<div>联系方式：</div>
					<div>{{ address.mobile }}</div>
				</div>
				<div>
					<div>收货地址：</div>
					<div>{{ address.full_address }}</div>
				</div>
			</div>
			<div v-else class="checkout-address-info">请选择地址</div>
		</div>
		<div class="checkout-item-list">
			<div class="checkout-item-list-item" v-for="(item,index) in items" :key="index">
				<div>
					<shop-image :src="item.url" :width="100" type="fit" rounded></shop-image>
				</div>
				<div>
					<div class="checkout-item-list-item__title">{{ item.product_title }} </div>
					<div class="checkout-item-list-item__subtitle">{{ item.variant_title }}</div>
					<div class="checkout-item-list-item__price">¥ <strong>{{ item.price }}</strong></div>
					<div class="checkout-item-list-item__amount">x {{ item.quantity }}</div>
				</div>
			</div>
		</div>
		<div>
			<div>运   费：¥ {{ shipments_amount }}</div>
			<div>商品总计：¥ {{ items_amount }}</div>
		</div>
	</div>
	<div class="checkout-footer">
		<div>
			总计：<span>¥ <strong>{{ total_amount ? total_amount : '-' }}</strong></span>
		</div>
		<div>
			<shop-button :rounded="false">提交订单</shop-button>
		</div>
	</div>
</div>
</template>

<script>
	export default{
		data(){
			return {
				loading:false,
				address:{
					"name":"王小明",
					"mobile":"13800009999",
					"full_address":"重庆市 重庆市 沙坪坝区南开中学"
				},
				// address:null,
				items:[],
				items_amount:0,
				shipments_amount:0,
				discounts_amount:0,
				total_amount:0,
				height:0
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.height = window.innerHeight - 94
			})
		},
		created(){
			this.items=[
				{
					"product_title":"测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品",
					"variant_title":"ceshi",
					"price":13,
					"quantity":1,
					"url":"//g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp"

				},
				{
					"product_title":"测试商品",
					"variant_title":"ceshi",
					"price":13,
					"quantity":1,
					"url":"//g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp"

				},
				{
					"product_title":"测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品",
					"variant_title":"ceshi",
					"price":13,
					"quantity":1,
					"url":"//g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp"

				},
				{
					"product_title":"测试商品",
					"variant_title":"ceshi",
					"price":13,
					"quantity":1,
					"url":"//g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp"

				},
				{
					"product_title":"测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品",
					"variant_title":"ceshi",
					"price":13,
					"quantity":1,
					"url":"//g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp"

				},
				{
					"product_title":"测试商品",
					"variant_title":"ceshi",
					"price":13,
					"quantity":1,
					"url":"//g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp"

				}
			]
		}
	}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.checkout-address{
	margin-bottom:10px;
	padding:10px 5px;
	background-color:#fff;
}
.checkout-address>div{
	display:inline-block;
	vertical-align:middle;
}
.checkout-address-icon{
	width:40px;
	text-align:center;
}
.checkout-address-info{
	width:calc(100% - 40px);
	font-size:$middle-font-size;
	line-height:$middle-font-height;
	color:$main-font-color;
}
.checkout-address-info>div>div{
	display:inline-block;
}
.checkout-address-info>div>div:first-child{
	width:80px;
	vertical-align:top;
}
.checkout-address-info>div>div:last-child{
	width:calc(100% - 80px);
	vertical-align:top;
}

.checkout-item-list{
	margin-bottom:10px;
	background-color:#fff;
}
.checkout-item-list-item{
	margin:0 8px;
	padding:10px 5px;
	border-bottom:1px solid $line-color;
}
.checkout-item-list-item:last-child{
	border-bottom:none;
}
.checkout-item-list-item>div{
	display:inline-block;
	vertical-align:middle;
}
.checkout-item-list-item>div:last-child{
	width:calc(100% - 110px);
	margin-left:10px;
}
.checkout-item-list-item__title{
	font-size:$normal-font-size;
	color:$main-font-color;
	line-height:$normal-font-height;
	max-height:$normal-font-height * 2;
	overflow:hidden;
}
.checkout-item-list-item__subtitle{
	font-size:$middle-font-size;
	color:$sub-font-color;
	line-height:$middle-font-height;
	height:$middle-font-height;
	overflow:hidden;
}
.checkout-item-list-item__price{
	font-size:$small-font-size;
	@include price-color(1);
}
.checkout-item-list-item__price strong{
	font-size:$normal-font-size;
}
.checkout-item-list-item__amount{
	font-size:$middle-font-size;
	color:$main-font-color;
	text-align:right;
}

.checkout-footer{
	position:fixed;
	bottom:0;
	left:0;
	right:0;
	background-color:#fff;
	border-top:1px solid $line-color;
	box-shadow:0 -1px 5px 2px rgba(0,0,0,0.05);
}
.checkout-footer>div{
	display:inline-block;
	width:50%;
}
.checkout-footer>div:first-child{
	width:calc(50% - 10px);
	padding:0 5px;
	font-size:$small-font-size;
}
.checkout-footer>div:first-child span{
	@include price-color(1);
}
.checkout-footer>div:first-child span strong{
	font-size:$large-font-size;
}
</style>