<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />
    <Spinner v-if="isLoading" />
    <table class="table" v-else>
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">1</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? "admin" : "user" }}</td>
          <td>
            <form
              action="/admin/users/1?_method=PUT"
              method="POST"
              style="display: inline"
            >
              <input type="hidden" name="isAdmin" value="false" />
              <button
                v-if="currentUser.id !== user.id"
                type="submit"
                class="btn btn-link"
                @click.stop.prevent="
                  toggleUserRole({ userId: user.id, isAdmin: user.isAdmin })
                "
              >
                {{ user.isAdmin ? "set as user" : "set as admin" }}
              </button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav";
import adminAPI from "./../apis/admin";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  components: {
    AdminNav,
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchUser();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchUser() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.users.get();
        // console.log(data);
        const { users } = data;
        this.users = users;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得會員資料，請稍後再試",
        });
      }
    },
    async toggleUserRole({ userId, isAdmin }) {
      try {
        const { data } = await adminAPI.users.update({
          userId,
          isAdmin: (!isAdmin).toString(),
        });
        console.log(data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.users = this.users.map((user) => {
          if (user.id === userId)
            return {
              ...user,
              isAdmin: !isAdmin,
            };
          return user;
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法更新會員角色，請稍後再試",
        });
      }
    },
  },
};
</script>