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
            <v-tab @click="getFile">查看</v-tab>
            <v-tab>添加</v-tab>
            <v-tab-item>
              <v-icon color="blue">mdi-clipboard-check-multiple-outline</v-icon>
              <file-view ref="view"></file-view>
            </v-tab-item>
            <v-tab-item>
              <v-icon color="blue">mdi-clipboard-check-multiple-outline</v-icon>
              <file-add></file-add>
            </v-tab-item>
          </v-tabs>
        </v-app>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import SideBar from '@/components/SideBar'
import FileView from '@/components/FileView'
import FileAdd from '@/components/FileAdd'

export default {
  name: 'AnimalFile',
  components: {FileView,FileAdd,MyHeader,SideBar},
  created () {
    if(localStorage.getItem('token') == null){
      let path = "/";
      this.$router.push({
        path
      });
    }
  },
  methods: {
    getFile () {
      this.$refs.view.getFileList()
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
