<template>
  <div style="height: 800px;">
    <div class="posts-container" style="margin-top: 10px">
      <div class="postBar" v-for="post in postList" :key="post.data" @click="post.show = !post.show">
        <div><img :src="post.postImgUrls[0]" alt="帖子封面" class="post_picture"></div>
        <div class="post_name">{{ post.title }}</div>
        <div style="font-size: large;padding-top: 120px">{{post.publisherName}} {{post.publisherEmail}}</div>
        <v-dialog v-model="post.show">
          <v-card>
            <v-col>
              <v-row>
                <v-card-title>
                  <span class="headline">{{ post.title }}</span>
                </v-card-title>
              </v-row>
            </v-col>
            <v-card-text style="margin-top: 20px">
              <pre>{{ post.content }}</pre>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="changeState('审核通过',post)" style="margin-top: 20px;float: left;width: 20px" color="light-green">
                通过
              </v-btn>
              <v-btn @click="post.show2 = !post.show2" style="margin-top: 20px;float: left;width: 20px" color="red">
                拒绝
              </v-btn>
            </v-card-actions>
            <v-dialog v-model="post.show2" max-width="500">
              <v-card style="width: 500px">
                <v-card-title>
                  <span class="headline">拒绝处理</span>
                </v-card-title>
                <v-textarea
                    v-model="post.notes"
                    auto-grow
                    filled
                    clearable
                    color="deep-purple"
                    label="请输入拒绝理由"
                    rows="1"
                    style="margin-top: 20px;margin-left: 5px;margin-right: 5px"
                >
                </v-textarea>
                <v-card-actions>
                  <v-btn @click="changeState('审核未通过',post)" style="margin-top: 20px;float: left;width: 20px" color="light-green">
                    提交
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="post.show = false">关闭</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'

export default {
  name: 'PostCheck',
  data(){
    return{
      searchPostName: '',
      tag:'',
      postList:[{
        postImgUrls:[],
        notes: "",
        cover: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        name: "测试帖",
        show: false,
        show2: false,
        like: 5,
        dislike: 2,
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
    getPosts() {
      this.$axios({
        url:"http://localhost:8080/post/search",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token'),
        },
        data: Qs.stringify({
          'type': '科普',
          'status': '审核中'
        })
      }).then((res)=>{
        if(res.data.code===200){
          // console.log(res.data.data)
          this.postList = res.data.data
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    },
    changeState(status,post){
      this.$axios({
        url:"http://localhost:8080/changePostState",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          postId:post.id,
          newStatus:status,
          notes:post.notes
        })
      }).then((res)=>{
        // console.log(res.data)
        if(res.data.code===200){
          post.show = false
          this.postList = this.postList.filter((curPost) => {
            return curPost.id !== post.id
          })
          this.$message.success("状态变成"+status);
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
  },
  mounted () {
    this.getPosts()
  }
}
</script>

<style scoped>
.posts-container {
  height: 800px;
}
.postBar {
  width: 600px;
  float: left;
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-right: 30px;
  margin-bottom: 20px;
}
.post_picture {
  margin-left: 10px;
  width: 200px;
  height: 200px;
  float: left;
  margin-right: 30px;
}
.post_name {
  font-size: 30px;
  width: 300px;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.post_delete {
  margin-top: 10px;
  margin-right: 10px;
  height: 45px;
  float: right;
}
</style>
