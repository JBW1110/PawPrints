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
                昵称
              </template>
              <label v-show="!isEdit">{{ user.nickName }}</label>
              <el-input size="mini" v-model="user.nickName" v-show="isEdit"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-time"></i>
                喜爱动物
              </template>
              <label v-show="!isEdit">{{ user.animalLike }}</label>
              <el-input size="mini" v-model="user.animalLike" v-show="isEdit"></el-input>
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
              {{ user.role}}
            </el-descriptions-item>
<!--            <el-descriptions-item>-->
<!--              <template slot="label">-->
<!--                <i class="el-icon-sex"></i>-->
<!--                性别-->
<!--              </template>-->
<!--              <label v-show="!isEdit">{{ user.sex }}</label>-->
<!--              <template>-->
<!--                <el-radio size="mini" v-model="user.sex" v-show="isEdit" label="男">男</el-radio>-->
<!--                <el-radio size="mini" v-model="user.sex" v-show="isEdit" label="女">女</el-radio>-->
<!--              </template>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item>-->
<!--              <template slot="label">-->
<!--                <i class="el-icon-mobile-phone"></i>-->
<!--                手机号-->
<!--              </template>-->
              <label v-show="!isEdit">{{ user.phone }}</label>
              <el-input size="mini" v-model="user.phone" v-show="isEdit"></el-input>
<!--            </el-descriptions-item>-->
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
        animalLike:"",
        email:"",
        nickName:"",
        role:""
      },
      isEdit: false
    }
  },
  methods: {
    submitChangeInfo() {
      if (this.isEdit) {
        this.$axios({
          url:"https://anitu1.2022martu1.cn:8443/changeBaseInfo",
          method: 'post',
          headers: {
            'token': localStorage.getItem('token')
          },
          data: Qs.stringify({
            name: this.user.nickName,
            animalLike:this.user.animalLike,
          })
        }).then((res) => {
          if (res.data.code === 200) {
            this.$bus.$emit('showSnackBar', "你已成功修改信息！")
          } else this.$notify.error(res.data.message)
        })
      }
      this.isEdit = !this.isEdit
    },
    getUserInformation: function () {
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/user/info",
        method: 'post',
        headers: {
          'token':localStorage.getItem('token'),
          // 'content-type':'multipart/form-data'
        }
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          // console.log(res.data)
          this.user = res.data.data
        } else this.$notify.error(res.data.message)
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

/*.el-icon {*/
/*  color: cornflowerblue;*/
/*}*/

/*.el-icon-sex {*/
/*  background: url("../assets/sex.png") no-repeat;*/
/*  font-size: 16px;*/
/*  background-size: cover;*/
/*}*/

/*.el-icon-sex:before {*/
/*  content: "ccc";*/
/*  font-size: 1px;*/
/*  color: rgba(255, 255, 255, 0);*/
/*}*/

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
