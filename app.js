var vm = new Vue(
  {
    el: '#app',
    data: {
      startNewGame: true,
      playerHealth: 100,
      monsterHealth: 100,
      attackLog: []
    },
    methods: {
      startGame() {
        this.monsterHealth = 100;
        this.playerHealth = 100;
        this.startNewGame = false;
        this.attackLog = [];
      },
      giveUp() {
        this.startNewGame = true;
      },
      attack() {
        this.monsterHealth = this.calculateAttack(this.monsterHealth,3,5) ;
        this.playerHealth = this.calculateAttack(this.playerHealth,5,8);
      },
      heal() {
        this.playerHealth += 10;
        if(this.playerHealth >= 100) {
          this.playerHealth = 100;
        }
      },
      specialAttack() {
        this.monsterHealth = this.calculateAttack(this.monsterHealth,6,10) ;
        this.playerHealth = this.calculateAttack(this.playerHealth,5,8);
      },
      calculateAttack(player,min,max) {
        min = Math.floor(min);
        max = Math.floor(max);
        let damage = Math.floor(Math.random()*(max-min)) + min;
        player -= damage;
        if(player <= 0) {
          return 0;
        }
        return player;
      },
      alertBox() {
        if(confirm("NEW GAME?")){
          this.startGame();
        } else {
          this.startNewGame = true;
        }
        
      }
    },
    watch: {
      playerHealth: function(newValue, oldValue) {
        let text = '';
        if(newValue > oldValue) {
          text = "Player heals for " + (newValue-oldValue);
        } else {
          text = "player received damage of " + (oldValue - newValue);
        }
        this.attackLog.unshift({isPlayer:true, text: text});
        if(this.playerHealth == 0) {
          this.alertBox();
        }
      },
      monsterHealth: function(newValue, oldValue) {
        this.attackLog.unshift({isPlayer: false, text: "Monster received damage of " + (oldValue - newValue)});
        if(this.monsterHealth == 0) {
          this.alertBox();
        }
      }
    }
  }
);