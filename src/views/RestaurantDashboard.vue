<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        image: "",
        CategoryId: -1,
        categoryName: "",
        viewCounts: "",
      },
      Comments: [],
      commentsLength: "",
    };
  },
  beforeRouteUpdate(to, from, next) {
    // console.log("to", to);
    // console.log("from", from);
    const { id: restaurantId } = to.params;
    this.fetchDashboard(restaurantId);
    next();
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchDashboard(restaurantId);
  },

  methods: {
    async fetchDashboard(restaurantId) {
      try {
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId });
        // console.log(data.restaurant);
        if (data.status === "error") {
          throw new Error(data.message);
        }
        const {
          id,
          name,
          image,
          CategoryId,
          categoryName,
          viewCounts,
          Comments,
          Category,
        } = data.restaurant;

        this.restaurant = {
          id,
          name,
          image,
          CategoryId,
          categoryName: Category ? Category.name : "未分類",
          viewCounts,
          commentsLength: Comments.length,
        };
        this.Comments = Comments;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
      // console.log("fetchRestaurant id: ", restaurantId);
    },
  },
};
</script>