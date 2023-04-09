<template>
    <section class="work work--agreement">
        <div class="work-window">
            <div class="work-header">
                <p class="work_text">Согласование</p>
            </div>
            <div class="work-main">
                <div class="work-textarea__wrapper">
                    <textarea v-model="description" class="work-textarea input"></textarea>
                </div>
                <div class="work-input__list">
                    <div class="work-input__wrapper">
                        <input v-model="VD" class="work-input input" type="text" placeholder="ВД" />
                        <p class="work_text">м</p>
                    </div>
                    <div class="work-input__wrapper">
                        <input v-model="ND" class="work-input input" type="text" placeholder="НД" />
                        <p class="work_text">м</p>
                    </div>
                    <div class="work-input__wrapper">
                        <input v-model="PRG" class="work-input input" type="text" placeholder="ПРГ" />
                        <p class="work_text">м</p>
                    </div>
                </div>
                <div class="work-agreement-block">
                    <ul class="work-agreement-list">
                        <li class="work-agreement" :class="{ 'work-agreement_selected': item?.isSelected }"
                            v-for="(item, index) in agreements" @click="selectAgreement(index)">
                            {{ item.name }}
                        </li>
                        <Observer v-if="existsNextPage" @intersect="fetchAgreements" />
                        <Loader v-if="existsNextPage" />
                    </ul>
                </div>
            </div>
            <div class="work-footer"><button :disabled="isSaving" @click="saveData" class="work_button button">Сохранить</button></div>
        </div>
    </section>
</template>

<script>
import agreements from "../../api/agreements";

import Observer from "../common/Observer.vue";
import Loader from "../common/Loader.vue";

import { ElMessage } from "element-plus";

import { TASKS_SAVE_DESIGN_DATA } from "../../store/tasks/types.js";

export default {
    name: 'Agreement',
    data: () => ({
        existsNextPage: false,
        isLoading: false,
        isSaving: false,
        agreements: [],
        selectedAgreements: {},
        page: 0,

        VD: "",
        ND: "",
        PRG: "",
        description: "",
    }),

    components: {
        Observer,
        Loader,
    },

    async mounted() {
        await this.fetchAgreements();
    },

    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },

        task() {
            return this.$store.getters.task;
        },

        checkInSelected() {
            return id => this.selectedAgreements.hasOwnProperty(id);
        }
    },

    methods: {
        async fetchAgreements() {
            if (this.page !== 0 && this.isLoading) return;
            this.isLoading = true;
            this.page = this.page + 1;

            const { data, isSuccess } = await agreements.getAgreementsList(this.page);

            if (isSuccess) {
                this.agreements = data.results;
                this.existsNextPage = !!data.next;
            }

            this.updateAgrements();
            this.setDesignData();

            this.isLoading = false;
        },
        setDesignData() {
            if (!!this.task.design_data) {
                this.VD = this.task.design_data.VD;
                this.ND = this.task.design_data.ND;
                this.PRG = this.task.design_data.PRG;

                this.description = this.task.design_data.description;
            }
        },
        selectAgreement(index) {
            const agreement = this.agreements[index];

            if (!this.selectedAgreements.hasOwnProperty(agreement.id)) {
                this.selectedAgreements[agreement.id] = agreement.name;
                this.agreements[index].isSelected = true;
            } else {
                delete this.selectedAgreements[agreement.id];
                this.agreements[index].isSelected = false;
            }
        },

        updateAgrements() {
            if (!!this.task?.agreements) {
                    this.task.agreements.forEach(element => {
                        this.selectedAgreements[element.agreement_id] = element.name;
                        for (let index = 0; index < this.agreements.length; index++) {
                            if (this.agreements[index].id === element.agreement_id) {
                                this.agreements[index].isSelected = true;
                            }
                        }
                    });
                }
        },

        async saveData() {
            if (this.VD !== "" && this.ND !== "" && this.PRG !== "") {
                let agreements = [];
                Object.keys(this.selectedAgreements).forEach(element => {
                    agreements.push({ agreement_id: element })
                });

                this.isSaving = true;

                const { success } = await this.$store.dispatch(
                    TASKS_SAVE_DESIGN_DATA,
                    {
                        VD: this.VD,
                        ND: this.ND,
                        PRG: this.PRG,
                        description: this.description,
                        agreements: agreements,
                    }
                );

                if (success) {
                    ElMessage({
                        message: 'Данные сохранены',
                        type: 'success',
                    });
                } else {
                    ElMessage({
                        message: 'Ошибка подключения или сбой сети',
                        type: 'error',
                    });
                }

                this.isSaving = false;
            } else {
                    ElMessage({
                        message: 'Заполните форму',
                        type: 'error',
                    });
                }
        },
    }

}
</script>