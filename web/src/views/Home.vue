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
    <!-- enf of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-2" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons  -->
    <!-- 新闻资讯 -->
    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          class="py-2 fs-lg d-flex"
          :to="`/articles/${news._id}`"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- 英雄列表 -->
    <m-list-card icon="hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%;"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    },
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home',
        },
      },
      newsCats: [],
      heroCats: [],
    }
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroesCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    },
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroesCats()
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

.nav-icons {
  border-top: 0.0769rem solid $border-color;
  border-bottom: 0.0769rem solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 0.0769rem solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>