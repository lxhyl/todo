<template>
  <div>
    {{ testData }}
    <a @click="add" class="weui-btn weui-btn_primary">添加</a>
    <a @click="getAll" class="weui-btn weui-btn_primary">获取所有</a>
    <a @click="del" class="weui-btn weui-btn_primary">删除某个</a>
  </div>
</template>
<script>
import { DB_add,DB_getAll,DB_delete } from "../../indexedDB/index";
import createID from '../../utils/createID'
export default {
  data() {
    return {
        ids:[],
    };
  },
  computed: {
    testData() {
      return this.$store.state.test;
    },
  },
  created() {},
  methods: {
    add() {
       let option = {
           id:createID(6)
       }
       DB_add(option).then(res => {
           console.log(res);
       })
    },
    getAll(){
        DB_getAll().then(res => {
            this.ids = res.map(item => item.id);
            console.log('全部数据',res)
        })
    },
    del(){
        let id = this.ids[0];
        DB_delete(id).then(res => {
            this.ids.shift()
            console.log('删除数据成功')
        })
    }
  },
};
</script>