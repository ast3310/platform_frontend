<template>
    <li class="card">
        <div class="card-main" :class="{ input__error: isAddTask && !isChoosed }">
            <div class="card_name">{{ card.stage_label_ru }}</div>
            <div class="card-content">
                <div class="card_user" @click="unselectUser" v-if="isChoosed || !!setedUser">
                    <div class="card_user_name" :class="{ card_user_name_editable: isEditable }">
                        {{ theselectedUser.last_name }} {{ theselectedUser.first_name[0] }}.{{
                            theselectedUser.middle_name[0] }}
                    </div>
                    <div class="card_user_photo__wrapper"><img class="card_user_photo" src="@/assets/images/photo.png"
                            alt="" />
                    </div>
                </div>
                <ul class="card-list" v-if="!isChoosed && isEditable">
                    <li @click="selectUser" :data-user="index" class="card-list-item" v-for="(user, index) in users">
                        {{ user.last_name }} {{ user.first_name[0] }}.{{ user.middle_name[0] }}
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="hasDate" class="card-footer" 
        :class="{ green: !!finished_at, purple: isNowStage }">
            <div class="card-date">{{ formatedFinishDate }}</div>
            <div class="card-finish" v-if="!!finished_at && !!started_at"><span class="card-finish--data">{{ dateDelta }}</span>&nbsp;Д</div>
        </div>
    </li>
</template>

<script>
import users from '../api/users';
import EventEmitter from '../utils/EventEmitter';

import dateTime from '../utils/dateTime.js';

export default {
    name: 'Card',

    data: () => ({
        isChoosed: false,
        page: 1,
        users: [],

        selectedUser: null,
        isLoaded: true,
        isAddTask: false,
    }),

    async mounted() {
        if (this.isEditable) {
            await this.fetchUsers();
            EventEmitter.$on('addTask', this.checkSelect);
            EventEmitter.$on('taskClearInputs', this.unselectUser);
        }
    },

    computed: {
        theselectedUser() {
            return !!this.selectedUser ? this.selectedUser : this.setedUser;
        },
        formatedFinishDate() {
            return dateTime.formatedFinishDate(this.finished_at);
        },
        dateDelta() {
            return dateTime.dateDaysDelta(this.started_at, this.finished_at);
        },
    },

    methods: {
        async fetchUsers() {
            this.$emit("executorsLoading");
            const { isSuccess, data } = await users.getList({
                page: this.page,
                topic_id: this.topic_id,
                role: this.card.stage_type,
            });

            if (isSuccess === true) this.users = [...this.users, ...data.results];

            this.$emit("executorsLoaded");
        },

        selectUser(e) {
            this.selectedUser = this.users[e.target.dataset.user];
            this.$emit("executorSelect", [this.card.stage_type, this.selectedUser]);
            this.isChoosed = true;
        },
        unselectUser() {
            if (!this.isEditable) {
                return;
            }

            this.selectedUser = null;
            this.$emit("executorUnselect", this.card.stage_type);
            this.isChoosed = false;
            this.isAddTask = false;
        },
        checkSelect() {
            this.isAddTask = true;
        },
    },

    props: {
        card: {
            type: Object,
            required: false,
        },
        topic_id: {
            type: Number,
            required: false,
        },
        setedUser: {
            type: Object,
            required: false,
            default: null,
        },
        started_at: {
            type: String,
            required: false,
        },
        finished_at: {
            type: String,
            required: false,
            default: null,
        },
        isEditable: {
            type: Boolean,
            required: true,
        },
        hasDate: {
            type: Boolean,
            required: true,
        },
        isNowStage: {
            type: Boolean,
            required: false,
        }
    }
}
</script>