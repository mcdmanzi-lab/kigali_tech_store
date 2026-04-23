<template>
  <div class="settings-modal" v-if="show">
    <div class="settings-content">
      <h2>Settings</h2>
      <div class="setting">
        <label for="sound-toggle">Sound:</label>
        <input type="checkbox" id="sound-toggle" v-model="soundEnabled" @change="updateSound">
      </div>
      <div class="setting">
        <label for="theme-toggle">Dark Mode:</label>
        <input type="checkbox" id="theme-toggle" v-model="darkMode" @change="updateTheme">
      </div>
      <button @click="closeSettings" class="close-btn">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  data() {
    const savedSound = localStorage.getItem('soundEnabled');
    const savedDark = localStorage.getItem('darkMode');
    return {
      soundEnabled: savedSound !== null ? savedSound === 'true' : true,
      darkMode: savedDark !== null ? savedDark === 'true' : false
    }
  },
  mounted() {
    this.applyTheme();
  },
  methods: {
    updateSound() {
      localStorage.setItem('soundEnabled', this.soundEnabled);
      this.$emit('soundChanged', this.soundEnabled);
    },
    updateTheme() {
      localStorage.setItem('darkMode', this.darkMode);
      this.applyTheme();
      this.$emit('themeChanged', this.darkMode);
    },
    applyTheme() {
      document.body.classList.toggle('dark-mode', this.darkMode);
    },
    closeSettings() {
      this.$emit('closeSettings');
    }
  }
}
</script>

<style>
.settings-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.settings-content.dark {
  background-color: #444;
  color: #f5f5f5;
}

.setting {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

label {
  font-size: 1.2rem;
}

.close-btn {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #d32f2f;
}
</style>