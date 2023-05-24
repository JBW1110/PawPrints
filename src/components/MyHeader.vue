<template>
  <div>
    <div class="flexs">
      <h1>{{noonTip}}</h1>
      <el-badge :value="messages.length" :hidden="hidden" v-show="messages.length!==0">
        <el-button circle @click="quit" icon="el-icon-switch-button"></el-button>
        <el-button @click="drawer=true" circle icon="el-icon-message-solid"></el-button>
      </el-badge>
      <div v-show="messages.length===0">
        <el-button circle @click="quit" icon="el-icon-switch-button"></el-button>
        <el-button @click="drawer=true" circle icon="el-icon-message-solid"></el-button>
      </div>
    </div>
    <el-drawer
        title="新消息列表"
        :visible.sync="drawer"
        direction="rtl"
        size="440px">
      <v-list subheader>
        <el-pagination
            style="margin-left: 10px"
            @current-change="curChange"
            @size-change="sizeChange"
            :current-page="page"
            :page-size="size"
            :total="total"
            :page-sizes="[5,10,20,30,50]"
            layout="total,sizes,prev,pager,next,jumper"></el-pagination>
        <v-list-item
            v-for="message in messages"
            :key="message.time"
            v-show="message">
          <v-list-item-content>
            <v-list-item-title v-text="message.time"></v-list-item-title>
            <v-card-text v-text="message.content"></v-card-text>
          </v-list-item-content>
          <el-button type="success" icon="el-icon-check" circle @click="deleteMessage(message.id)"></el-button>
        </v-list-item>
        <el-button icon="el-icon-finished" style="margin-left: 10px" @click="deleteAllMessages">全部已读</el-button>
        <v-divider></v-divider>
      </v-list>
    </el-drawer>
    <hr/>
  </div>
</template>

<script>
// import Qs from "qs";

import Qs from 'qs'

export default {
  name: "MyHeader",
  data() {
    return {
      page:1,
      size:10,
      total:0,
      noonTip:"",
      adminName: "",
      hidden: false,
      messageCount: 12,
      drawer: false,
      messages: [{
        time: "",
        content: '',
      }]
    }
  },
  methods: {
    quit() {
      let path = "/";
      this.$router.push({
        path
      });
      localStorage.clear()
    },
    myNoonTip() {
      const date = new Date()
      if (date.getHours() >= 0 && date.getHours() < 12) {
        this.noonTip = '上午好'
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        this.noonTip = '下午好'
      } else {
        this.noonTip = '晚上好'
      }
    },
    getMessages() {
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/getMessageList",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          status:"未读",
          pageIndex:this.page-1,
          pageSize:this.size
        })
      }).then((res)=>{
        if(res.data.code===200){
          console.log(res.data.data)
          this.messages = res.data.data.content
          this.total = res.data.data.totalElements
        } else if (res.data.code===404){
          this.$message.error("消息列表获取错误")
        } else this.$notify.error(res.data.message)
      })
    },
    deleteMessage(id) {
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/changeMessageState",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          messageId:id,
          newStatus:"已读",
        })
      }).then((res)=>{
        if(res.data.code===200){
          this.messages = this.messages.filter((message) => {
            return message.id !== id
          })
        } else if (res.data.code===404){
          this.$message.error("已读错误")
        } else this.$notify.error(res.data.message)
      })
    },
    deleteAllMessages() {
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/ReadAllMessage",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        }
      }).then((res)=>{
        if(res.data.code===200){
          this.messages = []
        } else if (res.data.code===404){
          this.$message.error("全部已读错误")
        } else this.$notify.error(res.data.message)
      })
    }
  },
  mounted () {
    this.getMessages();
  },
  created () {
    this.myNoonTip()
  }
}
</script>

<style scoped>
.flexs {
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
