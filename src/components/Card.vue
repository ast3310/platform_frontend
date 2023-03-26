<template>
    <li class="card">
        <div class="card-main">
            <div class="card_name">{{ card.stage_label_ru }}</div>
            <div class="card-content">
                <div class="card-user" v-if="isChoosed">
                    <div class="card-user_name">Иванченко К. Р.</div>
                    <div class="card-user_photo__wrapper"><img class="card-user_photo" src="@/assets/images/photo.png"
                            alt="" />
                    </div>
                </div>
                <ul class="card-list" v-else>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                    <li class="card-list-item">Иванченко К. Р.</li>
                </ul>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'Card',

    data: () => ({
        isChoosed: false,
    }),

    props: {
        card: {
            type: Object,
            required: false,
        },
    }
}
</script>