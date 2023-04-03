<template>
    <BaseLayout>
        <ProjectConsole v-if="!isLoading"/>
        <section class="view">
            <div class="view-footer">
                <Chat v-if="!isLoading" :task="task"/>
                <Agreement v-if="!!task && task.now_stage_type == 3 && nowStageData.executor_id == currentUser.id"/>
            </div>
        </section>
    </BaseLayout>
</template>

<script>
import BaseLayout from "../layouts/BaseLayout.vue"

import ProjectConsole from "../components/consoles/ProjectConsole.vue"
import Agreement from "../components/stages/Agreement.vue"

import Chat from "../components/Chat.vue"

import EventEmitter from '../utils/EventEmitter';

import { mapGetters } from "vuex";

import { TASK_FETCH_ONE } from '../store/tasks/types.js'

export default {
    name: 'TaskView',
    components: {
        ProjectConsole,
        Agreement,
        BaseLayout,
        Chat,
    },

    data: () => ({
        isLoading: true,
    }),

    async mounted() {
        EventEmitter.$emit('pageIsLoading');
        await this.fetchTask();
        EventEmitter.$emit('pageIsLoaded');
    },

    computed: {
        ...mapGetters(["currentUser", "task"]),
        id() {
            return this.$route.params.id;
        },
        nowStageData() {
            const index = this.task.stages.findIndex(x => x.id === this.task.now_stage_id);
            return this.task.stages[index];
        }
    },

    methods: {
        async fetchTask() {
            const { success } = await this.$store.dispatch(TASK_FETCH_ONE, {
                id: this.id,
            });

            if (!success) {
                this.$router.push("/404");
            }

            this.isLoading = false;
        },

        setExecutorsLoaded() {
            this.isLoadingExicuturs = false;
        },
    },

}
</script>
