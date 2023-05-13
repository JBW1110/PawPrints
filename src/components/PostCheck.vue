<template>
  <div style="height: 800px;">
    <div class="posts-container" style="margin-top: 10px">
      <div class="postBar" v-for="post in postList" :key="post.data" @click="post.show = !post.show">
        <div><img :src="post.postImgUrls[0]" alt="帖子封面" class="post_picture"></div>
        <div class="post_name">{{post.title.length > 30 ? post.title.substring(0,30)+' ...':post.title}}</div>
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
              <pre style="white-space:pre-wrap">{{ post.content }}</pre>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="changeState('审核通过',post)" style="margin-top: 20px;float: left;width: 20px" color="light-green">
                通过
              </v-btn>
              <v-btn @click="post.showReject = !post.showReject" style="margin-top: 20px;float: left;width: 20px" color="red">
                拒绝
              </v-btn>
            </v-card-actions>
            <v-dialog v-model="post.showReject" max-width="500">
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
        cover: "",
        name: "",
        show: false,
        showReject: false,
        like: 5,
        dislike: 2,
        newComment:{
          content:"",
        },
        comments: [
          {
            content:"",
            comment_id:"",
            user_name:"",
            time:"",
            user_avatar:"",
          }
        ],
        content:""
      }]
    }
  },
  methods:{
    getPosts() {
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/post/search",
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
          console.log(res.data.data)
          this.postList = res.data.data
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    },
    changeState(status,post){
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/changePostState",
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
