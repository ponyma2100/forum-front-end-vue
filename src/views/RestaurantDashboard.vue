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
const dummyData = {
  restaurant: {
    id: 1,
    name: "Loren Gulgowski",
    tel: "695.115.9032",
    address: "497 Abbott Estates",
    opening_hours: "08:00",
    description: "inventore",
    image: "https://i.imgur.com/XVI21KR.jpg",
    viewCounts: 32,
    createdAt: "2020-12-15T06:35:43.000Z",
    updatedAt: "2020-12-25T06:34:59.000Z",
    CategoryId: 5,
    Category: {
      id: 5,
      name: "素食料理",
      createdAt: "2020-12-15T06:35:43.000Z",
      updatedAt: "2020-12-15T06:35:43.000Z",
    },
    Comments: [
      {
        id: 1,
        text: "Placeat aut molestiae incidunt repudiandae modi nulla a in.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
          isAdmin: false,
          image: null,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-20T01:32:03.000Z",
        },
      },
      {
        id: 51,
        text: "Et aut molestiae autem.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        User: {
          id: 1,
          name: "user1@example.com",
          email: "root@example.com",
          password:
            "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
          isAdmin: true,
          image: null,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-25T03:28:20.000Z",
        },
      },
      {
        id: 101,
        text: "A et magni quidem in et magnam.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
          isAdmin: false,
          image: null,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-20T01:32:03.000Z",
        },
      },
    ],
  },
};

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

  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchDashboard(restaurantId);
  },

  methods: {
    fetchDashboard(restaurantId) {
      // console.log("fetchRestaurant id: ", restaurantId);
      const { restaurant } = dummyData;
      const {
        id,
        name,
        image,
        CategoryId,
        categoryName,
        viewCounts,
        Comments,
        Category,
      } = restaurant;

      this.restaurant = {
        id,
        name,
        image,
        CategoryId,
        categoryName: Category.name,
        viewCounts,
        commentsLength: Comments.length,
      };
      this.Comments = Comments;
    },
  },
};
</script>