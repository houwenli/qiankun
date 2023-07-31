<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <a href="/subone"> subone </a>
    <a href="/subtwo"> subtwo </a>
    我是主应用
    <!-- 主应用路由渲染出口 -->
    <!-- <router-view></router-view> -->

    <!-- 微前端子应用渲染出口 -->
    <div id="container"></div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
