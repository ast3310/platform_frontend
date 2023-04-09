<template>
    <section class="console">
        <div class="console-header">
                <button class="console_button button" @click="saveData">Сохранить</button>
                <button class="console_button button" @click="logout" v-if="isProfile">Выйти из аккаунта</button>
        </div>
        <div class="console-content">
            <div class="controls">
                <div class="controls-header">
                    <div class="controls_input__wrapper"><input class="controls_input input" name="cadastre"
                            placeholder="Фамилия" type="text" v-model="last_name"></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="cadastre"
                            placeholder="Имя" type="text" v-model="first_name"></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="cadastre"
                            placeholder="Отчество" type="text" v-model="middle_name"></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="cadastre"
                            placeholder="Почта" type="text" v-model="email"></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="cadastre"
                            placeholder="Пароль" type="text" value="*******" readonly>
                        <button class="controls_generate button" @click="">Восстановить</button>
                </div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="cadastre"
                            placeholder="Дата рождения" type="text" value="12.02.11"></div>
                    <div class="controls_input__wrapper controls_input__wrapper--address"><input
                            class="controls_input input" name="cadastre" placeholder="Адрес проживания" type="text"
                            value="Краснодарский край, Тимашевский район, п. Заречный, ул. Речная 17"></div>
                    <div class="controls_input__wrapper"><select class="controls_client select" name="client_name">
                            <option value="1">Машина</option>
                            <option value="0">Без машины</option>
                        </select></div>
                </div>
                <ul class="card-parentList"></ul>
            </div>
        </div>
</section>
</template>

<script>
import validator from '../../utils/validator';
import { USER_UPDATE } from '../../store/users/types.js';
import { ElMessage } from 'element-plus';

export default {
    name: 'UserConsole',
    data: () => ({
        last_name: '',
        first_name: '',
        middle_name: '',
        email: '',

    }),

    mounted() {
        this.last_name = this.user.last_name;
        this.first_name = this.user.first_name;
        this.middle_name = this.user.middle_name;
        this.email = this.user.email;
    },

    methods: {
        logout() {
             this.$store.dispatch('logout');
             this.$router.push('/');
        },

        async saveData() {

             if (!validator.validateEmail(this.email)) {
                ElMessage({
                   message: 'Некорректно введена почта',
                   type: 'error',
                });
                return;
             }
             const payload = {
                ...(this.last_name !== this.user.last_name && { last_name: this.last_name }),
                ...(this.first_name !== this.user.first_name && { first_name: this.first_name }),
                ...(this.middle_name !== this.user.middle_name && { middle_name: this.middle_name }),
                ...(this.email !== this.user.email && { email: this.email }),
             }

             if (Object.keys(payload).length !== 0) {
                const { success, data } = await this.$store.dispatch(
                    USER_UPDATE,
                    {
                        id: this.user.id,
                        payload: payload
                    }
                );
             }
             this.$emit('onSave')
        }
    },
    props: {
        user: {
            type: Object,
            required: true,
        },
        isProfile: {
            type: Boolean,
            required: true,
        }
    },
}
</script>