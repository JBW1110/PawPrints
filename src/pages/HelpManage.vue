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
                  <v-card-subtitle style="margin-top: 10px">{{help.publisherEmail}}</v-card-subtitle>
                  <v-card-text style="margin-top: 10px">
                    <pre>{{ help.content }}</pre>
                  </v-card-text>
                  <v-card-actions v-show="help.status==='求助中'">
                    <v-btn @click="changeState('处理中',help)" style="margin-top: 20px; width: 20px" color="light-green">
                      响应求助
                    </v-btn>
                  </v-card-actions>
                  <v-textarea
                      v-show="help.status==='处理中'"
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
                  <v-card-actions v-show="help.status==='处理中'">
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
          type:'求助'
        })
      }).then((res)=>{
        // console.log(res.data)
        if(res.data.code===200){
          this.helpList = res.data.data
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    }
  },
  mounted () {
    this.getHelpList()
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

</style>
