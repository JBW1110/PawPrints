<template>
  <div style="height: 800px;">
    <div class="tools">
      <div class="search-box">
        <el-input v-model="searchPostName" placeholder="请输入要搜索的帖子名称" clearable size="mini" @input="searchPost"/>
      </div>
      <div class="dropdownTag-box">
        <el-dropdown placement="bottom" trigger="click" @command="handleSelectTag">
          <span style="cursor: pointer;color: black">标签{{tag}}<i class="el-icon-arrow-down el-icon--right"/></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">1</el-dropdown-item>
            <el-dropdown-item command="2">2</el-dropdown-item>
            <el-dropdown-item command="3">3</el-dropdown-item>
            <el-dropdown-item command="4">4</el-dropdown-item>
            <el-dropdown-item command="5">5</el-dropdown-item>
            <el-dropdown-item command="6">-</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <post-list :posts="postList" is-view="true"></post-list>
  </div>
</template>

<script>
import PostList from '@/components/PostList'

export default {
  name: 'PostView',
  components: {PostList},
  data(){
    return{
      searchPostName: '',
      tag:'',
      postList:[{
        cover: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        name: "测试帖",
        show: false,
        like: 5,
        dislike: 2,
        reason:"",
        newComment:{
          content:"",
        },
        comments: [
          {
            content:"说的太好了!!!!",
            comment_id:"",
            user_name:"蒋博文",
            time:"2023-4-10",
            user_avatar:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          }
        ],
        content:"经常有同学给校园中的猫咪们投喂猫条、火腿肠、面包等食物，更有甚者还在猫粮碗中放烧烤和剩饭。殊不知很多人类喜欢吃的食物猫猫并不喜欢，还会对猫咪的健康产生危害。\n" +
            "\n" +
            "人类是杂食动物，而猫是纯粹的肉食动物，人类和猫的食谱并不一样。可能猫咪在人类社会的高融入度让很多人产生了错觉，但请记住，人猫有别，不要让一厢情愿的“爱”害了猫猫。\n" +
            "\n" +
            "\n" +
            "\n" +
            "如果要投喂猫猫，请准备猫粮、冻干或主食罐头，千万不要喂猫咪人类的食物！！！"+
            "\n" +
            "经常有同学给校园中的猫咪们投喂猫条、火腿肠、面包等食物，更有甚者还在猫粮碗中放烧烤和剩饭。殊不知很多人类喜欢吃的食物猫猫并不喜欢，还会对猫咪的健康产生危害。\n" +
            "\n" +
            "人类是杂食动物，而猫是纯粹的肉食动物，人类和猫的食谱并不一样。可能猫咪在人类社会的高融入度让很多人产生了错觉，但请记住，人猫有别，不要让一厢情愿的“爱”害了猫猫。\n" +
            "\n" +
            "\n" +
            "\n" +
            "如果要投喂猫猫，请准备猫粮、冻干或主食罐头，千万不要喂猫咪人类的食物！！！"+
            "\n" +
            "经常有同学给校园中的猫咪们投喂猫条、火腿肠、面包等食物，更有甚者还在猫粮碗中放烧烤和剩饭。殊不知很多人类喜欢吃的食物猫猫并不喜欢，还会对猫咪的健康产生危害。\n" +
            "\n" +
            "人类是杂食动物，而猫是纯粹的肉食动物，人类和猫的食谱并不一样。可能猫咪在人类社会的高融入度让很多人产生了错觉，但请记住，人猫有别，不要让一厢情愿的“爱”害了猫猫。\n" +
            "\n" +
            "\n" +
            "\n" +
            "如果要投喂猫猫，请准备猫粮、冻干或主食罐头，千万不要喂猫咪人类的食物！！！"+
            "\n" +
            "经常有同学给校园中的猫咪们投喂猫条、火腿肠、面包等食物，更有甚者还在猫粮碗中放烧烤和剩饭。殊不知很多人类喜欢吃的食物猫猫并不喜欢，还会对猫咪的健康产生危害。\n" +
            "\n" +
            "人类是杂食动物，而猫是纯粹的肉食动物，人类和猫的食谱并不一样。可能猫咪在人类社会的高融入度让很多人产生了错觉，但请记住，人猫有别，不要让一厢情愿的“爱”害了猫猫。\n" +
            "\n" +
            "\n" +
            "\n" +
            "如果要投喂猫猫，请准备猫粮、冻干或主食罐头，千万不要喂猫咪人类的食物！！！"
      }]
    }
  },
  methods:{
    searchPost(){

    },
    handleSelectTag(){

    }
  }
}
</script>

<style scoped>
.tools{
  height: 30px;
  width: 1200px;
  display: flex;
}
.search-box{
  width: 420px;
  margin-right: 50px;
}
.dropdownTag-box{
  width: 90px;
  margin-right: 10px;
}
</style>
