<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from "./../components/RestaurantDetail";
import RestaurantComments from "./../components/RestaurantComments";
import CreateComment from "./../components/CreateComment";
import restaurantAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
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
        categoryName: "",
      },
      isLiked: false,
      isFavorited: false,
      restaurantComments: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    console.log("to", to);
    console.log("from", from);
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await restaurantAPI.getRestaurant({ restaurantId });
        const { restaurant, isFavorited, isLiked } = data;
        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          Category,
          Comments,
        } = restaurant;
        this.restaurant = {
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryName: Category ? Category.name : "未分類",
          isFavorited,
          isLiked,
        };
        this.restaurantComments = Comments;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
      // console.log("fetchRestaurant id: ", restaurantId);
    },
    afterDeleteComment(commentId) {
      // 以 filter 保留未被選擇的 comment.id
      // filter 會保留回傳值為 true 的陣列項目
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },

    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        text,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        createdAt: new Date(),
      });
    },
  },
};
// const dummyData = {
//   restaurant: {
//     id: 1,
//     name: "Loren Gulgowski",
//     tel: "695.115.9032",
//     address: "497 Abbott Estates",
//     opening_hours: "08:00",
//     description: "inventore",
//     image:
//       "https://loremflickr.com/320/240/restaurant,food/?random=9.385535305221993",
//     viewCounts: 30,
//     createdAt: "2020-12-15T06:35:43.000Z",
//     updatedAt: "2020-12-22T10:45:43.044Z",
//     CategoryId: 5,
//     Category: {
//       id: 5,
//       name: "素食料理",
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//     },
//     FavoritedUsers: [
//       {
//         id: 2,
//         name: "user1",
//         email: "user1@example.com",
//         password:
//           "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//         isAdmin: false,
//         image: null,
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-20T01:32:03.000Z",
//         Favorite: {
//           UserId: 2,
//           RestaurantId: 1,
//           createdAt: "2020-03-07T14:43:52.000Z",
//           updatedAt: "2020-03-07T14:43:52.000Z",
//         },
//       },
//       {
//         id: 1,
//         name: "root",
//         email: "root@example.com",
//         password:
//           "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//         isAdmin: true,
//         image: null,
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//         Favorite: {
//           UserId: 1,
//           RestaurantId: 1,
//           createdAt: "2020-12-22T06:54:16.000Z",
//           updatedAt: "2020-12-22T06:54:16.000Z",
//         },
//       },
//     ],
//     LikedUsers: [
//       {
//         id: 2,
//         name: "user1",
//         email: "user1@example.com",
//         password:
//           "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//         isAdmin: false,
//         image: null,
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-20T01:32:03.000Z",
//         Like: {
//           UserId: 2,
//           RestaurantId: 1,
//           createdAt: "2020-03-07T14:42:45.000Z",
//           updatedAt: "2020-03-07T14:42:45.000Z",
//         },
//       },
//       {
//         id: 1,
//         name: "root",
//         email: "root@example.com",
//         password:
//           "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//         isAdmin: true,
//         image: null,
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//         Like: {
//           UserId: 1,
//           RestaurantId: 1,
//           createdAt: "2020-12-22T06:55:31.000Z",
//           updatedAt: "2020-12-22T06:55:31.000Z",
//         },
//       },
//     ],
//     Comments: [
//       {
//         id: 1,
//         text: "Placeat aut molestiae incidunt repudiandae modi nulla a in.",
//         UserId: 2,
//         RestaurantId: 1,
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//         User: {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-20T01:32:03.000Z",
//         },
//       },
//       {
//         id: 51,
//         text: "Et aut molestiae autem.",
//         UserId: 1,
//         RestaurantId: 1,
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//         User: {
//           id: 1,
//           name: "root",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-15T06:35:43.000Z",
//         },
//       },
//       {
//         id: 101,
//         text: "A et magni quidem in et magnam.",
//         UserId: 2,
//         RestaurantId: 1,
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//         User: {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-20T01:32:03.000Z",
//         },
//       },
//     ],
//   },
//   isFavorited: true,
//   isLiked: false,
// };
</script>