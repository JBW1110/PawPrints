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
            <v-list-item-title v-text="file.name"></v-list-item-title>
            <v-list-item-subtitle v-text="file.type"></v-list-item-subtitle>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-3"
                 @click="submit"
                 style="min-width: 120px"
                 v-show="file.cate===1">
            <v-icon>
              mdi-account-heart
            </v-icon>
            发布领养
          </v-btn>
          <v-btn color="orange lighten-3"
                 @click="submit"
                 style="min-width: 120px"
                 v-show="file.cate===2">
            <v-icon>
              mdi-account-heart
            </v-icon>
            取消发布
          </v-btn>
          <v-btn color="purple lighten-3"
                 @click="submit"
                 style="min-width: 120px"
                 v-show="file.cate===3">
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
export default {
  name: 'AdoptionPublish',
  data() {
    return{
      fileList:[
        {
          avatar:"../assets/白老大.png",
          type:"奶牛",
          name:"白老大",
          show:false,
          cate:1,
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
  }
}
</script>

<style scoped>

</style>
