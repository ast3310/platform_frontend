<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import EventEmitter from './utils/EventEmitter';

import { websocket_url } from './config.js';

export default {
  name: 'App',
  metaInfo: {
      title: 'Партнер'
  },
  data: () => ({
    connection: null,
  }),

  computed: {
    ...mapGetters(['currentUser']),
  },

  methods: {
    connectToNotify() {
      this.connection = new WebSocket(
            `${websocket_url}/ws/notifications/?token=${this.currentUser.token}`
        )

        this.connection.onmessage = this.getNotify;
    },

    getNotify(event) {
      const data = JSON.parse(event.data);
      if(!!data?.type) {
        EventEmitter.$emit(`notify__${data.type}`, data?.data);
      }
    }

  },
  
  watch: {
    currentUser() {
      if(!!this.currentUser?.token) {
        this.connectToNotify();
      }
    }
  }
}
</script>
