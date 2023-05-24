<template>
  <el-container>
    <div class="side-bar">
      <SideBar></SideBar>
    </div>
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-main>
        <v-app>
          <v-tabs
              background-color="white"
              color="deep-purple accent-4"
              left
          >
            <v-tab @click="getPosts">查看</v-tab>
            <v-tab @click="getCheck">审核</v-tab>
            <v-tab>添加</v-tab>
            <v-tab-item>
              <v-icon color="blue">mdi-clipboard-check-multiple-outline</v-icon>
              <post-view ref="postView"></post-view>
            </v-tab-item>
            <v-tab-item>
              <v-icon color="blue">mdi-clipboard-check-multiple-outline</v-icon>
              <post-check ref="postCheck"></post-check>
            </v-tab-item>
            <v-tab-item>
              <v-icon color="blue">mdi-clipboard-check-multiple-outline</v-icon>
              <post-add></post-add>
            </v-tab-item>
          </v-tabs>
        </v-app>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PostView from '@/components/PostView'
import PostCheck from '@/components/PostCheck'
import PostAdd from '@/components/PostAdd'
import MyHeader from '@/components/MyHeader'
import SideBar from '@/components/SideBar'

export default {
  name: 'PostManage',
  components: {PostView,PostCheck,PostAdd,MyHeader,SideBar},
  created () {
    if(localStorage.getItem('token') == null){
      let path = "/";
      this.$router.push({
        path
      });
    }
  },
  methods: {
    getPosts(){
      this.$refs.postView.searchPost()
    },
    getCheck(){
      this.$refs.postCheck.getPosts()
    }
  }
}
</script>

<style scoped>
.side-bar {
  width: 65px;
  transition: width 0.5s;
  -moz-transition: width 0.5s;
  -webkit-transition: width 0.5s;
  -o-transition: width 0.5s;
}

.side-bar:hover {
  width: 150px;
}
</style>
