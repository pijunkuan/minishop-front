
<template>
<div 
	class="shop-icon"
	:class="[
		type + '-icon',
		size + '-icon',
		{
			'is-bordered':bordered,
			'is-rounded':rounded
		}
	]">
	<i 
		class="iconfont"
		:class="'icon-'+name"
	></i>
</div>
</template>

<script>
	export default{
		name: "ShopIcon",
		props:{
			name:String,
			type:{
				type:String,
				default:"default"
			},
			size:{
				type:String,
				default:"large"
			},
			bordered:{
				type:Boolean,
				default:false
			},
			rounded:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop-icon{
		text-align:center;
		border-width:1px;
		border-style:solid;
	}
	.max-icon{
		width:67px;
		height:67px;
		line-height:67px;
		border-width: 2px;
	}
	.max-icon i{
		font-size:50px;
	}
	.large-icon{
		width:60px;
		height:60px;
		line-height:60px;

	}
	.large-icon i{
		font-size:47px;
	}
	.medium-icon{
		width:50px;
		height:50px;
		line-height:50px;
	}
	.medium-icon i{
		font-size:40px;
	}
	.small-icon{
		width:37px;
		height:37px;
		line-height:37px;
	}
	.small-icon i{
		font-size: 28px;
	}

	.mini-icon{
		width:20px;
		height:20px;
		line-height:20px;
	}
	.mini-icon i{
		font-size: 15px;
	}

	.square-icon,.round-icon{
		color:#fff;
		@include element-background(1);
		@include element-border-color(1);
	}

	.square-icon{
		border-radius:0;
	}
	.square-icon.is-rounded{
		border-radius:5px;
	}
	.square-icon.is-rounded.max-icon{
		border-radius:15px;
	}
	.square-icon.is-rounded.large-icon{
		border-radius:10px;
	}
	.round-icon{
		border-radius:50%;
	}
	.default-icon{
		border:none;
		@include element-color(1);
	}
	.square-icon.is-bordered,.round-icon.is-bordered{
		background: none;
		@include element-color(1);
	}


</style>