<template>
  <BaseLayout>
    <NameListConsole @addObject="addAgreement" />
    <section class="view">
      <ul class="view-list view-list--clients">
        <NameListItem :index="index" :name="item.name" v-for="(item, index) in agreements" />

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

import NameListConsole from "../components/consoles/NameListConsole.vue"
import NameListItem from "../components/NameListItem.vue"

import EventEmitter from '../utils/EventEmitter';

import { ElMessage } from 'element-plus';

import { AGREEMENTS_FETCH_LIST, AGREEMENTS_CARDS_CLEAR, AGREEMENTS_CREATE } from '../store/agreements/types.js'

import { mapGetters } from "vuex";

export default {
  name: 'AgreementsView',
  components: {
    NameListConsole,
    NameListItem,
    BaseLayout,
    Loader,
    Observer,
  },

  data: () => ({
    existsNextPage: false,
    isLoading: false,
    page: 0,
  }),

  async mounted() {
    this.$store.commit(AGREEMENTS_CARDS_CLEAR);
    await this.fetchAgreements();
    EventEmitter.$emit('pageIsLoaded');
  },

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    agreements() {
      return this.$store.getters.agreements;
    },
  },

  methods: {
    async fetchAgreements() {
      if (this.page !== 0 && this.isLoading) return;
      this.isLoading = true;
      this.page = this.page + 1;

      const { existsNextPage, success } = await this.$store.dispatch(
        AGREEMENTS_FETCH_LIST,
        {
          page: this.page
        }
      );

      if (success) {
        this.existsNextPage = existsNextPage;
      }

      this.isLoading = false;
    },
    async addAgreement(name) {
      if (name !== "") {
        const { success, data } = await this.$store.dispatch(
          AGREEMENTS_CREATE,
          {
            name: name
          }
        );

        if (success) {
          ElMessage({
            message: 'Cогласующий успешно добавлен',
            type: 'success',
          });
          this.clearInputs();
        } else {
          ElMessage({
            message: 'Ошибка подключения или сбой сети',
            type: 'error',
          });
        }
      } else {
        ElMessage({
          message: 'Введите данные для создания',
          type: 'error',
        });
      }
    }
  },

}
</script>
