<template>
<header class="header">
  <div class="header-container container">
    <div class="logo__wrapper"><img class="logo" src="@/assets/images/logo.svg" alt="Типография 'Запад'" usemap="#home_link"/></div>
    <nav class="nav">
      <li class="nav-item"><a class="nav-item--link link" href="#">
          <div class="nav-item_image">
            <svg>
              <use xlink:href="require(@/assets/images/sprite.svg#calculation)"></use>
            </svg>
          </div>
          <div class="nav-item_name">Расчёт</div></a></li>
      <li class="nav-item"><a class="nav-item--link link" href="#">
          <div class="nav-item_image">
            <svg>
              <use xlink:href="require(@/assets/images/sprite.svg#statistic)"></use>
            </svg>
          </div>
          <div class="nav-item_name">Статистика</div></a></li>
      <li class="nav-item"><a class="nav-item--link link" href="workers.html">
          <div class="nav-item_image">
            <svg>
              <use xlink:href="require(@/assets/images/sprite.svg#workers)"></use>
            </svg>
          </div>
          <div class="nav-item_name">Сотрудники</div></a></li>
      <li class="nav-item"><a class="nav-item--link link" href="clients.html">
          <div class="nav-item_image">
            <svg>
              <use xlink:href="require(@/assets/images/sprite.svg#clients)"></use>
            </svg>
          </div>
          <div class="nav-item_name">Клиенты</div></a></li>
    </nav>
    <div class="user">
      <div class="user_settings"><a class="user-settings--link link" href="#">
          <svg>
            <use xlink:href="require('@/assets/images/sprite.svg#settings')"></use>
          </svg></a></div>
      <div class="user-data">
        <div class="user_photo__wrapper"><img class="user_photo" src="@/assets/images/photo.png" alt="Рнтров И. И."/></div>
        <div class="user_name">Петров И. И.</div>
      </div>
    </div>
  </div>
</header>
</template>

<script>
export default {
  name: 'Header',
}
</script>
