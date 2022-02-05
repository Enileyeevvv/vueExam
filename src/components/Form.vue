<template>
  <div>
    <button @click="show = !show">
      <p v-if="!show">Показать</p>
      <p v-else>Скрыть</p>
    </button>
    <form v-if="show" @submit.prevent>
      <h3>Добавить объявление:</h3>

      <div class="form__item">
        <label>{{ form.fields.type.title }}: </label>
        <select v-model="typeSelect">
          <option v-for="(item, i) of form.fields.type.values" :key="i">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="form__item">
        <label>{{ form.fields.city.title }}: </label>
        <select v-model="city">
          <option v-for="(item, i) of form.fields.city.values" :key="i">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="form__item">
        <label>{{ form.fields.address.title }}: </label>
        <input v-model="address" type="text"/>
      </div>

      <div class="form__item">
        <label>{{ form.fields.phone.title }}: </label>
        <input v-model="phone" type="phone"/>
      </div>

      <div class="form__item">
        <label>{{ form.fields.price.title }}: </label>
        <input v-model="price" type="number"/>
      </div>

      <template v-if="typeSelect === 'car'">
        <div class="form__item">
          <label>{{ form.reference_fields['type.car'].model.title }}: </label>
          <input v-model="carModel" type="number"/>
        </div>

        <div class="form__item">
          <label>{{ form.reference_fields['type.car'].car_type.title }}: </label>
          <select v-model="carType">
            <option v-for="(item, i) of form.reference_fields['type.car'].car_type.values" :key="i">
              {{ item }}
            </option>
          </select>
        </div>

        <div class="form__item">
          <label>{{ form.reference_fields['type.car'].engine_volume.title }}: </label>
          <input v-model="engineVolume" type="number"/>
        </div>

        <div class="form__item">
          <label>{{ form.reference_fields['type.car'].engine_power.title }}: </label>
          <input v-model="enginePower" type="number"/>
        </div>
      </template>

      <template v-else-if="typeSelect === 'apartment'">
        <div class="form__item">
          <label>{{ form.reference_fields['type.apartment'].rooms.title }}: </label>
          <input v-model="apartRooms" type="number"/>
        </div>

        <div class="form__item">
          <label>{{ form.reference_fields['type.apartment'].square.title }}: </label>
          <input v-model="apartSquare" type="number"/>
        </div>
      </template>

      <template v-else>
        Необходимо выбрать тип объявления!
      </template>
      
      <div>
        <button @click="addSale">Отправить</button>
      </div>

    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Form",

  data() {
    return {
      show: false,

      form: null,

      typeSelect: null,
      city: '',
      address: '',
      phone: '',
      price: '',
      carModel: '',
      carType: '',
      engineVolume: '',
      enginePower: '',
      apartRooms: '',
      apartSquare: '',
    };
  },

  methods: {
    async getForm() {
      let {data} = await axios.get(
          `https://demo-api.vsdev.space/api/brom/sales/form`
      );
      this.form = data;
    },

    async addSale() {
      try {
        await axios.post(
            `https://demo-api.vsdev.space/api/brom/sales`,
            (() => {
              if (!Object.values(this.dataToPost()).includes('')) {
                return this.dataToPost()
              }
              else {
                alert('Заполнены не все поля')
                return
              }
            })()
        );
        this.$emit('refresh');
        this.$store.dispatch('GET_SALES');
        this.show = false;
      } catch (e) {
        console.log(e);
      }
    },

    dataToPost() {
      if (this.typeSelect === 'car') {
        return (
            {
              type: this.typeSelect,
              city: this.city,
              address: this.address,
              phone: this.phone,
              price: this.price,
              model: this.carModel,
              car_type: this.carType,
              engine_volume: this.engineVolume,
              engine_power: this.enginePower
            });
      } 
      else {
        return (
            {
              type: this.typeSelect,
              city: this.city,
              address: this.address,
              phone: this.phone,
              price: this.price,
              rooms: this.apartRooms,
              square: this.apartSquare,
            });
      }
    }
  },

  created() {
    this.getForm();
  }
};
</script>

<style scoped>
.form__item {
  margin: 10px 0;
}
</style>