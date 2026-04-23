<template>
  <div class="tic-tac-toe">
    <div class="top-bar">
      <button @click="$emit('backToLanding')" class="nav-btn">Menu</button>
      <button @click="$emit('openSettings')" class="nav-btn">Settings</button>
    </div>
    <h1>Tic Tac Toe</h1>
    <div class="board">
      <div v-for="(cell, index) in board" :key="index" class="cell" @click="makeMove(index)">
        {{ cell }}
      </div>
    </div>
    <div v-if="winner" class="message">
      Winner: {{ winner }}
    </div>
    <div v-else-if="isDraw" class="message">
      It's a draw!
    </div>
    <button @click="resetGame" class="reset-btn">Reset Game</button>
  </div>
</template>

<script>
export default {
  props: {
    soundEnabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      audioContext: null
    }
  },
  created() {
    if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  methods: {
    makeMove(index) {
      if (this.board[index] || this.winner || this.isDraw) return;
      this.board[index] = this.currentPlayer;
      this.playSound('move');
      this.checkWinner();
      if (!this.winner && !this.isDraw) {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    },
    checkWinner() {
      const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6] // diagonals
      ];
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          this.winner = this.board[a];
          this.playSound('win');
          return;
        }
      }
      if (this.board.every(cell => cell !== null)) {
        this.isDraw = true;
        this.playSound('draw');
      }
    },
    playSound(type) {
      if (!this.soundEnabled || !this.audioContext) return;
      const now = this.audioContext.currentTime;
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      oscillator.connect(gain);
      gain.connect(this.audioContext.destination);

      if (type === 'move') {
        oscillator.frequency.value = 440;
        gain.gain.value = 0.08;
      } else if (type === 'win') {
        oscillator.frequency.value = 660;
        gain.gain.value = 0.12;
      } else if (type === 'draw') {
        oscillator.frequency.value = 220;
        gain.gain.value = 0.08;
      }

      oscillator.type = 'sine';
      oscillator.start(now);
      oscillator.stop(now + 0.08);
    },
    resetGame() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.winner = null;
      this.isDraw = false;
    }
  }
}
</script>

<style scoped>
.tic-tac-toe {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.top-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.nav-btn {
  padding: 10px 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.nav-btn:hover {
  background-color: #1976D2;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  margin: 20px 0;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  font-size: 2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cell:hover {
  background-color: #e0e0e0;
}

.message {
  font-size: 1.5rem;
  margin: 10px 0;
}

.reset-btn {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.reset-btn:hover {
  background-color: #45a049;
}
</style>