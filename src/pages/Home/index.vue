<template>
<div>
    <img-carousel :images="banners" :height="200"></img-carousel>
    <div class="page-block home-menu-block">
        <div v-for="(menu,index) in menus" :key="index" :style="{marginLeft: ((innerWidth - 20) / 4 - 60) / 2 + 'px', marginRight:((innerWidth - 20) / 4 - 60) / 2 + 'px'}">
            <div v-if="menu.src">
                <shop-image :width="60" :src="menu.src" circled type="fit"></shop-image>
            </div>
            <div v-else class="home-menu-block__placeholder" :style="{backgroundColor:menu.color}"></div>
            <div style="margin-top:8px">{{ menu.title }}</div>
        </div>
    </div>
    <marquee-msg v-if="message" class="page-block" :message="message"></marquee-msg>
    <item-block-limit
        class="page-block"
        title="限时打折"
        :loading="limitLoading"
        :items="limitItems"></item-block-limit>
    <item-block-column
        class="page-block"
        title="今日上新"
        :loading="colLoading"
        :items="colItems"></item-block-column>
    <item-block-mono
        v-if="ad1"
        class="page-block"
        :item="ad1"
        :loading="adLoading1"></item-block-mono>
    <img-txt-horizon
        v-if="scrollMenu.length !== 0"
        type="totaltext"
        :items="scrollMenu"
        :loading="menuLoading"></img-txt-horizon>
    <div class="text-title">你可能会喜欢</div>
    <infinite-list
        :loading="infLoading"
        :nomore="noresult"
        :items="infItems"
        :height="height"
        @load="getItems"></infinite-list>
</div>
</template>

<script>
import ImgCarousel from '@/components/Modules/ImgTxtBlock/ImgCarousel'
import MarqueeMsg from '@/components/Modules/ImgTxtBlock/MarqueeMsg'
import ItemBlockLimit from '@/components/Modules/ItemBlock/ItemBlockLimit'
import ItemBlockColumn from '@/components/Modules/ItemBlock/ItemBlockColumn'
import ItemBlockMono from '@/components/Modules/ItemBlock/ItemBlockMono'
import ImgTxtHorizon from '@/components/Modules/ImgTxtBlock/ImgTxtHorizon'
import InfiniteList from '@/components/Modules/ProductList/InfiniteList'
import { get_products } from '@/api/products'
export default{
    components:{
        ImgCarousel,
        MarqueeMsg,
        ItemBlockLimit,
        ItemBlockColumn,
        ItemBlockMono,
        ImgTxtHorizon,
        InfiniteList
    },
    data(){
        return{
            banners:[],
            menus:[
                { src:'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2995824214/O1CN01hf12Pk1h03Ur6i8mk_!!2995824214.jpg_250x250.jpg_.webp', title:'全部商品', color:'#409EFF' },
                { src:'', title:'新品上架', color:'#67C23A' },
                { src:'', title:'热销推荐', color:'#E6A23C' },
                { src:'', title:'更多', color:'#F56C6C' }
            ],
            innerWidth:0,
            message:'',
            limitLoading:false,
            limitItems:[],
            colLoading:false,
            colItems:[],
            ad1:null,
            adLoading1:false,
            scrollMenu:[],
            menuLoading:false,
            height:0,
            infLoading:false,
            noresult:false,
            infItems:[],
            fetchQuery:{
                page:0,
                Q4S:1,
                pageSize:15
            }
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.height = window.innerHeight
            this.innerWidth = window.innerWidth

        })
    },
    methods:{
        getItems(){
            this.infLoading = true
            this.noresult = false
            this.fetchQuery.page += 1
            get_products(this.fetchQuery).then(r=>{
                let _data = r.data.body.data
                if(_data.length === 0){
                    this.infLoading = true
                    this.noresult = true
                }else{
                    this.infLoading = false
                    this.noresult = false
                    this.infItems = this.infItems.concat(_data)
                }
            }).catch(()=>{
                this.infLoading = true
                this.noresult = true
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.page-block{
    margin:10px 0;
}

.home-menu-block{
    background-color:#fff;
    padding:15px 10px;
}
.home-menu-block>div{
    display:inline-block;
    width:60px;
    vertical-align:middle;
    text-align:center;
    font-size:$small-font-size;
    color:$sub-font-color;
}
.home-menu-block__placeholder{
    margin-bottom:5px;
    width:60px;
    height:60px;
    background-color:#000;
    border-radius:50%;
}
.text-title{
    padding:0 10px;
    line-height:40px;
    background-color:#fff;
    font-size:$middle-font-size;
    color:$main-font-color;
}
</style>