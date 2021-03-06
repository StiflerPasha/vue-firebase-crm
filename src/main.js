import App    from './App.vue';
import Vue    from 'vue';
import router from './router';
import store  from './store';

import VueMeta   from 'vue-meta';
import Vuelidate from 'vuelidate';
import Paginate  from 'vuejs-paginate';

import dateFilter     from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import localizeFilter from './filters/localize.filter';

import messagePlugin    from './utils/message.plugin';
import titlePlugin      from './utils/title.plugin';
import tooltipDirective from './directives/tooltip.directive';
import Loader           from './components/app/Loader.vue';

import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: 'AIzaSyA_kfMGdAArTTljFugdRLiZIdNh-OOjwvk',
  authDomain: 'vue-crm-practice.firebaseapp.com',
  databaseURL: 'https://vue-crm-practice.firebaseio.com',
  projectId: 'vue-crm-practice',
  storageBucket: '',
  messagingSenderId: '525272888842',
  appId: '1:525272888842:web:a23fd7909c769e8afd91f3',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
