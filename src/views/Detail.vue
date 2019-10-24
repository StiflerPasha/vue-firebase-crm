<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">{{record.typeText}}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency('RUB')}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">
      <strong>Такой записи нет</strong>
    </p>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data: () => ({
    loading: true,
    record: null,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

    this.record = {
      description: record.description,
      amount: record.amount,
      categoryName: category.title,
      date: record.date,
      typeText: record.type === 'income' ? 'Доход' : 'Расход',
      typeClass: record.type === 'income' ? 'green' : 'red',
    };

    this.loading = false;
  },
};
</script>

<style>
</style>