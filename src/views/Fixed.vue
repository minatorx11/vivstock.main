```vue
<template>
  <div class="bg-transparent text-white p-4">
    <div class="flex w-full mb-5 text-white relative items-center">
      <button
        @click="$router.back()"
        class="lg:hidden flex absolute items-center"
      >
        <i class="bi-arrow-left mr-2"></i>
      </button>
      <div class="flex-grow text-center">
        <p class="text-[20px]">Fixed</p>
      </div>
    </div>

    <div>
      <p class="text-[17px]">
        With Vivstock, you have the opportunity to invest your funds in a
        fixed deposit plan, offering a secure way to grow your investment. You
        can choose between two deposit terms: 6 months or 1 year, depending on
        your financial goals.
        <br />
        <br />
        6-Month Fixed Deposit: Opt for a 6-month term, and your funds will be
        locked in for the duration, earning you guaranteed interest. After 6
        months, you can withdraw your principal along with the accumulated
        interest.
        <br />
        <br />
        1-Year Fixed Deposit: For those looking for longer-term growth, the
        1-year fixed deposit option allows you to lock your funds for a full
        year. This term typically offers a higher return, rewarding your
        patience and commitment.
        <br />
        <br />
        At the end of your chosen term, you can easily withdraw both your
        initial deposit and the interest earned, or choose to reinvest your
        funds into another fixed deposit term. Vivstock's fixed deposit option
        ensures stability, predictable returns, and flexibility to match your
        investment preferences.
      </p>
    </div>
    <div class="w-full flex items-center justify-center pt-5 mb-20">
      <button class="text-[18px] rounded-[30px] px-8 py-2 bg-purple-600 text-center">
        Create Fixed
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
```