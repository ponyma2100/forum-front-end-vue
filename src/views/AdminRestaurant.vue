<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <div class="col-md-12">
          <h1>{{ restaurant.name }}</h1>
          <span class="badge badge-secondary mt-1 mb-3">
            {{ restaurant.categoryName }}
          </span>
        </div>
        <div class="col-md-4">
          <img
            class="img-responsive center-block"
            :src="restaurant.image | emptyImage"
            style="width: 250px; margin-bottom: 25px"
          />
          <div class="well">
            <ul class="list-unstyled">
              <li>
                <strong>Opening Hour:</strong>
                {{ restaurant.openingHours }}
              </li>
              <li>
                <strong>Tel:</strong>
                {{ restaurant.tel }}
              </li>
              <li>
                <strong>Address:</strong>
                {{ restaurant.address }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-8">
          <p>{{ restaurant.description }}</p>
        </div>
      </div>
      <hr />
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
    </template>
  </div>
</template>
<script>
import { emptyImageFilter } from "./../utils/mixins";
import Spinner from "./../components/Spinner";

const dummyData = {
  restaurant: {
    id: 2,
    name: "Mrs. Mckenzie Johnston",
    tel: "567-714-6131 x621",
    address: "61371 Rosalinda Knoll",
    opening_hours: "08:00",
    description:
      "Quia pariatur perferendis architecto tenetur omnis pariatur tempore.",
    image: "https://loremflickr.com/320/240/food,dessert,restaurant/?random=2",
    createdAt: "2019-06-22T09:00:43.000Z",
    updatedAt: "2019-06-22T09:00:43.000Z",
    CategoryId: 3,
    Category: {
      id: 3,
      name: "義大利料理",
      createdAt: "2019-06-22T09:00:43.000Z",
      updatedAt: "2019-06-22T09:00:43.000Z",
    },
  },
};
export default {
  name: "AdminRestaurant",
  mixins: [emptyImageFilter],
  components: {
    Spinner,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
      },
      isLoading: true,
    };
  },
  mounted() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    fetchRestaurant(restaurantId) {
      this.isLoading = true;
      const { restaurant } = dummyData;
      const {
        id,
        name,
        Category,
        categoryName,
        image,
        opening_hours: openingHours,
        tel,
        address,
        description,
      } = restaurant;
      this.restaurant = {
        ...this.restaurant,
        id,
        name,
        categoryName: Category ? Category.name : "未分類",
        image,
        openingHours,
        tel,
        address,
        description,
      };
      this.isLoading = false;
    },
  },
};
</script>