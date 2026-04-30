<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useAuthStore } from '../stores/auth'
import { ShoppingCart, Heart, User, LogOut, Menu, X, Search } from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

const isMenuOpen = ref(false)
const searchQuery = ref('')

const cartCount = computed(() => cartStore.cartCount)
const wishlistCount = computed(() => wishlistStore.wishlistCount)
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.user?.name || '')

function handleSearch(e) {
  if (e.key === 'Enter' && searchQuery.value.trim()) {
    router.push(`/products?search=${searchQuery.value}`)
    searchQuery.value = ''
    isMenuOpen.value = false
  }
}

function logout() {
  authStore.logout()
  router.push('/')
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between mb-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
          <span class="text-xl font-bold text-gray-800">Kigali Tech</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link to="/" class="text-gray-600 hover:text-primary transition">Home</router-link>
          <router-link to="/products" class="text-gray-600 hover:text-primary transition">Products</router-link>
          <router-link to="/about" class="text-gray-600 hover:text-primary transition">About</router-link>
          <router-link to="/contact" class="text-gray-600 hover:text-primary transition">Contact</router-link>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search (Desktop) -->
          <div class="hidden lg:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search class="w-4 h-4 text-gray-400 mr-2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              @keyup="handleSearch"
              aria-label="Search products"
              class="bg-transparent text-sm outline-none w-40"
            />
          </div>

          <!-- Cart -->
          <router-link to="/cart" class="relative text-gray-600 hover:text-primary transition" aria-label="View cart">
            <ShoppingCart class="w-6 h-6" />
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-kigali-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartCount }}
            </span>
          </router-link>

          <!-- Wishlist -->
          <router-link to="/wishlist" class="relative text-gray-600 hover:text-primary transition" aria-label="View wishlist">
            <Heart class="w-6 h-6" />
            <span v-if="wishlistCount > 0" class="absolute -top-2 -right-2 bg-kigali-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ wishlistCount }}
            </span>
          </router-link>

          <!-- Auth -->
          <div v-if="isAuthenticated" class="hidden md:flex items-center space-x-3">
            <router-link to="/profile" class="flex items-center space-x-2 text-gray-600 hover:text-primary transition">
              <User class="w-6 h-6" />
              <span class="text-sm">{{ userName }}</span>
            </router-link>
            <button @click="logout" class="text-gray-600 hover:text-kigali-red transition">
              <LogOut class="w-5 h-5" />
            </button>
          </div>

          <div v-else class="hidden md:flex items-center space-x-3">
            <router-link to="/login" class="text-gray-600 hover:text-primary transition">Login</router-link>
            <router-link to="/register" class="btn-primary text-sm">Sign Up</router-link>
          </div>

          <!-- Mobile Menu Toggle -->
          <button @click="toggleMenu" class="md:hidden text-gray-600" :aria-expanded="isMenuOpen.toString()" aria-label="Toggle menu">
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMenuOpen" class="md:hidden border-t pt-4 space-y-4">
        <div class="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search class="w-4 h-4 text-gray-400 mr-2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            @keyup="handleSearch"
            class="bg-transparent text-sm outline-none flex-1"
          />
        </div>
        <nav class="flex flex-col space-y-2">
          <router-link to="/" @click="closeMenu" class="text-gray-600 hover:text-primary transition">Home</router-link>
          <router-link to="/products" @click="closeMenu" class="text-gray-600 hover:text-primary transition">Products</router-link>
          <router-link to="/about" @click="closeMenu" class="text-gray-600 hover:text-primary transition">About</router-link>
          <router-link to="/contact" @click="closeMenu" class="text-gray-600 hover:text-primary transition">Contact</router-link>
        </nav>
        <div v-if="!isAuthenticated" class="flex flex-col space-y-2 pt-4 border-t">
          <router-link to="/login" @click="closeMenu" class="text-gray-600 hover:text-primary transition">Login</router-link>
          <router-link to="/register" @click="closeMenu" class="btn-primary text-center">Sign Up</router-link>
        </div>
        <div v-else class="flex flex-col space-y-2 pt-4 border-t">
          <router-link to="/profile" @click="closeMenu" class="text-gray-600 hover:text-primary transition">My Profile</router-link>
          <button @click="logout" class="text-left text-gray-600 hover:text-kigali-red transition">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Smooth transitions for menu */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
