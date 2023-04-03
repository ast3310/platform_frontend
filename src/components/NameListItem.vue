<template>
    <li class="listElem client">
    <div class="listElem-content">
        <div class="listElem-param1 client_count">{{ index + 1 }}</div>
        <div class="listElem-param2 client_name">{{ name }}</div>
    </div>
</li>
</template>

<script>
export default {
    name: 'NameListItem',
    props: {
        index: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    }
}
</script>