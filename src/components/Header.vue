<template>
  <div class="header">
    <div class="header-inner">
      <div class="menu">
        <div class="logo">
          <router-link to="/">
            <h1>Broom.ru</h1>
          </router-link>
        </div>
        <div class = "page-name">
          <h1>{{ name }}</h1>
        </div>
        <div class="">
            <h1>Доска объявлений</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    name: String,
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #D8B6A4;
}
#nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
