```vue
<template>
  <div class="px-4 py-6 overflow-x-hidden">
    <WelcomeHeader />
    <TradingCard />
    <div class="flex w-full left-[-5px] justify-start items-center gap-2 sm:gap-1 md:gap-2 mb-9 mt-[14px] relative">
      <button class="bg-[#1E1E1E] text-white py-2 px-4 sm:px-2 rounded-[10px] font-normal h-[30px] w-[95px] text-[12px] flex items-center gap-2 flex-1 sm:flex-none sm:w-auto">
        <img src="" alt="Deposit" class="w-5 h-5" />
        <p>Deposit</p>
      </button>
      <button class="bg-[#1E1E1E] h-[30px] w-[90px] text-white py-2 pl-[5px] sm:px-3 pr-[20px] rounded-[10px] font-normal text-[12px] flex items-center gap-2 flex-1 sm:flex-none sm:w-auto">
        <img src="" alt="Withdraw" class="w-5 h-5" />
        <p>Withdraw</p>
      </button>
      <button class="bg-[#1E1E1E] text-white py-2 px-4 sm:px-2 rounded-[10px] font-normal flex h-[30px] w-[95px] text-[12px] items-center gap-2 flex-1 sm:flex-none sm:w-auto">
        <img src="" alt="Transfer" class="w-5 h-5" />
        <p>Transfer</p>
      </button>
    </div>
    <div class="border-b-[1px] border-[#636262] w-screen relative -left-4 -top-4"></div>
    <ActivityChart />
    <PopularStocks />
    <CopyTrade />
    <Blog />

    <!-- Purple Button -->
    <button
      v-if="showReferralButton && !isModalOpen"
      @click="openModal"
      class="bg-[#7F3DFF] text-white py-3 px-4 rounded-full fixed bottom-[75px] right-4 hover:bg-purple-700 w-[10%] h-[45px] text-2xl flex left-[50%] z-40 items-center justify-center transition-all duration-300 transform hover:scale-105 max-sm:w-[25%] max-sm:left-[38%] max-[620px]:w-[25%]"
    >
      <span class="text-sm font-medium flex gap-[10px] justify-evenly items-center relative left-[-7px]">
        <img
          src=""
          class="w-[38px]"
          alt="Vivstock Logo"
        />
        <svg
          fill="#fff"
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(0)"
          stroke="#fff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
            stroke-width="0.048"
          >
            <path
              fill-rule="evenodd"
              d="M20,22 C18.8954305,22 18,21.1045695 18,20 C18,18.8954305 18.8954305,18 20,18 C21.1045695,18 22,18.8954305 22,20 C22,21.1045695 21.1045695,22 20,22 Z M20,14 C18.8954305,14 18,13.1045695 18,12 C18,10.8954305 18.8954305,10 20,10 C21.1045695,10 22,10.8954305 22,12 C22,13.1045695 21.1045695,14 20,14 Z M20,6 C18.8954305,6 18,5.1045695 18,4 C18,2.8954305 18.8954305,2 20,2 C21.1045695,2 22,2.8954305 22,4 C22,5.1045695 21.1045695,6 20,6 Z M12,22 C10.8954305,22 10,21.1045695 10,20 C10,18.8954305 10.8954305,18 12,18 C13.1045695,18 14,18.8954305 14,20 C14,21.1045695 13.1045695,22 12,22 Z M12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 Z M12,6 C10.8954305,6 10,5.1045695 10,4 C10,2.8954305 10.8954305,2 12,2 C13.1045695,2 14,2.8954305 14,4 C14,5.1045695 13.1045695,6 12,6 Z M4,22 C2.8954305,22 2,21.1045695 2,20 C2,18.8954305 2.8954305,18 4,18 C5.1045695,18 6,18.8954305 6,20 C6,21.1045695 5.1045695,22 4,22 Z M4,14 C2.8954305,14 2,13.1045695 2,12 C2,10.8954305 2.8954305,10 4,10 C5.1045695,10 6,10.8954305 6,12 C6,13.1045695 5.1045695,14 4,14 Z M4,6 C2.8954305,6 2,5.1045695 2,4 C2,2.8954305 2.8954305,2 4,2 C5.1045695,2 6,2.8954305 6,4 C6,5.1045695 5.1045695,6 4,6 Z"
            ></path>
          </g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              d="M20,22 C18.8954305,22 18,21.1045695 18,20 C18,18.8954305 18.8954305,18 20,18 C21.1045695,18 22,18.8954305 22,20 C22,21.1045695 21.1045695,22 20,22 Z M20,14 C18.8954305,14 18,13.1045695 18,12 C18,10.8954305 18.8954305,10 20,10 C21.1045695,10 22,10.8954305 22,12 C22,13.1045695 21.1045695,14 20,14 Z M20,6 C18.8954305,6 18,5.1045695 18,4 C18,2.8954305 18.8954305,2 20,2 C21.1045695,2 22,2.8954305 22,4 C22,5.1045695 21.1045695,6 20,6 Z M12,22 C10.8954305,22 10,21.1045695 10,20 C10,18.8954305 10.8954305,18 12,18 C13.1045695,18 14,18.8954305 14,20 C14,21.1045695 13.1045695,22 12,22 Z M12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 Z M12,6 C10.8954305,6 10,5.1045695 10,4 C10,2.8954305 10.8954305,2 12,2 C13.1045695,2 14,2.8954305 14,4 C14,5.1045695 13.1045695,6 12,6 Z M4,22 C2.8954305,22 2,21.1045695 2,20 C2,18.8954305 2.8954305,18 4,18 C5.1045695,18 6,18.8954305 6,20 C6,21.1045695 5.1045695,22 4,22 Z M4,14 C2.8954305,14 2,13.1045695 2,12 C2,10.8954305 2.8954305,10 4,10 C5.1045695,10 6,10.8954305 6,12 C6,13.1045695 5.1045695,14 4,14 Z M4,6 C2.8954305,6 2,5.1045695 2,4 C2,2.8954305 2.8954305,2 4,2 C5.1045695,2 6,2.8954305 6,4 C6,5.1045695 5.1045695,6 4,6 Z"
            ></path>
          </g>
        </svg>
      </span>
    </button>

    <!-- Referral Modal -->
    <ReferralModal :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import WelcomeHeader from '../components/home/WelcomeHeader.vue'
import TradingCard from '../components/home/TradingCard.vue'
import ActivityChart from '../components/home/ActivityChart.vue'
import PopularStocks from '../components/market/PopularStocks.vue'
import CopyTrade from '../components/home/CopyTrade.vue'
  import Blog from './Blog.vue'
import ReferralModal from '../components/ReferralModal.vue'

const isModalOpen = ref(false)
const showReferralButton = ref(true)
let timeoutRef = null

const openModal = () => {
  isModalOpen.value = true
  showReferralButton.value = false
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => (showReferralButton.value = true), 300)
}

const handleScroll = () => {
  if (!isModalOpen.value) {
    showReferralButton.value = false
    if (timeoutRef) {
      clearTimeout(timeoutRef)
    }
    timeoutRef = setTimeout(() => {
      showReferralButton.value = true
    }, 200)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (timeoutRef) {
    clearTimeout(timeoutRef)
  }
  window.removeEventListener('scroll', handleScroll)
})
</script>
```