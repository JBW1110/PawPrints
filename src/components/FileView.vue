<template>
  <v-app>
    <div class="files-container" style="margin-top: 10px">
      <el-pagination @current-change="curChange" @size-change="sizeChange"
          :current-page="page" :page-size="size" :total="total"
          layout="total,sizes,prev,pager,next,jumper"></el-pagination>
      <div class="fileBar" v-for="file in fileList" :key="file.data">
        <div @click="file.show = !file.show"><img :src="file.urls[0]" alt="动物照片" class="file_picture"></div>
        <div class="file_name" @click="file.show = !file.show">{{file.nickname.length > 8 ? file.nickname.substring(0,8)+' ...':file.nickname}}</div>
        <div class="file_delete">
          <v-btn elevation="10" icon color="red" @click="deleteFile(file.archiveId)"
                 style="margin-right: 5px">
            <i class="el-icon-close" style="font-size: 30px;"></i>
          </v-btn>
        </div>
        <div style="margin-top: 100px">品种：{{file.category}}<br/>绝育状态：{{file.tnrState==='是'?'已绝育':(file.tnrState==='否'?'未绝育':'未知')}}</div>
        <v-dialog v-model="file.show" width="600px">
          <v-card  style="border: solid #ACC0D8 5px;">
            <div style="margin-left: 150px"><img :src="file.urls[0]" alt="动物照片" style="height: 300px;width: 300px"></div>
            <v-card-title style="text-align: center">
              <span class="headline">{{ file.nickname }}</span>
            </v-card-title>
            <div class="link-top"></div>
            <v-card-text style="margin-top: 20px;">
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="!isEdit">种类：{{ file.category }}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="isEdit">种类：</pre>
              <el-input style="margin-bottom: 10px" size="mini" v-model="file.category" v-show="isEdit"></el-input>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="!isEdit">绝育状态：{{file.tnrState==='是'?'已绝育':(file.tnrState==='否'?'未绝育':'未知')}}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="isEdit">绝育状态：</pre>
              <el-select style="margin-bottom: 10px" size="mini" v-model="file.tnrState" v-show="isEdit">
                <el-option label="已绝育" value="是"></el-option>
                <el-option label="未绝育" value="否"></el-option>
              </el-select>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="!isEdit">体重：{{ file.weight }}kg</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="isEdit">体重：</pre>
              <el-input style="margin-bottom: 10px" size="mini" v-model="file.weight" v-show="isEdit"></el-input>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="!isEdit">领养状态：{{ file.adoptState }}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="isEdit">领养状态：</pre>
              <el-input style="margin-bottom: 10px" size="mini" v-model="file.adoptState" v-show="isEdit"></el-input>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px;white-space:pre-wrap" v-show="!isEdit">描述：{{file.description}}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px;" v-show="isEdit">描述：</pre>
              <el-input style="margin-bottom: 10px" size="mini" v-model="file.description" v-show="isEdit"></el-input>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="!isEdit">出没位置：{{file.appearLocation}}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px" v-show="isEdit">出没位置：</pre>
              <el-input style="margin-bottom: 10px" size="mini" v-model="file.appearLocation" v-show="isEdit"></el-input>
            </v-card-text>
            <div class="link-top"></div>
            <div style="margin: 10px">
              <v-btn style="margin-left: 10px" color="light-green" @click="submitChangeInfo(file)">{{ mode }}</v-btn>
              <v-btn style="margin-left: 400px" color="light-green" v-show="isEdit" @click="isEdit = !isEdit">取消</v-btn>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-app>
</template>

<script>

import Qs from 'qs'

export default {
  name: 'FileView',
  data() {
    return{
      isEdit: false,
      page:0,
      size:10,
      total:0,
      fileList:[
        {
          urls:[],
          archiveId:"",
          avatar:"",
          category:"",
          nickname:"",
          weight:"",
          description:"",
          appearLocation:"",
          tnrState:"",
          adoptState:"",
          show:false,
        }
      ]
    }
  },
  methods: {
    submitChangeInfo(file) {
      if (this.isEdit) {
        this.$axios({
          url:"https://anitu1.2022martu1.cn:8443/updateArchive",
          method: 'post',
          headers: {
            'token': localStorage.getItem('token')
          },
          data: Qs.stringify(file)
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message.success("你已成功修改信息！")
          } else this.$notify.error(res.data.message)
        })
      }
      this.isEdit = !this.isEdit
    },
    getFileList () {
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/query/archiveList",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          pageIndex:this.page,
          pageSize:this.size
        })
      }).then((res) => {
        // console.log(res.data.data)
        if (res.data.code === 200) {
          this.fileList = res.data.data.content
          // this.size = res.data.data.pageable.pageSize
          this.total = res.data.data.totalElements
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
    curChange(val) {
      this.page = val;
      this.getFileList()
    },
    sizeChange(val) {
      this.size = val;
      this.page = 1;
      this.getFileList()
    },
    deleteFile(id){
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/deleteArchive",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          archiveId: id
        })
      }).then((res)=>{
        // console.log(res.data)
        if(res.data.code===200){
          this.$message.success("删除档案成功");
          this.fileList = this.fileList.filter((file) => {
            return file.archiveId !== id
          })
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    }
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
  mounted () {
    this.getFileList()
  }
}
</script>

<style scoped>
.files-container {
  /*height: 800px;*/
}
.fileBar {
  width: 600px;
  float: left;
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-right: 30px;
  margin-bottom: 20px;
}
.file_picture {
  margin-left: 10px;
  width: 200px;
  height: 200px;
  float: left;
  margin-right: 30px;
}
.file_name {
  font-size: 30px;
  width: 300px;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.file_delete {
  margin-top: 10px;
  margin-right: 10px;
  height: 55px;
  float: right;
}
.link-top {
  width: 100%;
  height: 5px;
  border-top: solid #ACC0D8 5px;
}
</style>
