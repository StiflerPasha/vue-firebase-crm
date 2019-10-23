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
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable";

export default {
  name: "history",
  data: () => ({
    loading: true,
    categories: [],
    records: []
  }),
  async mounted() {
    //this.records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");

    const records = await this.$store.dispatch("fetchRecords");
    this.records = records.map(record => ({
      ...record,
      categoryName: this.categories.find(c => c.id === record.categoryId).title,
      typeClass: record.type === "income" ? "green" : "red",
      typeText: record.type === "income" ? "Доход" : "Расход"
    }));
    this.loading = false;
  },
  components: {
    HistoryTable
  }
};
</script>

<style>
</style>