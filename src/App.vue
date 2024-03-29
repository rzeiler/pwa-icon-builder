<template>
  <div class="p-3 d-flex flex-column vh-100">
    <nav class="navbar bg-light mb-4">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img
            src="@/assets/logo.png"
            alt="IconBuilder"
            ref="appIcon"
            @load="onload"
            width="30"
            height="24"
          />
          IconBuilder
        </a>
        <span class="flex-grow-1" />
        <button
          v-if="!processing"
          class="btn btn-dark"
          @click="$refs.file.click()"
          type="button"
        >
          Open Image
        </button>

        <button class="btn prettier" @click="prettyPrint">Format Manifest</button>

        <button class="btn" type="button" @click="build">Build</button>
        <button class="btn" type="button" @click="download">Download / Save</button>

        <div v-if="processing" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </nav>
    <div class="display-4">Manifest</div>
    <textarea
      class="manifest form-control"
      ref="manifest"
      rows="10"
      cols="50"
      @change="manifest"
    >
    </textarea>

    <div class="display-4">Images</div>
    <div
      class="d-flex flex-row flex-nowrap overflow-auto align-items-end"
      style="scroll-snap-type: x proximity; scroll-snap-align: center"
    >
      <div
        v-for="item in list"
        :key="item.name"
        class="bg overflow-hidden"
        :style="style(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="overflow-hidden h-0 w-0 d-none">
      <canvas
        ref="canvas"
        width="512"
        height="512"
        style="border: 1px solid #000000"
      ></canvas>
      <input type="file" ref="file" multiple="false" @change="fileChange" />
      <a ref="link"></a>
    </div>
    <div class="flex-grow-1"></div>
    <div>
      Credit:
      <a href="https://www.flaticon.com/free-icons/cement" title="cement icons"
        >Cement icons created by Freepik - Flaticon</a
      >
    </div>

    <div class="d-flex tree-bg overflow-hidden p-1" style="min-height: 200px">
      <scrollbar class="pe-3 h-100" style="min-width: 200px" :settings="settings">
        <TreeItem :node="treeData" @treeitem-click="clickHandle" />
      </scrollbar>

      <div>CODE</div>
    </div>
  </div>
</template>

<script>
import demoManifest from "@/assets/demo-manifest.json";
import image from "@/assets/logo.png";
import TreeItem from "./components/TreeItem";

import scrollbar from "./components/Scrollbar";

export default {
  name: "App",
  components: {
    TreeItem,
    scrollbar,
  },
  data() {
    return {
      canvas: null,
      context: null,
      list: [],
      base_image: new Image(),
      processing: false,
      treeData: {
        name: "ICONBUILDER",
        type: "folder",
        children: [
          { name: "manifest", icon: "/img/ui-icons/folder-components.svg", type: "folder" },
          { name: "icons", icon: "/img/ui-icons/folder-config.svg", type: "folder", children: [] },
        ],
      },
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,

        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 50,
      },
    };
  },
  methods: {
    clickHandle(evt) {
      if(evt.type == "file"){
        alert("open tab");
      }
       if(evt.type == "folder"){
        alert("open folder");
      }

      console.log(  evt);
       
    },
    style: function (item) {
      let minWidth = 200;
      let minHeight = item.height / 2 + 50;

      if (item.width / 2 > minWidth) minWidth = item.width / 2;

      return {
        backgroundImage: "url(" + item.src + ")",
        backgroundSize: item.width / 2 + "px " + item.height / 2 + "px ",
        minHeight: minHeight + "px",
        minWidth: minWidth + "px",
        margin: "5px",
        textAlign: "center",
        backgroundPosition: "center 50px ",
      };
    },
    fileChange: function () {
      this.processing = true;
      const reader = new FileReader();

      const t = this;
      reader.onloadend = function () {
        t.base_image.src = reader.result;
      };
      t.base_image.onload = function () {
        t.context.clearRect(0, 0, t.canvas.width, t.canvas.height);
        t.context.drawImage(t.base_image, 0, 0, 196, 196);
        t.build();
      };
      const file = this.$refs.file.files[0];
      reader.readAsDataURL(file);
    },
    download: function () {
      this.list.forEach((icon) => {
        const t = this;
        setTimeout(function () {
          t.$refs.link.href = icon.src;
          t.$refs.link.download = icon.name;
          t.$refs.link.click();
        }, 2000);
      });
    },
    manifest: function () {
      this.prettyPrint();
    },
    onload: function () {
      this.base_image.src = image;
      const t = this;
      this.base_image.onload = function () {
        t.build();
      };
    },
    prettyPrint: function () {
      var obj = JSON.parse(this.$refs.manifest.value);
      this.$refs.manifest.value = JSON.stringify(obj, undefined, 4);
    },
    build: function () {
      this.list = [];
      this.treeData.children[1].children = [];
      this.treeData.children[0].children = [];
      const t = this;
      const data = JSON.parse(this.$refs.manifest.value);

      this.treeData.children[0].children.push({
        name: "manifest.json",
        icon: "/img/ui-icons/json.svg",
        type: "file"
      });

      if (data.icons !== undefined) {
        data.icons.forEach((icon) => {
          if (
            icon.sizes !== undefined &&
            icon.type !== undefined &&
            icon.src !== undefined
          ) {
            //this.treeData[0][1].children = [];
            const wh = icon.sizes.split("x");
            var imgData = {
              size: { width: wh[0], height: wh[1] },
              type: icon.type,
              name: icon.src.substring(icon.src.lastIndexOf("/") + 1),
              src: null,
            };
            this.list.push(imgData);
            this.treeData.children[1].children.push({
              name: imgData.name,
              icon: "/img/ui-icons/image.svg",
              type: "file"
            });
          }
        });

        this.list.forEach((icon) => {
          t.context.clearRect(0, 0, t.canvas.width, t.canvas.height);
          t.canvas.width = icon.size.width;
          t.canvas.height = icon.size.height;
          t.context.drawImage(t.base_image, 0, 0, icon.size.width, icon.size.height);
          var dataURL = t.canvas.toDataURL(icon.type, 1.0);
          icon.src = dataURL;
          icon.width = icon.size.width;
          icon.height = icon.size.height;
        });
        this.processing = false;
      }
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");

    this.$refs.manifest.value = JSON.stringify(demoManifest, undefined, 4);
  },
};
</script>

<style>
.scroll-area {
  /* position: relative;
  margin: auto; */
}
.app {
  display: flex;
}
.tree-bg {
  background-color: #1f2428;
  color: #ffffff;
}
.manifest {
  min-width: 300px;
}
.bg {
  background-position: center;
  background-repeat: no-repeat;
}
.prettier {
  background-image: url("../public/img/ui-icons/prettier.svg");
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: 5px center;
  padding-left: 30px !important;
}
</style>
