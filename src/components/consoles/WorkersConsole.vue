<template>
    <section class="console">
        <div class="console-header"><button class="console_button button" @click="createWorker">Добавить сотрудника</button><button
                class="console_button button">Отмена</button></div>
        <div class="console-content">
            <div class="controls">
                <div class="controls-header">
                    <div class="controls_input__wrapper"><input class="controls_input input" name="last_name"
                            placeholder="Фамилия" type="text" v-model="lastName" /></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="first_name"
                            placeholder="Имя" type="text" v-model="firstName" /></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="middle_name"
                            placeholder="Отчество" type="text" v-model="middleName" /></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="cadastre"
                            placeholder="email" type="text" v-model="email" /></div>
                    <div class="controls_input__wrapper"><input class="controls_input controls_password input"
                            name="cadastre" placeholder="Пароль" type="text" v-model="password" />
                        <button class="controls_generate button" @click="generatePassword">Генерировать</button>
                    </div>
                </div>
                <ul class="card-parentList"></ul>
            </div>
        </div>
    </section>
</template>
    
<script>

import EventEmitter from '../../utils/EventEmitter';

import { USERS_CREATE } from '../../store/users/types.js';

import { ElMessage } from 'element-plus';

import generator from '../../utils/cryptoGenerator';
import validator from '../../utils/validator';

export default {
    name: 'WorkersConsole',

    components: {

    },

    data: () => ({
        firstName: '',
        middleName: '',
        lastName: '',

        email: '',
        password: '',

        isCreating: false,
    }),

    async mounted() {

    },

    computed: {
        isValid() {
            return !!this.firstName
                && !!this.middleName
                && !!this.lastName
                && (!!this.email && validator.validateEmail(this.email))
                && !!this.password
        }
    },

    methods: {
        async createWorker() {
            console.log(!!this.email)
            if (this.isValid) {
                this.isCreating = true;

                const { success, data } = await this.$store.dispatch(
                    USERS_CREATE,
                    {
                        email: this.email.trim(),
                        password: this.password.trim(), 
                        last_name: this.lastName.trim(), 
                        first_name: this.firstName.trim(), 
                        middle_name: this.middleName.trim(),
                    }
                );

                if (success) {
                    ElMessage({
                        message: 'Сотрудник успешно создан',
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

            this.isCreating = false;
        },

        generatePassword() {
            this.password = generator.getPassword(10);
        },

        clearInputs() {
            this.firstName = '';
            this.middleName = '';
            this.lastName = '';
            this.email = '';
            this.password = '';
        }
    }

}
</script>