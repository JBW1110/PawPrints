<template>
  <v-app>
    <div class="main-box">
      <div class="container">
        <el-form :model="createPostForm">
          <div class="addTitle">添加帖子</div>
          <h3 style="margin-bottom: 20px;color: #4b70e2;float: left">请上传帖子照片</h3>
          <el-form-item>
            <el-upload
                :auto-upload="true"
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
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item prop="title">
            <el-input v-model="createPostForm.title" class="form__input" type="text" placeholder="标题"/>
          </el-form-item>
          <el-form-item prop="content">
            <el-input v-model="createPostForm.content" class="form__input" type="text" placeholder="内容"/>
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model="createPostForm.type" class="form__input" placeholder="类型" style="display: block;">
              <el-option label="科普" value="科普"></el-option>
              <el-option label="求助" value="求助"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="primary-btn" @click="create">新增帖子</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'PostAdd',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      createPostForm: {
        type:'',
        title:'',
        content:'',
        urls:[""]
      },
      newForm: {
        type:'',
        title:'',
        content:'',
        urls:[""]
      },
    }
  },
  methods: {
    create () {
      let FormDatas = new FormData()
      FormDatas.append('type', this.createPostForm.type);
      FormDatas.append('title', this.createPostForm.title);
      FormDatas.append('content', this.createPostForm.content);
      FormDatas.append('urls', this.createPostForm.urls);
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/createPost/urls",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token'),
        },
        data: FormDatas
      }).then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.$message.success("新建帖子成功");
          this.createPostForm = this.newForm
          this.$refs.upload.clearFiles();
          let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
          this.$router.push(NewPage);
          this.$router.go(-1);
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
    uploadPic(item) {
      let FormDatas = new FormData()
      FormDatas.append('file', item.file);
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/upload/file/post/temp",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token'),
          'content-type': 'multipart/form-data'
        },
        data: FormDatas
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.createPostForm.urls[0] = res.data.data
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
    //清除图片缓存
    handleRemove (file) {
      console.log(file)
      this.$refs.upload.clearFiles();
    },
    //展示图片预览图
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  }
}
</script>

<style lang="scss" scoped>
.pic {
  float: left;
  min-width: 500px;
  max-height: 148px
}

.el-form-item__content {
  max-height: 148px;
}

.main-box {
  position: center;
  width: 100%;
  min-width: 1000px;
  min-height: 300px;
  height: 750px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #c3d5f3, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: center;
    width: 100%;
    height: 100%;
    background-color: #ecf0f3;

    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: #ecf0f3;

      .addTitle {
        font-size: 35px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }

      .text {
        margin-top: 30px;
        margin-bottom: 12px;
      }

      .form__input {
        width: 700px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;

        &::placeholder {
          color: #a0a5a8;
        }
      }
    }
  }
}

::v-deep .el-input__inner {
  background-color: #ecf0f3 !important;
  border: none 0 !important;
  padding-left: 0 !important;
  height: 30px !important;
  line-height: 30px !important;
}

.primary-btn {
  transition: all 0.3s;
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 25px;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  letter-spacing: 2px;
  background-color: #4b70e2;
  color: #f9f9f9;
  cursor: pointer;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;

  &:hover {
    box-shadow: 4px 4px 6px 0 rgb(255 255 255 / 50%),
    -4px -4px 6px 0 rgb(116 125 136 / 50%),
    inset -4px -4px 6px 0 rgb(255 255 255 / 20%),
    inset 4px 4px 6px 0 rgb(0 0 0 / 40%);
  }
}

.avatar {
  margin-top: 10px;
  height: 150px;
  width: 150px;
}

.el-upload-dragger {
  height: 250px;
  width: 250px;
}
</style>

