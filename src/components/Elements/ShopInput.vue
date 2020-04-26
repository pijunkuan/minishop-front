<template>
<div>
    <div>
        <div v-if="$slots.prepend" class="input-prepend"><slot name="prepend"></slot></div>
        <input 
            ref="input"
            v-bind="$attrs"
            :type="type"
            class="shop-input"
            :class="[
                size + '-input',
                {
                    'is-rounded':rounded,
                    'is-bordered':bordered,
                }
            ]"
            :disabled="disabled"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
        />
        <span v-if="showClear">
            <i class="iconfont icon-close" @click="clear"></i>
        </span>
        <div v-if="$slots.append" class="input-append"><slot name="append"></slot></div>
    </div>
    <div class="validate" v-if="validate"></div>
</div>
</template>

<script>
export default{
    name:'ShopInput',
    props:{
        value:[String, Number],
        type:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default:'large'
        },
        rounded:{
            type:Boolean,
            default:true
        },
        bordered:{
            type:Boolean,
            default:true
        },
        disabled:{
            type:Boolean,
            default:false
        },
        showClear:{
            type:Boolean,
            default:true
        },
        validate:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            focused:false
        }
    },
    methods:{
        getInput(){
            return this.$refs.input
        },
        handleChange(event){
            this.$emit('change',event.target.value)
        },
        handleBlur(event){
            this.focused = false
            this.$emit('blur',event)
        },
        handleFocus(event){
            this.focused = true
            this.$emit('focus',event)
        },
        handleInput(event){
            this.$emit('input',event.target.value)
        },
        clear(){
            this.$emit('input','')
            this.$emit('change','')
            this.$emit('clear')
        }
    }
}
</script>