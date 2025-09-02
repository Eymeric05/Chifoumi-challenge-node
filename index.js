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

    // Choix aléatoire pour le joueur automatique
    makeChoice() {
        return CHOICES[Math.floor(Math.random() * CHOICES.length)];
    }

    // Mise à jour des statistiques
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

    // Affichage des statistiques du joueur
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

    // Déterminer le gagnant d'un round
    determineWinner(choice1, choice2) {
        if (choice1 === choice2) return 'tie';
        return WINNING_COMBINATIONS[choice1] === choice2 ? 'player1' : 'player2';
    }

    // Jouer un round
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
        
        // Enregistrer l'historique
        this.gameHistory.push({
            round: this.roundsPlayed + 1,
            choice1,
            choice2,
            winner: result
        });
        
        this.roundsPlayed++;
        
        // Afficher le score actuel
        this.displayCurrentScore();
    }

    // Afficher le score actuel
    displayCurrentScore() {
        console.log(`\n--- Score actuel ---`);
        console.log(`   ${this.player1.name}: ${this.player1.score} points`);
        console.log(`   ${this.player2.name}: ${this.player2.score} points`);
    }

    // Afficher le gagnant final
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

    // Afficher l'historique des rounds
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

    // Afficher toutes les statistiques
    displayAllStats() {
        console.log(`\n=== STATISTIQUES COMPLETES ===`);
        this.player1.displayStats();
        this.player2.displayStats();
        console.log(`\nRounds joues au total: ${this.roundsPlayed}`);
        this.displayGameHistory();
    }

    // Réinitialiser le jeu
    resetGame() {
        this.player1 = new Player('Joueur 1');
        this.player2 = new Player('Joueur 2');
        this.roundsPlayed = 0;
        this.gameHistory = [];
        console.log(`\nJeu reinitialise! Toutes les statistiques ont ete effacees.`);
    }
}

// Fonction pour afficher le menu principal
function displayMainMenu() {
    console.log(`\n=== JEU CHIFOUMI ===`);
    console.log(`Commandes disponibles:`);
    console.log(`  jouer auto     - Lancer une partie automatique (2 IA)`);
    console.log(`  jouer          - Jouer contre l'IA`);
    console.log(`  stats          - Voir les statistiques`);
    console.log(`  historique     - Voir l'historique des parties`);
    console.log(`  reset          - Reinitialiser le jeu`);
    console.log(`  quitter        - Quitter le jeu`);
    console.log(`\nTapez votre commande:`);
}

// Fonction pour jouer une partie complète
function playFullGame(game) {
    console.log(`\nDebut d'une nouvelle partie de 5 rounds!`);
    console.log(`Les deux joueurs vont s'affronter automatiquement...`);
    
    let currentRound = 0;
    
    function playNextRound() {
        if (currentRound >= 5) {
            game.displayFinalWinner();
            setTimeout(() => mainMenu(game), 1000);
            return;
        }
        
        currentRound++;
        game.playRound();
        
        // Continuer au round suivant
        if (currentRound < 5) {
            console.log(`\nRound suivant dans 2 secondes...`);
            setTimeout(() => {
                playNextRound();
            }, 2000);
        } else {
            setTimeout(() => {
                game.displayFinalWinner();
                setTimeout(() => mainMenu(game), 1000);
            }, 1000);
        }
    }
    
    // Démarrer le premier round
    playNextRound();
}

// Fonction pour jouer contre l'IA
function playAgainstAI(game) {
    console.log(`\n=== MODE JOUEUR vs IA ===`);
    console.log(`Vous allez affronter l'IA sur 5 rounds!`);
    console.log(`Choisissez: 1 = Pierre, 2 = Papier, 3 = Ciseaux`);
    
    let currentRound = 0;
    
    function playNextRound() {
                 if (currentRound >= 5) {
             game.displayFinalWinner();
             console.log(`\nAppuyez sur Entree pour revenir au menu principal...`);
             rl.question('', () => {
                 mainMenu(game);
             });
             return;
         }
        
        currentRound++;
        console.log(`\n--- Round ${currentRound} ---`);
        console.log(`Choisissez votre coup:`);
        console.log(`1. Pierre`);
        console.log(`2. Papier`);
        console.log(`3. Ciseaux`);
        
        rl.question('Votre choix (1-3) ou "menu" pour revenir au menu: ', (answer) => {
            const input = answer.trim().toLowerCase();
            
            if (input === 'menu') {
                console.log(`\nRetour au menu principal...`);
                mainMenu(game);
                return;
            }
            
            const choice = parseInt(input);
            
            if (choice < 1 || choice > 3 || isNaN(choice)) {
                console.log(`❌ Choix invalide! Veuillez entrer 1, 2, 3 ou "menu"`);
                playNextRound(); // Rejouer le même round
                return;
            }
            
            const playerChoice = CHOICES[choice - 1];
            const aiChoice = game.player2.makeChoice();
            
            console.log(`\nVous choisissez: ${playerChoice}`);
            console.log(`IA choisit: ${aiChoice}`);
            
            // Déterminer le gagnant
            const winner = game.determineWinner(playerChoice, aiChoice);
            
            if (winner === 'tie') {
                console.log(`🤝 EGALITE!`);
                game.player1.updateStats('tie');
                game.player2.updateStats('tie');
                         } else if (winner === 'player1') {
                 console.log(`Vous gagnez ce round!`);
                 game.player1.updateStats('win');
                 game.player2.updateStats('lose');
             } else {
                 console.log(`L'IA gagne ce round!`);
                 game.player1.updateStats('lose');
                 game.player2.updateStats('win');
             }
            
            // Enregistrer l'historique
            game.gameHistory.push({
                round: currentRound,
                choice1: playerChoice,
                choice2: aiChoice,
                winner: winner === 'tie' ? 'tie' : (winner === 'player1' ? 'player1' : 'player2')
            });
            
            game.roundsPlayed++;
            game.displayCurrentScore();
            
            // Continuer au round suivant
            if (currentRound < 5) {
                console.log(`\nAppuyez sur Entree pour continuer ou tapez "menu" pour revenir au menu...`);
                rl.question('', (input) => {
                    if (input.trim().toLowerCase() === 'menu') {
                        console.log(`\nRetour au menu principal...`);
                        mainMenu(game);
                    } else {
                        playNextRound();
                    }
                });
            } else {
                game.displayFinalWinner();
            }
        });
    }
    
    // Démarrer le premier round
    playNextRound();
}

// Fonction principale du menu
function mainMenu(game) {
    displayMainMenu();
    
        rl.question('', (answer) => {
        const command = answer.trim().toLowerCase();
        
        switch (command) {
            case 'jouer auto':
                playFullGame(game);
                break;
                
            case 'jouer':
                playAgainstAI(game);
                break;
                
            case 'stats':
                game.displayAllStats();
                setTimeout(() => mainMenu(game), 1000);
                break;
                
            case 'historique':
                game.displayGameHistory();
                setTimeout(() => mainMenu(game), 1000);
                break;
                
            case 'reset':
                game.resetGame();
                setTimeout(() => mainMenu(game), 1000);
                break;
                
            case 'quitter':
                console.log(`\nMerci d'avoir joue! A bientot!`);
                rl.close();
                break;
                
            default:
                console.log(`\nCommande invalide. Tapez "jouer auto", "jouer", "stats", "historique", "reset" ou "quitter"`);
                setTimeout(() => mainMenu(game), 1000);
                break;
        }
    });
}

// Point d'entrée du programme
function main() {
    console.log(`Bienvenue dans le jeu Chifoumi!`);
    console.log(`Pierre, Papier, Ciseaux - Deux joueurs automatiques s'affrontent!`);
    
    const game = new ChifoumiGame();
    
    // Démarrer le menu principal
    mainMenu(game);
}

// Gestion de la fermeture propre
process.on('SIGINT', () => {
    console.log(`\n\nAu revoir!`);
    process.exit(0);
});

// Lancer le jeu
main();
