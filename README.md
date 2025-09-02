# Jeu Chifoumi (Pierre-Papier-Ciseaux)

Un jeu de Pierre-Papier-Ciseaux implémenté en Node.js avec deux joueurs automatiques et un système de statistiques complet.

## Fonctionnalités

### Jeu Principal

- **Deux joueurs automatiques** qui s'affrontent sur 5 rounds
- **Choix aléatoires** pour chaque joueur (pierre, papier, ciseaux)
- **Système de points** : 3 points pour une victoire, 1 point pour une égalité
- **Affichage du gagnant** de la partie avec le score final

### Système de Statistiques

- **Suivi des performances** de chaque joueur
- **Historique complet** de tous les rounds joués
- **Statistiques détaillées** : victoires, défaites, égalités, score total

### Partie Challenge (Optionnelle)

- **Menu interactif** avec readline
- **Visualisation des statistiques** en temps réel
- **Réinitialisation** des résultats pour continuer à jouer
- **Interface utilisateur intuitive**

## Technologies Utilisées

- **Node.js** (version 18+)
- **Module readline** natif pour l'interaction console
- **Programmation orientée objet** avec classes ES6
- **Gestion d'événements** et callbacks

## Installation et Utilisation

### Prérequis

- Node.js version 18.0.0 ou supérieure

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd chifoumi-game

# Installer les dépendances (aucune dépendance externe)
npm install

# Lancer le jeu
npm start
```

### Commandes Disponibles

```bash
npm start      # Lancer le jeu
npm run dev    # Lancer en mode développement avec auto-reload
npm run demo   # Voir une démonstration automatique
```

## Comment Jouer

1. **Lancez le jeu** avec `npm start`
2. **Choisissez une option** dans le menu principal :

   - `1` : Jouer une partie (5 rounds automatiques)
   - `2` : Jouer contre l'IA - Mode Interactif
   - `3` : Voir les statistiques complètes
   - `4` : Voir l'historique des parties
   - `5` : Réinitialiser le jeu
   - `6` : Quitter

3. **Suivez les rounds** qui se jouent automatiquement ou jouez contre l'IA
4. **Consultez les statistiques** pour voir les performances
5. **Relancez le jeu** autant de fois que vous voulez !

## Architecture du Code

### Classes Principales

#### `Player`

- Gestion des statistiques individuelles
- Choix automatique des coups
- Mise à jour des scores

#### `ChifoumiGame`

- Logique principale du jeu
- Gestion des rounds et des résultats
- Historique des parties
- Affichage des informations

### Structure des Fichiers

```
chifoumi-game/
├── index.js          # Fichier principal du jeu
├── demo.js           # Démonstration automatique
├── package.json      # Configuration du projet
└── README.md         # Documentation
```

## Règles du Jeu

- **Pierre** bat **Ciseaux**
- **Ciseaux** bat **Papier**
- **Papier** bat **Pierre**
- **Égalité** si les deux joueurs choisissent la même option

### Système de Points

- **Victoire** : 3 points
- **Égalité** : 1 point
- **Défaite** : 0 point

## Personnalisation

Le jeu est facilement personnalisable :

- **Nombre de rounds** : Modifiez la constante dans `playFullGame()`
- **Noms des joueurs** : Changez les noms dans le constructeur de `ChifoumiGame`
- **Système de points** : Ajustez les valeurs dans `updateStats()`

## Conventions de Code

- **ES6+** avec classes et arrow functions
- **CamelCase** pour les variables et méthodes
- **Commentaires explicatifs** pour chaque fonction
- **Gestion d'erreurs** avec validation des entrées
- **Interface utilisateur** claire et intuitive

## Développement Futur

Possibilités d'extension :

- **Mode multijoueur** avec entrées utilisateur
- **Sauvegarde** des statistiques dans un fichier
- **Interface web** avec Express.js
- **Base de données** pour les statistiques
- **Mode tournoi** avec plusieurs joueurs

## Licence

MIT License - Libre d'utilisation et de modification

---

**Amusez-vous bien avec le jeu Chifoumi !**
