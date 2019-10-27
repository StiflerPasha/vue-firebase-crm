<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'Reg_Title' | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">{{'Desc_Email' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{'ErrorDesc_EmptyEmail' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'ErrorDesc_FormatEmail' | localize}}</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">{{'Desc_Password' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'ErrorDesc_EmptyPass' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'ErrorDesc_ShortPass' | localize}}</small>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="name">{{'Desc_Name' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'ErrorDesc_EmptyName' | localize}}</small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{'Desc_Rules' | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Btn_SignUp' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'Desc_HaveAcc' | localize}}
        <router-link to="/login">{{'Btn_SignIn' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v },
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
        name: this.name,
      };

      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {}
    },
  },
};
</script>