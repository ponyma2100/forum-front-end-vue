<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm
      :initial-restaurant="restaurant"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        tel: "",
        address: "",
        opening_hours: "",
        description: "",
        image: "",
        categoryId: 3,
      },
    };
  },

  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId });
        console.log(data);
        //透過解構賦值將需要的資料取出
        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          CategoryId: categoryId,
        } = data.restaurant;
        //  將資料帶入 Vue 內
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId,
        };
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
    handleAfterSubmit(formData) {
      // TODO:  透過API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ":" + value);
      }
    },
  },
};
// const dummyData = {
//   restaurant: {
//     id: 1,
//     name: "Laurence Reynolds",
//     tel: "1-657-067-3756 x9782",
//     address: "187 Kirlin Squares",
//     opening_hours: "08:00",
//     description: "sit est mollitia",
//     image:
//       "https://loremflickr.com/320/240/restaurant,food/?random=91.29816290184887",
//     viewCounts: 1,
//     createdAt: "2019-07-30T16:24:55.432Z",
//     updatedAt: "2019-07-30T17:26:43.260Z",
//     CategoryId: 3,
//     Category: {
//       id: 3,
//       name: "義大利料理",
//       createdAt: "2019-07-30T16:24:55.429Z",
//       updatedAt: "2019-07-30T16:24:55.429Z",
//     },
//   },
// };
</script>