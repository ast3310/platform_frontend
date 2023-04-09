<template>
    <li class="stages-item"
        :class="{ 
            green: !!agreement.finished_at,
            red: !agreement.finished_at && !isEditable,
            'stages-item-selectble': isEditable
        }" 
        @click="completeAgreement">
        <span class="stages-item--data">{{ agreement.agreement_name }}</span>
        <span class="stages-item--date">{{ formatedFinishDate }}</span>
    </li>
</template>

<script>
import dateTime from '../../utils/dateTime';

import { TASKS_COMPLETE_AGREEMENT } from '../../store/tasks/types.js';

import { ElMessage } from "element-plus";

export default {
    name: 'AgreementItem',

    computed: {
        formatedFinishDate() {
            return dateTime.formatedFinishDate(this.agreement.finished_at);
        },
    },

    methods: {
        async completeAgreement() {
            if (!this.isEditable) return;

            const { success } = await this.$store.dispatch(TASKS_COMPLETE_AGREEMENT, {
                agreement_id: this.agreement.agreement_id,
            });

            if (success) {
                ElMessage({
                    message: 'Cогласование прошло успешно',
                    type: 'success',
                });
            } else {
                ElMessage({
                    message: 'Ошибка подключения или сбой сети',
                    type: 'error',
                });
            }
        }
    },

    props: {
        agreement: {
            type: Object,
            required: true,
        },
        isEditable: {
            type: Boolean,
            required: true,
        }
    }
}
</script>