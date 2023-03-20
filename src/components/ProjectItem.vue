<template>
<li class="listElem">
  <div class="listElem-content">
    <div class="listElem-param1">1</div>
    <div class="listElem-param2">ТП-33/1 31/123-22</div>
    <div class="listElem-param3">АО «ГГК» Ф-16</div>
    <div class="listElem-param4">Краснодарский край, Тимашевский район, п. Заречный, ул. Речная 17</div>
    <div class="listElem-param5">23:43:0310040:225</div>
    <div class="listElem-param6"><span class="listElem_parameters--parameter">ВД – 300м</span><span class="listElem_parameters--parameter">НД – 400м</span><span class="listElem_parameters--parameter">ПРГ - 600м<sup>3</sup>/ч</span></div>
    <div class="listElem-param7"><span class="listElem_price--num">189 000</span>&nbsp;₽</div>
    <div class="listElem-param8 listElem-stage">
      <ul class="listElem-stage-steps">
        <li class="listElem-stage-step green"></li>
        <li class="listElem-stage-step green"></li>
        <li class="listElem-stage-step green"></li>
        <li class="listElem-stage-step green"></li>
        <li class="listElem-stage-step green"></li>
        <li class="listElem-stage-step purple"></li>
        <li class="listElem-stage-step purple"></li>
        <li class="listElem-stage-step"></li>
        <li class="listElem-stage-step"></li>
        <li class="listElem-stage-step"></li>
      </ul>
      <div class="listElem-stage_name">Печать для сдачи 2/8</div>
    </div>
    <div class="listElem-param9">
      <div class="listElem_attention">
        <svg>
          <use xlink:href="../assets/images/svgs/attention.svg"></use>
        </svg>
      </div>
      <div class="listElem_days"><span class="listElem_days--num">30</span>Д</div>
    </div>
  </div>
</li>
</template>

<script>
export default {
  name: 'ProjectItem',
}
</script>
