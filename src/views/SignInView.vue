<template>
    <div class="login">
        <div class="logo__wrapper"><Logo/></div>
        <transition name="fade">
            <div class="login__error" v-if="!!error">{{ error }}</div>
        </transition>
        <div class="login_input__wrapper"><input class="login_input input" name="number" placeholder="Логин" type="text"
                v-model="username" /></div>
        <div class="login_input__wrapper"><input class="login_input input" name="location" placeholder="Пароль"
                type="password" v-model="password" /></div>
        <div class="login_button__wrapper"><button class="login_button button" @click="handlerLogin">Войти</button></div>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";

import Logo from '@/assets/images/logo.svg';


export default {
    name: 'SignInView',
    data: () => ({
        username: "",
        password: "",
        loading: false,
        error: null,
    }),
    components: {
        Logo,
    },
    mounted() {
        if (!!this.currentUser) this.$router.push('/');
    },
    computed: {
        ...mapGetters(["currentUser"]),
    },
    methods: {
        ...mapActions({
            createToken: "createToken",
            fetchCurrentUser: "fetchCurrentUser",
        }),

        async handlerLogin() {
            if (!this.username && !this.password) return;
            this.error = null;
            this.loading = true;
            const result = await this.createToken({
                username: this.username,
                password: this.password,
            });
            this.loading = false;
            this.accountActivated = result.accountActivated;
            if (!result.error) {
                this.murren_username = "";
                this.murren_password = "";
                await this.fetchCurrentUser();
                this.$router.push({ name: 'home'});
            }
            else {
                
                this.error = "Неправильный пароль или логин";
            }
        }
    }
}
</script>
  