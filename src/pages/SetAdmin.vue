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
          <v-list subheader>
            <v-list-item
                v-for="member in members"
                :key="member.user_id">
              <v-list-item-avatar>
                <v-avatar>
                  <img :src="member.headImgUrl" alt="头像">
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content style="padding-left: 10px">
                <v-list-item-title v-text="member.nickName"></v-list-item-title>
                <v-list-item-subtitle v-text="member.email"></v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn v-show="member.role === '用户'"
                     color="blue lighten-3"
                     @click="changeState(member,'ROLE_ADMIN')"
                     style="min-width: 120px">
                <v-icon>
                  mdi-account-heart
                </v-icon>
                设置管理员
              </v-btn>
              <v-btn v-show="member.role === '管理员'"
                     color="orange lighten-3"
                     @click="changeState(member,'ROLE_USER')"
                     style="min-width: 120px"
              >
                <v-icon>
                  mdi-account-cancel
                </v-icon>
                取消管理员
              </v-btn>
            </v-list-item>
          </v-list>
        </v-app>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Qs from "qs";
import MyHeader from '@/components/MyHeader'
import SideBar from '@/components/SideBar'

export default {
  name: "SetAdmin",
  components: {MyHeader, SideBar},
  data() {
    return {
      members: [{
        user_id: "123",
        nickName: "吴佳锐",
        headImgUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        email:"738822360@qq.com",
        role: false,
      }, {
        user_id: "20373201",
        real_name: "蒋博文",
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        email:"738822360@qq.com",
        isAdmin: true,
      }]
    }
  },
  methods: {
    changeState(member,role) {
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/superAdmin/changeUserRole",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          userEmail:member.email,
          newRole:role
        })
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          member.role = role === 'ROLE_ADMIN' ? '管理员':'用户';
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
    getMembers() {
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/superAdmin/getUserList",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data:''
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.members = res.data.data
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
  },
  mounted () {
    this.getMembers()
  }
}
</script>
<style>
</style>
