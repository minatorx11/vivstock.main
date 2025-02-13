```vue
<template>
  <div>
    <div class="flex w-full mb-5 text-white relative pt-3 items-center">
      <button
        @click="$router.back()"
        class="lg:hidden flex absolute items-center"
      >
        <i class="bi-arrow-left ml-4"></i>
      </button>
      <div class="flex-grow text-center">
        <p class="text-[20px]">
          Refer a Friend to Vivstock and Earn 5% of Their First Deposit!
        </p>
      </div>
    </div>
    <div>
      <p class="text-gray-300 leading-relaxed text-sm sm:text-base">
        Invite friends to join the Vivstock community and earn 5% of what they
        deposit on their first transaction. It's simple—share your unique
        referral link, and when they sign up and deposit, you both benefit!
        Start referring today and grow your earnings while helping others
        discover the world of stock market investing with Vivstock.
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { toast } from 'vue3-toastify'

const authStore = useAuthStore()
const referralLink = ref('')
const referralStats = ref({
  total: 0,
  earnings: 0
})

onMounted(() => {
  if (authStore.user?.user_metadata?.username) {
    referralLink.value = `https://vivstock.com/${authStore.user.user_metadata.username}`
  }else{
    referralLink.value = `https://vivstock.com/user`
  }
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const copyReferralLink = async () => {
  try {
    await navigator.clipboard.writeText(referralLink.value)
    toast.success('Referral link copied to clipboard!')
  } catch (error) {
    toast.error('Failed to copy referral link')
  }
}
</script>
```