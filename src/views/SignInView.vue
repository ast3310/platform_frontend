<template>
    <div class="login">
        <div class="logo__wrapper"><img class="logo" src="@/assets/images/logo.svg" alt="Типография 'Запад'"
                usemap="#home_link" /></div>
        <div class="login_input__wrapper"><input class="login_input input" name="number" placeholder="Логин" type="text"
                v-model="username" /></div>
        <div class="login_input__wrapper"><input class="login_input input" name="location" placeholder="Пароль"
                type="password" v-model="password" /></div>
        <div class="login_button__wrapper"><button class="login_button button" @click="handlerLogin">Войти</button></div>
    </div>
</template>
  
<script>
import { mapActions } from "vuex";

export default {
    name: 'SignInView',
    data: () => ({
        username: "",
        password: "",
        loading: false
    }),
    mounted() { },
    methods: {
        ...mapActions({
            createToken: "createToken",
        }),

        async handlerLogin() {
            if (!this.username && !this.password) return;
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
                this.$router.push('index');
            }
        }
    }
}
</script>
  