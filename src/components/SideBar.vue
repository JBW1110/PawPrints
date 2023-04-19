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
      <el-menu-item index="/setadmin" router>
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
      <el-menu-item index="/mainpage" router>
        <i class="el-icon-location-information"></i>
        <span slot="title">智能追踪</span>
      </el-menu-item>
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
      admin_id: "20373021",
      admin_name: "蒋博文",
    };
  },
  methods: {
    // getAdminInformation(){
    //   this.$axios.post(
    //       "http://127.0.0.1:8000/api/get_admin_information",
    //       Qs.stringify({
    //         'admin_id':localStorage.getItem('user_id')
    //       })
    //   ).then((res)=>{
    //     if(res.data.code===0){
    //
    //     } else this.$notify.error(res.data.message)
    //   }).catch((error)=>{
    //     console.log(error)
    //   })
    // },
    mouseOver() {
      this.isCollapse = false
    },
    mouseLeave() {
      this.isCollapse = true
    }
  },
}
</script>
<style>
/*.hid{*/
/*  display: none;*/
/*}*/
</style>
