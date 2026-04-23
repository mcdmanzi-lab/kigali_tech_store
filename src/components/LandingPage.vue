<template>
  <div class="landing-page">
    <h1>Welcome to Tic Tac Toe</h1>
    <p>Enjoy a classic game of Tic Tac Toe! Click the squares to make your moves and try to get three in a row.</p>
    <button @click="startGame" class="start-btn">Start Game</button>
    <button @click="openSettings" class="settings-btn">Settings</button>
  </div>
</template>

<script>
export default {
  emits: ['startGame', 'openSettings'],
  methods: {
    startGame() {
      this.$emit('startGame');
    },
    openSettings() {
      this.$emit('openSettings');
    }
  }
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  max-width: 600px;
}

.start-btn, .settings-btn {
  padding: 15px 30px;
  font-size: 1.2rem;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-btn {
  background-color: #4CAF50;
  color: white;
}

.start-btn:hover {
  background-color: #45a049;
}

.settings-btn {
  background-color: #2196F3;
  color: white;
}

.settings-btn:hover {
  background-color: #0b7dda;
}
</style>