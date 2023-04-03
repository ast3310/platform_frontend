<template>
    <section class="console">
        <div class="console-header"><button @click="addObject" class="console_button button">Добавить</button><button
                class="console_button button">Отмена</button></div>
        <div class="console-content">
            <form class="controls">
                <div class="console-header">
                    <div class="controls-header"></div>
                    <div class="controls_input__wrapper">
                        <input v-model="name" class="controls_input input" type="text" placeholder="Название" /></div>
                </div>
            </form>
        </div>
    </section>
</template>
    
<script>
export default {
    name: 'NameListConsole',
    data: () => ({
        name: "",
    }),
    methods: {
        addObject() {
            this.$emit('addObject', this.name);
        }
    },
}
</script>