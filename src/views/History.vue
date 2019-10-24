<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">
      Записей пока нет.
      <router-link to="/record">Добавить</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        :prevText="'Назад'"
        :nextText="'Вперед'"
        :containerClass="'pagination'"
        :pageClass="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '../mixins/pagination.mixin';
import HistoryTable from '../components/HistoryTable';

export default {
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories');
    this.records = await this.$store.dispatch('fetchRecords');

    this.setupPagination(
      this.records.map((record) => ({
        ...record,
        categoryName: categories.find((c) => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      })),
    );

    this.loading = false;
  },
  components: {
    HistoryTable,
  },
};
</script>

<style>
</style>