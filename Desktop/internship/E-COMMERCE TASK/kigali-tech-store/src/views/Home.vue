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
    <section class="bg-gradient-to-r from-primary-DEFAULT via-secondary-DEFAULT to-accent-DEFAULT rounded-lg overflow-hidden mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Kigali Tech Store
          </h1>
          <p class="text-lg text-white/90 mb-6">
            Discover the latest gadgets and electronics at affordable prices. From smartphones to laptops, find everything you need.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/products" class="btn-primary inline-flex items-center justify-center space-x-2">
              <Zap class="w-5 h-5" />
              <span>Shop Now</span>
            </router-link>
            <button class="btn-outline inline-flex items-center justify-center space-x-2">
              <span>Learn More</span>
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="aspect-square bg-white rounded-lg flex items-center justify-center">
            <div class="text-6xl">📱</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          v-for="category in categories"
          :key="category"
          @click="navigateToCategory(category)"
          class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition transform capitalize text-center font-semibold text-gray-800"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <!-- Featured Products -->
    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-900">Featured Products</h2>
        <router-link to="/products" class="text-primary-DEFAULT hover:text-primary-dark font-semibold inline-flex items-center space-x-2">
          <span>View All</span>
          <ChevronRight class="w-5 h-5" />
        </router-link>
      </div>

      <LoadingSpinner v-if="loading" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
        <div class="text-4xl mb-4">🚚</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
        <p class="text-gray-700">Quick and secure delivery to your doorstep in Kigali</p>
      </div>
      <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
        <div class="text-4xl mb-4">💳</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
        <p class="text-gray-700">Safe and encrypted payment options with Stripe</p>
      </div>
      <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
        <div class="text-4xl mb-4">🤝</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
        <p class="text-gray-700">Dedicated support team available to help anytime</p>
      </div>
    </section>
  </div>
</template>
