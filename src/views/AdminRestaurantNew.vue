<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantNew @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminRestaurantNew from "./../components/AdminRestaurantForm";

export default {
  components: {
    AdminRestaurantNew,
  },
  methods: {
    handleAfterSubmit(formData) {
      // TODO:  透過API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ":" + value);
      }
    },
  },
};
</script>