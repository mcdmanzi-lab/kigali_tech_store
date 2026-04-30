<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { ChevronDown, X } from 'lucide-vue-next'
import ProductCard from '../components/ProductCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const route = useRoute()
const productsStore = useProductsStore()

const showFilters = ref(false)
const searchInput = ref('')
const priceMin = ref(0)
const priceMax = ref(1000)
const selectedCategory = ref(null)
const isDesktop = ref(true)

onMounted(async () => {
  // Fetch products if not already fetched
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
    await productsStore.fetchCategories()
  }

  // Handle category from URL
  if (route.params.category) {
    selectedCategory.value = route.params.category
  }

  // Handle search from query
  if (route.query.search) {
    searchInput.value = route.query.search
    productsStore.setSearchQuery(searchInput.value)
  }

  // Initialize desktop responsive state
  if (typeof window !== 'undefined') {
    isDesktop.value = window.innerWidth >= 1024
    window.addEventListener('resize', () => {
      isDesktop.value = window.innerWidth >= 1024
    })
  }
})

const displayedProducts = computed(() => {
  return productsStore.filteredProducts
})

// Performance: only render a subset and allow loading more
const visibleCount = ref(12)
const visibleProducts = computed(() => {
  return displayedProducts.value.slice(0, visibleCount.value)
})

const displayedCount = computed(() => displayedProducts.value.length)

function applyFilters() {
  productsStore.setSearchQuery(searchInput.value)
  productsStore.setPriceRange(priceMin.value, priceMax.value)
  if (selectedCategory.value) {
    productsStore.setCategory(selectedCategory.value)
  }
}

function clearFilters() {
  searchInput.value = ''
  priceMin.value = 0
  priceMax.value = 1000
  selectedCategory.value = null
  productsStore.resetFilters()
}

function updateSearchQuery() {
  productsStore.setSearchQuery(searchInput.value)
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Products</h1>
      <p class="text-gray-600">Showing {{ displayedCount }} products</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar Filters -->
      <div v-if="showFilters || isDesktop" class="lg:col-span-1 mb-8 lg:mb-0">
        <div class="lg:sticky top-24 space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <!-- Search -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-3">Search</label>
            <input
              v-model="searchInput"
              @input="updateSearchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent"
            />
          </div>

          <!-- Categories -->
          <div v-if="productsStore.categories.length > 0">
            <label class="block text-sm font-semibold text-gray-900 mb-3">Category</label>
            <select
              v-model="selectedCategory"
              @change="applyFilters"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent"
            >
              <option :value="null">All Categories</option>
              <option v-for="cat in productsStore.categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <!-- Price Range -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-3">Price Range</label>
            <div class="space-y-2">
              <div>
                <input
                  v-model.number="priceMin"
                  @change="applyFilters"
                  type="range"
                  min="0"
                  max="1000"
                  class="w-full"
                />
                <p class="text-xs text-gray-600 mt-1">Min: ${{ priceMin }}</p>
              </div>
              <div>
                <input
                  v-model.number="priceMax"
                  @change="applyFilters"
                  type="range"
                  min="0"
                  max="1000"
                  class="w-full"
                />
                <p class="text-xs text-gray-600 mt-1">Max: ${{ priceMax }}</p>
              </div>
            </div>
          </div>

          <!-- Clear Filters -->
          <button
            @click="clearFilters"
            class="w-full px-4 py-2 text-sm font-medium text-primary-DEFAULT border border-primary-DEFAULT rounded-lg hover:bg-primary-light transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="lg:col-span-3">
        <!-- Mobile Filter Toggle -->
        <div class="lg:hidden mb-6">
          <button
            @click="showFilters = !showFilters"
            class="flex items-center justify-between w-full px-4 py-3 bg-white shadow-sm border border-gray-200 rounded-xl font-semibold text-gray-800"
          >
            <div class="flex items-center space-x-2">
              <ChevronDown :class="{'rotate-180': showFilters}" class="w-5 h-5 transition-transform" />
              <span>{{ showFilters ? 'Hide Filters' : 'Show Filters' }}</span>
            </div>
            <X v-if="showFilters" class="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <!-- Loading State -->
        <LoadingSpinner v-if="productsStore.loading" />

        <!-- Products Grid -->
        <div v-else-if="displayedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductCard v-for="product in visibleProducts" :key="product.id" :product="product" />
        </div>
        <!-- Load more -->
        <div v-if="visibleCount < displayedCount" class="mt-8 flex justify-center">
          <button @click="visibleCount += 12" class="btn-primary px-6 py-2 text-base">Load more</button>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="text-5xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p class="text-gray-600 mb-6">Try adjusting your filters or search query</p>
          <button
            @click="clearFilters"
            class="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1023px) {
  .lg\:col-span-1,
  .lg\:col-span-3 {
    grid-column: span 1;
  }
}
</style>
