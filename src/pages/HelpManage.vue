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
            <el-pagination
                @current-change="curChange"
                @size-change="sizeChange"
                :current-page="page"
                :page-size="size"
                :total="total"
                :page-sizes="[5,10,20,30,50]"
                layout="total,sizes,prev,pager,next,jumper"></el-pagination>
            <v-list-item
                v-for="help in helpList"
                :key="help.name">
              <v-list-item-avatar>
                <v-avatar>
                  <img :src="help.publisherAvatarUrl" alt="头像">
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content style="padding-left: 10px">
                <v-list-item-title v-text="help.publisherName"></v-list-item-title>
                <v-list-item-subtitle v-text="help.publisherEmail"></v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn color="blue lighten-3"
                     @click="help.show = !help.show"
                     style="min-width: 120px"
                     v-show="help.status==='求助中'">
                <v-icon>
                  mdi-account-heart
                </v-icon>
                新求助
              </v-btn>
              <v-btn color="orange lighten-3"
                     @click="help.show = !help.show"
                     style="min-width: 120px"
                     v-show="help.status==='处理中'">
                <v-icon>
                  mdi-account-heart
                </v-icon>
                处理中
              </v-btn>
              <v-btn color="purple lighten-3"
                     @click="help.show = !help.show"
                     style="min-width: 120px"
                     v-show="help.status==='处理完成'">
                <v-icon>
                  mdi-account-heart
                </v-icon>
                已完成
              </v-btn>
              <v-dialog v-model="help.show">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ help.publisherName }}的求助</span>
                  </v-card-title>
                  <v-card-subtitle style="margin-top: 10px">
                    <pre>邮箱：{{ help.publisherEmail }}</pre>
                    <pre>求助时间：{{help.createTime}}</pre>
                  </v-card-subtitle>
                  <v-card-text style="margin-top: 10px">
                    <div class="img_show" v-show="help.postImgUrls.length > 0">
                      <el-carousel :interval="4000" type="card" height="450px" indicator-position="outside">
                        <el-carousel-item v-for="pic in help.postImgUrls" :key="pic">
                          <img :src="pic" class="img" width="100%" height="100%">
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                    <pre style="white-space:pre-wrap">{{ help.content }}</pre>
                  </v-card-text>
                  <v-card-actions v-show="help.status==='求助中'">
                    <v-btn @click="changeState('处理中',help)" style="margin-top: 20px; width: 20px" color="light-green">
                      响应求助
                    </v-btn>
                  </v-card-actions>
                  <v-textarea
                      v-show="help.status==='处理中' && role==='超级管理员'"
                      v-model="help.notes"
                      auto-grow
                      filled
                      clearable
                      color="deep-purple"
                      label="请输入备注"
                      rows="1"
                      style="width: 95%;margin-left: 30px"
                  >
                  </v-textarea>
                  <v-card-actions v-show="help.status==='处理中' && role==='超级管理员'">
                    <v-btn @click="changeState('处理完成',help)" style="margin-top: 20px; width: 20px" color="light-green">
                      完成求助
                    </v-btn>
                  </v-card-actions>
                  <v-card-text style="margin-top: 10px" v-show="help.status==='处理完成'">
                    <pre>{{ help.message }}</pre>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-list-item>
          </v-list>
        </v-app>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import SideBar from '@/components/SideBar'
import Qs from 'qs'

export default {
  name: 'HelpManage',
  components: {MyHeader,SideBar},
  data() {
    return {
      page:1,
      size:10,
      total:0,
      role:"",
      helpList:[
        {
          avatar:"",
          publisherName:"",
          show:false,
          content:"",
          email:"",
          status:"",
          message:"",
          notes:"",
          publisherEmail:""
        }
      ]
    }
  },
  methods: {
    changeState(status,help){
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/changePostState",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          postId:help.id,
          newStatus:status,
          notes:help.notes
        })
      }).then((res)=>{
        // console.log(res.data)
        if(res.data.code===200){
          help.status = status
          help.show = false
          this.$message.success("状态变成"+status);
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
    getHelpList(){
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/post/search",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          type:'求助',
          pageIndex:this.page-1,
          pageSize:this.size
        })
      }).then((res)=>{
        // console.log(res.data)
        if(res.data.code===200){
          this.helpList = res.data.data.content
          this.total = res.data.data.totalElements
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    },
    curChange(val) {
      this.page = val;
      this.getHelpList()
    },
    sizeChange(val) {
      this.size = val;
      this.page = 1;
      this.getHelpList()
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
          this.role = res.data.data.role
        } else this.$notify.error(res.data.message)
      })
    },
  },
  mounted () {
    this.getHelpList()
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
.img_show{
  /*background-color: dimgrey;*/
  padding-top: 50px;
  width: 70%;
  margin-left: 15%;
}
.img{
  align-content: center;
}
</style>
