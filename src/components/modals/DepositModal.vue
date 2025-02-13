```vue
<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div class="bg-[#1A1A1A] rounded-lg w-full max-w-md p-6 relative">
      <button
        @click="$emit('close')"
        class="absolute right-4 top-4 text-gray-400 hover:text-white"
      >
        <i class="bi-x text-2xl"></i>
      </button>

      <h2 class="text-xl font-bold mb-4">Deposit Funds</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">
            Amount (USD)
          </label>
          <input
            type="number"
            v-model="amount"
            class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2 text-white"
            :placeholder="`Minimum $${MIN_DEPOSIT}`"
            :min="MIN_DEPOSIT"
            required
          />
          <p v-if="amount" class="text-sm text-gray-400 mt-1">
            ≈ ₦{{ (amount * NAIRA_RATE).toLocaleString() }}
          </p>
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-[#7F3DFF] text-white py-2 rounded-lg hover:bg-[#6F2FEF] disabled:opacity-50"
        >
          {{ loading ? 'Processing...' : 'Submit Deposit Request' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../../lib/supabase'
import { toast } from 'vue3-toastify'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])

const NAIRA_RATE = 1600
const MIN_DEPOSIT = 40

const amount = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  const depositAmount = parseFloat(amount.value)
  if (depositAmount < MIN_DEPOSIT) {
    error.value = `Minimum deposit amount is $${MIN_DEPOSIT}`
    loading.value = false
    return
  }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert([{
        user_id: user.id,
        type: 'deposit',
        amount: depositAmount,
        status: 'pending'
      }])

    if (transactionError) throw transactionError

    toast.success('Deposit request submitted')
    emit('success')
    emit('close')
  } catch (err) {
    error.value = err.message
    toast.error('Failed to submit deposit request')
  } finally {
    loading.value = false
  }
}
</script>
```