<template>
  <el-main>
    <v-app>
      <v-list subheader>
        <v-list-item
            v-for="file in fileList"
            :key="file.name">
          <v-list-item-avatar>
            <v-avatar>
              <img src="../assets/白老大.png" alt="头像">
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content style="padding-left: 10px">
            <v-list-item-title v-text="file.nickname"></v-list-item-title>
            <v-list-item-subtitle v-text="file.category"></v-list-item-subtitle>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-3"
                 @click="changeState(file,'可领养')"
                 style="min-width: 120px"
                 v-show="file.adoptState==='不可领养'">
            <v-icon>
              mdi-account-heart
            </v-icon>
            发布领养
          </v-btn>
          <v-btn color="orange lighten-3"
                 @click="changeState(file,'不可领养')"
                 style="min-width: 120px"
                 v-show="file.adoptState==='可领养'">
            <v-icon>
              mdi-account-heart
            </v-icon>
            取消发布
          </v-btn>
          <v-btn color="purple lighten-3"
                 style="min-width: 120px"
                 v-show="file.adoptState==='已领养'">
            <v-icon>
              mdi-account-heart
            </v-icon>
            已领养
          </v-btn>
        </v-list-item>
      </v-list>
    </v-app>
  </el-main>
</template>

<script>
import Qs from 'qs'

export default {
  name: 'AdoptionPublish',
  data() {
    return{
      fileList:[
        {
          avatar:"../assets/白老大.png",
          category:"奶牛",
          nickname:"白老大",
          show:false,
          adoptState:"",
        },
        {
          avatar:"../assets/白老大.png",
          type:"奶牛",
          name:"站长",
          show:false,
          cate:2,
        },
        {
          avatar:"../assets/白老大.png",
          type:"奶牛",
          name:"传送阵",
          show:false,
          cate:3,
        }
      ]
    }
  },
  methods: {
    changeState(file,status) {
      this.$axios({
        url: "http://localhost:8080/updateArchive",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          archiveId:file.archiveId,
          adoptState: status
        })
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          file.adoptState = status
          this.$message.success("状态变成" + status);
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
    getFileList () {
      this.$axios({
        url: "http://localhost:8080/query/archiveList",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.fileList = res.data.data
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    },
  },
  mounted () {
    this.getFileList()
  }
}
</script>

<style scoped>

</style>
