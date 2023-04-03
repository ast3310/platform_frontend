<template>
  <BaseLayout>
    <NameListConsole  />
    <section class="view">
      <ul class="view-list view-list--clients">
        <NameListItem :index="index" :task="item" v-for="(item, index) in tasks"/>
        
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

import { mapGetters } from "vuex";

export default {
  name: 'ClientsView',
  components: {
    NameListConsole,
    NameListItem,
    BaseLayout,
    Loader,
    Observer,
  },

  data: () => ({
    existsNextPage: false,
    isLoading: true,
    page: 0,
  }),

  async mounted() {
    this.isLoading = false;
    EventEmitter.$emit('pageIsLoaded');
  },

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },

  methods: {
  },

}
</script>
