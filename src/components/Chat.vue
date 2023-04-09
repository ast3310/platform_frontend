<template>
    <section class="chat">
        <div class="chat-window">
            <div class="chat-messages" ref="messagesList">
                <div v-for="(message, index) in messages">
                    <div v-if="isDiffDays(index)" class="chat-message-date">
                        {{ getFormatDate(message) }}
                    </div>
                    <div class="chat-message" :class="{ 'chat-message_my': currentUser.id == message.user_id }">
                        <div class="chat-message__user-image">
                            <img class="chat-message__user-image_i" src="@/assets/images/photo.png" :alt="currentUser.id" />
                        </div>
                        <div class="chat-message__content">
                            <div class="chat-message__user">
                                {{ message.user_last_name }} {{ message.user_first_name[0] }}.{{ message.user_middle_name[0] }}
                            </div>
                            <div class="chat-message__text">
                                {{ message.text }}
                            </div>
                            <div class="chat-message__time">
                                {{ getFormatTime(message) }}
                            </div>
                        </div>
                    </div>
                </div>
                <Observer v-if="!!nextPage" @intersect="fetchMessages" />
                <Loader v-if="!!nextPage" />
            </div>
            <div class="chat-input__wrapper">
                    <input ref="chatInput" class="chat-input input" v-model="messageText" type="text" />
                    <button class="chat_button button" v-on:keyup.enter="sendMessage"
                    @click="sendMessage">
                        <SendIcon/>
                    </button>
                </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";

import chat from "../api/chat";

import Loader from "./common/Loader.vue";
import Observer from "./common/Observer.vue";

import SendIcon from "../assets/images/svgs/send.svg"

import dateTime from '../utils/dateTime';

export default {
    name: 'Chat',
    components: {
        Loader,
        Observer,
        SendIcon,
    },
    data: () => ({
        messageText: "",
        messages: [],
        nextPage: null,
        isLoading: true,
        page: 0,
    }),
    computed: {
        ...mapGetters(["currentUser"]),
    },
    methods: {
        async fetchMessages() {
            this.page += 1;

            this.isLoading = true;

            const { isSuccess, data } = await chat.getMessagesList(this.task.id, this.page);

            if (isSuccess === true) {
                this.messages = this.messages = [...this.messages, ...data.results];;
                this.nextPage = data.next;
            }

            this.$emit('chatLoaded');

            this.isLoading = false;
        },
        sendMessage: function () {
            if (this.messageText === "") return;
            this.connection.send(JSON.stringify({
                message: this.messageText
            }));

            this.messageText = "";

            this.scrollDown();
        },

        getMessage(event) {
            let message = JSON.parse(event.data)['message'];
            if (!!this.nextPage) this.messages.pop()
            this.messages = [message, ...this.messages];
        },

        isDiffDays(index) {
            if (index + 1 ===  this.messages.length) {
                return true;
            }

            return dateTime.dateDaysDelta(
                this.messages[index + 1].sent_at,
                this.messages[index].sent_at,
            ) >= 1;
        },

        scrollDown() {
            this.$nextTick(() => {
                this.$refs.messagesList.scrollTop = this.$refs.messagesList.scrollHeight;
            });
        },

        getFormatTime(item) {
            return dateTime.getFormatTime(item.sent_at);
        },

        getFormatDate(item) {
            return dateTime.formatedFinishDate(item.sent_at);
        },
    },
    mounted: async function () {

        await this.fetchMessages();

        this.connection = new WebSocket(
            `ws://localhost:8000/ws/chat/${this.task.id}/?token=${this.currentUser.token}`
        )

        this.connection.onmessage = this.getMessage;

        this.connection.onopen = function (event) {
            console.log("Successfully connected to the echo websocket server...")
        }

    },

    props: {
        task: {
            type: Object,
            required: true,
        },
    }
}
</script>