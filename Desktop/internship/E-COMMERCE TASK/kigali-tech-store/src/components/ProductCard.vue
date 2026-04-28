<script setup lang="ts">
import { Star, Heart, ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

function addToCart() {
  cartStore.addToCart(props.product)
}

function toggleWishlist() {
  wishlistStore.toggleWishlist(props.product)
}
</script>

<template>
  <div class="card overflow-hidden flex flex-col h-full">
    <!-- Image Container -->
    <div class="relative h-48 bg-gray-100 overflow-hidden group">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <button
        @click="toggleWishlist"
        class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
      >
        <Heart
          :class="['w-5 h-5 transition', isInWishlist ? 'fill-kigali-red text-kigali-red' : 'text-gray-400']"
        />
      </button>
    </div>

    <!-- Product Info -->
    <div class="p-4 flex-grow flex flex-col">
      <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">{{ product.category }}</p>
      
      <h3 class="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 flex-grow">
        {{ product.title }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center space-x-1 mb-3">
        <div class="flex items-center">
          <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </div>
        <span class="text-sm text-gray-600">{{ product.rating?.rate || 4.5 }}</span>
        <span class="text-xs text-gray-500">({{ product.rating?.count || 0 }})</span>
      </div>

      <!-- Price -->
      <div class="mb-4">
        <p class="text-lg font-bold text-primary-DEFAULT">
          RWF {{ Math.round(product.price * 1200).toLocaleString() }}
        </p>
        <p class="text-xs text-gray-500">{{ product.price.toFixed(2) }} USD</p>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="addToCart"
        class="btn-primary w-full flex items-center justify-center space-x-2 text-sm"
      >
        <ShoppingCart class="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
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
