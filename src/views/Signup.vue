<template>
  <div class="min-h-screen flex">
    <div class="hidden md:flex md:w-1/2 bg-app-dark items-center justify-center p-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Welcome to Vivstock
        </h2>
        <p class="text-gray-400">Welcome to Vivstock</p>
        <img
          src=""
          alt="Welcome"
          class="mt-8 max-w-xs mx-auto"
        />
      </div>
    </div>

    <div class="w-full md:w-1/2 bg-white">
      <div class="sticky top-0 left-0 w-full bg-white shadow-md z-50 px-8 py-4">
        <div class="flex flex-col items-start">
          <img 
            src=""
            alt="Vivstock"
            class="w-[60px] h-[60px] object-contain"
          />
          <span class="text-[#7F3DFF] font-semibold text-lg">Vivstock</span>
        </div>
      </div>

      <div class="p-8 flex items-center justify-center">
        <div class="w-full max-w-md">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">Welcome To Vivstock</h2>
          
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ error }}
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-2 text-black">
            <div>
              <label class=" text-sm font-medium flex justify-start text-gray-700 mb-1">Username</label>
              <input
                type="text"
                v-model="formData.username"
                placeholder="Enter username"
                class="w-full p-2 border rounded-[60px]"
                required
              />
            </div>

            <div>
              <label class="flex justify-start  text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                v-model="formData.email"
                placeholder="Enter email"
                class="w-full p-2 border rounded-[60px]"
                required
              />
            </div>

            <div>
              <label class="flex justify-start text-sm font-medium text-gray-700 mb-1">Password</label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="formData.password"
                  placeholder="Create password"
                  class="w-full p-2 border rounded-[60px] pr-10"
                  required
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <i :class="showPassword ? 'IoEyeOffOutline' : 'IoEyeOutline'" class="text-xl"></i>
                </button>
              </div>
            </div>

            <div>
              <button
                type="button"
                @click="showReferral = !showReferral"
                class="text-gray-500 flex items-center gap-2"
              >
                Referral Code 
                <i :class="showReferral ? 'FaChevronUp' : 'FaChevronDown'" class="text-xs"></i>
              </button>
              
              <input
                v-if="showReferral"
                type="text"
                v-model="formData.referral"
                placeholder="Enter referral code"
                class="w-full p-3 border rounded-[60px] mt-2"
              />
            </div>

            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                v-model="isAgreed"
                class="rounded text-[#7F3DFF]"
              />
              <label for="terms" class="text-sm text-gray-700">
                I agree to the <router-link to="/terms" class="text-[#7F3DFF]">Terms of Service</router-link> and
                <router-link to="/privacy" class="text-[#7F3DFF]">Privacy Policy</router-link>
              </label>
            </div>

            <button
              type="submit"
              :disabled="loading || !isAgreed"
              class="w-full bg-[#7F3DFF] text-white p-3 rounded-[60px] disabled:opacity-50"
            >
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Already have an account?
              <router-link to="/login" class="text-[#7F3DFF]">
                Login
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { toast } from 'vue3-toastify'

const router = useRouter()
const authStore = useAuthStore()

const formData = reactive({
  username: '',
  email: '',
  password: '',
  referral: ''
})

const showPassword = ref(false)
const showReferral = ref(false)
const isAgreed = ref(false)
const loading = ref(false)
const error = ref('')

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const validateForm = () => {
  if (!formData.username || !formData.email || !formData.password) {
    error.value = 'All fields are required'
    return false
  }
  if (!isAgreed.value) {
    error.value = 'You must agree to the terms and conditions'
    return false
  }
  if (formData.password.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    loading.value = true
    error.value = ''
    
    await authStore.signup(formData.email, formData.password, formData.username)
    toast.success('Account created successfully!')
    router.push('/login')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>