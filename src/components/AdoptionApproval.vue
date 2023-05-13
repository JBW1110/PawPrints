<template>
  <el-main>
    <v-app>
      <v-list subheader>
        <v-list-item
            v-for="member in members"
            :key="member.archiveID"
            v-show="member.status === '申请中'">
          <v-list-item-avatar>
            <v-avatar>
              <img :src="member.applicantAvatarUrl" alt="头像">
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content style="padding-left: 10px">
            <v-list-item-title v-text="member.applicantNickname"></v-list-item-title>
            <v-list-item-subtitle class="text--primary" v-text="member.email"></v-list-item-subtitle>
<!--            <v-list-item-subtitle v-text="member.address"></v-list-item-subtitle>-->
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-3"
                 @click="member.show = !member.show"
                 style="min-width: 120px">
            <v-icon>
              mdi-account-heart
            </v-icon>
            查看详情
          </v-btn>
          <v-dialog v-model="member.show">
            <v-card>
              <v-card-title>
                <span class="headline">{{member.applicantNickname}}申请领养{{member.animalName}}</span>
              </v-card-title>
              <v-card-text style="margin-top: 20px">
                <pre>{{ member.reason }}</pre>
              </v-card-text>
              <v-textarea
                  v-model="member.notes"
                  auto-grow
                  filled
                  clearable
                  color="deep-purple"
                  label="请输入审核理由"
                  rows="1"
                  style="width: 95%;margin-left: 30px"
              >
              </v-textarea>
              <v-card-actions>
                <v-btn @click="changeState(member,'已通过')" style="margin-top: 20px;float: left;width: 20px" color="light-green">
                  通过
                </v-btn>
                <v-btn @click="changeState(member,'未通过')" style="margin-top: 20px;float: left;width: 20px" color="red">
                  拒绝
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-app>
  </el-main>
</template>

<script>
import Qs from 'qs'

export default {
  name: 'AdoptionApproval',
  data() {
    return {
      members: [{
        user_id: "123",
        applicantNickname: "吴佳锐",
        animalName:"",
        applicantAvatarUrl: "",
        avatar: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        email:"738822360@qq.com",
        reason:"家庭认养最好选择知根知底的家庭或者朋友介绍的家庭，清楚猫的来源，这样对猫的了解会更多。\n" +
            "\n" +
            "人与猫之间也存在缘分，在决定认养前，先去繁育者的家中和猫做一个简单的接触，以免猫从一开始就对认养人产生抗拒。\n" +
            "\n" +
            "家庭认养需要了解的事情很多，例如猫年龄、性别、品种、训练情况、疾病史和习惯性格等等，细心的认养者还会了解一下猫爸和猫妈的情况。\n" +
            "\n" +
            "决定认养猫的时候，带猫去宠物医院做一个全面的体检，确保猫的身体健康。\n" +
            "\n" +
            "有的繁育者还会和认养者签订一系列的认养协议，甚至会提一些特殊的要求，例如每周要按时给繁育者发几个猫的视频和照片，有的繁育者还会不定期上门查看猫的状况，给猫粮、猫砂、猫窝提建议。\n" +
            "\n" +
            "有的家庭认养轻松又简单，有的则是烦琐又复杂，需要你根据自身的情况和繁育者的要求，权衡之后再决定是否认养幼猫。",
        show: false,
        address:"北京航空航天大学",
        notes:"",
      }, {
        user_id: "20373201",
        real_name: "蒋博文",
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        email:"738822360@qq.com",
        show: false,
        address:"北京航空航天大学",
        reason: "",
      }]
    }
  },
  methods: {
    changeState(member, status) {
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/admin/update/application",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: Qs.stringify({
          archiveId: member.archiveId,
          applicantEmail: member.email,
          status: status,
          notes: member.notes
        })
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          member.adoptState = status
          member.show = false
          member.notes = ''
          this.members = this.members.filter((m) => {
            return m.archiveId !== member.archiveId
          })
          this.$message.success("状态变成" + status);
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
    getMemberList () {
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/admin/query/application",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.members = res.data.data
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.message)
      })
    },
  },
  mounted () {
    this.getMemberList()
  }
}
</script>

<style scoped>

</style>
