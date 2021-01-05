<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div class="col-3" v-for="user in users" :key="user.id">
        <a href="#">
          <img :src="user.image | emptyImage" width="140px" height="140px" />
        </a>
        <h2>{{ user.name }}</h2>
        <span class="badge badge-secondary"
          >追蹤人數：{{ user.followerCount }}</span
        >
        <p class="mt-3">
          <button
            v-if="user.isFollowed"
            @click.stop.prevent="deleteFollowing(user.id)"
            type="button"
            class="btn btn-danger"
          >
            取消追蹤
          </button>
          <button
            v-else
            @click.stop.prevent="addFollowing(user.id)"
            type="button"
            class="btn btn-primary"
          >
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import { emptyImageFilter } from "./../utils/mixins";
import userAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    NavTabs,
  },
  mixins: [emptyImageFilter],

  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await userAPI.getTopUsers();
        // console.log(data.users);
        this.users = data.users.map((user) => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed,
        }));
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得美食達人，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await userAPI.addFollowing({ userId });
        console.log("data", data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: true,
              followerCount: user.followerCount + 1,
            };
          }
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await userAPI.deleteFollowing({ userId });
        console.log("data", data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: false,
              followerCount: user.followerCount - 1,
            };
          }
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
  },
};
// const dummyData = {
//   users: [
//     {
//       id: 1,
//       name: "root",
//       email: "root@example.com",
//       password: "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//       isAdmin: true,
//       image: null,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//       Followers: [
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
//           Followship: {
//             followerId: 2,
//             followingId: 1,
//             createdAt: "2020-12-13T03:37:33.000Z",
//             updatedAt: "2020-12-13T03:37:33.000Z",
//           },
//         },
//         {
//           id: 1,
//           name: "root",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-15T06:35:43.000Z",
//           Followship: {
//             followerId: 1,
//             followingId: 1,
//             createdAt: "2020-12-17T19:56:58.000Z",
//             updatedAt: "2020-12-17T19:56:58.000Z",
//           },
//         },
//       ],
//       FollowerCount: 5,
//       isFollowed: false,
//     },
//     {
//       id: 2,
//       name: "user1",
//       email: "user1@example.com",
//       password: "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
//       isAdmin: false,
//       image: null,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-20T01:32:03.000Z",
//       Followers: [
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
//           Followship: {
//             followerId: 2,
//             followingId: 2,
//             createdAt: "2020-12-13T03:37:28.000Z",
//             updatedAt: "2020-12-13T03:37:28.000Z",
//           },
//         },
//         {
//           id: 1,
//           name: "root",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-15T06:35:43.000Z",
//           Followship: {
//             followerId: 1,
//             followingId: 2,
//             createdAt: "2020-12-17T19:20:56.000Z",
//             updatedAt: "2020-12-17T19:20:56.000Z",
//           },
//         },
//       ],
//       FollowerCount: 2,
//       isFollowed: true,
//     },
//     {
//       id: 3,
//       name: "user2",
//       email: "user2@example.com",
//       password: "$2a$10$IgMneSD6HZiHt0C6we./cOPyq70YhAWNZEqC4YTtJHK8ejgS1J/3q",
//       isAdmin: false,
//       image: null,
//       createdAt: "2020-12-15T06:35:43.000Z",
//       updatedAt: "2020-12-15T06:35:43.000Z",
//       Followers: [
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
//           Followship: {
//             followerId: 2,
//             followingId: 3,
//             createdAt: "2020-12-13T03:37:29.000Z",
//             updatedAt: "2020-12-13T03:37:29.000Z",
//           },
//         },
//         {
//           id: 1,
//           name: "root",
//           email: "root@example.com",
//           password:
//             "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
//           isAdmin: true,
//           image: null,
//           createdAt: "2020-12-15T06:35:43.000Z",
//           updatedAt: "2020-12-15T06:35:43.000Z",
//           Followship: {
//             followerId: 1,
//             followingId: 3,
//             createdAt: "2020-12-17T19:20:58.000Z",
//             updatedAt: "2020-12-17T19:20:58.000Z",
//           },
//         },
//       ],
//       FollowerCount: 2,
//       isFollowed: true,
//     },
//   ],
// };
</script>