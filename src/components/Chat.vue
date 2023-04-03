<template>
    <section class="chat">
        <div class="chat-window">
            <div class="chat-messages">
                <div class="chat-message" 
                :class="{ 'chat-message_my': currentUser.id == message.user_id }"
                v-for="message in messages">
                    <div class="chat-message__user-image">
                        <img class="chat-message__user-image_i" src="@/assets/images/photo.png" alt="" />
                    </div>
                    <div class="chat-message__content">
                        <div class="chat-message__user">
                            {{ message.user_last_name }} {{ message.user_first_name[0] }}.{{ message.user_middle_name[0] }}
                        </div>
                        <div class="chat-message__text">
                            {{ message.text }}
                        </div>
                    </div>
                </div>
                <Observer v-if="!!nextPage" @intersect="fetchMessages"/>
                <Loader v-if="!!nextPage" />
            </div>
            <div class="chat-input__wrapper"><input ref="chatInput" class="chat-input input" v-model="messageText" type="text" /><button
                    class="chat_button button" @keydown.enter="sendMessage" @click="sendMessage"></button></div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";

import chat from "../api/chat";

import Loader from "./common/Loader.vue";
import Observer from "./common/Observer.vue";

export default {
    name: 'Chat',
    components: {
        Loader,
        Observer
    },
    data: () => ({
        messageText: "",
        messages: [],
        nextPage: null,
        page: 0,
    }),
    computed: {
        ...mapGetters(["currentUser"]),
    },
    methods: {
        async fetchMessages() {
            this.page += 1;

            const { isSuccess, data } = await chat.getMessagesList(this.task.id, this.page);
        
            if (isSuccess === true) {
                this.messages = this.messages = [...this.messages, ...data.results];;
                this.nextPage = data.next;
            }
        },
        sendMessage: function () {
            if (this.messageText === "") return;
            this.connection.send(JSON.stringify({
                message: this.messageText
            }));

            this.messageText = "";
        },

        getMessage(event) {
            let message = JSON.parse(event.data)['message'];
            if (!!this.nextPage) this.messages.pop()
            this.messages = [message, ...this.messages];
        }
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