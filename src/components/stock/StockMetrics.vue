```vue
<template>
  <div class="w-full">
    <div class="gap-4">
      <div class="bg-transparent rounded-lg w-full">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="bi-currency-dollar text-[#00B087] text-xl"></i>
            <span class="text-sm">Open price</span>
          </div>
          <span class="font-semibold text-sm">${{ price }}</span>
        </div>
      </div>
      
      <div class="bg-transparent rounded-lg w-full py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="bi-hash text-[#00B087] text-xl"></i>
            <span class="text-sm">Volume (24hrs)</span>
          </div>
          <span class="font-semibold text-sm text-white">0</span>
        </div>
      </div>

      <div class="h-[100px] relative top-[-10px] font-semibold">
        <div class="bg-transparent p-2">
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2 text-white text-sm">
              <i class="bi-clock text-[#00B087]"></i>
              <p>Expire Time</p>
            </span>
            <div class="flex items-center gap-2">
              <select
                disabled
                class="bg-transparent text-white border-none outline-none appearance-none text-sm cursor-not-allowed opacity-75"
              >
                <option value="30">7 Hours</option>
              </select>
              <span class="text-white text-sm">Mins/hrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  price: {
    type: [Number, String],
    required: true
  }
})
</script>
```