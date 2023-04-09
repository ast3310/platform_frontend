<template>
    <li class="listElem">
        <div class="listElem-content">
            <div class="listElem-param listElem-param1">{{ name }}</div>
            <div :class="['listElem-param', `listElem-param${index + 2}`]" v-for="(item, index) in stages">
                <input type="checkbox" @change="set(item)" :checked="isChecked(item)">
            </div>
        </div>
    </li>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'TopicRoleItem',
    methods: {
        isChecked(stage) {
            return this.topic.some(el => el.role === stage.stage_type);
        },

        set(stage) {
            const data = {
                topicId: this.topic[0].topic,
                role: stage.stage_type,
            }

            this.$emit('roleToChange', data);
        }
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        topic: {
            type: Object,
            required: true,
        },
        stages: {
            type: Array,
            required: true,
        }
    },
}
</script>
  