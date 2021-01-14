<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- UserProfileCard -->
      <UserProfileCard
        :user="user"
        :is-current-user="currentUser.id === user.id"
        :initial-is-followed="isFollowed"
      />
      <div class="row">
        <div class="col-md-4">
          <!-- UserFollowingsCard -->
          <UserFollowingsCard :user="user" :followings="followings" />
          <!-- UserFollowersCard -->
          <UserFollowersCard :user="user" :followers="followers" />
        </div>
        <!-- UserCommentsCard -->
        <div class="col-md-8">
          <UserCommentsCard :comments="comments" />
          <!-- UserFavoritedRestaurantsCard -->
          <UserFavoritedRestaurantsCard
            :favoritedRestaurants="favoritedRestaurants"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import userAPI from "./../apis/users";
import UserProfileCard from "./../components/UserProfileCard";
import UserFollowingsCard from "./../components/UserFollowingsCard";
import UserFollowersCard from "./../components/UserFollowersCard";
import UserCommentsCard from "./../components/UserCommentsCard";
import UserFavoritedRestaurantsCard from "./../components/UserFavoritedRestaurantsCard";
import { mapState } from "vuex";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
    Spinner,
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
      comments: [],
      favoritedRestaurants: [],
      isLoading: true,
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
        this.isLoading = true;
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
        this.comments = Comments.filter((comment) => comment.Restaurant);
        this.isFollowed = isFollowed;
        this.followers = Followers;
        this.followings = Followings;
        this.favoritedRestaurants = FavoritedRestaurants;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>



