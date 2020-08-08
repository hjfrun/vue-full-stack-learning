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
    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>
    <!-- <m-card icon="cc-menu-circle" title="新闻资讯">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 6" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>停机更新通告</span>
              <span>08/06</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>-->
    <m-card icon="cc-menu-circle" title="英雄列表"></m-card>
    <m-card icon="cc-menu-circle" title="精彩视频"></m-card>
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
      newsCats: [
        {
          name: '热门',
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: '公告',
            title: '8月6日体验服停机更新公告',
            date: '08/06',
          })),
        },
        {
          name: '新闻',
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: '公告',
            title: '8月6日体验服停机更新公告',
            date: '08/06',
          })),
        },
        {
          name: '公告',
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: '公告',
            title: '8月6日体验服停机更新公告',
            date: '08/06',
          })),
        },
        {
          name: '活动',
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: '公告',
            title: '8月6日体验服停机更新公告',
            date: '08/06',
          })),
        },
        {
          name: '赛事',
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: '公告',
            title: '8月6日体验服停机更新公告',
            date: '08/06',
          })),
        },
      ],
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