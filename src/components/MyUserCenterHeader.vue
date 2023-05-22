<template>
  <div>
    <v-app style="height: 100%;overflow-y: hidden;overflow-x: hidden">
      <v-row style="max-height: 50px;margin-top: 10px;margin-left: 10px" >
        <v-col cols="1" style="margin-right: 10px">
          <svg-icon type="mdi" :path="path"></svg-icon>
        </v-col>
        <v-col cols="9">
          <h1>管理您的账号</h1>
        </v-col>
      </v-row>
      <v-row style="margin-left: 10px;max-height:50px;min-width: 530px">
        <v-btn color="deep-purple accent-1"
               elevation="5"
               @click="dialogFormVisible = true">
          修改密码
        </v-btn>
        <v-btn color="deep-purple accent-1"
               elevation="5"
               style="margin-left: 10px"
               @click="pickPhoto">
          上传头像
        </v-btn>
        <div>
          <el-dialog :visible.sync="dialogVisible">
            <el-upload
                :auto-upload="true"
                :before-upload="beforeAvatarUpload"
                :limit=1
                multiple
                accept=".png,.jpg,.jepg"
                action
                :http-request="uploadPic"
                list-type="picture-card"
                ref="upload"
                style="margin-bottom: 20px">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                      </span>
                  </span>
              </div>
            </el-upload>
            <el-button type="primary" @click="updateAvatar">提交</el-button>
            <el-dialog :visible.sync="dialogPictVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-dialog>
        </div>
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
                <el-button @click="resetForm('ruleForm')">清空</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
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
      avatar:'',
      path:mdiCardAccountDetails,
      id:localStorage.getItem('user_id'),
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
    pickPhoto() {
      this.dialogVisible = true;
    },
    updateAvatar(){
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/user/update/headImg/url",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token'),
          // 'content-type':'multipart/form-data'
        },
        data: Qs.stringify({
          url:this.avatar
        })
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.$refs.upload.clearFiles();
          this.$message.success("头像上传成功");
        } else this.$notify.error(res.data.errMessage)
      })
    },
    uploadPic(item){
      let FormDatas = new FormData()
      FormDatas.append('file',item.file);
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/upload/file/avatar/temp",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token'),
          'content-type':'multipart/form-data'
        },
        data: FormDatas
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.avatar = res.data.data
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
    //清除图片缓存
    handleRemove(file) {
      console.log(file)
      this.$refs.upload.clearFiles();
    },
    //展示图片预览图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload() {
      return true;
    },
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
