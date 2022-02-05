<template>
  <div class="home">
    <Header name = "Главная"/>
    <section>
      <div class="wrapper">
        <div class="section__inner">
          <aside class="sidebar">
            <Nav/>
            <div class="widget">
              <img src="../assets/left_widget_img.jpg">
              <h3>Наша база ежедневно пополняется десятками самых хороших объявлений по лучшей цене</h3>
              <p>Объявлений с машинами: {{widgetInfo.cars}}</p>
              <p>Объявлений с домами: {{widgetInfo.apartments}}</p>
            </div>
          </aside>
          <main class="main">
            <p v-html="info.text">
              {{ info.text }}
            </p>
            <img :src="info.image">
          </main>
        </div>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import Header from "../components/Header.vue";
import axios from "axios"

export default {
  components: {
    Nav,
    Header,
  },
  data() {
    return {
      info: null,
      widgetInfo: null,
    }
  },
  methods: {
  },
  created() {
    axios
      .get("https://demo-api.vsdev.space/api/brom/home_page")
      .then(response => (this.info = response.data));
    axios
      .get("https://demo-api.vsdev.space/api/brom/left_widget")
      .then(response => (this.widgetInfo = response.data));
  }
};
</script>

<style scoped>
.wrapper{
  max-width: 1280px;
  margin: 0 auto;
}
.section__inner {
  display: flex;
}
.sidebar {
    height: 100%;
    width: 355px;
}
.main{
  width: 800px;
}
.main img{
  max-width: 768px;
  height: auto;
}
</style>