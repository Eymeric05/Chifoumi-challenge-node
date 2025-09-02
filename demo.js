const readline = require('readline');

// Configuration du readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Constantes du jeu
const CHOICES = ['pierre', 'papier', 'ciseaux'];
const WINNING_COMBINATIONS = {
    'pierre': 'ciseaux',
    'papier': 'pierre',
    'ciseaux': 'papier'
};

// Classe Joueur
class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
    }

    makeChoice() {
        return CHOICES[Math.floor(Math.random() * CHOICES.length)];
    }

    updateStats(result) {
        switch (result) {
            case 'win':
                this.wins++;
                this.score += 3;
                break;
            case 'lose':
                this.losses++;
                break;
            case 'tie':
                this.ties++;
                this.score += 1;
                break;
        }
    }

    displayStats() {
        console.log(`\n=== Statistiques de ${this.name} ===`);
        console.log(`   Victoires: ${this.wins}`);
        console.log(`   Defaites: ${this.losses}`);
        console.log(`   Egalites: ${this.ties}`);
        console.log(`   Score total: ${this.score} points`);
    }
}

// Classe Jeu
class ChifoumiGame {
    constructor() {
        this.player1 = new Player('Joueur 1');
        this.player2 = new Player('Joueur 2');
        this.roundsPlayed = 0;
        this.gameHistory = [];
    }

    determineWinner(choice1, choice2) {
        if (choice1 === choice2) return 'tie';
        return WINNING_COMBINATIONS[choice1] === choice2 ? 'player1' : 'player2';
    }

    playRound() {
        const choice1 = this.player1.makeChoice();
        const choice2 = this.player2.makeChoice();
        
        console.log(`\n--- Round ${this.roundsPlayed + 1} ---`);
        console.log(`   ${this.player1.name} choisit: ${choice1}`);
        console.log(`   ${this.player2.name} choisit: ${choice2}`);
        
        const winner = this.determineWinner(choice1, choice2);
        let result;
        
        if (winner === 'tie') {
            console.log(`   EGALITE!`);
            this.player1.updateStats('tie');
            this.player2.updateStats('tie');
            result = 'tie';
        } else if (winner === 'player1') {
            console.log(`   ${this.player1.name} gagne ce round!`);
            this.player1.updateStats('win');
            this.player2.updateStats('lose');
            result = 'player1';
        } else {
            console.log(`   ${this.player2.name} gagne ce round!`);
            this.player2.updateStats('win');
            this.player1.updateStats('lose');
            result = 'player2';
        }
        
        this.gameHistory.push({
            round: this.roundsPlayed + 1,
            choice1,
            choice2,
            winner: result
        });
        
        this.roundsPlayed++;
        this.displayCurrentScore();
    }

    displayCurrentScore() {
        console.log(`\n--- Score actuel ---`);
        console.log(`   ${this.player1.name}: ${this.player1.score} points`);
        console.log(`   ${this.player2.name}: ${this.player2.score} points`);
    }

    displayFinalWinner() {
        console.log(`\n*** FIN DE LA PARTIE ***`);
        this.displayCurrentScore();
        
        if (this.player1.score > this.player2.score) {
            console.log(`\n${this.player1.name} remporte la partie!`);
        } else if (this.player2.score > this.player1.score) {
            console.log(`\n${this.player2.name} remporte la partie!`);
        } else {
            console.log(`\nMatch nul! Aucun gagnant.`);
        }
        
        console.log(`\nRounds joues: ${this.roundsPlayed}`);
    }

    displayGameHistory() {
        console.log(`\n--- Historique des rounds ---`);
        this.gameHistory.forEach(round => {
            let result;
            if (round.winner === 'tie') {
                result = 'EGALITE';
            } else if (round.winner === 'player1') {
                result = `${this.player1.name} gagne`;
            } else {
                result = `${this.player2.name} gagne`;
            }
            
            console.log(`   Round ${round.round}: ${this.player1.name} (${round.choice1}) vs ${this.player2.name} (${round.choice2}) - ${result}`);
        });
    }

    displayAllStats() {
        console.log(`\n=== STATISTIQUES COMPLETES ===`);
        this.player1.displayStats();
        this.player2.displayStats();
        console.log(`\nRounds joues au total: ${this.roundsPlayed}`);
        this.displayGameHistory();
    }
}

// Fonction pour jouer une partie complète automatiquement
async function playFullGame() {
    console.log(`DEMONSTRATION AUTOMATIQUE DU JEU CHIFOUMI`);
    console.log(`=========================================`);
    console.log(`\nDebut d'une nouvelle partie de 5 rounds!`);
    console.log(`Les deux joueurs vont s'affronter automatiquement...`);
    
    const game = new ChifoumiGame();
    
    for (let i = 0; i < 5; i++) {
        game.playRound();
        
        // Pause entre les rounds
        if (i < 4) {
            console.log(`\nRound suivant dans 2 secondes...`);
            // Pause simple pour la démonstration
            const start = Date.now();
            while (Date.now() - start < 2000) {
                // Attendre 2 secondes
            }
        }
    }
    
    game.displayFinalWinner();
    
    // Afficher les statistiques finales
    setTimeout(() => {
        game.displayAllStats();
        console.log(`\n=== FIN DE LA DEMONSTRATION ===`);
        console.log(`Pour jouer avec le menu interactif, lancez: node index.js`);
        process.exit(0);
    }, 1000);
}

// Lancer la démonstration
playFullGame();
