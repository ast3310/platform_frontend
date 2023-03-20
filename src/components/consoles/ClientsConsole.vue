<template>
    <section class="console">
        <div class="console-header"><button class="console_button button">Добавить организацию</button><button
                class="console_button button">Отмена</button></div>
        <div class="console-content">
            <form class="controls">
                <div class="console-header">
                    <div class="controls-header"></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" type="text"
                            placeholder="Организация" /></div>
                </div>
            </form>
        </div>
    </section>
</template>
    
<script>
export default {
    name: 'ClientsConsole',
}
</script>