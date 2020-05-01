<template>
<div>
	<page-loading :loading="loading"></page-loading>
	<!-- 顶部 -->
	<!-- 收件人 -->
	<div class="checkout-address">
		<!-- icon -->
		<div class="checkout-address-icon">
			<shop-icon name="ditu" size="small"></shop-icon>
		</div>
		<!-- 地址 -->
		<div v-if="address" class=checkout-address-info>
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
		<div v-else class=checkout-address-info>
			请选择地址
		</div>
	</div>
	<!-- 商品栏 -->
	<div>
		<!-- 商品详情 -->
		<div v-for="(item,index) in items" :key="index">
			<!-- 商品图片 -->
			<div>
				<shop-image :src="item.url" :width="100" type="fit" rounded></shop-image>
			</div>
			<!-- 商品文字 -->
			<div>
				<!-- 标题 -->
				<div>
					{{ item.product_title }} 
				</div>
				<!-- 规格 -->
				<div>
					{{ item.variant_title }}
				</div>
				<!-- 商品价格+数量 -->
				<div>
					<!-- 商品价格 -->
					<div>¥ {{ item.price }}</div>
					<!-- 商品数量 -->
					<div>x {{ item.quantity }}</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 价格统计 -->
	<div>
		<!-- 运费 -->
		<div>运   费：¥ {{ shipments_amount }}</div>
		<!-- 商品总计 -->
		<div>商品总计：¥ {{ items_amount }}</div>
	</div>
	<!-- 底部 -->
	<div>
		<!-- 价格总计 -->
		<div>
			总计：<span>¥ {{ total_amount }}</span>
		</div>
		<!-- 提交按钮 -->
		<div>
			<shop-button>提交订单</shop-button>
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
				discounts_amount:0
			}
		},
		created(){
			this.items=[
				{
					"product_title":"测试商品",
					"variant_title":"ceshi",
					"price":13,
					"quantity":1,
					"url":"//g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp"

				}
			]
		},
		computed:{
			total_amount(){
				return this.items_amount+this.shipments_amount-this.discounts_amount
			}
		}
	}
</script>

<style lang="scss" scoped>
	.checkout-address-icon{
		width: 40px;
		min-height: 100px;
		text-align: center;
		display: inline-block;
	}
	.checkout-address-icon div{
		line-height: 100px;
	}
	.checkout-address-info{
		display: inline-block;
	}
	.checkout-address-info>div>div{
		display:inline-block;
		vertical-align: middle;
	}
	.checkout-address-info>div>div:first-child{
		width:80px;
	}
</style>