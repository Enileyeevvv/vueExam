<template>
  <div class="about">
    <Header name="Список объявлений"/>
    <section>
      <div class="wrapper">
        <div class="section__inner">
          <aside class="sidebar">
            <Nav/>
            <div class="widget">
              <img src="../assets/left_widget_img.jpg">
              <h3>Наша база ежедневно пополняется десятками самых хороших объявлений по лучшей цене</h3>
              <p>Объявлений с машинами: {{ salesCount.cars }}</p>
              <p>Объявлений с домами: {{ salesCount.apartments }}</p>
            </div>
          </aside>
          <main class="main">
            <Form @refresh="getSales"/>
            <h2>Все объявления</h2>
            <div class="sales-list">
              <div v-for="sale in sales" :key="sale" :class="sale.type === 'car' ? 'bg-car sales-list__item' : 'bg-apart sales-list__item'">
                <img v-if="sale.type === 'car'" src="../assets/car_img.png">
                <img v-else src="../assets/home_img.png">
                <p>{{ sale.city }}, {{ sale.address }}</p>
                <p>{{ sale.phone }}</p>
                <p>{{ sale.price }} рублей</p>

                <tepmplate v-if="sale.type === 'car'">
                  <h4>{{ sale.model }}</h4>
                  <p>{{ sale.car_type }}</p>
                  <p>Объем двигателя - {{ sale.engine_volume }}</p>
                  <p>Мощность двигателя - {{ sale.engine_power }}</p>
                </tepmplate>

                <template v-else>
                  <h4>Комнат: {{ sale.rooms }}</h4>
                  <p>Площадь: {{ sale.square }}</p>
                </template>
              </div>
            </div>
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
import Form from "../components/Form";
import axios from "axios";

export default {
  components: {
    Nav,
    Header,
    Form,
  },

  data() {
    return {
      sales: null,
      widgetInfo: null,
      fields: null,
    };
  },

  computed: {
    salesCount() {
      return this.$store.getters.GET_SALES;
    }
  },

  methods: {
    getSales() {
      axios
          .get("https://demo-api.vsdev.space/api/brom/sales")
          .then(response => (this.sales = response.data.reverse()));
    }
  },

  created() {
    this.getSales();

    axios
        .get("https://demo-api.vsdev.space/api/brom/sales/form")
        .then(response => (this.fields = response.data));
  }
};
</script>

<style scoped>
.wrapper {
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

.main {
  padding-top: 25px;
  width: 800px;
}

.main img {
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

.sales-list__item img {
  max-width: 250px;
  height: 150px;
}
.bg-car{
  background-color: rgb(210, 210, 218);
}
.bg-apart{
  background-color: rgb(216, 177, 177);
}
</style>