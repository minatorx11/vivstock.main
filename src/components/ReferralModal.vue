<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50">
    <div ref="modalRef" class="bg-[#1A1A1A] rounded-[30px] w-[70%] p-6 transform transition-all duration-300 fixed bottom-[18%] max-sm:w-[87%]">
      <div class="mb-6">
        <div class="mb-8">
          <div class="rounded-lg">
            <div class="mb-2 flex items-center justify-center gap-[12px] flex-col">
              <div class="text-[15px] text-white">Commission Balance</div>
              <div class="flex items-center gap-2">
                <span class="text-white font-bold text-2xl">$</span>
                <span class="text-3xl relative left-[-8px] font-bold">
                  {{ showBalance ? "0.00" : "****" }}
                </span>
                <button
                  @click="showBalance = !showBalance"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  <IoEyeOutline v-if="showBalance" size="20" />
                  <IoEyeOffOutline v-else size="20" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-[10px] mb-8">
        <button class="bg-[#000] text-center px-3 py-2 gap-1 h-[40px] rounded-[20px] hover:bg-gray-900 transition-colors flex">
          <img src="" alt="claim" class="w-5 h-5" />
          Claim
        </button>
        <button class="bg-[#000] text-center px-3 py-2 gap-1 h-[40px] rounded-[20px] hover:bg-gray-900 transition-colors flex">
          <img src="" alt="Withdraw" class="w-5 h-5" />
          <p>Withdraw</p>
        </button>
      </div>

      <div
        class="h-[40px] rounded-full bg-[#000] flex items-center gap-[10px] justify-center group cursor-pointer hover:bg-gray-900 transition-colors"
        @click="copyToClipboard"
      >
        <span class="text-sm max-sm:text-[13px]"> https://vivstock.com/user</span>
        <span class="opacity-0 group-hover:opacity-100 transition-opacity">
          <i class="bi bi-chat-dots text-xl"></i>
        </span>
      </div>

      <button
        @click="onClose"
        class="absolute w-[50px] h-[50px] left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center border-[4px] border-[#1A1A1A] bottom-[-25px] transition-colors"
      >

        <i class="bi bi-x-lg  text-xl font-bold"></i>
 
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


import { supabase } from '../lib/supabase'; // Adjust the path as needed


const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
});

const showBalance = ref(true);
const referralLink = ref('');
const modalRef = ref(null);

// Fetch user data and set referral link
const fetchUserData = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.user_metadata?.username) {
    referralLink.value = `https://vivstock.com/${user.user_metadata.username}`;
  }else {
    `https://vivstock.com/user`
  }
};

if (props.isOpen) {
  fetchUserData();
  document.body.style.overflow = 'hidden';
} else {
  document.body.style.overflow = 'unset';
}

// Copy referral link to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(referralLink.value);
    toast.success('Referral link copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy referral link');
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>