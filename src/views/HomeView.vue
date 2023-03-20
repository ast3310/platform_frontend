<template>
  <div>
    <IndexConsole />
    <section class="view">
      <ul class="view-params view-params--projects">
        <li class="view-param">Шифр</li>
        <li class="view-param">Заказчик</li>
        <li class="view-param">Местоположение</li>
        <li class="view-param">Кадастр</li>
        <li class="view-param">Параметры</li>
        <li class="view-param">Сумма</li>
        <li class="view-param">Стадия работы</li>
      </ul>
      <ul class="view-list view-list--projects">
        <ProjectItem/>
      </ul>
    </section>
  </div>
</template>

<script>
import IndexConsole from "../components/consoles/IndexConsole.vue"
import ProjectItem from "../components/ProjectItem.vue"

export default {
  name: 'HomeView',
  components: {
    IndexConsole,
    ProjectItem,
  }
}
</script>
