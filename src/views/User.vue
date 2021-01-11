<template>
  <div class="container py-5">
    <!-- UserProfileCard -->
    <!-- UserFollowingsCard -->
    <!-- UserFollowersCard -->
    <!-- UserCommentsCard -->
    <!-- UserFavoritedRestaurantsCard -->
  </div>
</template>

<script>
import userAPI from "./../apis/users";

export default {
  data() {
    return {
      user: {
        id: -1,
        image: "",
        name: "",
        followingsLength: 0,
        followersLength: 0,
        commentsLength: 0,
        favoritedRestaurantsLenth: 0,
      },
      isFollowed: false,
      followings: [],
      followers: [],
      favoritedRestaurants: [],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await userAPI.get({ userId });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>



