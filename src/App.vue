<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
.el-message{
  white-space: pre-line;
}
//  弹窗居中
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  padding: 20px 20px 0px 20px;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  background-color: #ffffff;
}
.el-tabs__content {
  height: calc(100% - 60px);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  .content {
    height: 100%;
    .el-tabs {
      height: 100%;
      .el-tab-pane {
        height: 100%;
        .el-steps {
          margin-top: 0px;
        }
      }
    }
  }
}
</style>
