<template>
  <div class="about">
    <Header name = "Список объявлений"/>
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
            <button @click="show = !show">
                Показать
            </button>
            <form v-if="show">
              <h2>Добавить объявление</h2>
              <br>
              {{fields}}
              <br>
              <select>
                <option 
                  v-for="values in type" 
                  :key="values">
                  {{type.values}}
                </option>
              </select>
            </form>
            <h2>Все объявления</h2>
            <div class="sales-list">
                <div class="sales-list__item" v-for="sale in sales" :key="sale">
                    <img v-if="sale.type == 'car'" src="../assets/car_img.png">
                    <img v-if="sale.type == 'apartment'" src="../assets/home_img.png">
                    <h4>{{sale.model}}</h4>
                    <p>{{sale.city}}, {{sale.address}}</p>
                    <p>{{sale.price}} рублей</p>
                    <p>{{sale.car_type}}</p>
                    <p>Объем двигателя - {{sale.engine_volume}}</p>
                    <p>Мощность двигателя - {{sale.engine_power}}</p>
                    <p>{{sale.phone}}</p>
                </div>
            </div>
          </main>
        </div>
      </div>
    </section>
    <footer>{{formInfo}}</footer>
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
      show: true,
      sales: null,
      widgetInfo: null,
      fields: null,
    }
  },
  created() {
    axios
      .get("https://demo-api.vsdev.space/api/brom/left_widget")
      .then(response => (this.widgetInfo = response.data));
    axios
      .get("https://demo-api.vsdev.space/api/brom/sales")
      .then(response => (this.sales = response.data));
      axios
      .get("https://demo-api.vsdev.space/api/brom/sales/form")
      .then(response => (this.fields = response.data));
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
  padding-top: 25px;
  width: 800px;
}
.main img{
  max-width: 768px;
  height: auto;
}
.sales-list {
    display: flex;
    flex-wrap: wrap;
}
.sales-list__item {
    background-color: rgb(219, 228, 228);
    text-align: left;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px 20px;
    margin: 10px 10px;
}
.sales-list__item img{
    max-width: 250px;
    height: 150px;
}
</style>