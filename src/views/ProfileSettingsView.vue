<template>
    <BaseLayout>
        <UserConsole @onSave="setTopics" v-if="!isLoading" :user="user" :isProfile="isProfile" />
        <section class="view">
            <ul class="view-params view-params--user">
                <li class="view-param" v-for="item in stages">{{ item.stage_label_ru }}</li>
            </ul>
            <ul class="view-list view-list--user">
                <TopicRoleItem @roleToChange="roleToChange" 
                :name="key" :stages="stages" :topic="topics[key]" v-for="key in Object.keys(topics)" />
            </ul>
        </section>
    </BaseLayout>
</template>
  
<script>
import BaseLayout from "../layouts/BaseLayout.vue";

import UserConsole from '../components/consoles/UserConsole.vue';
import TopicRoleItem from '../components/TopicRoleItem.vue';

import { ElMessage } from 'element-plus';

import EventEmitter from '../utils/EventEmitter';

import { USER_FETCH_ONE } from '../store/users/types.js';

import { mapGetters } from "vuex";

import users from '../api/users';
import tasks from '../api/tasks';

export default {
    name: 'ProfileSettingsView',
    components: {
        BaseLayout,
        UserConsole,
        TopicRoleItem,
    },

    data: () => ({
        isLoading: true,
        topics: [],
        stages: [],
        topic_sum: '',
        selectedRoles: [],
    }),

    async created() {
        EventEmitter.$emit('pageIsLoading');
        this.isLoading = true;

        await this.fetchUser();

        const topics_data = (await users.getTopics(this.id)).data;
        this.topics = topics_data.data[0];
        this.topic_sum = topics_data.sum;
        this.stages = (await tasks.getStagesList()).data;

        this.setDefault();
        
        EventEmitter.$emit('pageIsLoaded');
    },

    computed: {
        ...mapGetters(['currentUser', 'user']),
        id() {
            return this.$route.params.id;
        },
        isProfile() {
            return this.currentUser.id === parseInt(this.id);
        }
    },

    methods: {
        async fetchUser() {
            const { success } = await this.$store.dispatch(USER_FETCH_ONE, {
                id: this.id,
                isProfile: this.isProfile
            });

            if (!success) {
                this.$router.push("/404");
            }

            this.isLoading = false;
        },

        isProfileOrAdmin() {
            if (!isProfile && !this.currentUser.is_staff) {
                this.$router.push("/404");
            }
        },

        inSelected(role, topic) {
            let indexF = this.selectedRoles.findIndex((element, index, array) => {
                if (element === undefined) return false;
                if (element.topic_id === topic && element.role === role) {
                    return true;
                }
                return false;
            })

            return indexF;
        },

        setDefault() {
            const keys = Object.keys(this.topics);
            for (let key in keys) {
                for (let role_idx in this.topics[keys[key]]) {
                    let role = this.topics[keys[key]][role_idx];
                    if (!!role.topic && !!role.role) {
                        this.selectedRoles.push(
                            { topic_id: role.topic, role: role.role }
                        )
                    }
                }
            }
            console.log(this.selectedRoles);
        },

        roleToChange(e) {
            const idx = this.inSelected(e?.role, e?.topicId)
            
            if (idx === -1) {
                this.selectedRoles.push(
                    { topic_id: e?.topicId, role: e?.role }
                )
            } else {
                this.selectedRoles.splice(idx, 1);
            }

            console.log(this.selectedRoles);
        },

        setTopics() {
            const { success, data } = users.setTopics(
                this.user.id, 
                this.selectedRoles, 
                this.topic_sum
            );

            ElMessage({
                message: 'Сохранено',
                type: 'success',
            });
        }
    },
}
</script>
  