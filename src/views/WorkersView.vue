<template>
  <BaseLayout>
    <WorkersConsole />
    <section class="view">
      <ul class="view-params view-params--workers">
        <li class="view-param">Фамилия</li>
        <li class="view-param">Имя</li>
        <li class="view-param">Отчество</li>
        <li class="view-param">Еmail / телефон</li>
        <li class="view-param">Пароль</li>
        <li class="view-param">Дата рождения</li>
        <li class="view-param">Адрес</li>
        <li class="view-param">Авто</li>
        <li class="view-param">Деятельность</li>
        <li class="view-param">Админ</li>
      </ul>
      <ul class="view-list view-list--workers">
        <WorkersItem @click="$router.push({ path: `/userSettings/${item.id}` })" 
            :index="index" :worker="item" v-for="(item, index) in users" />

        <Observer v-if="existsNextPage" />
        <Loader v-if="existsNextPage" />
      </ul>
    </section>
  </BaseLayout>
</template>

<script>
import BaseLayout from "../layouts/BaseLayout.vue"
import Loader from "../components/common/Loader.vue";
import Observer from "../components/common/Observer.vue";

import WorkersConsole from "../components/consoles/WorkersConsole.vue"
import WorkersItem from "../components/WorkersItem.vue"

import EventEmitter from '../utils/EventEmitter';

import { mapGetters } from "vuex";

import { USERS_FETCH_LIST, USERS_CARDS_CLEAR } from '../store/users/types.js';

export default {
  name: 'WorkersView',
  components: {
    WorkersConsole,
    WorkersItem,
    BaseLayout,
    Loader,
    Observer,
  },

  data: () => ({
    existsNextPage: false,
    isLoading: true,
    chatIsLoading: true,
    page: 0,
  }),

  async mounted() {
    EventEmitter.$emit('pageIsLoading');
    this.$store.commit(USERS_CARDS_CLEAR);
    await this.fetchWorkers();
    EventEmitter.$emit('pageIsLoaded');
  },

  computed: {
    ...mapGetters(['currentUser', 'users']),
  },

  methods: {
    async fetchWorkers() {
      if (this.page !== 0 && this.isLoading) return;
      this.isLoading = true;
      this.page = this.page + 1;

      const { existsNextPage, success } = await this.$store.dispatch(
        USERS_FETCH_LIST,
        {
          page: this.page
        }
      );

      if (success) {
        this.existsNextPage = existsNextPage;
      }

      this.isLoading = false;
    },
  },

}
</script>
