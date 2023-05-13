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
            <v-tab>审批</v-tab>
            <v-tab>发布</v-tab>
            <v-tab-item>
              <adoption-approval></adoption-approval>
            </v-tab-item>
            <v-tab-item>
              <adoption-publish></adoption-publish>
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
import AdoptionApproval from '@/components/AdoptionApproval'
import AdoptionPublish from '@/components/AdoptionPublish'

export default {
  name: 'AnimalAdoption',
  components: {AdoptionPublish,AdoptionApproval,MyHeader,SideBar},
  created () {
    if(localStorage.getItem('token') == null){
      let path = "/";
      this.$router.push({
        path
      });
    }
  },
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
