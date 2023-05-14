<template>
  <div>
    <v-app style="overflow-y: hidden;overflow-x: hidden">
      <v-row style="max-height: 50px;margin-top: 10px;margin-left: 10px" >
        <v-col cols="1" style="margin-right: 10px">
          <svg-icon type="mdi" :path="path"></svg-icon>
        </v-col>
        <v-col cols="9">
          <h1>管理您的账号</h1>
        </v-col>
        <v-col>
          <v-btn color="deep-purple accent-1"
                 elevation="5"
                 @click="dialogFormVisible = true">
            修改密码
          </v-btn>
          <div>
            <el-dialog :visible.sync="dialogFormVisible">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="原始密码" prop="oldPass">
                  <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
        </v-col>
      </v-row>
      <MySnackBar></MySnackBar>
    </v-app>
  </div>
</template>

<script>
import MySnackBar from "@/components/MySnackBar";
import Qs from "qs";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCardAccountDetails } from '@mdi/js'

export default {
  name: "MyUserCenterHeader",
  components: {MySnackBar,SvgIcon},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'));
      } else {
        callback();
      }
    };
    return {
      path:mdiCardAccountDetails,
      id:localStorage.getItem('user_id'),
      imageUrl:'',
      tmpUrl:'',
      modified:false,
      dialogImageUrl: '',
      disabled:false,
      dialogFormVisible: false,
      dialogVisible:false,
      dialogPictVisible:false,
      ruleForm: {
        oldPass: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        oldPass: [
          {validator: validatePass3, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(valid)
        if (valid) {
          this.$axios({
            url:"https://anitu1.2022martu1.cn:8443/changePassword",
            method: 'post',
            headers: {
              'token': localStorage.getItem('token')
            },
            data: Qs.stringify({
              oldPassword:this.ruleForm.oldPass,
              newPassword:this.ruleForm.pass,
            })
          }).then((res)=>{
            // console.log(res.data)
            if(res.data.code===200){
              this.dialogFormVisible = false
              this.ruleForm.oldPass = ""
              this.ruleForm.pass = ""
              this.ruleForm.checkPass = ""
              this.$bus.$emit("showSnackBar", "修改密码成功！")
            } else if (res.data.code===404){
              this.$bus.$emit("showSnackBar", res.data.errMessage)
            } else this.$notify.error(res.data.message)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpg/jpeg/png';
      // const isLt10M = file.size / 1024 / 1024 < 10;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 jpg/jpeg/png 格式!');
      // }
      // if (!isLt10M) {
      //   this.$message.error('上传头像图片大小不能超过 10MB!');
      // }
      // return isJPG && isLt10M;
      console.log(file);
      return true;
    },
    handleRemove(file) {
      console.log(file)
      this.$refs.upload.clearFiles();
    },
    //展示图片预览图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      // console.log(file.url)
      this.dialogPictVisible = true;
    },
    handleAvatarSuccess (res) {
      if (res.code !== 0) {
        this.$message.error(res.message)
        return false
      }
      this.tmpUrl = res.image_path
      // console.log(this.imageUrl)
    },
    /*
    DO: 上传头像接口，可以复用社团上传图片的接口
     */
    pickPhoto() {
      this.dialogVisible = true;
    },
    updateAvatar() {
      this.$axios({
        url: 'http://127.0.0.1:8000/api/update_avatar',
        method: 'post',
        data: Qs.stringify({
          user_id:localStorage.getItem('user_id'),
          avatar:this.tmpUrl
        }),
      }).then((ret) => {
        if (ret.data.code === 0) {
          this.dialogVisible = false;
          this.$message.success('上传成功')
          this.imageUrl = this.tmpUrl
          this.modified = true
          this.$refs.upload.clearFiles();
        } else this.$notify.error(ret.data.message + "，申请失败");
      })
    }
  },
  created() {
    this.modified = false
  }
}
</script>

<style scoped>
/*.flexs {*/
/*  display: flex;*/
/*  justify-content: space-between;*/
/*  align-items: center;*/
/*}*/
</style>
