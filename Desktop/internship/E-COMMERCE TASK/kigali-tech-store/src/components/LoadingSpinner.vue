<template>
  <div class="flex items-center justify-center py-12">
    <div class="relative w-12 h-12">
      <div class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
      <div class="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
