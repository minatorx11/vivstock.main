```vue
<template>
  <div class="px-4 py-6 w-full">
    <WalletHeader />
    <AssetBalance :amount="balance" :btc-amount="balance * 1000" />
   

    <div class="flex justify-start md:justify-start gap-[16px] top-[-15px] relative bottom-[60px] items-center">
      <button
        @click="isDepositModalOpen = true"
        class="bg-[#1E1E1E] w-[120px] text-white py-2 px-2 rounded-[10px] font-medium flex items-center gap-2"
      >
        <img src="" alt="Deposit" class="w-5 h-5" />
        <p>Deposit</p>
      </button>
      <button
        @click="isWithdrawModalOpen = true"
        class="bg-[#1E1E1E] w-[125px] text-white py-2 px-2 rounded-[10px] flex font-medium gap-[4px] items-center"
      >
        <img src="" alt="Withdraw" class="w-5 h-5" />
        <p>Withdraw</p>
      </button>
      <button
        class="bg-[#1E1E1E] w-[120px] text-white py-2 px-2 rounded-[10px] font-medium flex items-center gap-2"
        @click="$router.push('/history')"
      >
        <img src="" alt="History" class="w-6 h-6" />
        <p>History</p>
      </button>
    </div>

    <div class="border-b-[1px] border-[#636262] w-screen relative mt-[40px] -left-4 top-[-50px]"></div>
    <h1 class="relative bottom-[40px] text-2xl font-bold">Account</h1>

    <div
      class="bg-[#1E1E1E] text-white py-2 px-4 rounded-[20px] h-[80px] font-semibold flex justify-between gap-[30px] mt-8 -top-[60px] relative my-[60px] text-center items-center align-middle"
      @click="$router.push('/fixed')"
    >
      <div class="items-center">
        <span class="opacity-[0.3] font-normal flex items-center">
          <i class="bi-lock text-[#bc14ff] mr-2 text-xl"></i>
          Fixed
        </span>
        <span class="opacity-[0.7] text-white">${{ balance.toFixed(2) }}</span>
      </div>
      <div class="text-center opacity-[0.3]">
        <i class="bi-arrow-right text-xl"></i>
      </div>
    </div>
     <div class="bg-[#1E1E1E] px-4 rounded-[20px] h-[100px] font-semibold flex justify-between gap-[30px] mt-8 -top-[60px] relative my-[60px] items-center" @click="$router.push('/referals')">
       <div class="flex flex-col gap-2">
          <h1 class="relative bottom-0 left-[-15px] top-[-50px] mb-[0px] p-[0px] text-2xl font-bold">Private Commission</h1>
<p class="w-full h-[31px] text-[#DADADA] text-[16px] font-semibold relative -top-[25px]  leading-[1.1]">
  Earn $200 for refering 15 <br> friends .
</p>
    <p class="text-purple-500 relative top-[-25px] pl-[-10px]  "@click="$router.push('/referals')">Refer Now</p>
       </div>
       <img src="" alt="referal " />
</div>
    <h1 class="relative bottom-[90px] text-2xl font-bold">Referral Link</h1>
    <div class="relative bottom-[80px] bg-[#1E1E1E] text-white font-semibold flex rounded-[20px] flex-col gap-[6px] justify-start items-center">
      <div 
        class="rounded-[20px] w-full px-4 h-[80px] py-2 bg-[#000] flex items-center justify-center group cursor-pointer hover:bg-gray-900 transition-colors"
        @click="copyReferralLink"
      >
        <span class="text-sm max-sm:text-[13px]">{{ referralLink }}</span>
        <span class="opacity-0 group-hover:opacity-100 transition-opacity">
          <i class="bi-clipboard text-sm"></i>
        </span>
      </div>
    </div>

    <!-- Modals -->
    <DepositModal
      :is-open="isDepositModalOpen"
      @close="isDepositModalOpen = false"
      @success="handleTransactionSuccess"
    />

    <WithdrawModal
      :is-open="isWithdrawModalOpen"
      @close="isWithdrawModalOpen = false"
      @success="handleTransactionSuccess"
      :balance="balance"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { supabase } from '../lib/supabase'
import { toast } from 'vue3-toastify'
import WalletHeader from '../components/wallet/WalletHeader.vue'
import AssetBalance from '../components/wallet/AssetBalance.vue'
import DepositModal from '../components/modals/DepositModal.vue'
import WithdrawModal from '../components/modals/WithdrawModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const balance = ref(0)
const isDepositModalOpen = ref(false)
const isWithdrawModalOpen = ref(false)
const referralLink = ref('')

onMounted(async () => {
  if (authStore.user?.user_metadata?.username) {
    referralLink.value = `https://vivstock.com/${authStore.user.user_metadata.username}`
  }else{
    referralLink.value = `https://vivstock.com/user`
  }

  // Fetch user balance
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', authStore.user?.id)
    .single()

  if (error) {
    console.error('Error fetching balance:', error)
    // toast.error('Error fetching balance')
  } else {
    balance.value = profile.balance || 0.00
  }
})

const copyReferralLink = async () => {
  try {
    await navigator.clipboard.writeText(referralLink.value)
    toast.success('Referral link copied to clipboard')
  } catch (error) {
    toast.error('Failed to copy referral link')
  }
}

const handleTransactionSuccess = () => {
  // Refresh balance
  onMounted()
}
</script>
```