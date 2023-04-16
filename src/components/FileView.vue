<template>
  <v-app>
    <div class="files-container" style="margin-top: 10px">
      <div class="fileBar" v-for="file in fileList" :key="file.data" @click="file.show = !file.show">
        <div><img src="../assets/白老大.png" alt="动物照片" class="file_picture"></div>
        <div class="file_name">{{ file.name }}</div>
        <div class="file_delete">
          <v-btn elevation="10" icon color="red" @click="deletefile(file)"
                 style="margin-right: 5px">
            <i class="el-icon-close" style="font-size: 30px;"></i>
          </v-btn>
        </div>
        <div style="margin-top: 100px">品种：{{file.type}}<br/>性格：{{file.character}}</div>
        <v-dialog v-model="file.show" width="600px">
          <v-card  style="border: solid #ACC0D8 5px;">
            <div style="margin-left: 150px"><img src="../assets/白老大.png" alt="动物照片" style="height: 300px;width: 300px"></div>
            <v-card-title style="text-align: center">
              <span class="headline">{{ file.name }}</span>
            </v-card-title>
            <div class="link-top"></div>
            <v-card-text style="margin-top: 20px">
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px">种类：{{ file.type }}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px">性格：{{ file.character }}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px">体重：{{ file.weight }}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px">绝育状态：{{ file.status }}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px">描述：{{file.description}}</pre>
              <pre style="font-size: 20px;color: #181818;font-weight: bold;margin-bottom: 10px">出没位置：{{file.location}}</pre>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'FileView',
  data() {
    return{
      fileList:[
        {
          avatar:"../assets/白老大.png",
          type:"奶牛",
          name:"白老大",
          weight:"4kg",
          description:"跟皮皮猫长得有点像，花纹是黑白的，快递站干饭常客",
          location:"快递站",
          status:"已绝育",
          character:"怕人 安全距离1m以外",
          show:false,
        }
      ]
    }
  }
}
</script>

<style scoped>
.files-container {
  height: 800px;
}
.fileBar {
  width: 600px;
  float: left;
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-right: 30px;
  margin-bottom: 20px;
}
.file_picture {
  margin-left: 10px;
  width: 200px;
  height: 200px;
  float: left;
  margin-right: 30px;
}
.file_name {
  font-size: 30px;
  width: 300px;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.file_delete {
  margin-top: 10px;
  margin-right: 10px;
  height: 55px;
  float: right;
}
.link-top {
  width: 100%;
  height: 5px;
  border-top: solid #ACC0D8 5px;
}
</style>
