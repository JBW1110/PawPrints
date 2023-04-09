<template>
  <el-container>
    <div class="side-bar">
      <SideBar></SideBar>
    </div>
    <v-app>
      <MySnackBar></MySnackBar>
    </v-app>
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-container>
        <el-main>
          <MyUserCenterHeader></MyUserCenterHeader>
        </el-main>
        <el-main class="el-main-table">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-postcard"></i>
                编号
              </template>
              {{ user.user_id }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-time"></i>
                注册时间
              </template>
              {{ user.time }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-email"></i>
                邮箱
              </template>
              {{user.email}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-check"></i>
                职务
              </template>
              {{ user.level === 1 ? '超级管理员' : '管理员'}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-sex"></i>
                性别
              </template>
              <label v-show="!isEdit">{{ user.sex }}</label>
              <template>
                <el-radio size="mini" v-model="user.sex" v-show="isEdit" label="男">男</el-radio>
                <el-radio size="mini" v-model="user.sex" v-show="isEdit" label="女">女</el-radio>
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机号
              </template>
              <label v-show="!isEdit">{{ user.phone }}</label>
              <el-input size="mini" v-model="user.phone" v-show="isEdit"></el-input>
            </el-descriptions-item>
          </el-descriptions>
          <div class="flexs">
            <el-button type="primary" @click="submitChangeInfo">{{ mode }}</el-button>
            <el-button type="primary" v-show="isEdit" @click="isEdit = !isEdit">取消</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import SideBar from "@/components/SideBar";
import MySnackBar from "@/components/MySnackBar";
import Qs from "qs";
import MyUserCenterHeader from '@/components/MyUserCenterHeader'

export default {
  name: "UserCenter",
  components: {MySnackBar, MyUserCenterHeader, MyHeader, SideBar},
  data() {
    return {
      id:localStorage.getItem('user_id'),
      user: {
        user_id: "20373201",
        password: "123456",
        time: "2023-4-1",
        sex: "男",
        phone: "19949138085",
        email: "738822360@qq.com",
        level: 1,
      },
      isEdit: false
    }
  },
  methods: {
    submitChangeInfo() {
      if (this.isEdit) {
        this.$axios.post(
            "http://127.0.0.1:8000/api/update_user_information",
            Qs.stringify(
                this.user
            )
        ).then((res) => {
          if (res.data.code === 0) {
            this.$bus.$emit('showSnackBar', "你已成功修改信息！")
          } else this.$notify.error(res.data.message)
        }).catch((error) => {
          console.log(error)
        })
        /*
        DO:提交基本信息（不包括密码和头像【在另一个组件】）修改的接口，
         此时前端容器存储的即为最新的需要保存的信息，将其传回后端保存
         showSnackBar是我实现的一个组件，用以方便地提示用户操作结果，调用示例如下：
         */
      }
      this.isEdit = !this.isEdit
    },
    getUserInformation() {
      this.$axios.post(
          "http://127.0.0.1:8000/api/get_user_information",
          Qs.stringify({
            'user_id': this.$router.history.current.params.id
          })
      ).then((res) => {
        if (res.data.code === 0) {
          // console.log(res.data)
          this.user = res.data.user
        } else this.$notify.error(res.data.message)
      }).catch((error) => {
        console.log(error)
      })
    },
  },
  computed: {
    mode() {
      if (this.isEdit) {
        return "提交"
      } else {
        return "编辑"
      }
    }
  },
  mounted() {
    this.getUserInformation()
  },
  beforeRouteUpdate(to,from,next){
    this.$axios.post(
        "http://127.0.0.1:8000/api/get_user_information",
        Qs.stringify({
          'user_id': to.params.id
        })
    ).then((res) => {
      if (res.data.code === 0) {
        console.log(res.data)
        this.user = res.data.user
      } else this.$notify.error(res.data.message)
    }).catch((error) => {
      console.log(error)
    })
    next()
  }
}
</script>

<style scoped>
.el-main-table {
  width: 150%;
  align-self: center;
}

.flexs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.el-icon {
  color: cornflowerblue;
}

.el-icon-sex {
  background: url("../assets/sex.png") no-repeat;
  font-size: 16px;
  background-size: cover;
}

.el-icon-sex:before {
  content: "ccc";
  font-size: 1px;
  color: rgba(255, 255, 255, 0);
}

.el-icon-email {
  background: url("../assets/email.png") no-repeat;
  font-size: 16px;
  background-size: cover;
}

.el-icon-email:before {
  content: "ccc";
  font-size: 1px;
  color: rgba(255, 255, 255, 0);
}

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
