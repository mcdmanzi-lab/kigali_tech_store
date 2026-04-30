<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { ChevronRight, Zap } from 'lucide-vue-next'
import ProductCard from '../components/ProductCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const router = useRouter()
const productsStore = useProductsStore()

const featuredProducts = ref([])
const categories = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await productsStore.fetchProducts()
  await productsStore.fetchCategories()
  
  // Get featured products (first 6)
  featuredProducts.value = productsStore.products.slice(0, 6)
  categories.value = productsStore.categories.slice(0, 4)
  loading.value = false
})

function navigateToCategory(category) {
  router.push(`/products/category/${category}`)
}
</script>

<template>
  <div>
    <!-- Hero Banner -->
    <section class="bg-gradient-to-r from-primary via-secondary to-accent rounded-xl overflow-hidden mb-12 sm:mb-16 shadow-xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
        <div class="text-center md:text-left">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Welcome to Kigali Tech Store
          </h1>
          <p class="text-lg sm:text-xl text-white/95 mb-8 font-medium">
            Discover the latest gadgets and electronics at affordable prices. From smartphones to laptops, find everything you need.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <router-link to="/products" class="btn-primary inline-flex items-center justify-center space-x-2 text-lg px-6 py-3 shadow-md hover:shadow-lg">
              <Zap class="w-5 h-5" />
              <span>Shop Now</span>
            </router-link>
            <button class="btn-outline inline-flex items-center justify-center space-x-2 text-lg px-6 py-3 bg-white/10 border-white text-white hover:bg-white hover:text-primary transition-colors">
              <span>Learn More</span>
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>
        <div class="hidden md:flex items-center justify-center">
          <div class="aspect-square w-64 h-64 lg:w-80 lg:h-80 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl border border-white/30 transform hover:scale-105 transition-transform duration-500">
            <div class="text-7xl lg:text-9xl drop-shadow-2xl">📱</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="mb-12 sm:mb-16">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center md:text-left">Shop by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <button
          v-for="category in categories"
          :key="category"
          @click="navigateToCategory(category)"
          class="p-4 sm:p-6 bg-white rounded-xl shadow border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 capitalize text-center font-bold text-gray-800 text-sm sm:text-base lg:text-lg"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="mb-12 sm:mb-16">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h2>
        <router-link to="/products" class="text-primary hover:text-primary-dark font-semibold inline-flex items-center space-x-1 sm:space-x-2 bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/20 transition-colors">
          <span>View All</span>
          <ChevronRight class="w-4 h-4 sm:w-5 sm:h-5" />
        </router-link>
      </div>

      <LoadingSpinner v-if="loading" />

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 text-center sm:text-left transform hover:-translate-y-1 transition-transform duration-300 shadow-sm border border-blue-200/50">
        <div class="text-4xl mb-4 inline-block sm:block">🚚</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
        <p class="text-gray-700 leading-relaxed">Quick and secure delivery to your doorstep anywhere in Kigali.</p>
      </div>
      <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 sm:p-8 text-center sm:text-left transform hover:-translate-y-1 transition-transform duration-300 shadow-sm border border-green-200/50">
        <div class="text-4xl mb-4 inline-block sm:block">💳</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Secure Payment</h3>
        <p class="text-gray-700 leading-relaxed">Safe, seamless, and encrypted payment options via Stripe.</p>
      </div>
      <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 sm:p-8 text-center sm:text-left transform hover:-translate-y-1 transition-transform duration-300 shadow-sm border border-yellow-200/50 sm:col-span-2 md:col-span-1">
        <div class="text-4xl mb-4 inline-block sm:block">🤝</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Customer Support</h3>
        <p class="text-gray-700 leading-relaxed">Our dedicated support team is available to help you anytime.</p>
      </div>
    </section>
  </div>
</template>
