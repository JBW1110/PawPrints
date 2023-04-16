<template>
  <div class="main-box">
    <div class="container">
      <el-form :model="createFileForm">
        <div class="addTitle">动物档案</div>
        <h3 style="margin-bottom: 20px;color: #4b70e2;float: left">请上传动物照片</h3>
        <el-form-item>
          <el-upload
              :auto-upload="true"
              :on-success="handleAvatarSuccess"
              :limit=1
              multiple
              accept=".png,.jpg,.jepg"
              action="http://127.0.0.1:8000/upload/img"
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
        <el-form-item prop="name">
          <el-input v-model="createFileForm.name" class="form__input" type="text" placeholder="昵称"/>
        </el-form-item>
        <el-form-item prop="type">
          <el-input v-model="createFileForm.type" class="form__input" type="text" placeholder="种类"/>
        </el-form-item>
        <el-form-item prop="character">
          <el-input v-model="createFileForm.character" class="form__input" type="text" placeholder="性格"/>
        </el-form-item>
        <el-form-item prop="weight">
          <el-input v-model="createFileForm.weight" class="form__input" type="text" placeholder="体重"/>
        </el-form-item>
        <el-form-item prop="status">
          <el-select v-model="createFileForm.status" class="form__input" placeholder="绝育状态" style="display: block;">
            <el-option label="已绝育" value="已绝育"></el-option>
            <el-option label="未绝育" value="未绝育"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="description">
          <el-input v-model="createFileForm.description" class="form__input" type="text" placeholder="描述"/>
        </el-form-item>
        <el-form-item prop="location">
          <el-input v-model="createFileForm.location" class="form__input" type="text" placeholder="出没位置"/>
        </el-form-item>
        <el-form-item>
          <div class="primary-btn" @click="create">添加档案</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileAdd',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      createFileForm: {
        imageUrl: '',
        type:"",
        name:"",
        weight:"",
        description:"",
        location:"",
        status:"",
        character:"",
      },
    }
  },
  methods: {
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
    handleAvatarSuccess(res) {
      if (res.code !== 0) {
        this.$message.error(res.message)
        return false
      }
      this.createFileForm.imageUrl = res.image_path
      // this.$message.success('上传成功')
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
  height: 1000px;
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
