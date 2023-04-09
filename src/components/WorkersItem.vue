<template>
    <li class="listElem">
        <div class="listElem-content">
            <div class="listElem-param1">{{ index + 1 }}</div>
            <div class="listElem-param2">{{ worker.last_name }}</div>
            <div class="listElem-param3">{{ worker.first_name }}</div>
            <div class="listElem-param4">{{ worker.middle_name }}</div>
            <div class="listElem-param5">{{ worker.email }}</div>
            <div class="listElem-param6">*******</div>
            <div class="listElem-param7">15.02.1997</div>
            <div class="listElem-param8">Краснодар, ул Тургенева 67</div>
            <div class="listElem-param9 isTrue"></div>
            <div class="listElem-param10"><select class="select" name="">
                    <option value="">Энергоснабжение</option>
                    <option value="">Энергоснабжение</option>
                    <option value="">Энергоснабжение</option>
                </select></div>
            <div class="listElem-param11 isAdmin"></div>
        </div>
    </li>
</template>
  
<script>
import { mapGetters } from "vuex";

export default {
    name: 'WorkersItem',
    props: {
        worker: {
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