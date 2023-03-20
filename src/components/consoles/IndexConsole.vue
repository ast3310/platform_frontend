<template>
    <section class="console">
        <div class="console-header"><button class="console_button button">Добавить объект</button><button
                class="console_button button">Отмена</button></div>
        <div class="console-content">
            <form class="controls">
                <div class="console-header">
                    <select class="controls_client select" name="client_name">
                        <option value="Дима Inc.">Дима Inc.</option>
                        <option value="Дима Inc.">Дима Inc.asdf</option>
                        <option value="Дима Inc.">Дима Inc.wefewfewf</option>
                        <option value="Дима Inc.">Дима Inc.efwef</option>
                    </select>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="number"
                            placeholder="Номер" type="text" /></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="location"
                            placeholder="Местоположение" type="text" /></div>
                    <div class="controls_input__wrapper"><input class="controls_input input" name="cadastre"
                            placeholder="Кадастр" type="text" /></div>

                </div>
                <ul class="card-parentList">
                    <Card 
                        :name="card.name" 
                        :isChoosed="card.isChoosed" 
                        v-for="card in cards"/>
                </ul>
            </form>
        </div>
    </section>
</template>
    
<script>
import Card from "../Card.vue";

export default {
    name: 'IndexConsole',

    components: {
        Card,
    },

    data: () => ({
        cards: [
           {
            isChoosed: true,
            name: "Обследование"
           },
           {
            isChoosed: true,
            name: "Обследование"
           },
           {
            isChoosed: false,
            name: "Обследование"
           },
           {
            isChoosed: true,
            name: "Обследование"
           },
           {
            isChoosed: true,
            name: "Обследование"
           },
           {
            isChoosed: false,
            name: "Обследование"
           },
           {
            isChoosed: true,
            name: "Обследование"
           },
           {
            isChoosed: true,
            name: "Обследование"
           },
           {
            isChoosed: false,
            name: "Обследование"
           },
           {
            isChoosed: true,
            name: "Обследование"
           },
        ]
    }),

}
</script>