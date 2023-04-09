<template>
    <div class="login">
        <div class="logo__wrapper">
            <Logo />
        </div>
        
        <div class="error-big">
            <div class="error-big_text">
                Страница не найдена
            </div>
            <div class="error-big_code">
                404
            </div>
        </div>
        
        <div class="login_button__wrapper">
            <button class="login_button button" @click="$router.push({ path: '/' })">На главную</button>
        </div>
    </div>
</template>

<script>
import Logo from '@/assets/images/logo.svg';

export default {
    name: 'NotFoundView',
    components: {
        Logo
    }
}
</script>