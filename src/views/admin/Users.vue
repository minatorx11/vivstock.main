```vue
<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNav />
    <div class="lg:pl-64 p-6">
      <div class="mb-8">
        <h1 class="text-2xl font-bold mb-2">Users Management</h1>
        <p class="text-gray-400">Total Users: {{ totalUsers }}</p>
      </div>

      <div class="mb-6">
        <div class="relative">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search users..."
            class="w-full bg-[#1A1A1A] px-4 py-2 pl-10 rounded-lg"
          >
          <i class="bi-search absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full bg-[#1A1A1A] rounded-lg">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="px-6 py-3 text-left">User</th>
              <th class="px-6 py-3 text-left">Email</th>
              <th class="px-6 py-3 text-left">Status</th>
              <th class="px-6 py-3 text-left">Balance</th>
              <th class="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="border-b border-gray-700">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-[#7F3DFF] rounded-full flex items-center justify-center">
                    {{ user.username?.charAt(0).toUpperCase() }}
                  </div>
                  <span>{{ user.username }}</span>
                </div>
              </td>
              <td class="px-6 py-4">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-2 py-1 rounded-full text-sm',
                  user.is_banned 
                    ? 'bg-red-500/20 text-red-500'
                    : 'bg-green-500/20 text-green-500'
                ]">
                  {{ user.is_banned ? 'Banned' : 'Active' }}
                </span>
              </td>
              <td class="px-6 py-4">${{ user.balance?.toFixed(2) }}</td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button
                    v-if="user.is_banned"
                    @click="handleAction(user.id, 'unban')"
                    class="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30"
                    title="Unban User"
                  >
                    <i class="bi-check text-lg"></i>
                  </button>
                  <button
                    v-else
                    @click="handleAction(user.id, 'ban')"
                    class="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30"
                    title="Ban User"
                  >
                    <i class="bi-ban text-lg"></i>
                  </button>
                  <button
                    @click="handleAction(user.id, 'delete')"
                    class="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30"
                    title="Delete User"
                  >
                    <i class="bi-trash text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'
import { toast } from 'vue3-toastify'
import AdminNav from '../../components/admin/AdminNav.vue'

const users = ref([])
const searchTerm = ref('')
const totalUsers = ref(0)

const filteredUsers = computed(() => {
  return users.value.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

onMounted(async () => {
  await fetchUsers()
})

const fetchUsers = async () => {
  try {
    const { data, error, count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact' })

    if (error) throw error
    users.value = data || []
    totalUsers.value = count
  } catch (error) {
    console.error('Error fetching users:', error)
    toast.error('Failed to load users')
  }
}

const handleAction = async (userId, action) => {
  try {
    let updates = {}
    
    switch (action) {
      case 'ban':
        updates = { is_banned: true }
        break
      case 'unban':
        updates = { is_banned: false }
        break
      case 'delete':
        const { error: deleteError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', userId)
        
        if (deleteError) throw deleteError
        toast.success('User deleted successfully')
        await fetchUsers()
        return
    }

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)

    if (error) throw error
    toast.success(`User ${action}ned successfully`)
    await fetchUsers()
  } catch (error) {
    console.error(`Error ${action}ing user:`, error)
    toast.error(`Failed to ${action} user`)
  }
}
</script>
```