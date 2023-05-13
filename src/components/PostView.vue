<template>
  <div style="height: 800px;">
    <div class="tools">
      <div class="search-box">
        <el-input v-model="searchPostName" placeholder="请输入要搜索的帖子名称" clearable size="mini" @input="searchPost"/>
      </div>
<!--      <div class="dropdownTag-box">-->
<!--        <el-dropdown placement="bottom" trigger="click" @command="handleSelectTag">-->
<!--          <span style="cursor: pointer;color: black">标签{{tag}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"/></span>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item command="1">1</el-dropdown-item>-->
<!--            <el-dropdown-item command="2">2</el-dropdown-item>-->
<!--            <el-dropdown-item command="3">3</el-dropdown-item>-->
<!--            <el-dropdown-item command="4">4</el-dropdown-item>-->
<!--            <el-dropdown-item command="5">5</el-dropdown-item>-->
<!--            <el-dropdown-item command="6">-</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
<!--      </div>-->
    </div>
    <div class="posts-container" style="margin-top: 10px">
      <div class="postBar" v-for="post in postList" :key="post.data">
        <div  @click="post.show = !post.show"><img :src="post.postImgUrls[0]" alt="帖子封面" class="post_picture"></div>
        <div class="post_name"  @click="post.show = !post.show">{{post.title.length > 30 ? post.title.substring(0,30)+' ...':post.title}}</div>
        <div class="post_delete">
          <v-btn elevation="10" icon color="red" @click="deletePost(post.id)"
                 style="margin-right: 5px">
            <i class="el-icon-close" style="font-size: 30px;"></i>
          </v-btn>
        </div>
<!--        <div style="float:right;margin-right: 50px;margin-top: 70px">-->
<!--          <v-row>-->
<!--            <v-btn icon color="deep-orange" @click="thumbUp(post)" v-show="post.hasThumbed">-->
<!--              <svg-icon type="mdi" :path="pathUp"></svg-icon>-->
<!--            </v-btn>-->
<!--            <v-btn icon @click="thumbUp(post)" v-show="!post.hasThumbed">-->
<!--              <svg-icon type="mdi" :path="pathUp"></svg-icon>-->
<!--            </v-btn>-->
<!--            <div style="margin-top: 5px">{{ post.thumbNum }}</div>-->
<!--          </v-row>-->
<!--        </div>-->
        <v-dialog v-model="post.show">
          <v-card>
            <v-col>
                <v-card-title>
                  <span class="headline">{{ post.title }}</span>
                </v-card-title>
                <v-card-subtitle>
                  <span>{{ post.publisherName }} {{ post.publisherEmail }}</span>
                </v-card-subtitle>
<!--              <v-row style="float: right;margin-right: 20px">-->
<!--                <v-btn icon color="deep-orange" @click="thumbUp(post)" v-show="post.hasThumbed">-->
<!--                  <svg-icon type="mdi" :path="pathUp"></svg-icon>-->
<!--                </v-btn>-->
<!--                <v-btn icon @click="thumbUp(post)" v-show="!post.hasThumbed">-->
<!--                  <svg-icon type="mdi" :path="pathUp"></svg-icon>-->
<!--                </v-btn>-->
<!--                <div style="margin-top: 5px">{{ post.thumbNum }}</div>-->
<!--              </v-row>-->
            </v-col>
            <v-card-text style="margin-top: 20px">
              <div class="img_show">
                <el-carousel :interval="4000" type="card" height="500px" indicator-position="outside">
                  <el-carousel-item v-for="pic in post.postImgUrls" :key="pic">
                    <img :src="pic" class="img" width="100%" height="100%">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <pre style="white-space:pre-wrap">{{ post.content }}</pre>
            </v-card-text>
            <v-list>
              <v-list-item
                  v-for="comment in post.commentDTOS"
                  :key="comment.comment_id"
                  style="margin-top: 20px;flex: auto"
              >
                <v-card
                    class="mx-auto"
                    width="100%"
                    color="blue-grey lighten-4"
                >
                  <v-card-title>
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                          class="elevation-6"
                          :src="comment.publisherAvatarUrl"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ comment.publisherName }}</v-list-item-title>
                      <v-list-item-subtitle>{{ comment.createTime }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-card-title>
                  <pre v-html="comment.content" style="margin-left: 10px;white-space:pre-wrap"></pre>
                </v-card>
              </v-list-item>
<!--              <v-card-text style="margin-top: 30px">参与讨论：</v-card-text>-->
            </v-list>
<!--            <v-textarea-->
<!--                v-model="post.comment"-->
<!--                auto-grow-->
<!--                filled-->
<!--                clearable-->
<!--                color="deep-purple"-->
<!--                label="请输入评论内容"-->
<!--                rows="1"-->
<!--                style="width: 95%;margin-left: 30px"-->
<!--            >-->
<!--            </v-textarea>-->
<!--            <v-card-actions>-->
<!--              <v-btn @click="makeComment(post)" style="margin-top: 20px;float: left;width: 20px" color="primary">-->
<!--                评论-->
<!--              </v-btn>-->
<!--            </v-card-actions>-->
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
// import SvgIcon from '@jamescoyle/vue-icon'
import { mdiThumbUp } from '@mdi/js'

export default {
  name: 'PostView',
  // components:{SvgIcon},
  data(){
    return{
      pathUp:mdiThumbUp,
      searchPostName: '',
      tag:'',
      posts:[],
      newComment:{
        content:"",
      },
      postList:[{
        cover: "",
        title: "",
        show: false,
        hasThumbed:'',
        postImgUrls:'',
        publisherAvatarUrl:'',
        publisherEmail:'',
        thumbNum:'',
        reason:"",
        newComment:{
          content:"",
        },
        comment:'',
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
          'status': '审核通过',
        })
      }).then((res)=>{
        if(res.data.code===200){
          // console.log(res.data.data)
          this.postList = res.data.data
          this.$bus.$emit("showSnackBar", "修改密码成功！")
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    },
    searchPost(){
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/post/search",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token'),
        },
        data: Qs.stringify({
          'type': '科普',
          'status': '审核通过',
          'keyword': this.searchPostName,
        })
      }).then((res)=>{
        if(res.data.code===200){
          // console.log(res.data.data)
          this.postList = res.data.data
          this.$bus.$emit("showSnackBar", "修改密码成功！")
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    },
    thumbUp(post) {
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/post/thumb",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token'),
        },
        data: Qs.stringify({
          'postId':post.id,
        })
      }).then((res)=>{
        // console.log(res.data)
        if(res.data.code===200){
          if (post.hasThumbed) {
            post.hasThumbed = false
            post.thumbNum--
            this.$message.success("取消点赞成功");
          } else {
            post.hasThumbed = true
            post.thumbNum++
            this.$message.success("点赞成功");
          }
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    },
    makeComment(post) {
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/createComment",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token'),
        },
        data: Qs.stringify({
          'postId':post.id,
          'content':post.comment
        })
      }).then((res)=>{
        // console.log(res.data)
        if(res.data.code===200){
          post.comment = ''
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    },
    deletePost(id){
      this.$axios({
        url:"https://anitu1.2022martu1.cn:8443/post/delete",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token'),
        },
        data: Qs.stringify({
          'postId':id,
        })
      }).then((res)=>{
        // console.log(res.data)
        if(res.data.code===200){
          this.$message.success("删除帖子成功");
          this.postList = this.postList.filter((post) => {
            return post.id !== id
          })
        } else if (res.data.code===404){
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    }
  },
  mounted() {
    this.getPosts();
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
