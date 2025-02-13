```vue
<template>
  <div class="mb-8">
    <h3 class="text-xl font-semibold mb-4">Popular Stocks</h3>
    <div class="relative">
      <swiper
        :modules="[Autoplay, EffectCoverflow]"
        :slides-per-view="1"
        :space-between="30"
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :coverflowEffect="{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }"
        :breakpoints="{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }
        }"
        :loop="true"
        class="mySwiper"
      >
        <swiper-slide v-for="stock in stocks" :key="stock.symbol">
          <div 
            class="bg-[#1A1A1A] p-[10px] rounded-lg cursor-pointer transform transition-all duration-300 hover:bg-[#242424]"
            @click="$router.push(`/trade/${stock.symbol}`)"
          >
            <div class="flex items-center gap-4 mb-4">
              <img :src="stock.logo" :alt="stock.name" class="w-[32px] h-[32px] rounded-lg" />
              <div>
                <h4 class="font-semibold text-[15px]">{{ stock.symbol }}</h4>
                <p class="text-sm text-gray-400">{{ stock.name }}</p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <p class="font-semibold text-lg relative -top-[60px] left-[250px]">{{ formatPrice(stock.price, stock.isUSD) }}</p>
              <span :class="[
                'text-sm w-[60px] rounded-full text-center font-medium relative -top-[30px] left-[-15px]',
                getRandomTrend() ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              ]">
                {{ getRandomPercentage() }}%
              </span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { stockData } from '../../data/stockData'

const stocks = stockData.slice(0, 8) // Show only first 8 stocks

const formatPrice = (price, isUSD) => {
  return isUSD ? `$${price}` : `₦${price}`
}

const getRandomTrend = () => Math.random() > 0.5
const getRandomPercentage = () => (Math.random() * 5 + 1).toFixed(2)
</script>

<style scoped>
.swiper {
  width: 100%;
  padding: 10px 0;
  margin-bottom: 60px;
  margin-top: -20px;
  height: 90px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 90px;
}

:deep(.swiper-slide) {
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 0);
}

:deep(.swiper-slide-active) {
  z-index: 2;
}

:deep(.swiper-slide-shadow-left),
:deep(.swiper-slide-shadow-right) {
  background-image: none;
}
</style>
```