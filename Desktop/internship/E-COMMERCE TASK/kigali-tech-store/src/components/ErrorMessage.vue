<script setup lang="ts">
import { AlertCircle, X } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['dismiss'])
const isVisible = ref(true)

function dismiss() {
  isVisible.value = false
  emit('dismiss')
}
</script>

<template>
  <div v-if="isVisible" class="flex items-start space-x-3 bg-red-50 border border-red-200 rounded-lg p-4">
    <AlertCircle class="w-5 h-5 text-kigali-red flex-shrink-0 mt-0.5" />
    <p class="text-sm text-red-800 flex-grow">{{ message }}</p>
    <button
      v-if="dismissible"
      @click="dismiss"
      class="text-red-600 hover:text-red-800 transition"
    >
      <X class="w-4 h-4" />
    </button>
  </div>
</template>
