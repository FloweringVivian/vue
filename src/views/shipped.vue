<template>
    <div>
        <ul>
            <li v-for="item in 10" ref="li">item</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                colorArr: ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
            }
        },
        methods:{
            init(){
                let lis = this.$refs.li;
                for(var i=0;i<lis.length;i++){
                    lis[i].style.backgroundColor=this.generateMixed(6);
                }
            },
            generateMixed(n){
                let res = "#";
                let index;
                for(var i = 0; i < n ; i ++) {
                    index= Math.floor(Math.random()*16);
                    res += this.colorArr[index];
                }
                return res; 
            }
              
        },
        mounted(){
            this.init();
        }
    }
</script>
<style>
    ul > li {
        list-style: none;
    }

</style>