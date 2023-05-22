<template>

  <el-container>
    <div class="side-bar">
      <SideBar></SideBar>
    </div>
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-input v-model="searchText" placeholder="输入查询的动物名字" @input="filterMarkers"></el-input>
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
      map: null,
      markers: [],
      mapMarkers: [],
      mapWindows: [],
      dialogVisible: false,
      searchText: '',
      selectedMarker: null,
      id2archive:{},
      id2img:{},
      id2name:{},
      id2time:{},
      filteredMarkers: [], // 新增属性，存储过滤后的标记点数组
    }
  },
  mounted() {
    //this.initMap()
  },
  created () {
    if(localStorage.getItem('token') == null){
      let path = "/";
      this.$router.push({
        path
      });
    }
    this.getAllLocations();
  },
  methods: {
    initMap() {
      console.log(window)
      var center = new window.TMap.LatLng(39.981771, 116.347313)
      this.map = new window.TMap.Map("mapContainer", {
        zoom: 18,//设置地图缩放级别
        center: center,//设置地图中心点坐标
      });
      console.log(this.map);
      this.addMarkers(this.markers);
    },
    getAllLocations() {
      this.$axios({
        url: "https://anitu1.2022martu1.cn:8443/findLocation",
        method: 'post',
        headers: {
          'token': localStorage.getItem('token')
        },
      }).then((res) => {
        console.log(res.data.data)
        if (res.data.code === 200) {
          this.markers = res.data.data
          for (let i = 0; i < this.markers.length; i++){
            let curId = this.markers[i].id;
            this.id2archive[curId]=this.markers[i].archiveId;
            this.id2img[curId]=this.markers[i].imageUrl;
            this.id2name[curId]=this.markers[i].animalName;
            this.id2time[curId]=this.markers[i].time;
          }
        } else if (res.data.code === 404) {
          this.$bus.$emit("showSnackBar", res.data.errMessage)
        } else this.$notify.error(res.data.errMessage)
      })
    },
    addMarkers(p_markers) {
      p_markers.forEach((marker) => {
        var position = new window.TMap.LatLng(marker.latitude, marker.longitude);
        var markerOptions = {
          id: marker.id,
          map: this.map,
          styles: {
            "marker": new window.TMap.MarkerStyle({
              "width": 24,
              "height": 35,
              "anchor": { x: 12, y: 35 },
              "src": 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png'
            })
          },
          geometries: [{
            "id": marker.id,
            "styleId": 'marker',
            "position": position,
            "properties": {
              "title": marker.id,
              "img": marker.imageUrl,
              "time": marker.time,
              "archiveId": marker.archiveId,
              "name": marker.animalName
            }
          }],
        };
        var thisMarker = new window.TMap.MultiMarker(markerOptions);
        this.mapMarkers.push(thisMarker)
        var infoWindow = new window.TMap.InfoWindow({
          map: this.map,
          position: new window.TMap.LatLng(39.984104, 116.307503),
          offset: { x: 0, y: -32 }
        });
        infoWindow.close();
        this.mapWindows.push(infoWindow)
        thisMarker.on("click", function (evt) {
          infoWindow.open(); //打开信息窗
          infoWindow.setPosition(evt.geometry.position);//设置信息窗位置
          let name = evt.geometry.properties.name;
          let img = evt.geometry.properties.img;
          let time = evt.geometry.properties.time;
          infoWindow.setContent("<div>" +
              "<img src='" + img + "' style=\"width: 100px; height: 100px;\">" +
              "<p>" + name + "</p>" +
              "<p>" + time + "</p>" +
              "</div>")
          // infoWindow.setContent(tempId2Name[evt.geometry.id]);
        });
      });
    },
    openInfoWindow(marker) {
      var infoWindow = new window.TMap.InfoWindow({
        map: this.map,
        position: marker.geometry.position,
        offset: { x: 0, y: -32 }
      });
      infoWindow.setContent(marker.id);
      infoWindow.open();
    },
    filterMarkers() {
      if (this.searchText === '') {
        this.filteredMarkers = this.markers;
      } else {
        this.filteredMarkers = this.markers.filter(marker => {
          return marker.animalName.includes(this.searchText);
        })
      }
      this.updateMarkersOnMap();
    },
    updateMarkersOnMap() {
      // 清除地图上的标记点
      //this.map.clearOverlays();
      this.mapMarkers.forEach(m => {
        m.setMap(null);
      });
      this.mapWindows.forEach(m => {
        m.close();
      });
      // 添加过滤后的标记点到地图
      this.addMarkers(this.filteredMarkers);
    },
  },
  watch: {
    markers: {
      handler() {
        this.initMap();
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
