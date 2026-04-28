<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useOrdersStore } from '../stores/orders'
import { MapPin, CreditCard, ShoppingBag, ChevronLeft } from 'lucide-vue-next'
import ErrorMessage from '../components/ErrorMessage.vue'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const ordersStore = useOrdersStore()

const step = ref(1) // 1: Address, 2: Payment, 3: Review
const loading = ref(false)
const error = ref(null)

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: 'Kigali',
  province: '',
  postalCode: '',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: ''
})

// Cart totals
const subtotal = computed(() => cartStore.subtotal)
const tax = computed(() => cartStore.tax)
const shipping = computed(() => cartStore.SHIPPING)
const total = computed(() => cartStore.total)
const cartItems = computed(() => cartStore.items)

function formatCardNumber(value) {
  return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  return value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').substring(0, 5)
}

function validateStep1() {
  if (!formData.value.firstName || !formData.value.lastName || !formData.value.email) {
    error.value = 'Please fill in all required fields'
    return false
  }
  if (!formData.value.address || !formData.value.city) {
    error.value = 'Please fill in address details'
    return false
  }
  return true
}

function validateStep2() {
  if (!formData.value.cardName || !formData.value.cardNumber || !formData.value.cardCVC) {
    error.value = 'Please fill in all payment details'
    return false
  }
  if (formData.value.cardNumber.replace(/\s/g, '').length !== 16) {
    error.value = 'Please enter a valid card number'
    return false
  }
  if (formData.value.cardCVC.length !== 3) {
    error.value = 'Please enter a valid CVC'
    return false
  }
  return true
}

function nextStep() {
  error.value = null
  
  if (step.value === 1 && validateStep1()) {
    step.value = 2
  } else if (step.value === 2 && validateStep2()) {
    step.value = 3
  }
}

function prevStep() {
  if (step.value > 1) {
    step.value -= 1
  }
}

async function completeOrder() {
  loading.value = true
  error.value = null

  try {
    // Mock payment processing
    const order = ordersStore.createOrder({
      customer: {
        name: `${formData.value.firstName} ${formData.value.lastName}`,
        email: formData.value.email,
        phone: formData.value.phone,
        address: formData.value.address,
        city: formData.value.city
      },
      items: cartItems.value,
      subtotal: subtotal.value,
      tax: tax.value,
      shipping: shipping.value,
      total: total.value,
      paymentMethod: 'card',
      cardLast4: formData.value.cardNumber.slice(-4)
    })

    // Simulate payment processing (2 second delay)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Complete the order
    ordersStore.completeOrder(order.id, `pi_mock_${Date.now()}`)

    // Clear cart
    cartStore.clearCart()

    // Redirect to success page
    router.push(`/order-success/${order.id}`)
  } catch (err) {
    error.value = 'Failed to process order. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto my-8">
    <button @click="() => router.back()" class="flex items-center space-x-2 text-primary-DEFAULT hover:text-primary-dark mb-6">
      <ChevronLeft class="w-5 h-5" />
      <span>Back</span>
    </button>

    <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

    <!-- Step Indicator -->
    <div class="flex justify-between mb-8">
      <div :class="['flex items-center', step >= 1 ? 'text-primary-DEFAULT' : 'text-gray-300']">
        <MapPin class="w-6 h-6 mr-2" />
        <span>Shipping</span>
      </div>
      <div :class="['flex items-center', step >= 2 ? 'text-primary-DEFAULT' : 'text-gray-300']">
        <CreditCard class="w-6 h-6 mr-2" />
        <span>Payment</span>
      </div>
      <div :class="['flex items-center', step >= 3 ? 'text-primary-DEFAULT' : 'text-gray-300']">
        <ShoppingBag class="w-6 h-6 mr-2" />
        <span>Review</span>
      </div>
    </div>

    <!-- Error Message -->
    <ErrorMessage v-if="error" :message="error" @dismiss="error = null" class="mb-6" />

    <!-- Step 1: Shipping Address -->
    <div v-if="step === 1" class="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 class="text-2xl font-bold text-gray-900">Shipping Address</h2>

      <div class="grid grid-cols-2 gap-4">
        <input v-model="formData.firstName" type="text" placeholder="First Name" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent" />
        <input v-model="formData.lastName" type="text" placeholder="Last Name" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent" />
      </div>

      <input v-model="formData.email" type="email" placeholder="Email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent" />
      <input v-model="formData.phone" type="tel" placeholder="Phone Number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent" />
      <input v-model="formData.address" type="text" placeholder="Street Address" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent" />

      <div class="grid grid-cols-2 gap-4">
        <input v-model="formData.city" type="text" placeholder="City" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent" />
        <input v-model="formData.postalCode" type="text" placeholder="Postal Code" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent" />
      </div>

      <div class="flex gap-4 mt-8">
        <router-link to="/cart" class="btn-outline flex-1 text-center">Back to Cart</router-link>
        <button @click="nextStep" class="btn-primary flex-1">Continue to Payment</button>
      </div>
    </div>

    <!-- Step 2: Payment Information -->
    <div v-if="step === 2" class="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 class="text-2xl font-bold text-gray-900">Payment Information</h2>

      <input v-model="formData.cardName" type="text" placeholder="Cardholder Name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent" />

      <input
        v-model="formData.cardNumber"
        type="text"
        placeholder="1234 5678 9012 3456"
        @input="formData.cardNumber = formatCardNumber($event.target.value)"
        maxlength="19"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent"
      />

      <div class="grid grid-cols-2 gap-4">
        <input
          v-model="formData.cardExpiry"
          type="text"
          placeholder="MM/YY"
          @input="formData.cardExpiry = formatExpiry($event.target.value)"
          maxlength="5"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent"
        />
        <input v-model="formData.cardCVC" type="text" placeholder="CVC" maxlength="3" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent" />
      </div>

      <div class="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
        <strong>Demo Mode:</strong> Use test card 4242 4242 4242 4242, any future expiry, and any CVC.
      </div>

      <div class="flex gap-4 mt-8">
        <button @click="prevStep" class="btn-outline flex-1">Back</button>
        <button @click="nextStep" class="btn-primary flex-1">Review Order</button>
      </div>
    </div>

    <!-- Step 3: Review Order -->
    <div v-if="step === 3" class="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 class="text-2xl font-bold text-gray-900">Review Your Order</h2>

      <div class="space-y-3 border-b pb-6">
        <h3 class="font-semibold text-gray-900">Shipping To:</h3>
        <p class="text-gray-700">
          {{ formData.firstName }} {{ formData.lastName }}<br />
          {{ formData.address }}<br />
          {{ formData.city }}, {{ formData.postalCode }}
        </p>
      </div>

      <div class="space-y-3 border-b pb-6">
        <h3 class="font-semibold text-gray-900">Items ({{ cartItems.length }})</h3>
        <div v-for="item in cartItems" :key="item.id" class="flex justify-between text-gray-700">
          <span>{{ item.title.substring(0, 40) }}... x{{ item.quantity }}</span>
          <span>RWF {{ Math.round(item.price * item.quantity * 1200).toLocaleString() }}</span>
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>RWF {{ Math.round(subtotal * 1200).toLocaleString() }}</span>
        </div>
        <div class="flex justify-between">
          <span>Tax</span>
          <span>RWF {{ Math.round(tax * 1200).toLocaleString() }}</span>
        </div>
        <div class="flex justify-between">
          <span>Shipping</span>
          <span>RWF {{ shipping.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between text-xl font-bold border-t pt-2">
          <span>Total</span>
          <span>RWF {{ Math.round(total * 1200).toLocaleString() }}</span>
        </div>
      </div>

      <div class="flex gap-4 mt-8">
        <button @click="prevStep" class="btn-outline flex-1">Back</button>
        <button @click="completeOrder" :disabled="loading" class="btn-primary flex-1">
          {{ loading ? 'Processing...' : 'Complete Order' }}
        </button>
      </div>
    </div>
  </div>
</template>
