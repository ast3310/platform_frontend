<template>
  <li class="listElem">
    <div class="listElem-content">
      <div class="listElem-param1">{{ index + 1 }}</div>
      <div class="listElem-param2">{{ task.cipher }}</div>
      <div class="listElem-param3">АО «ГГК» Ф-16</div>
      <div class="listElem-param4">{{ task.address }}</div>
      <div class="listElem-param5">{{ task.cadastral_number }}</div>
      <div class="listElem-param6">
        <span v-if="!!task.design_data" class="listElem_parameters--parameter">ВД – {{ task.design_data.VD }}м</span>
        <span v-if="!!task.design_data" class="listElem_parameters--parameter">НД – {{ task.design_data.ND }}м</span>
        <span v-if="!!task.design_data" class="listElem_parameters--parameter">ПРГ – {{ task.design_data.PRG }}м<sup>3</sup>/ч</span>
        <span v-if="!task.design_data" class="listElem_parameters--parameter">–</span>
      </div>
      <div class="listElem-param7">
        <span class="listElem_price--num">{{ taskCost }}</span>
      </div>
      <div class="listElem-param8 listElem-stage">
        <ul class="listElem-stage-steps">
          <li :class="{ 
            green: isFinished || (index < task.now_stage_type),
            purple: (index === task.now_stage_type),
          }" v-for="index in task.count_state" class="listElem-stage-step"></li>
        </ul>
        <div v-if="!isFinished" class="listElem-stage_name">{{task.now_stage_label}} {{ task.now_stage_type }}/{{ task.count_state }}</div>
        <div v-if="isFinished" class="listElem-stage_name">Завершен</div>
      </div>
      <div class="listElem-param9">
        <div class="listElem_attention">
            <InfoIcon v-show="isCurrentExecutor"/>
        </div>
        <div class="listElem_days"><span class="listElem_days--num">{{ task.date_delta }}</span>Д</div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

import InfoIcon from '../assets/images/svgs/attention.svg';

export default {
  name: 'ProjectItem',
  components: {
    InfoIcon,
  },
  computed: {
        ...mapGetters(['currentUser']),
        isFinished() {
            return this.task.state === "Finished";
        },
        taskCost() {
            if (!this.task.estimation_data) {
              return '-';
            }
            return new Intl.NumberFormat().format(this.task.estimation_data?.cost) + ' ₽'
        },
        isCurrentExecutor() {
            return this.currentUser.id === this.task?.now_stage_executor_id;
        }
    },
  props: {
    task: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    }
  },
}
</script>
