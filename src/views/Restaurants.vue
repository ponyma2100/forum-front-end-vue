<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />

    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantPagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :category-id="categoryId"
      :previous-page="previousPage"
      :next-page="nextPage"
    />
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import RestaurantCard from "./../components/RestaurantCard";
import RestaurantsNavPills from "./../components/RestaurantsNavPills";
import RestaurantPagination from "./../components/RestaurantPagination";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantPagination,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: -1,
    };
  },
  created() {
    // STEP 3：在 created 的時候呼叫 fetchRestaurants 方法
    // 這裡會向伺服器請求第一頁且不分餐廳類別的資料
    const { page = "", categoryId = "" } = this.$route.query;
    this.fetchRestaurants({
      queryPage: page,
      queryCategoryId: categoryId,
    });
  },
  beforeRouteUpdate(to, from, next) {
    const { page = "", categoryId = "" } = to.query;
    this.fetchRestaurants({
      queryPage: page,
      queryCategoryId: categoryId,
    });
    next();
    // console.log("to", to);
    // console.log("from", from);
  },

  methods: {
    // STEP 2：將 fetchRestaurants 改成 async...await 的語法
    // 並且可以帶入參數 page 與 categoryId
    // 呼叫 API 後取得 response
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId,
        });
        // 透過解構賦值，將所需要的資料從 response.data 取出

        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next,
        } = response.data;
        console.log(response.data);
        // 將從伺服器取得的 data 帶入 Vue 內
        this.restaurants = restaurants;
        this.categories = categories;
        this.categoryId = categoryId;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
  },
};
// const {
//   restaurants,
//   categories,
//   categoryId,
//   page,
//   totalPage,
//   prev,
//   next,
// } = dummyData;

// const dummyData = {
//   restaurants: [
//     {
//       id: 1,
//       name: "Loren Gulgowski",
//       tel: "695.115.9032",
//       address: "497 Abbott Estates",
//       opening_hours: "08:00",
//       description: "inventore",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=9.385535305221993",
//       viewCounts: 19,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-17T07:27:44.000Z",
//       CategoryId: 5,
//       Category: {
//         id: 5,
//         name: "素食料理",
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//       },
//       isFavorited: true,
//       isLiked: false,
//     },
//     {
//       id: 2,
//       name: "Rylee Rutherford",
//       tel: "488.949.2233 x9901",
//       address: "5105 Fisher Manor",
//       opening_hours: "08:00",
//       description: "Eum fugit nesciunt fugiat labore.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=18.335079354920648",
//       viewCounts: 8,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-16T00:48:07.000Z",
//       CategoryId: 4,
//       Category: {
//         id: 4,
//         name: "墨西哥料理",
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//       },
//       isFavorited: true,
//       isLiked: true,
//     },
//     {
//       id: 3,
//       name: "Geo DuBuque",
//       tel: "466-405-6910",
//       address: "26660 Marianna Ramp",
//       opening_hours: "08:00",
//       description: "assumenda consequatur consequatur",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=90.6307580095043",
//       viewCounts: 3,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T15:37:14.000Z",
//       CategoryId: 4,
//       Category: {
//         id: 4,
//         name: "墨西哥料理",
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//       },
//       isFavorited: true,
//       isLiked: true,
//     },
//     {
//       id: 4,
//       name: "Chadrick Williamson",
//       tel: "(116) 056-8550 x890",
//       address: "919 Dooley Cape",
//       opening_hours: "08:00",
//       description: "placeat",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=46.57990186637528",
//       viewCounts: 2,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T16:47:25.000Z",
//       CategoryId: 1,
//       Category: null,
//       isFavorited: true,
//       isLiked: true,
//     },
//     {
//       id: 5,
//       name: "Kayli Kunze",
//       tel: "(400) 597-4195 x16545",
//       address: "072 Marquardt Turnpike",
//       opening_hours: "08:00",
//       description: "Culpa sunt rerum delectus accusamus dolores. Exped",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=27.959110006372413",
//       viewCounts: 2,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T15:34:53.000Z",
//       CategoryId: 3,
//       Category: {
//         id: 3,
//         name: "義大利料理",
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//       },
//       isFavorited: false,
//       isLiked: true,
//     },
//     {
//       id: 6,
//       name: "Madie Stark",
//       tel: "375-079-2462",
//       address: "058 Montana Glen",
//       opening_hours: "08:00",
//       description: "Ea non accusamus nesciunt ut et impedit consectetu",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=48.7856418007673",
//       viewCounts: 1,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T17:28:48.000Z",
//       CategoryId: 2,
//       Category: {
//         id: 2,
//         name: "日本料理",
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//       },
//       isFavorited: true,
//       isLiked: false,
//     },
//     {
//       id: 7,
//       name: "Mrs. Luella Kiehn",
//       tel: "430-302-4811",
//       address: "5911 Dedric Forge",
//       opening_hours: "08:00",
//       description: "Neque sed neque maxime reprehenderit repellat. Nis",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=42.90508233315358",
//       viewCounts: 4,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T17:00:18.000Z",
//       CategoryId: 2,
//       Category: {
//         id: 2,
//         name: "日本料理",
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 8,
//       name: "Louisa Cummerata MD",
//       tel: "1-734-755-5111 x47387",
//       address: "6622 Johnson Wall",
//       opening_hours: "08:00",
//       description: "Nostrum magni sit.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=32.944417729082055",
//       viewCounts: 0,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//       CategoryId: 1,
//       Category: null,
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 9,
//       name: "Esteban Conn",
//       tel: "(925) 432-9834 x4118",
//       address: "2245 Jalon Vista",
//       opening_hours: "08:00",
//       description: "Magnam autem sed id molestiae nihil quia.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=9.434835967288935",
//       viewCounts: 0,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//       CategoryId: 1,
//       Category: null,
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 10,
//       name: "Eulalia Schoen",
//       tel: "301.236.0532",
//       address: "5595 Golden Turnpike",
//       opening_hours: "08:00",
//       description: "Aut sequi rerum ad ipsum ea et velit cumque. Qui d",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=86.12063922584056",
//       viewCounts: 0,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//       CategoryId: 4,
//       Category: {
//         id: 4,
//         name: "墨西哥料理",
//         createdAt: "2020-12-15T06:35:43.000Z",
//         updatedAt: "2020-12-15T06:35:43.000Z",
//       },
//       isFavorited: true,
//       isLiked: true,
//     },
//   ],
//   categories: [
//     {
//       id: 2,
//       name: "日本料理",
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//     },
//     {
//       id: 3,
//       name: "義大利料理",
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//     },
//     {
//       id: 4,
//       name: "墨西哥料理",
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//     },
//     {
//       id: 5,
//       name: "素食料理",
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//     },
//     {
//       id: 6,
//       name: "美式料理",
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//     },
//     {
//       id: 7,
//       name: "複合式料理",
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//     },
//     {
//       id: 3002,
//       name: "中式料理",
//       createdAt: "2020-12-15T11:16:19.000Z",
//       updatedAt: "2020-12-15T11:16:19.000Z",
//     },
//   ],
//   categoryId: "",
//   page: 1,
//   totalPage: [1, 2, 3, 4, 5, 6],
//   prev: 1,
//   next: 2,
// };
</script>

