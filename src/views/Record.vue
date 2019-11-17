<template>
	<div>
		<div class="page-title">
			<h3>{{'NewRecord_Title' | localize}}</h3>
		</div>
		
		<Loader v-if="loading" />
		
		<p v-else-if="!categories.length"
		   class="center">
			Категорий пока нет.
			<router-link to="/categories">Добавить новую категорию</router-link>
		</p>
		
		<form v-else
		      class="form"
		      @submit.prevent="submitHandler">
			<div class="input-field">
				<select ref="select"
				        v-model="category">
					<option v-for="c in categories"
					        :key="c.id"
					        :value="c.id">{{c.title}}
					</option>
				</select>
				<label>{{'SelectCategory' | localize}}</label>
			</div>
			
			<p>
				<label>
					<input class="with-gap"
					       name="type"
					       type="radio"
					       value="income"
					       v-model="type" />
					<span>{{'income' | localize}}</span>
				</label>
			</p>
			
			<p>
				<label>
					<input class="with-gap"
					       name="type"
					       type="radio"
					       value="outcome"
					       v-model="type" />
					<span>{{'outcome' | localize}}</span>
				</label>
			</p>
			
			<div class="input-field">
				<input id="amount"
				       type="number"
				       v-model.number="amount"
				       :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}" />
				<label for="amount">{{'Amount' | localize}}</label>
				<span class="helper-text invalid"
				      v-if="$v.amount.$dirty && !$v.amount.minValue">{{'MinValue' | localize}} {{this.$v.amount.$params.minValue.min}}</span>
			</div>
			
			<div class="input-field">
				<input id="description"
				       type="text"
				       v-model="description"
				       :class="{invalid: $v.description.$dirty && !$v.description.required}" />
				<label for="description">{{'Description' | localize}}</label>
				<span class="helper-text invalid"
				      v-if="$v.description.$dirty && !$v.description.required">{{'ErrorDesc_EmptyDesc' | localize}}</span>
			</div>
			
			<button class="btn waves-effect waves-light"
			        type="submit">
				{{'Btn_Create' | localize}}
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
  import { required, minValue } from 'vuelidate/lib/validators';
  import { mapGetters }         from 'vuex';
  
  export default {
    name: 'record',
    metaInfo() {
      return {
        title: this.$title('Record_Title'),
      };
    },
    data: () => ({
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: 'outcome',
      amount: 100,
      description: '',
    }),
    
    validations: {
      description: { required },
      amount: { minValue: minValue(100) },
    },
    
    computed: {
      ...mapGetters(['info']),
      
      canCreateRecord() {
        if (this.type === 'income') {
          return true;
        }
        return this.info.bill >= this.amount;
      },
    },
    
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        
        if (this.canCreateRecord) {
          const recordData = {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          };
          
          try {
            await this.$store.dispatch('createRecord', recordData);
            
            const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount;
            
            await this.$store.dispatch('updateInfo', { bill });
            this.$message('RecordCreate');
            this.$v.$reset();
            this.amount = 1;
            this.description = '';
          } catch (e) {
          }
        } else {
          this.$message(`Недостаточно средств (${ this.amount - this.info.bill })`);
        }
      },
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
      
      if (this.categories.length) {
        this.category = this.categories[0].id;
      }
      
      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
      }, 0);
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy();
      }
    },
  };
</script>
