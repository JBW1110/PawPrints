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
                  <img src="../assets/白老大.png" alt="头像">
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content style="padding-left: 10px">
                <v-list-item-title v-text="help.name"></v-list-item-title>
                <v-list-item-subtitle v-text="help.email"></v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn color="blue lighten-3"
                     @click="help.show = !help.show"
                     style="min-width: 120px"
                     v-show="help.cate===1">
                <v-icon>
                  mdi-account-heart
                </v-icon>
                新求助
              </v-btn>
              <v-btn color="orange lighten-3"
                     @click="help.show = !help.show"
                     style="min-width: 120px"
                     v-show="help.cate===2">
                <v-icon>
                  mdi-account-heart
                </v-icon>
                处理中
              </v-btn>
              <v-btn color="purple lighten-3"
                     @click="help.show = !help.show"
                     style="min-width: 120px"
                     v-show="help.cate===3">
                <v-icon>
                  mdi-account-heart
                </v-icon>
                已完成
              </v-btn>
              <v-dialog v-model="help.show">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ help.name }}的求助</span>
                  </v-card-title>
                  <v-card-subtitle style="margin-top: 10px">{{help.email}}</v-card-subtitle>
                  <v-card-text style="margin-top: 10px">
                    <pre>{{ help.content }}</pre>
                  </v-card-text>
                  <v-card-actions v-show="help.cate===1">
                    <v-btn @click="submit" style="margin-top: 20px; width: 20px" color="light-green">
                      响应求助
                    </v-btn>
                  </v-card-actions>
                  <v-textarea
                      v-show="help.cate===2"
                      v-model="help.message"
                      auto-grow
                      filled
                      clearable
                      color="deep-purple"
                      label="请输入备注"
                      rows="1"
                      style="width: 95%;margin-left: 30px"
                  >
                  </v-textarea>
                  <v-card-actions v-show="help.cate===2">
                    <v-btn @click="submit" style="margin-top: 20px; width: 20px" color="light-green">
                      完成求助
                    </v-btn>
                  </v-card-actions>
                  <v-card-text style="margin-top: 10px" v-show="help.cate===3">
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

export default {
  name: 'HelpManage',
  components: {MyHeader,SideBar},
  data() {
    return {
      helpList:[
        {
          avatar:"../assets/白老大.png",
          name:"蒋博文",
          show:false,
          content:"我的猫在校园内走丢了",
          email:"738822360@qq.com",
          cate:1,
          message:"",
        },
        {
          avatar:"../assets/白老大.png",
          name:"jbw",
          show:false,
          email:"738822360@qq.com",
          cate:2,
        },
        {
          avatar:"../assets/白老大.png",
          name:"Kevin",
          show:false,
          email:"738822360@qq.com",
          cate:3,
        }
      ]
    }
  },
  methods: {
    submit() {

    }
  }
}
</script>

<style scoped>

</style>
