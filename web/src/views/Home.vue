<template>
  <div>
    <swiper>
      <swiper-slide :options="swiperOption">
        <img class="w-100" src="../assets/images/ec5d03bcf94642594b8f0beb49b5f61c.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/8025f865e900cb0f2acd59e2ad5ff2f2.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/f801359d7c1d8b6fae518a99c59670ec.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home',
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background-color: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, 'info');
    }
  }
}
</style>