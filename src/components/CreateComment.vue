<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
      <button
        type="submit"
        :disabled="isProcessing"
        class="btn btn-primary mr-0"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import commentsAPI from "./../apis/comments";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      text: "",
      isProcessing: false,
    };
  },
  props: {
    restaurantId: {
      type: Number,
      requrired: true,
    },
  },
  methods: {
    async handleSubmit({ restaurantId, text }) {
      try {
        if (!this.text) {
          Toast.fire({
            icon: "warning",
            title: "您尚未填寫任何評論",
          });
          return;
        }
        this.isProcessing = true;
        const { data } = await commentsAPI.create({
          restaurantId: this.restaurantId,
          text: this.text,
        });
        // console.log(data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.$emit("after-create-comment", {
          commentId: this.commentId,
          restaurantId: this.restaurantId,
          text: this.text,
        });
        this.text = "";
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法新增評論，請稍後再試",
        });
      }
    },
  },
};
</script>