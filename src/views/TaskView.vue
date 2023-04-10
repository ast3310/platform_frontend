<template>
    <BaseLayout>
        <ProjectConsole v-if="!!task" :isCurrentUser="isCurrentUser"/>
        <section class="view">
            <ul class="stages"
                v-if="!!task?.agreements && (isHarmonization || isFinished )">
                <AgreementItem :isEditable="isAgreementEditable" :agreement="agreement"
                    v-for="agreement in task.agreements" />
            </ul>
            <div class="view-footer">
                <Chat v-if="!!task" :task="task" @chatLoaded="setChatLoaded" />
                <Agreement v-if="!!task && isDesignStage && isCurrentUser" />
                <Estimation v-if="!!task && isEstimation && isCurrentUser" />
            </div>
        </section>
    </BaseLayout>
</template>

<script>
import BaseLayout from "../layouts/BaseLayout.vue";

import ProjectConsole from "../components/consoles/ProjectConsole.vue";
import Agreement from "../components/stages/Agreement.vue";
import Estimation from "../components/stages/Estimation.vue";
import AgreementItem from "../components/stages/AgreementItem.vue";

import Chat from "../components/Chat.vue";

import EventEmitter from '../utils/EventEmitter';
import { DESIGN, HARMONIZATION, ESTIMATED_DOCUMENTATION } from '../utils/stages';

import { mapGetters } from "vuex";

import { TASK_FETCH_ONE, TASK_CARD_SET } from '../store/tasks/types.js';

export default {
    name: 'TaskView',
    components: {
        ProjectConsole,
        Agreement,
        AgreementItem,
        Estimation,
        BaseLayout,
        Chat,
    },

    data: () => ({
        isLoading: true,
        chatIsLoading: true,
    }),

    async mounted() {
        this.$store.commit(TASK_CARD_SET, null);
        EventEmitter.$emit('pageIsLoading');
        await this.fetchTask(this.id);
        EventEmitter.$on('notify__task_changed', this.taskChanged);
        this.isLoading = false;
    },

    computed: {
        ...mapGetters(["currentUser", "task"]),
        id() {
            return this.$route.params.id;
        },
        nowStageData() {
            const index = this.task.stages.findIndex(x => x.id === this.task.now_stage_id);
            return this.task.stages[index];
        },
        isCurrentUser() {
            return this.nowStageData?.executor_id == this.currentUser.id;
        },
        isDesignStage() {
            return this.task.now_stage_type === DESIGN;
        },
        isHarmonization() {
            return this.task.now_stage_type >= HARMONIZATION;
        },
        isEstimation() {
            return this.task.now_stage_type === ESTIMATED_DOCUMENTATION;
        },
        isFinished() {
            return this.task?.state === "Finished";
        },
        isAgreementEditable() {
            return this.task.now_stage_type === HARMONIZATION && this.isCurrentUser;
        },
        isPageLoaded() {
            return !this.chatIsLoading && !this.isLoading;
        }
    },

    methods: {
        async fetchTask(id) {
            const { success } = await this.$store.dispatch(TASK_FETCH_ONE, {
                id: id,
            });

            if (!success) {
                this.$router.push("/404");
            }
        },

        setChatLoaded() {
            this.chatIsLoading = false;
        },

        taskChanged(e) {
            if (e.executor_id !== this.currentUser.id 
            && e.task_id === this.task?.id) {
                this.fetchTask(this.id);
            }
        }
    },

    watch: {
        isPageLoaded: () => {
            EventEmitter.$emit('pageIsLoaded');
        },
    }
}
</script>
