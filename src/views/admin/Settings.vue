```vue
<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNav />
    <div class="lg:pl-64 p-6">
      <h1 class="text-2xl font-bold mb-6">Settings</h1>
      
      <div class="max-w-2xl">
        <div class="bg-[#1A1A1A] rounded-lg p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">General Settings</h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">Allow New Signups</h3>
                <p class="text-sm text-gray-400">Enable or disable new user registrations</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  v-model="settings.allowSignups"
                  class="sr-only peer"
                  @change="updateSettings"
                >
                <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7F3DFF]"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">Email Verification</h3>
                <p class="text-sm text-gray-400">Require email verification for new accounts</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  v-model="settings.requireEmailVerification"
                  class="sr-only peer"
                  @change="updateSettings"
                >
                <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7F3DFF]"></div>
              </label>
            </div>
          </div>
        </div>

        <div class="bg-[#1A1A1A] rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Transaction Settings</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">
                Minimum Deposit Amount ($)
              </label>
              <input
                type="number"
                v-model="settings.minDeposit"
                class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                @change="updateSettings"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">
                Minimum Withdrawal Amount ($)
              </label>
              <input
                type="number"
                v-model="settings.minWithdrawal"
                class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                @change="updateSettings"
              >
            </div>
          </div>
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

const settings = ref({
  allowSignups: true,
  requireEmailVerification: false,
  minDeposit: 40,
  minWithdrawal: 10
})

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('auth_settings')
      .select('*')
      .single()

    if (error) throw error
    if (data) {
      settings.value = {
        ...settings.value,
        ...data
      }
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    toast.error('Failed to load settings')
  }
})

const updateSettings = async () => {
  try {
    const { error } = await supabase
      .from('auth_settings')
      .update(settings.value)
      .eq('id', 1)

    if (error) throw error
    toast.success('Settings updated successfully')
  } catch (error) {
    console.error('Error updating settings:', error)
    toast.error('Failed to update settings')
  }
}
</script>
```