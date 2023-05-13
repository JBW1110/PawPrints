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
        user_id: "",
        applicantNickname: "",
        animalName:"",
        applicantAvatarUrl: "",
        avatar: "",
        email:"",
        reason:"",
        show: false,
        address:"",
        notes:"",
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
