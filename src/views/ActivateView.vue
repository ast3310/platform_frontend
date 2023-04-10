<template>
    <div class="login">
        <div class="logo__wrapper">
            <Logo />
        </div>
        
        <div class="error-big">
            <div class="error-big_text">
                Страница не найдена
            </div>
        </div>
        
    </div>
</template>

<script>
import Logo from '@/assets/images/logo.svg';

import users from '../api/users';

import { ElMessage } from 'element-plus';

export default {
    name: 'ActivateView',
    data: () => ({
        isActivate: false,
    }),
    components: {
        Logo,
    },
    async mounted() {
        const token = this.$route.query.token;
        if (!!token) {
            const { isSuccess, data } = users.activateUser({ token: token });

            if (isSuccess === true) {
                ElMessage({
                    message: 'Активация прошла успешно',
                    type: 'success',
                });
            } else {
                ElMessage({
                    message: 'Произошла ошибка',
                    type: 'error',
                });
            }

            setTimeout(this.redirect, 60 * 5);
        }
    },

    methods: {
        redirect() {
            this.$router.push("/login");
        }
    }
}
</script>