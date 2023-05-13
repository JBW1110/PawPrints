<template>
  <div @mouseover="mouseOver"
       @mouseleave="mouseLeave"
       class="showHide">
    <el-menu :default-active="this.$router.path"
             router
             class="el-menu-vertical-demo"
             :collapse="isCollapse"
             :collapse-transition="false"
    >
      <el-menu-item index="/animalfile" router>
        <i class="el-icon-collection"></i>
        <span slot="title">动物档案</span>
      </el-menu-item>
      <el-menu-item index="/postmanage" router>
        <i class="el-icon-document"></i>
        <span slot="title">帖子管理</span>
      </el-menu-item>
      <el-menu-item index="/setadmin" router v-show="role==='超级管理员'">
        <i class="el-icon-user"></i>
        <span slot="title">新增管理</span>
      </el-menu-item>
      <el-menu-item index="/animaladoption" router>
        <i class="el-icon-house"></i>
        <span slot="title">动物领养</span>
      </el-menu-item>
      <el-menu-item index="/helpmanage" router>
        <i class="el-icon-phone-outline"></i>
        <span slot="title">求助管理</span>
      </el-menu-item>
      <el-menu-item index="/animalmap" router>
        <i class="el-icon-phone-outline"></i>
        <span slot="title">智能追踪</span>
      </el-menu-item>
<!--      <el-menu-item index="/mainpage" router>-->
<!--        <i class="el-icon-location-information"></i>-->
<!--        <span slot="title">智能追踪</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/usercenter" router>
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

// import Qs from "qs";

export default {
  name: "SideBar",
  data() {
    return {
      isCollapse: true,
      role:""
    };
  },
  methods: {
    getUserInformation(){
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/user/info",
        method: 'post',
        headers: {
          'token':localStorage.getItem('token'),
        }
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.role = res.data.data.role
        } else this.$notify.error(res.data.message)
      })
    },
    mouseOver() {
      this.isCollapse = false
    },
    mouseLeave() {
      this.isCollapse = true
    }
  },
  mounted () {
    this.getUserInformation()
  }
}
</script>
<style>
/*.hid{*/
/*  display: none;*/
/*}*/
</style>
