<template>
  <div class="container py-5">
    <!-- UserProfileCard -->
    <UserProfileCard
      :user="user"
      :is-current-user="currentUser.id === user.id"
      :initial-is-followed="isFollowed"
    />
    <!-- UserFollowingsCard -->
    <UserFollowingsCard :user="user" :followings="followings" />
    <!-- UserFollowersCard -->
    <!-- UserCommentsCard -->
    <!-- UserFavoritedRestaurantsCard -->
  </div>
</template>

<script>
import userAPI from "./../apis/users";
import UserProfileCard from "./../components/UserProfileCard";
import UserFollowingsCard from "./../components/UserFollowingsCard";
import { mapState } from "vuex";
export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
  },
  data() {
    return {
      user: {
        id: -1,
        image: "",
        name: "",
        email: "",
        followingsLength: 0,
        followersLength: 0,
        commentsLength: 0,
        favoritedRestaurantsLength: 0,
      },
      isFollowed: false,
      followings: [],
      followers: [],
      Comments: [],
      favoritedRestaurants: [],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await userAPI.get({ userId });
        const { profile, isFollowed } = data;

        console.log(data);
        const {
          id,
          image,
          name,
          email,
          Comments,
          FavoritedRestaurants,
          Followers,
          Followings,
        } = data.profile;

        this.user = {
          ...this.user,
          id,
          image,
          name,
          email,
          followingsLength: Followings.length,
          followersLength: Followers.length,
          commentsLength: Comments.length,
          favoritedRestaurantsLength: FavoritedRestaurants.length,
        };
        this.Comments = Comments.filter((comment) => comment.Restaurant);
        this.isFollowed = isFollowed;
        this.followers = Followers;
        this.followings = Followings;
        this.favoritedRestaurants = FavoritedRestaurants;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>



