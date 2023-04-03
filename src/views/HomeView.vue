<template>
  <BaseLayout>
    <IndexConsole v-if="currentUser.is_staff" @executorsLoaded="setExecutorsLoaded" />
    <section class="view">
      <ul class="view-params view-params--projects">
        <li class="view-param">Шифр</li>
        <li class="view-param">Заказчик</li>
        <li class="view-param">Местоположение</li>
        <li class="view-param">Кадастр</li>
        <li class="view-param">Параметры</li>
        <li class="view-param">Сумма</li>
        <li class="view-param">Стадия работы</li>
      </ul>
      <ul class="view-list view-list--projects">
        <ProjectItem @click="openTask(item.id)" :index="index" :task="item" v-for="(item, index) in tasks"/>
        
        <Observer v-if="existsNextPage" @intersect="fetchTasks"/>
        <Loader v-if="existsNextPage" />
      </ul>
    </section>
  </BaseLayout>
</template>

<script>
import BaseLayout from "../layouts/BaseLayout.vue"
import Loader from "../components/common/Loader.vue";
import Observer from "../components/common/Observer.vue";

import IndexConsole from "../components/consoles/IndexConsole.vue"
import ProjectItem from "../components/ProjectItem.vue"

import EventEmitter from '../utils/EventEmitter';

import { mapGetters } from "vuex";

import { TASKS_FETCH_LIST, TASKS_CARDS_CLEAR, TASKS_FETCH_MY_LIST } from '../store/tasks/types.js'

export default {
  name: 'HomeView',
  components: {
    IndexConsole,
    ProjectItem,
    BaseLayout,
    Loader,
    Observer,
  },

  data: () => ({
    existsNextPage: false,
    isLoading: true,
    isLoadingExicuturs: true,
    page: 0,
  }),

  async mounted() {
    this.$store.commit(TASKS_CARDS_CLEAR);
    await this.fetchTasks();
  },

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    tasks() {
      return this.$store.getters.tasks;
    },
    isPageLoaded(){
      return !this.isLoading && (!this.isLoadingExicuturs || !this.currentUser.is_staff)
    }
  },

  methods: {
    async fetchTasks() {
      let fetchAction = TASKS_FETCH_LIST;


      if (!this.currentUser.is_staff) {
        fetchAction = TASKS_FETCH_MY_LIST;
      }

      if (this.page !== 0 && this.isLoading) return;
      this.isLoading = true;
      this.page = this.page + 1;

      const { existsNextPage, success } = await this.$store.dispatch(
        fetchAction,
        {
          page: this.page
        }
      );

      if (success) {
        this.existsNextPage = existsNextPage;
      }

      this.isLoading = false;
    },

    openTask(id) {
      this.$router.push({
        name: "task",
        params: { id: id },
      });
    },

    setExecutorsLoaded() {
      this.isLoadingExicuturs = false;
    },
  },

  watch: {
    isPageLoaded: () => {
      EventEmitter.$emit('pageIsLoaded');
    },
  }

}
</script>
