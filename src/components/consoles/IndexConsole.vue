<template>
    <section class="console">
        <div class="console-header">
            <button :disabled="isTaskCreating" @click="addTask" class="console_button button">
                Добавить объект
            </button>
            <button class="console_button button">Отмена
            </button>
        </div>
        <div class="console-content">
            <form class="controls">
                <div class="console-header">
                    <select class="controls_client select" name="client_name">
                        <option value="Дима Inc.">Дима Inc.</option>
                        <option value="Дима Inc.">Дима Inc.asdf</option>
                        <option value="Дима Inc.">Дима Inc.wefewfewf</option>
                        <option value="Дима Inc.">Дима Inc.efwef</option>
                    </select>
                    <div class="controls_input__wrapper"><input class="controls_input input" 
                            :class="{ input__error: isAddTask && !cipher }"
                            name="number"
                            placeholder="Номер" type="text"
                            v-model="cipher" /></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="location"
                            placeholder="Местоположение" :class="{ input__error: isAddTask && !address }" type="text"
                            v-model="address" /></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="cadastre"
                            placeholder="Кадастр" :class="{ input__error: isAddTask && !cadastral_number }" type="text"
                            v-model="cadastral_number" /></div>

                </div>
                <ul class="card-parentList">
                    <Card :hasDate="false" :isEditable="true"  @executorsLoaded="cardLoaded" @executorSelect="selectExecutor"
                        @executorUnselect="unselectExecutor" :topic_id="1" :card="card" v-for="card in cards" />
                </ul>
            </form>
        </div>
    </section>
</template>
    
<script>
import Card from "../Card.vue";
import Loader from "../common/Loader.vue";

import tasks from "../../api/tasks";

import EventEmitter from '../../utils/EventEmitter';

import { TASKS_CREATE } from '../../store/tasks/types.js';

import { ElMessage } from 'element-plus';

export default {
    name: 'IndexConsole',

    components: {
        Card,
        Loader,
    },

    data: () => ({
        cipher: "",
        cadastral_number: "",
        address: "",
        cards: [],
        executorsSelected: {},
        isLoaded: true,
        cardsLoadedCount: 0,
        isAddTask: false,
        isTaskCreating: false,
    }),

    async mounted() {
        this.cards = await (await tasks.getStagesList()).data;
    },

    computed: {
        isCardReady() {
            return this.cardsLoadedCount === this.cards.length;
        },

        isAllExecutorsSelected() {
            return this.cardsLoadedCount === Object.keys(this.executorsSelected).length;
        }
    },

    methods: {
        cardLoaded() {
            this.cardsLoadedCount += 1;
        },

        async addTask() {
            EventEmitter.$emit('addTask');
            this.isAddTask = true;
            if (!!this.cipher && !!this.cadastral_number && !!this.address && this.isAllExecutorsSelected) {
                this.isTaskCreating = true;
                const { success, data } = await this.$store.dispatch(
                    TASKS_CREATE,
                    {
                        cipher: this.cipher,
                        cadastral_number: this.cadastral_number,
                        address: this.address,
                        topic_id: 1,
                        executors: this.executorsSelected,
                    }
                );

                if (success) {
                    ElMessage({
                        message: 'Задание успешно создано',
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

            this.isTaskCreating = false;
            this.isAddTask = false;
        },

        selectExecutor(e) {
            this.executorsSelected[e[0]] = e[1];
        },

        unselectExecutor(e) {
            delete this.executorsSelected[e[0]];
        },

        clearInputs() {
            this.cipher = "";
            this.cadastral_number = "";
            this.address = "";
            EventEmitter.$emit('taskClearInputs');
        }
    },

    watch: {
        cardsLoadedCount() {
            if (this.isCardReady) {
                this.$emit("executorsLoaded");
            }
        },
    },

}
</script>