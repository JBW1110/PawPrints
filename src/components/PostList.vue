<template>
  <v-app>
  <div class="posts-container" style="margin-top: 10px">
    <div class="postBar" v-for="post in posts" :key="post.data" @click="post.show = !post.show">
      <div><img :src="post.cover" alt="帖子封面" class="post_picture"></div>
      <div class="post_name">{{ post.name }}</div>
      <div class="post_delete" v-show="isView">
        <v-btn elevation="10" icon color="red" @click="deletePost(post)"
               style="margin-right: 5px">
          <i class="el-icon-close" style="font-size: 30px;"></i>
        </v-btn>
      </div>
      <div style="float:right;margin-right: 50px;margin-top: 70px" v-show="isView">
        <v-row>
          <v-btn icon color="deep-orange">
            <svg-icon type="mdi" :path="pathUp"></svg-icon>
          </v-btn>
          <div style="margin-top: 5px">{{ post.like }}</div>
          <v-btn icon color="blue-grey darken-2">
            <svg-icon type="mdi" :path="pathDown"></svg-icon>
          </v-btn>
          <div  style="margin-top: 5px">{{ post.dislike }}</div>
        </v-row>
      </div>
      <v-dialog v-model="post.show">
        <v-card>
          <v-col>
            <v-row>
              <v-card-title>
                <span class="headline">{{ post.name }}</span>
              </v-card-title>
            </v-row>
            <v-row
                align="center"
                justify="end"
                style="margin-right: 20px;"
                v-show="isView"
            >
              <v-btn icon color="deep-orange">
                <svg-icon type="mdi" :path="pathUp"></svg-icon>
              </v-btn>
              <div>{{ post.like }}</div>
              <v-btn icon color="blue-grey darken-2">
                <svg-icon type="mdi" :path="pathDown"></svg-icon>
              </v-btn>
              <div>{{ post.dislike }}</div>
            </v-row>
          </v-col>
          <v-card-text style="margin-top: 20px">
            <pre>{{ post.content }}</pre>
          </v-card-text>
          <v-textarea
              v-model="请输入审核理由"
              auto-grow
              filled
              clearable
              color="deep-purple"
              label="请输入审核理由"
              rows="1"
              v-show="isCheck"
          >
          </v-textarea>
          <v-card-actions v-show="isCheck">
            <v-btn @click="submit" style="margin-top: 20px;float: left;width: 20px" color="light-green">
              通过
            </v-btn>
            <v-btn @click="submit" style="margin-top: 20px;float: left;width: 20px" color="red">
              拒绝
            </v-btn>
          </v-card-actions>
          <v-list v-show="isView">
            <v-list-item
                v-for="comment in post.comments"
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
                        :src="comment.user_avatar"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ comment.user_name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ comment.time }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-card-title>
                <pre v-html="comment.content" style="margin-left: 10px"></pre>
              </v-card>
            </v-list-item>
          </v-list>
          <v-card-text style="margin-top: 30px" v-show="isView">参与讨论：</v-card-text>
          <mavon-editor
              v-model="post.newComment.content"
              v-show="isView"
              style="margin-top: 20px;height: 100%;width:100%;align-self: center"
              ref=md
              @change="change"
              fontSize="16px">
          </mavon-editor>
          <v-card-actions v-show="isView">
            <v-btn @click="submit" style="margin-top: 20px;float: left;width: 20px" color="primary">
              评论
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="post.show = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
  </v-app>
</template>

<script>
import { mdiThumbDown, mdiThumbUp } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon';

export default {
  name: 'PostList',
  props: ["posts","isView","isCheck"],
  components:{SvgIcon},
  data(){
    return {
      pathUp:mdiThumbUp,
      pathDown:mdiThumbDown,
    }
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
