<template>
  <header class="header">
    <div class="header-container container">
      <div class="logo__wrapper">
        <Logo @click="$router.push({ path: '/' })" style="cursor: pointer;" />
      </div>
      <nav class="nav">
        <li v-if="currentUser?.is_staff" class="nav-item"><router-link class="nav-item--link link" to="/workers">
            <div class="nav-item_image">
              <ClientsIcon/>
            </div>
            <div class="nav-item_name">Сотрудники</div>
          </router-link></li>
        <li class="nav-item"><router-link class="nav-item--link link" to="/agreements">
            <div class="nav-item_image">
              <WorkersIcon/>
            </div>
            <div class="nav-item_name">Согласующие</div>
          </router-link></li>
      </nav>
      <div class="user">
        <div class="user_settings">
          <a class="user-settings--link link" :href="`/userSettings/${currentUser.id}`">
           <SettingsIcon />
          </a></div>
        <div class="user-data">
          <div class="user_photo__wrapper"><img class="user_photo" src="@/assets/images/photo.png" alt="Рнтров И. И." />
          </div>
          <div class="user_name">{{ userName }}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

import SettingsIcon from '../assets/images/svgs/settings.svg';
import WorkersIcon from '../assets/images/svgs/workers.svg';
import ClientsIcon from '../assets/images/svgs/clients.svg';

import Logo from '@/assets/images/logo.svg';

export default {
  name: 'Header',
  components: {
    Logo,
    SettingsIcon,
    WorkersIcon,
    ClientsIcon,
  },
  computed: {
    ...mapGetters(["currentUser"]),
    userName() {
      let f_name = this.currentUser.first_name;
      let m_name = this.currentUser.middle_name;
      return !!this.currentUser ? 
      `${this.currentUser.last_name} ${f_name?.charAt(0)}.${m_name?.charAt(0)}` : '';
    },
  },
}
</script>
