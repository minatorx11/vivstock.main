```vue
<template>
  <div class="mb-10">
    <div class="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible gap-4 pb-4 snap-x overflow-y-hidden snap-mandatory md:snap-none scrollbar-hide sm:justify-center">
      <div 
        v-for="trader in traders" 
        :key="trader.id" 
        class="snap-center md:snap-align-none"
      >
        <div class="w-[270px] bg-transparent md:h-[300px] border border-[#626060] rounded-[20px] p-3 md:p-6 min-w-[250px] md:min-w-[calc(50%-1rem)]">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-16 h-16 rounded-full">
              <img :src="trader.avatar" :alt="trader.id" class="rounded-full" />
            </div>
            <span class="font-semibold text-[12px]">{{ trader.id }}</span>
          </div>

          <div class="flex w-[100%] items-center gap-2 mb-2">
            <span class="text-sm text-gray-400 text-[13px] relative left-[-5px] font-semibold">
              7d copiers profit
            </span>
            <span class="text-white relative left-[35px]">{{ trader.profit }}</span>
          </div>

          <div>
            <div class="text-[26px] font-semibold font-[DMSans] text-white">
              {{ trader.percentage }}
            </div>
            <div class="text-sm text-gray-400">{{ trader.period }}</div>
          </div>
          
          <img :src="trader.img" class="h-[40px] mb-4" />
          
          <a href="https://vivstock-user.vercel.app/">
            <button class="w-[95%] bg-white h-[45px] text-black top-[-35px] font-[Poppins] font-semibold py-3 rounded-[15px] hover:bg-gray-100 transition-colors">
              Copy Trade
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const traders = ref([
  {
    id: "ROSEANOLD-NDDP83",
    avatar: "/eaglelogo.jpg",
    profit: "+$121080.98",
    percentage: "+6175.58%",
    period: "2OD TRV",
    img: "https://vivstock.com/wp-content/uploads/2024/12/Path-4-2.png",
    data: [10, 20, 29, 15, 40, 30, 40]
  },
  {
    id: "DAVIDWILL-NDDP83",
    avatar: "/catlogo.jpg",
    profit: "+$341743.23",
    percentage: "+8613.23%",
    period: "2OD TRV",
    img: "https://vivstock.com/wp-content/uploads/2024/12/Vector-14-1.png",
    data: [10, 20, 29, 15, 40, 30, 40]
  }
])
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
```