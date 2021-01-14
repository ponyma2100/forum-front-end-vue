<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <form @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            v-model="user.name"
            id="name"
            type="text"
            name="name"
            class="form-control"
            placeholder="Enter Name"
            required
          />
        </div>

        <div class="form-group">
          <label for="image">Image</label>
          <img
            v-if="user.image"
            :src="user.image"
            class="d-block img-thumbnail mb-3"
            width="200"
            height="200"
          />
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            class="form-control-file"
            @change="handleFileChange"
          />
        </div>

        <button :disabled="isProcessing" type="submit" class="btn btn-primary">
          {{ isProcessing ? "資料更新中..." : "Submit" }}
        </button>
      </form>
    </template>
  </div>
</template>

<script>
import userAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        email: "",
        image: "",
      },
      isProcessing: false,
      isLoading: true,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        this.isLoading = true;
        const { data } = await userAPI.getCurrentUser();
        // console.log(data);
        const { id, name, email, image } = data;
        this.user = {
          id,
          name,
          email,
          image,
        };
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
    handleFileChange(e) {
      const files = e.target.files;
      // 未選擇上傳檔案
      if (files.length === 0) {
        this.user.image = "";
        return;
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.image = imageURL;
      }
    },
    async handleSubmit(e) {
      //   透過API 將表單資料送到伺服器
      try {
        if (!this.user.name) {
          Toast.fire({
            icon: "warning",
            title: "您尚未填寫姓名",
          });
          return;
        }

        const form = e.target;
        const formData = new FormData(form);
        this.isProcessing = true;
        const { data } = await userAPI.update({
          userId: this.user.id,
          formData,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        } else {
          this.$router.push({ name: "user", params: { id: this.user.id } });
        }
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>