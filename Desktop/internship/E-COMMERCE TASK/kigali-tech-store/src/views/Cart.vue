<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { Trash2, ChevronLeft, ShoppingCart } from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const cartItems = computed(() => cartStore.items)
const isEmpty = computed(() => cartItems.value.length === 0)

const subtotal = computed(() => cartStore.subtotal)
const tax = computed(() => cartStore.tax)
const shipping = computed(() => cartStore.SHIPPING)
const total = computed(() => cartStore.total)

function updateQuantity(productId, newQuantity) {
  cartStore.updateQuantity(productId, newQuantity)
}

function removeItem(productId) {
  cartStore.removeFromCart(productId)
}

function proceedToCheckout() {
  if (authStore.isAuthenticated) {
    router.push('/checkout')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      <p class="text-gray-600 mt-2">{{ cartItems.length }} item(s) in your cart</p>
    </div>

    <div v-if="isEmpty" class="bg-gray-50 rounded-lg p-12 text-center">
      <ShoppingCart class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
      <p class="text-gray-600 mb-6">Add some products to get started</p>
      <router-link to="/products" class="btn-primary">Continue Shopping</router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cartItems" :key="item.id" class="bg-white rounded-lg shadow-sm p-6 flex gap-4">
          <!-- Product Image -->
          <div class="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          </div>

          <!-- Product Info -->
          <div class="flex-grow">
            <h3 class="font-semibold text-gray-900 mb-1">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ item.description }}</p>
            <p class="text-sm font-semibold text-primary-DEFAULT">
              RWF {{ Math.round(item.price * 1200).toLocaleString() }}
            </p>
          </div>

          <!-- Quantity & Remove -->
          <div class="flex flex-col items-end gap-3">
            <div class="flex items-center space-x-2">
              <button
                @click="updateQuantity(item.id, item.quantity - 1)"
                class="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
              >
                −
              </button>
              <span class="w-8 text-center font-semibold">{{ item.quantity }}</span>
              <button
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              @click="removeItem(item.id)"
              class="text-kigali-red hover:text-red-700 transition"
            >
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-4">
          <h3 class="text-lg font-bold text-gray-900">Order Summary</h3>

          <div class="border-t border-b py-4 space-y-3">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>RWF {{ Math.round(subtotal * 1200).toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Tax (18%)</span>
              <span>RWF {{ Math.round(tax * 1200).toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>RWF {{ shipping.toLocaleString() }}</span>
            </div>
          </div>

          <div class="flex justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>RWF {{ Math.round(total * 1200).toLocaleString() }}</span>
          </div>

          <button
            @click="proceedToCheckout"
            class="btn-primary w-full"
          >
            Proceed to Checkout
          </button>

          <router-link to="/products" class="btn-outline w-full text-center">
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
