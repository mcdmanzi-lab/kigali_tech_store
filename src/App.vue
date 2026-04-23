<script setup>
import { ref } from 'vue'
import LandingPage from './components/LandingPage.vue'
import TicTacToe from './components/TicTacToe.vue'
import Settings from './components/Settings.vue'

const currentView = ref('landing')
const showSettings = ref(false)
const soundEnabled = ref(localStorage.getItem('soundEnabled') !== 'false') // default true

const startGame = () => {
  currentView.value = 'game'
}

const openSettings = () => {
  showSettings.value = true 
}

const closeSettings = () => {
  showSettings.value = false
}

const soundChanged = (enabled) => {
  soundEnabled.value = enabled
}

const themeChanged = (dark) => {
  // handled in Settings
}
</script>

<template>
  <div id="app">
    <LandingPage v-if="currentView === 'landing'" @startGame="startGame" @openSettings="openSettings" />
    <TicTacToe v-if="currentView === 'game'" :soundEnabled="soundEnabled" @backToLanding="currentView = 'landing'" @openSettings="openSettings" />
    <Settings :show="showSettings" @closeSettings="closeSettings" @soundChanged="soundChanged" @themeChanged="themeChanged" />
  </div>
</template>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

#app {
  min-height: 100vh;
}

/* Light mode */
body {
  background-color: #f5f5f5;
  color: #333;
}

/* Dark mode */
body.dark-mode {
  background-color: #1a1a1a;
  color: #f5f5f5;
}

body.dark-mode .settings-content {
  background-color: #444;
  color: #f5f5f5;
}
</style>
