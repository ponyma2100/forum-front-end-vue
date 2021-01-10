<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">人氣餐廳</h1>
      <hr />
      <div
        class="card mb-3"
        style="max-width: 540px; margin: auto"
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <div class="row no-gutters">
          <div class="col-md-4">
            <a href="#">
              <img class="card-img" :src="restaurant.image | emptyImage" />
            </a>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ restaurant.name }}</h5>
              <span class="badge badge-secondary"
                >收藏數：{{ restaurant.FavoriteCount }}</span
              >
              <p class="card-text">
                {{ restaurant.description }}
              </p>
              <a href="#" class="btn btn-primary mr-2">Show</a>

              <button
                v-if="restaurant.isFavorited"
                @click.stop.prevent="deleteFavorite(restaurant.id)"
                type="button"
                class="btn btn-danger mr-2"
              >
                移除最愛
              </button>
              <button
                v-else
                @click.stop.prevent="addFavorite(restaurant.id)"
                type="button"
                class="btn btn-primary"
              >
                加到最愛
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import Spinner from "./../components/Spinner";
import { emptyImageFilter } from "./../utils/mixins";
import restaurantsAPI from "./../apis/restaurants";
import userAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [emptyImageFilter],
  components: {
    NavTabs,
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchTopRestaurant();
  },
  methods: {
    async fetchTopRestaurant() {
      try {
        this.isLoading = true;
        const { data } = await restaurantsAPI.getRestaurantsTop();
        console.log(data);
        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "目前無法取得人氣餐廳資料，請稍後再試",
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await userAPI.addFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurants = this.restaurants.map((restaurant) => {
          if (restaurant.id !== restaurantId) {
            return restaurant;
          } else {
            return {
              ...restaurant,
              isFavorited: true,
              FavoriteCount: restaurant.FavoriteCount + 1,
            };
          }
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "目前無法將餐廳加入最愛，請稍後再試",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await userAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurants = this.restaurants.map((restaurant) => {
          if (restaurant.id !== restaurantId) {
            return restaurant;
          } else {
            return {
              ...restaurant,
              isFavorited: false,
              FavoriteCount: restaurant.FavoriteCount - 1,
            };
          }
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "目前無法將餐廳移除最愛，請稍後再試",
        });
      }
    },
  },
};
// const dummyData = {
//   restaurants: [
//     {
//       id: 26,
//       name: "Carson Collins",
//       tel: "471-440-3141",
//       address: "1632 Marietta Summit",
//       opening_hours: "08:00",
//       description: "aut",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=64.4841358103108",
//       viewCounts: 7,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-18T15:21:02.000Z",
//       CategoryId: 5,
//       FavoritedUsers: [
//         {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-20T01:32:03.000Z",
//           Favorite: {
//             UserId: 2,
//             RestaurantId: 26,
//             createdAt: "2020-04-17T04:35:49.000Z",
//             updatedAt: "2020-04-17T04:35:49.000Z",
//           },
//         },
//         {
//           id: 3,
//           name: "user2",
//           email: "user2@example.com",
//           password:
//             "$2a$10$IgMneSD6HZiHt0C6we./cOPyq70YhAWNZEqC4YTtJHK8ejgS1J/3q",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-15T06:35:43.000Z",
//           Favorite: {
//             UserId: 3,
//             RestaurantId: 26,
//             createdAt: "2020-07-15T19:27:21.000Z",
//             updatedAt: "2020-07-15T19:27:21.000Z",
//           },
//         },
//       ],
//       isFavorited: false,
//       FavoriteCount: 2,
//     },
//     {
//       id: 13,
//       name: "Arvel Boehm",
//       tel: "1-747-219-7889 x2070",
//       address: "605 Pouros Terrace",
//       opening_hours: "08:00",
//       description: "Perferendis ut sed velit quaerat voluptatem ea qui",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=45.572223030594074",
//       viewCounts: 1,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-24T11:33:23.000Z",
//       CategoryId: 4,
//       FavoritedUsers: [
//         {
//           id: 3,
//           name: "user2",
//           email: "user2@example.com",
//           password:
//             "$2a$10$IgMneSD6HZiHt0C6we./cOPyq70YhAWNZEqC4YTtJHK8ejgS1J/3q",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-15T06:35:43.000Z",
//           Favorite: {
//             UserId: 3,
//             RestaurantId: 13,
//             createdAt: "2020-03-30T01:34:36.000Z",
//             updatedAt: "2020-03-30T01:34:36.000Z",
//           },
//         },
//         {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-20T01:32:03.000Z",
//           Favorite: {
//             UserId: 2,
//             RestaurantId: 13,
//             createdAt: "2020-11-30T05:37:00.000Z",
//             updatedAt: "2020-11-30T05:37:00.000Z",
//           },
//         },
//       ],
//       isFavorited: false,
//       FavoriteCount: 2,
//     },
//     {
//       id: 11,
//       name: "April Romaguera",
//       tel: "1-821-165-9840 x63700",
//       address: "7071 Jackson Knolls",
//       opening_hours: "08:00",
//       description: "Quo expedita perferendis sint quae voluptatem libe",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=68.6707359779192",
//       viewCounts: 0,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//       CategoryId: 1,
//       FavoritedUsers: [
//         {
//           id: 3,
//           name: "user2",
//           email: "user2@example.com",
//           password:
//             "$2a$10$IgMneSD6HZiHt0C6we./cOPyq70YhAWNZEqC4YTtJHK8ejgS1J/3q",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-15T06:35:43.000Z",
//           Favorite: {
//             UserId: 3,
//             RestaurantId: 11,
//             createdAt: "2020-07-15T05:40:21.000Z",
//             updatedAt: "2020-07-15T05:40:21.000Z",
//           },
//         },
//         {
//           id: 1,
//           name: "user1@example.com",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-25T03:28:20.000Z",
//           Favorite: {
//             UserId: 1,
//             RestaurantId: 11,
//             createdAt: "2020-12-13T16:28:15.000Z",
//             updatedAt: "2020-12-13T16:28:15.000Z",
//           },
//         },
//       ],
//       isFavorited: true,
//       FavoriteCount: 2,
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
//       FavoritedUsers: [
//         {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-20T01:32:03.000Z",
//           Favorite: {
//             UserId: 2,
//             RestaurantId: 10,
//             createdAt: "2020-11-30T05:37:06.000Z",
//             updatedAt: "2020-11-30T05:37:06.000Z",
//           },
//         },
//         {
//           id: 1,
//           name: "user1@example.com",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-25T03:28:20.000Z",
//           Favorite: {
//             UserId: 1,
//             RestaurantId: 10,
//             createdAt: "2020-12-13T17:39:56.000Z",
//             updatedAt: "2020-12-13T17:39:56.000Z",
//           },
//         },
//       ],
//       isFavorited: true,
//       FavoriteCount: 2,
//     },
//     {
//       id: 6,
//       name: "Madie Stark. ggggggggg",
//       tel: "28825252",
//       address: "058 Montana Glen",
//       opening_hours: "08:00",
//       description: "Ea non accusamus nesciunt ut et impedit consectetu",
//       image: "https://i.imgur.com/oHLuM3O.png",
//       viewCounts: 16,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-24T12:53:06.000Z",
//       CategoryId: 4,
//       FavoritedUsers: [
//         {
//           id: 3,
//           name: "user2",
//           email: "user2@example.com",
//           password:
//             "$2a$10$IgMneSD6HZiHt0C6we./cOPyq70YhAWNZEqC4YTtJHK8ejgS1J/3q",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-15T06:35:43.000Z",
//           Favorite: {
//             UserId: 3,
//             RestaurantId: 6,
//             createdAt: "2020-07-17T11:47:59.000Z",
//             updatedAt: "2020-07-17T11:47:59.000Z",
//           },
//         },
//         {
//           id: 1,
//           name: "user1@example.com",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-25T03:28:20.000Z",
//           Favorite: {
//             UserId: 1,
//             RestaurantId: 6,
//             createdAt: "2020-12-13T07:22:08.000Z",
//             updatedAt: "2020-12-13T07:22:08.000Z",
//           },
//         },
//       ],
//       isFavorited: true,
//       FavoriteCount: 2,
//     },
//     {
//       id: 4,
//       name: "Japan Williamson",
//       tel: "(116) 056-8550 x890",
//       address: "919 Dooley Cat",
//       opening_hours: "08:00",
//       description: "placeat",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=46.57990186637528",
//       viewCounts: 27,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-25T06:36:28.000Z",
//       CategoryId: 2,
//       FavoritedUsers: [
//         {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-20T01:32:03.000Z",
//           Favorite: {
//             UserId: 2,
//             RestaurantId: 4,
//             createdAt: "2020-03-31T06:37:16.000Z",
//             updatedAt: "2020-03-31T06:37:16.000Z",
//           },
//         },
//         {
//           id: 1,
//           name: "user1@example.com",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-25T03:28:20.000Z",
//           Favorite: {
//             UserId: 1,
//             RestaurantId: 4,
//             createdAt: "2020-12-15T16:47:32.000Z",
//             updatedAt: "2020-12-15T16:47:32.000Z",
//           },
//         },
//       ],
//       isFavorited: true,
//       FavoriteCount: 2,
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
//       viewCounts: 5,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-23T10:34:30.000Z",
//       CategoryId: 4,
//       FavoritedUsers: [
//         {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-20T01:32:03.000Z",
//           Favorite: {
//             UserId: 2,
//             RestaurantId: 3,
//             createdAt: "2020-03-24T16:54:31.000Z",
//             updatedAt: "2020-03-24T16:54:31.000Z",
//           },
//         },
//         {
//           id: 1,
//           name: "user1@example.com",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-25T03:28:20.000Z",
//           Favorite: {
//             UserId: 1,
//             RestaurantId: 3,
//             createdAt: "2020-12-13T17:34:51.000Z",
//             updatedAt: "2020-12-13T17:34:51.000Z",
//           },
//         },
//       ],
//       isFavorited: true,
//       FavoriteCount: 2,
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
//       viewCounts: 66,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-24T12:45:34.000Z",
//       CategoryId: 4,
//       FavoritedUsers: [
//         {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-20T01:32:03.000Z",
//           Favorite: {
//             UserId: 2,
//             RestaurantId: 2,
//             createdAt: "2020-03-07T14:43:54.000Z",
//             updatedAt: "2020-03-07T14:43:54.000Z",
//           },
//         },
//         {
//           id: 1,
//           name: "user1@example.com",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-25T03:28:20.000Z",
//           Favorite: {
//             UserId: 1,
//             RestaurantId: 2,
//             createdAt: "2020-12-18T19:09:29.000Z",
//             updatedAt: "2020-12-18T19:09:29.000Z",
//           },
//         },
//       ],
//       isFavorited: true,
//       FavoriteCount: 2,
//     },
//     {
//       id: 12,
//       name: "Merl Wolf",
//       tel: "1-848-603-6470 x7813",
//       address: "0233 Lura Bridge",
//       opening_hours: "08:00",
//       description: "Facilis aspernatur sint odit deleniti et.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=70.10281112790923",
//       viewCounts: 0,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//       CategoryId: 5,
//       FavoritedUsers: [
//         {
//           id: 1,
//           name: "user1@example.com",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-25T03:28:20.000Z",
//           Favorite: {
//             UserId: 1,
//             RestaurantId: 12,
//             createdAt: "2020-12-13T17:40:10.000Z",
//             updatedAt: "2020-12-13T17:40:10.000Z",
//           },
//         },
//       ],
//       isFavorited: true,
//       FavoriteCount: 1,
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
//       viewCounts: 1,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-24T13:02:30.000Z",
//       CategoryId: 1,
//       FavoritedUsers: [
//         {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//           isAdmin: false,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-20T01:32:03.000Z",
//           Favorite: {
//             UserId: 2,
//             RestaurantId: 9,
//             createdAt: "2020-03-24T08:51:28.000Z",
//             updatedAt: "2020-03-24T08:51:28.000Z",
//           },
//         },
//       ],
//       isFavorited: false,
//       FavoriteCount: 1,
//     },
//   ],
// };
</script>