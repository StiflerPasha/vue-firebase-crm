<template>
	<form class="card auth-card"
	      @submit.prevent="submitHandler">
		<div class="card-content">
			<span class="card-title">{{'Reg_Title' | localize}}</span>
			
			<div class="input-field">
				<input id="email"
				       type="text"
				       v-model.trim="email"
				       :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" />
				<label for="email">{{'Desc_Email' | localize}}</label>
				<small class="helper-text invalid"
				       v-if="$v.email.$dirty && !$v.email.required">{{'ErrorDesc_EmptyEmail' | localize}}</small>
				<small class="helper-text invalid"
				       v-else-if="$v.email.$dirty && !$v.email.email">{{'ErrorDesc_FormatEmail' | localize}}</small>
			</div>
			
			<div class="input-field">
				<input id="password"
				       type="password"
				       v-model.trim="password"
				       :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" />
				<label for="password">{{'Desc_Password' | localize}}</label>
				<small class="helper-text invalid"
				       v-if="$v.password.$dirty && !$v.password.required">{{'ErrorDesc_EmptyPass' | localize}}</small>
				<small class="helper-text invalid"
				       v-else-if="$v.password.$dirty && !$v.password.minLength">{{'ErrorDesc_ShortPass' | localize}}</small>
			</div>
		</div>
		
		<div class="card-action">
			<div>
				<button class="btn waves-effect waves-light auth-submit"
				        type="submit">
					{{'Btn_SignIn' | localize}}
					<i class="material-icons right">send</i>
				</button>
			</div>
			
			<p class="center">
				{{'Desc_NotHaveAcc' | localize}}
				<router-link to="/register">{{'Btn_SignUp' | localize}}</router-link>
			</p>
		</div>
	</form>
</template>

<script>
  import { email, required, minLength } from 'vuelidate/lib/validators';
  import messages                       from '../utils/messages';
  
  export default {
    name: 'login',
    metaInfo() {
      return {
        title: this.$title('LogIn'),
      };
    },
    data: () => ({
      email: '',
      password: '',
    }),
    validations: {
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
    mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message]);
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        
        const formData = {
          email: this.email,
          password: this.password,
        };
        
        try {
          await this.$store.dispatch('login', formData);
          this.$router.push('/');
        } catch (e) {
        }
      },
    },
  };
</script>
