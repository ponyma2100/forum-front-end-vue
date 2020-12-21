<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 前一頁 previousPage -->
      <li class="page-item">
        <a class="page-link" aria-label="Previous" href="#">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="page-item"
        v-for="page in totalPage"
        :key="page"
        :class="['page-item', { active: currentPage === page }]"
      >
        <router-link
          class="page-link"
          :to="{
            name: 'restaurants',
            query: { categoryId, page },
          }"
        >
          {{ page }}
        </router-link>
      </li>

      <!-- 後一頁 nextPage -->
      <li class="page-item">
        <a class="page-link" aria-label="Next" href="#">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  props: {
    categoryId: {
      type: [String, Number],
      default: "",
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Array,
      required: true,
    },
    previousPage: {
      type: Number,
      required: true,
    },
    nextPage: {
      type: Number,
      required: true,
    },
  },
};
</script>