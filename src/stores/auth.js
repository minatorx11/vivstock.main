import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  async function initializeAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      user.value = session?.user ?? null
      
      supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user ?? null
      })
    } catch (err) {
      console.error('Auth initialization error:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function login(email, password) {
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError
      user.value = data.user
      return data
    } catch (err) {
      error.value = err.message
      toast.error(err.message)
      throw err
    }
  }

  async function signup(email, password, username) {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      })

      if (signUpError) throw signUpError
      return data
    } catch (err) {
      error.value = err.message
      toast.error(err.message)
      throw err
    }
  }

  async function logout() {
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
      user.value = null
    } catch (err) {
      error.value = err.message
      toast.error(err.message)
      throw err
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    initializeAuth,
    login,
    signup,
    logout
  }
})