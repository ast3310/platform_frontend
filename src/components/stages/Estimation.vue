<template>
    <section class="work work--estimation">
        <div class="work-window">
            <div class="work-header"></div>
            <div class="work-main">
                <p class="work_text">Стоимость проекта</p>
                <div class="work-input__wrapper">
                    <input class="work-input input" v-model="cost" type="text" />
                    <p class="work_text">₽</p>
                </div>
                <button @click="saveData" class="work_button button">Сохранить</button>
            </div>
            <div class="work-footer"></div>
        </div>
    </section>
</template>

<script>
import { ElMessage } from "element-plus";

import { TASKS_SAVE_ESTIMATION_DATA } from "../../store/tasks/types.js";

export default {
    name: 'Estimation',
    data: () => ({
        cost: "",
    }),
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },

        task() {
            return this.$store.getters.task;
        },
    },
    mounted() {
        this.setData();
    },
    methods: {
        async saveData() {
            if (!!this.cost) {
                const { success } = await this.$store.dispatch(
                    TASKS_SAVE_ESTIMATION_DATA,
                    {
                        cost: this.cost,
                    }
                );

                if (success) {
                    ElMessage({
                        message: 'Данные сохранены',
                        type: 'success',
                    });
                } else {
                    ElMessage({
                        message: 'Ошибка подключения или сбой сети',
                        type: 'error',
                    });
                }
            } else {
                ElMessage({
                    message: 'Заполните форму',
                    type: 'error',
                });
            }
        },
        setData() {
            if (!!this.task.estimation_data) {
                this.cost = this.task.estimation_data.cost;
            }
        }
    },
}
</script>