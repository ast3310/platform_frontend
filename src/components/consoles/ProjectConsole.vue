<template>
    <section class="console">
        <div class="console-header">
            <button class="console_button button" @click="openConfirm">Этап завершён</button>
            <button class="console_button button">Остановка цикла</button>
            <button class="console_button button">Выйти</button>
            <p class="console_projectName">{{ task.cipher }}</p>
        </div>
        <div class="console-content">
            <div class="console-projectData">
                <p class="console_text input">Заказчик</p>
                <p class="console_text input">{{ task.address }}</p>
                <p class="console_text input">{{ task.cadastral_number }}</p>
                <p class="console_text input">{{ taskDesignData }}</p>
                <p class="console_text input">{{ taskEstimationData }}</p>
                <p class="console_text input">{{ task.now_stage_label }}</p>
            </div>
            <form class="controls">
                <div class="controls-header"></div>
                <ul class="card-parentList">
                    <Card :isNowStage="task.now_stage_id === stage.id" :hasDate="true" :isEditable="false"
                        :started_at="stage.started_at" :finished_at="stage.finished_at" :card="stage"
                        :setedUser="getUserData(stage)" v-for="stage in orderedStages" />
                </ul>
            </form>

        </div>
    </section>
</template>
    
<script>
import Card from "../Card.vue";

import { ElMessage, ElMessageBox } from 'element-plus'

import { mapGetters } from "vuex";
import { TASKS_COMPLETE_STAGE } from "../../store/tasks/types";

import * as stages from "../../utils/stages.js";

export default {
    name: 'ProjectConsole',
    components: {
        Card,
    },

    computed: {
        ...mapGetters(["task"]),
        orderedStages() {
            return this.task.stages.sort((x, y) => x.type - y.type);
        },
        taskDesignData() {
            return (!!this.task.design_data) ?
                `ВД – ${this.task.design_data.VD}м НД – ${this.task.design_data.ND}м ПРГ - ${this.task.design_data.PRG}м3/ч` :
                '-';
        },
        taskEstimationData() {
            return (!!this.task.estimation_data) ?
                new Intl.NumberFormat().format(this.task.estimation_data?.cost) + '₽' : '-';
        }
    },

    methods: {
        getUserData(stage) {
            return {
                first_name: stage.executor_first_name,
                last_name: stage.executor_last_name,
                middle_name: stage.executor_middle_name,
            };
        },

        async openConfirm() {
            ElMessageBox.confirm(
                'После потдверждения вы завершите стадию',
                'Вы уверены?',
                {
                    confirmButtonText: 'Да',
                    cancelButtonText: 'Отмена',
                    type: 'warning',
                }
            ).then(async () => {
                await this.completeStage();
            })
        },

        async completeStage() {
            const hasDesignData = this.task.now_stage_type === stages.DESIGN && !this.task.design_data;
            const hasEstimationData = this.task.now_stage_type === stages.ESTIMATED_DOCUMENTATION && !this.task.estimation_data;

            if (hasDesignData || hasEstimationData) {
                ElMessage({
                    type: 'error',
                    message: 'Необходимые данные не были сохранены',
                });
                return;
            }

            const { success } = await this.$store.dispatch(TASKS_COMPLETE_STAGE, {
                id: this.task.id,
            });

            if (success) {
                ElMessage({
                    type: 'success',
                    message: 'Стадия успешно завершена',
                });
            } else {
                ElMessage({
                    type: 'error',
                    message: 'Произошла ошибка',
                });
            }

            this.isLoading = false;
        }
    },
}
</script>