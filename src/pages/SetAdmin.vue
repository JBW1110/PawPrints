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
                  <img :src="member.avatar" alt="头像">
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content style="padding-left: 10px">
                <v-list-item-title v-text="member.real_name"></v-list-item-title>
                <v-list-item-subtitle v-text="member.email"></v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn v-show="!member.isAdmin"
                     color="blue lighten-3"
                     @click="handelFollow(member)"
                     style="min-width: 120px">
                <v-icon>
                  mdi-account-heart
                </v-icon>
                设置管理员
              </v-btn>
              <v-btn v-show="member.isAdmin"
                     color="orange lighten-3"
                     @click="handleUnFollow(member)"
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
      items: [{
        id: 1,
        label: "社长"
      }, {
        id: 2,
        label: "副社长"
      }, {
        id: 3,
        label: "办公室部长"
      }],
      members: [{
        user_id: "123",
        real_name: "吴佳锐",
        avatar: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        email:"738822360@qq.com",
        isAdmin: false,
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
    /*
    DO: 关注/取消关注接口
     */
    handelFollow(member) {
      // console.log(id)
      this.$axios.post(
          "http://127.0.0.1:8000/api/handle_following",
          Qs.stringify({
            'follower_id': localStorage.getItem('user_id'),
            'friend_id': member.user_id
          })
      ).then((res) => {
        if (res.data.code === 0) {
          // console.log(res.data)
          member.is_follow = 1
          this.$message.success("你已成功关注！")
        } else this.$notify.error(res.data.message)
      }).catch((error) => {
        console.log(error)
      })
    },
    handleUnFollow(member) {
      this.$axios.post(
          "http://127.0.0.1:8000/api/handle_unfollowing",
          Qs.stringify({
            'follower_id': localStorage.getItem('user_id'),
            'friend_id': member.user_id
          })
      ).then((res) => {
        if (res.data.code === 0) {
          // console.log(res.data)
          member.is_follow = 0
          this.$message.success("你已成功取消关注！")
        } else this.$notify.error(res.data.message)
      }).catch((error) => {
        console.log(error)
      })
    },
    handlePass(id) {
      this.$bus.$emit('handlePass', id)
    },
    handleFailPass(id) {
      this.$bus.$emit('handleFailPass', id)
    },
    handelChangePosition(id) {
      this.$bus.$emit('handelChangePosition', id)
    },
    detailOfUser(member) {
      if (this.$router.history.current.params.id !== member.user_id) {
        let path = "/usercenter/" + member.user_id + "/" + member.real_name;
        this.$router.push({
          path
        });
      }
    }
  },
}
</script>
<style>
</style>
