<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
#app {
  background-color: #f9fafb;
}
</style
