<template>
  <div>
    <div class="flexs">
      <h1>上午好，{{ adminName }}</h1>
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
        direction="rtl">
      <v-list subheader>
        <v-list-item
            v-for="message in messages"
            :key="message.time">
          <v-list-item-content>
            <v-list-item-title v-text="message.time"></v-list-item-title>
            <v-card-text v-text="message.content"></v-card-text>
          </v-list-item-content>
          <el-button type="success" icon="el-icon-check" circle @click="deleteMessage()"></el-button>
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

export default {
  name: "MyHeader",
  data() {
    return {
      adminName: "蒋博文",
      hidden: false,
      messageCount: 12,
      drawer: false,
      messages: [{
        time: "2023-03-25 12:00:00",
        content: '吴佳锐发起求助',
      }, {
        time: "2023-03-26 12:00:00",
        content: "李骋艺申请领养"
      },]
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
    getMessages() {
    },
    deleteMessage() {
    },
    deleteAllMessages() {
    }
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
