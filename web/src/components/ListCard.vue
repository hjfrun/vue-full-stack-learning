<template>
  <m-card icon="cc-menu-circle" title="新闻资讯">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{active: activeIndex === i}"
        v-for="(category, i) in categories"
        :key="i"
        @click="activeIndex = i"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>