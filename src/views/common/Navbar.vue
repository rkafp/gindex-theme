<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" :href="currgd.id">
          <h3 class="title is-3 has-text-white">{{ siteName }}</h3>
        </a>
        <a
          role="button"
          :class="'navbar-burger burger ' + (isActive ? 'is-active' : '')"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="burgerClick"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        :class="'navbar-menu ' + (isActive ? 'is-active' : '')"
      >
        <div class="navbar-start">
          <div
            class="navbar-item has-dropdown is-hoverable"
            v-if="gds.length > 0 && getCurrGD.length > 0"
          >
            <a class="navbar-link">{{ this.currgd.name }}</a>
            <div class="navbar-dropdown is-boxed">
              <a
                class="navbar-item"
                @click="changeItem(item)"
                v-for="(item, index) in getCurrGD"
                v-bind:key="index"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <!-- is-hidden-desktop -->
          <div class="navbar-item" v-show="showSearch">
            <div class="field is-grouped">
              <p class="control has-icons-left is-dark" style="width:100%;">
                <input
                  class="input is-rounded search-input"
                  @keyup.enter="query"
                  v-model="param"
                  type="search"
                  :placeholder="$t('search.placeholder')"
                  style="background-color: rgb(68, 66, 66);border-color: #272727;"
                />
                <span class="icon is-small is-left" style="padding:0 5px;">
                  <!-- <i class="fas fa-search"></i> -->
                  <img :src="magglass" />
                </span>
              </p>
            </div>
          </div>
          <header-locales />
          <header-setting />
          <a
            class="navbar-item is-hidden-desktop"
            @click.stop="$refs.viewMode.toggleMode"
          >
            <view-mode ref="viewMode" />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import headerLocales from "@/layout/header-aside/components/header-locales";
import headerSetting from "@/layout/header-aside/components/header-setting";
import ViewMode from "@/layout/viewmode";
export default {
  components: {
    headerLocales,
    headerSetting,
    ViewMode,
  },
  created() {
    this.siteName = document.getElementsByTagName("title")[0].innerText;
    if (window.gds && window.gds.length > 0) {
      this.gds = window.gds.map((item, index) => {
        return {
          name: item,
          id: "/" + index + ":/",
        };
      });
      this.chooseGD();
    }
    if (window.MODEL) {
      this.param = window.MODEL.q ? window.MODEL.q : "";
    }
  },
  data: function() {
    return {
      siteName: "",
      param: "",
      currgd: {},
      gds: [],
      isActive: false,
      magglass:
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnPjxwYXRoIGQ9Ik0xMDQuNTYzMDcsMTE0LjYzMTY1bDEwLjEzNTAyLC0xMC4xMzUzN2w0My4wNzUzNCw0My4wNzM4NGwtMTAuMTM1MDIsMTAuMTM1Mzd6IiBmaWxsPSIjNjE2MTYxIj48L3BhdGg+PHBhdGggZD0iTTcxLjY2NjY3LDE0LjMzMzMzYy0zMS42NjQzMywwIC01Ny4zMzMzMywyNS42NjkwMSAtNTcuMzMzMzMsNTcuMzMzMzNjMCwzMS42NjQzMyAyNS42NjkwMSw1Ny4zMzMzMyA1Ny4zMzMzMyw1Ny4zMzMzM2MzMS42NjQzMywwIDU3LjMzMzMzLC0yNS42NjkwMSA1Ny4zMzMzMywtNTcuMzMzMzNjMCwtMzEuNjY0MzMgLTI1LjY2OTAxLC01Ny4zMzMzMyAtNTcuMzMzMzMsLTU3LjMzMzMzeiIgZmlsbD0iIzYxNjE2MSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMTYuMzAwMDEsMTI2LjYzODQ1bDEwLjEzNTAyLC0xMC4xMzUzN2wzMS4xNjYyOCwzMS4xNjUxOWwtMTAuMTM1MDIsMTAuMTM1Mzd6IiBmaWxsPSIjMzc0NzRmIj48L3BhdGg+PHBhdGggZD0iTTcxLjY2NjY3LDI1LjA4MzMzYy0yNS43MjcyNiwwIC00Ni41ODMzMywyMC44NTYwNyAtNDYuNTgzMzMsNDYuNTgzMzNjMCwyNS43MjcyNiAyMC44NTYwNyw0Ni41ODMzMyA0Ni41ODMzMyw0Ni41ODMzM2MyNS43MjcyNiwwIDQ2LjU4MzMzLC0yMC44NTYwNyA0Ni41ODMzMywtNDYuNTgzMzNjMCwtMjUuNzI3MjYgLTIwLjg1NjA3LC00Ni41ODMzMyAtNDYuNTgzMzMsLTQ2LjU4MzMzeiIgZmlsbD0iIzY0YjVmNiI+PC9wYXRoPjxwYXRoIGQ9Ik05Ni4zOTE2Nyw1MC44ODMzM2MtNi4wOTE2NywtNy4xNjY2NyAtMTUuMDUsLTExLjQ2NjY3IC0yNC43MjUsLTExLjQ2NjY3Yy05LjY3NSwwIC0xOC42MzMzMyw0LjMgLTI0LjcyNSwxMS40NjY2N2MtMS40MzMzMywxLjQzMzMzIC0xLjA3NSwzLjk0MTY3IDAuMzU4MzMsNS4wMTY2N2MxLjQzMzMzLDEuNDMzMzMgMy45NDE2NywxLjA3NSA1LjAxNjY3LC0wLjM1ODMzYzUuMDE2NjcsLTUuNzMzMzMgMTEuODI1LC04Ljk1ODMzIDE5LjM1LC04Ljk1ODMzYzcuNTI1LDAgMTQuMzMzMzMsMy4yMjUgMTkuMzUsOC45NTgzM2MwLjcxNjY3LDAuNzE2NjcgMS43OTE2NywxLjQzMzMzIDIuODY2NjcsMS40MzMzM2MwLjcxNjY3LDAgMS43OTE2NywtMC4zNTgzMyAyLjE1LC0wLjcxNjY3YzEuNDMzMzMsLTEuNDMzMzMgMS40MzMzMywtMy45NDE2NyAwLjM1ODMzLC01LjM3NXoiIGZpbGw9IiNiYmRlZmIiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==",
    };
  },
  methods: {
    chooseGD() {
      let index = this.$route.params.id;
      if (this.gds && this.gds.length >= index) {
        this.currgd = this.gds[index];
      }
    },
    changeItem(item) {
      this.currgd = item;
      this.$router.push({
        path: item.id,
      });
    },
    query() {
      if (this.param) {
        this.$router.push({
          path: this.currgd.id.match("/[0-9]+:") + "search?q=" + this.param,
        });
      }
    },
    burgerClick() {
      this.isActive = !this.isActive;
    },
  },
  computed: {
    getCurrGD() {
      return this.gds.filter((item) => item.name !== this.currgd.name);
    },
    showSearch() {
      // 文件夹不支持搜索
      return window.MODEL ? window.MODEL.root_type < 2 : true
    },
  },
  watch: {
    "$route.params.id": "chooseGD",
  },
};
</script>
