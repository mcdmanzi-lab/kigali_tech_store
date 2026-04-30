<script setup lang="ts">
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 mt-12">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
            <span class="text-lg font-bold text-white">Kigali Tech Store</span>
          </div>
          <p class="text-sm text-gray-400">
            Your trusted online destination for affordable tech and electronics in Kigali, Rwanda.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/" class="hover:text-primary transition">Home</a></li>
            <li><a href="/products" class="hover:text-primary transition">Products</a></li>
            <li><a href="#" class="hover:text-primary transition">Categories</a></li>
            <li><a href="#" class="hover:text-primary transition">Best Sellers</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="font-semibold text-white mb-4">Support</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-primary transition">Contact Us</a></li>
            <li><a href="#" class="hover:text-primary transition">FAQ</a></li>
            <li><a href="#" class="hover:text-primary transition">Shipping Info</a></li>
            <li><a href="#" class="hover:text-primary transition">Returns</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-semibold text-white mb-4">Contact</h4>
          <div class="space-y-3 text-sm">
            <div class="flex items-center space-x-2">
              <Phone class="w-4 h-4" />
              <span>+250 (0) 123 456 789</span>
            </div>
            <div class="flex items-center space-x-2">
              <Mail class="w-4 h-4" />
              <span>info@kigalitech.com</span>
            </div>
            <div class="flex items-start space-x-2">
              <MapPin class="w-4 h-4 mt-1 flex-shrink-0" />
              <span>Kigali, Rwanda</span>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-8">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <p class="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; 2026 Kigali Tech Store. All rights reserved.
          </p>

          <!-- Social Media -->
          <div class="flex items-center space-x-4">
            <a href="#" class="text-gray-400 hover:text-primary transition">
              <Facebook class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition">
              <Instagram class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition">
              <Linkedin class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #1a1a2e;
  margin-top: 3rem;
}
</style>
