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
        <div id="mapContainer"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import MyHeader from '@/components/MyHeader'
import SideBar from '@/components/SideBar'

export default {
  name: "AnimalMap",
  components: {MyHeader,SideBar},
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      console.log(window)
      var center = new window.TMap.LatLng(39.984120, 116.307484)
      var map = new window.TMap.Map("mapContainer", {
        zoom: 18,//设置地图缩放级别
        center: center,//设置地图中心点坐标
      });
      console.log(map);
    }
  }
}
</script>

<style scoped>
</style>