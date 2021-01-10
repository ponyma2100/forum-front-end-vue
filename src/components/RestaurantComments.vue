<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-right"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
        >
          Delete
        </button>
        <h3>
          <a href="#"> {{ comment.User.name }} </a>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import commentsAPI from "./../apis/comments";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      requrired: true,
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async handleDeleteButtonClick(commentId) {
      try {
        // TODO: 請求 API 伺服器刪除 id 為 commentId 的評論
        const { data } = await commentsAPI.delete({ commentId });
        // console.log("data", data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-delete-comment", commentId);
        Toast.fire({
          icon: "success",
          title: "移除評論成功",
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法刪除評論，請稍後再試",
        });
      }
    },
  },
};
</script>


<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}
</style>