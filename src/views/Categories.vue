<template>
	<div>
		<div class="page-title">
			<h3>{{'Category_Title' | localize}}</h3>
		</div>
		
		<section>
			<Loader v-if="loading" />
			
			<div v-else
			     class="row">
				<CategoryCreate @created="addNewCategory" />
				
				<CategoryEdit v-if="categories.length"
				              :categories="categories"
				              @updated="updateCategories"
				              :key="categories.length + updateCount" />
				<p v-else
				   class="center">{{'EmptyCategory' | localize}}</p>
			</div>
		</section>
	</div>
</template>

<script>
  import CategoryCreate from '../components/CategoryCreate';
  import CategoryEdit   from '../components/CategoryEdit';
  
  export default {
    name: 'categories',
    metaInfo() {
      return {
        title: this.$title('Category_Title'),
      };
    },
    data: () => ({
      categories: [],
      loading: true,
      updateCount: 0,
    }),
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    },
    components: {
      CategoryCreate,
      CategoryEdit,
    },
    methods: {
      addNewCategory(category) {
        this.categories.push(category);
      },
      updateCategories(category) {
        const index = this.categories.findIndex(c => c.id === category.id);
        this.categories[index].title = category.title;
        this.categories[index].limit = category.limit;
        this.updateCount++;
      },
    },
  };
</script>
