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
        <p class="text-[20px]">Refer 15 Friends, Earn $200!</p>
      </div>
    </div>

    <div>
      <div
      class="bg-[#1E1E1E] text-white py-2 px-4 rounded-[20px] h-[80px] font-semibold flex justify-between gap-[30px] mt-8 -top-[-20px] relative my-[60px] text-center items-center align-middle"
     
    >
      <div class="items-center">
        <span class="font-normal flex flex-col items-center">
          <p>Referal Task</p> 
           <p>
            0/15
          </p>
        </span>
    
      </div>
  <button className="bg-purple-700 text-center  px-3 py-2 gap-1 h-[40px] rounded-[20px] hover:bg-gray-900 transition-colors flex">
            <img src="" alt="claim" className="w-5 h-5" />
            Claim
          </button>
    </div>
    </div>
   <div>
  <div class="space-y-4">
  <h2 class="text-xl font-semibold">How It Works:</h2>
  <ul class="list-disc list-inside space-y-3">
    <li>
      <strong>Share Your Link:</strong> Invite friends using your unique referral link.
    </li>
    <li>
      <strong>They Deposit $200+:</strong> Friends must deposit $200 or more.
    </li>
    <li>
      <strong>Earn $200:</strong> Get $200 for every 15 successful referrals.
    </li>
    <li>
      <strong>Claim Your Reward:</strong> Cash out after completing the task.
    </li>
  </ul>
  <p class="mt-4">
    Start referring now and grow your earnings! <br />
    <em class="text-sm text-gray-500">*Terms apply.</em>
  </p>
</div>
</div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
```