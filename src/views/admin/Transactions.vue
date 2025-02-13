```vue
<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNav />
    <div class="lg:pl-64 p-6">
      <h1 class="text-2xl font-bold mb-6">Transaction Management</h1>

      <div class="space-y-4">
        <div v-for="transaction in transactions" :key="transaction.id" class="bg-[#1A1A1A] rounded-lg p-4">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-semibold">{{ transaction.profiles?.username }}</h3>
              <p class="text-sm text-gray-400">{{ transaction.profiles?.email }}</p>
              <p class="text-sm text-gray-400">
                {{ new Date(transaction.created_at).toLocaleString() }}
              </p>
            </div>
            <div class="text-right">
              <p class="font-semibold">${{ transaction.amount.toFixed(2) }}</p>
              <p :class="[
                'text-sm',
                transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
              ]">
                {{ transaction.type.toUpperCase() }}
              </p>
              <p :class="[
                'text-sm',
                transaction.status === 'pending' ? 'text-yellow-500' :
                transaction.status === 'approved' ? 'text-green-500' :
                'text-red-500'
              ]">
                {{ transaction.status.toUpperCase() }}
              </p>
            </div>
          </div>

          <div v-if="transaction.status === 'pending'" class="flex gap-2">
            <button
              @click="handleTransaction(transaction.id, 'approved')"
              class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <i class="bi-check"></i>
              Approve
            </button>
            <button
              @click="handleTransaction(transaction.id, 'rejected')"
              class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <i class="bi-x"></i>
              Reject
            </button>
          </div>
        </div>

        <div v-if="transactions.length === 0" class="text-center text-gray-400">
          No transactions found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'
import { toast } from 'vue3-toastify'
import AdminNav from '../../components/admin/AdminNav.vue'

const transactions = ref([])

onMounted(async () => {
  await fetchTransactions()
})

const fetchTransactions = async () => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        profiles:user_id (username, email)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    transactions.value = data || []
  } catch (error) {
    console.error('Error fetching transactions:', error)
    toast.error('Failed to load transactions')
  }
}

const handleTransaction = async (id, status) => {
  try {
    const transaction = transactions.value.find(t => t.id === id)
    
    const { error: updateError } = await supabase
      .from('transactions')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (updateError) throw updateError

    if (status === 'approved') {
      const balanceChange = transaction.type === 'deposit' 
        ? transaction.amount 
        : -transaction.amount

      const { error: balanceError } = await supabase
        .from('profiles')
        .update({ 
          balance: supabase.raw(`balance + ${balanceChange}`)
        })
        .eq('id', transaction.user_id)

      if (balanceError) throw balanceError
    }

    toast.success(`Transaction ${status}`)
    await fetchTransactions()
  } catch (error) {
    console.error('Error processing transaction:', error)
    toast.error('Failed to process transaction')
  }
}
</script>
```