// Creative console start
// ===============================
// 😈 DEVIL'S BARGAIN - Console RPG
// ===============================

console.clear();

const gameState = {
  karma: 50,
  souls: 0,
  wealth: 0,
  power: 0,
  health: 100,
  dealsAccepted: 0,
  dealsRejected: 0,
  consequences: [],
  currentChapter: 0,
  name: "Mortal"
};

const demonArt = `
            ,        ,
           /(        )\`
           \\ \\___   / |
           /- _  \`-/  '
          (/\\/ \\ \\   /\\
          / /   | \`    \\
          O O   ) /    |
          \`-^--'\`<     '
         (_.)  _  )   /
          \`.___/\`    /
            \`-----' /
 <----.     __ / __   \\
 <----|====O)))==)====>
 <----'    \`--' \`--'  /
            |        |
             \\       /
        ______( (_  / \\______
      ,'  ,-----'   |        \\
      \`--{__________)        \\/
`;

const angelArt = `
                  ___
              .-'   \`'.
             /         \\
             |         ;
             |         |
            _|         |_
          .' |         | '.
         /   |         |   \\
        |    |         |    |
        |   .'\\       /'.   |
        |  /   '.___.'   \\  |
         \\/               \\/
          |               |
          '.             .'
            '-.       .-'
               '-----'
`;

const deals = [
  {
    chapter: "The Crossroads",
    intro: "A figure emerges from the shadows at midnight...",
    demonSpeech: "Ah, a lost soul wandering in the dark. I am Malphas, dealer of desires. Everyone has a price... what's yours?",
    choices: [
      {
        text: "💰 'I want unlimited wealth'",
        karmaChange: -15,
        consequence: "Your bank account overflows, but your loved ones grow distant...",
        reward: { wealth: 100 },
        delayed: "In 3 deals, someone close will betray you for your money."
      },
      {
        text: "💪 'I want power over others'",
        karmaChange: -20,
        consequence: "You feel strength surge through you, but your reflection looks... different.",
        reward: { power: 100 },
        delayed: "The power will corrupt your decisions gradually."
      },
      {
        text: "🙏 'I want nothing from you, demon'",
        karmaChange: +10,
        consequence: "The demon smirks. 'Interesting... your soul shines brighter. We'll meet again.'",
        reward: {},
        delayed: "Your resistance has been noted. Future temptations will be harder."
      }
    ]
  },
  {
    chapter: "The Desperate Hour",
    intro: "Weeks later, tragedy strikes. Someone you love falls gravely ill...",
    demonSpeech: "We meet again! Such unfortunate timing... or is it? I can save them, you know. One small favor is all I ask.",
    choices: [
      {
        text: "💀 'Take my years instead of theirs'",
        karmaChange: +5,
        consequence: "Noble... but foolish. You feel decades drain from your life force.",
        reward: { health: -40 },
        delayed: "Your sacrifice will be remembered, but at what cost?"
      },
      {
        text: "👤 'Take someone else's life for theirs'",
        karmaChange: -30,
        consequence: "A stranger collapses somewhere in the world. Your loved one awakens.",
        reward: { souls: -1 },
        delayed: "The guilt will manifest in nightmares."
      },
      {
        text: "🕯️ 'I'll find another way'",
        karmaChange: +15,
        consequence: "The demon vanishes. The path ahead is uncertain but your soul remains intact.",
        reward: {},
        delayed: "Your faith will be tested further."
      }
    ]
  },
  {
    chapter: "The Mirror's Truth",
    intro: "You find an ancient mirror that shows your true self...",
    demonSpeech: "Behold what you've become! Every choice etched into your soul. But I offer you... a clean slate. All memories erased. All guilt forgotten.",
    choices: [
      {
        text: "🪞 'Erase it all. I can't bear to look'",
        karmaChange: -25,
        consequence: "Your past fades... but so does the wisdom you gained from it.",
        reward: { karma: 50 },
        delayed: "Without memories, you're doomed to repeat mistakes."
      },
      {
        text: "⚖️ 'Show me everything. I must face my truth'",
        karmaChange: +20,
        consequence: "The visions are painful, but you emerge stronger, wiser.",
        reward: { power: 20 },
        delayed: "Self-awareness is the first step to redemption."
      },
      {
        text: "🔨 'Shatter the mirror!'",
        karmaChange: 0,
        consequence: "Glass explodes. The demon laughs. 'You can't destroy truth, mortal!'",
        reward: { health: -10 },
        delayed: "The truth will find another way to surface."
      }
    ]
  },
  {
    chapter: "The Final Bargain",
    intro: "The demon appears one last time, more powerful than ever...",
    demonSpeech: "Our dance ends here. I offer you EVERYTHING - wealth, power, eternal life. Your soul is the only currency I accept.",
    choices: [
      {
        text: "🔥 'TAKE IT! Give me everything!'",
        karmaChange: -50,
        consequence: "Unlimited power courses through you... but you feel hollow inside.",
        reward: { wealth: 999, power: 999 },
        delayed: "ENDING: DAMNATION - You got everything, but lost yourself."
      },
      {
        text: "⚔️ 'I challenge you instead!'",
        karmaChange: +10,
        consequence: "The demon's eyes widen. 'Bold! Very well... a game of riddles!'",
        reward: {},
        delayed: "ENDING: THE GAMBLE - Your fate hangs in the balance."
      },
      {
        text: "✨ 'My soul isn't for sale. Begone!'",
        karmaChange: +30,
        consequence: "Light erupts from within you. The demon screams and dissolves.",
        reward: { karma: 100 },
        delayed: "ENDING: REDEMPTION - Your soul shines eternal."
      }
    ]
  }
];

function getKarmaStatus() {
  if (gameState.karma >= 80) return { status: "😇 SAINTLY", color: "#FFD700" };
  if (gameState.karma >= 60) return { status: "😊 VIRTUOUS", color: "#90EE90" };
  if (gameState.karma >= 40) return { status: "😐 NEUTRAL", color: "#FFFFFF" };
  if (gameState.karma >= 20) return { status: "😈 CORRUPTED", color: "#FF6347" };
  return { status: "💀 DAMNED", color: "#8B0000" };
}

function displayKarmaMeter() {
  const karma = gameState.karma;
  const status = getKarmaStatus();
  const filled = Math.floor(karma / 10);
  const empty = 10 - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  
  console.log(`%c
╔════════════════════════════════════╗
║         SOUL STATUS                ║
╠════════════════════════════════════╣
║  Karma: [${bar}] ${karma}/100     
║  Status: ${status.status}                    
║  Deals Accepted: ${gameState.dealsAccepted}                 
║  Deals Rejected: ${gameState.dealsRejected}                 
║  Health: ${gameState.health}%                       
╚════════════════════════════════════╝
  `, `color: ${status.color}; font-size: 12px;`);
}

function showWelcome() {
  console.log(`%c${demonArt}`, "color: #FF4500; font-size: 10px;");
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                                                               ║
  ║        😈  D E V I L ' S   B A R G A I N  😈                 ║
  ║                                                               ║
  ║     "Every soul has a price... what's yours?"                 ║
  ║                                                               ║
  ║        🔥 · 💀 · ⚔️ · 🕯️ · ✨ · 🔥 · 💀 · ⚔️ · 🕯️ · ✨        ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `, "color: #FF4500; font-size: 14px; font-weight: bold;");
  
  console.log("%c🎮 Type bargain() to begin your dark journey...", "color: #FFD700; font-size: 16px;");
  console.log("%c📖 Type rules() to understand the game", "color: #87CEEB; font-size: 14px;");
}

function rules() {
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    📜 RULES OF THE BARGAIN 📜                 ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  🎯 OBJECTIVE:                                                ║
  ║     Navigate through demonic encounters while keeping         ║
  ║     your soul intact. Every choice has consequences.          ║
  ║                                                               ║
  ║  ⚖️ KARMA SYSTEM:                                             ║
  ║     😇 80-100: Saintly    - Path to salvation                 ║
  ║     😊 60-79:  Virtuous   - Good standing                     ║
  ║     😐 40-59:  Neutral    - Balanced soul                     ║
  ║     😈 20-39:  Corrupted  - Darkness creeping in              ║
  ║     💀 0-19:   Damned     - Soul nearly lost                  ║
  ║                                                               ║
  ║  🎭 MULTIPLE ENDINGS:                                         ║
  ║     Your choices determine your fate. There are 3 endings.    ║
  ║                                                               ║
  ║  ⚠️ WARNING:                                                   ║
  ║     Some consequences are delayed. Choose wisely...           ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `, "color: #DDA0DD; font-size: 11px;");
}

function bargain() {
  gameState.currentChapter = 0;
  gameState.karma = 50;
  gameState.consequences = [];
  gameState.dealsAccepted = 0;
  gameState.dealsRejected = 0;
  gameState.health = 100;
  
  const name = prompt("Before we begin... what is your name, mortal?");
  gameState.name = name || "Stranger";
  
  console.clear();
  console.log(`%c${demonArt}`, "color: #FF4500; font-size: 10px;");
  console.log(`%c"Ah, ${gameState.name}... I've been expecting you."`, "color: #FF6347; font-size: 16px; font-style: italic;");
  
  setTimeout(() => {
    playChapter();
  }, 1000);
}

function playChapter() {
  if (gameState.currentChapter >= deals.length) {
    showEnding();
    return;
  }
  
  const chapter = deals[gameState.currentChapter];
  
  console.log(`%c
  ═══════════════════════════════════════════════════════════════
                    📖 Chapter ${gameState.currentChapter + 1}: ${chapter.chapter}
  ═══════════════════════════════════════════════════════════════
  `, "color: #9370DB; font-size: 14px; font-weight: bold;");
  
  console.log(`%c${chapter.intro}`, "color: #B0C4DE; font-size: 14px; font-style: italic;");
  
  setTimeout(() => {
    console.log(`%c😈 Demon: "${chapter.demonSpeech}"`, "color: #FF4500; font-size: 14px;");
    displayKarmaMeter();
    showChoices(chapter.choices);
  }, 1500);
}

function showChoices(choices) {
  console.log("%c\n🎭 Your choices:", "color: #FFD700; font-size: 14px; font-weight: bold;");
  
  choices.forEach((choice, index) => {
    console.log(`%c  [${index + 1}] ${choice.text}`, "color: #FFFFFF; font-size: 13px;");
  });
  
  console.log("%c\n💬 Type choose(1), choose(2), or choose(3)", "color: #87CEEB; font-size: 12px;");
}

function choose(num) {
  const chapter = deals[gameState.currentChapter];
  const choice = chapter.choices[num - 1];
  
  if (!choice) {
    console.log("%c❌ Invalid choice! Pick 1, 2, or 3.", "color: red;");
    return;
  }
  
  console.clear();
  
  // Apply karma change
  gameState.karma = Math.max(0, Math.min(100, gameState.karma + choice.karmaChange));
  
  // Track deals
  if (choice.karmaChange < 0) {
    gameState.dealsAccepted++;
  } else {
    gameState.dealsRejected++;
  }
  
  // Apply rewards
  if (choice.reward) {
    Object.keys(choice.reward).forEach(key => {
      if (gameState[key] !== undefined) {
        gameState[key] += choice.reward[key];
      }
    });
  }
  
  // Store delayed consequence
  if (choice.delayed) {
    gameState.consequences.push(choice.delayed);
  }
  
  // Show result
  console.log(`%c✨ You chose: ${choice.text}`, "color: #FFD700; font-size: 14px;");
  
  setTimeout(() => {
    console.log(`%c\n${choice.consequence}`, "color: #DDA0DD; font-size: 14px; font-style: italic;");
    
    if (choice.karmaChange < 0) {
      console.log(`%c\n💔 Karma: ${choice.karmaChange}`, "color: #FF6347; font-size: 12px;");
    } else if (choice.karmaChange > 0) {
      console.log(`%c\n💖 Karma: +${choice.karmaChange}`, "color: #90EE90; font-size: 12px;");
    }
    
    displayKarmaMeter();
    
    // Check for delayed consequences
    if (gameState.consequences.length > 0 && Math.random() > 0.5) {
      setTimeout(() => {
        const revealed = gameState.consequences.shift();
        console.log(`%c\n⚠️ CONSEQUENCE REVEALED: ${revealed}`, "color: #FF8C00; font-size: 13px; font-weight: bold;");
      }, 1000);
    }
    
    setTimeout(() => {
      gameState.currentChapter++;
      if (gameState.currentChapter < deals.length) {
        console.log("%c\n⏳ Type next() to continue your journey...", "color: #87CEEB; font-size: 14px;");
      } else {
        showEnding();
      }
    }, 2000);
  }, 1000);
}

function next() {
  console.clear();
  playChapter();
}

function showEnding() {
  console.clear();
  const karma = gameState.karma;
  
  let ending, art, color;
  
  if (karma >= 70) {
    ending = {
      title: "✨ REDEMPTION ✨",
      text: `${gameState.name}, your soul blazes with pure light. The demon's hold is broken forever. You walk into eternity, free and unburdened. The heavens welcome you.`,
      subtitle: "You resisted temptation and found salvation."
    };
    art = angelArt;
    color = "#FFD700";
  } else if (karma >= 40) {
    ending = {
      title: "⚖️ PURGATORY ⚖️",
      text: `${gameState.name}, your soul hangs in balance. Neither damned nor saved, you wander the grey realm between worlds. Perhaps in another life, you'll find your way.`,
      subtitle: "Your choices left your fate uncertain."
    };
    art = `
        ⚖️
       /|\\
      / | \\
     😇 | 😈
    `;
    color = "#B0C4DE";
  } else {
    ending = {
      title: "🔥 DAMNATION 🔥",
      text: `${gameState.name}, your soul belongs to the darkness now. The demon claims his prize, and you descend into eternal torment. Was it worth it?`,
      subtitle: "You bargained away your soul."
    };
    art = demonArt;
    color = "#8B0000";
  }
  
  console.log(`%c${art}`, `color: ${color}; font-size: 10px;`);
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                                                               ║
  ║                      ${ending.title}                          
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `, `color: ${color}; font-size: 16px; font-weight: bold;`);
  
  console.log(`%c${ending.text}`, `color: ${color}; font-size: 14px; font-style: italic;`);
  console.log(`%c\n"${ending.subtitle}"`, "color: #808080; font-size: 12px;");
  
  displayKarmaMeter();
  
  // Show all consequences
  if (gameState.consequences.length > 0) {
    console.log("%c\n📜 Unrevealed consequences:", "color: #FF8C00; font-size: 12px;");
    gameState.consequences.forEach(c => {
      console.log(`%c  • ${c}`, "color: #FFA500; font-size: 11px;");
    });
  }
  
  console.log("%c\n🔄 Type bargain() to play again with different choices!", "color: #87CEEB; font-size: 14px;");
}

// Initialize game
showWelcome();

// Creative console end
