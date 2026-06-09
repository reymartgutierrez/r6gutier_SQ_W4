import { scenes } from "./registry.js";

let currentScene = null;
let pathTaken = [];

// Needle positions per scene to create a "spinning dial" effect
const needlePositions = {
  scene_1:  50,
  scene_2a: 72,
  scene_2b: 35,
  scene_3a: 68,
  scene_3b: 62,
  scene_3c: 82,
  scene_3d: 78,
  ending_1: 64,
  ending_2: 48,
  ending_3: 85,
  ending_4: 58,
  ending_5: 88,
  ending_6: 75,
  ending_7: 80,
  ending_8: 55,
};

export function startGame() {
  pathTaken = [];
  loadScene("scene_1");
}

function loadScene(sceneId) {
  currentScene = scenes[sceneId];
  pathTaken.push(sceneId);
  renderScene(currentScene);
}

function renderScene(scene) {
  const titleEl    = document.getElementById("title");
  const textEl     = document.getElementById("story-text");
  const choicesEl  = document.getElementById("choices");
  const pathEl     = document.getElementById("path-tracker");
  const badgeEl    = document.getElementById("ending-badge");
  const gameEl     = document.getElementById("game");
  const needle     = document.getElementById("needle");
  const labelLeft  = document.getElementById("labelLeft");
  const labelRight = document.getElementById("labelRight");
  const clueDisplay = document.getElementById("clueDisplay");
  const clueWord   = document.getElementById("clueWord");

  // Fade out
  gameEl.classList.remove("visible");

  setTimeout(() => {
    // Update content
    titleEl.textContent = scene.title;
    textEl.textContent  = scene.text;
    choicesEl.innerHTML = "";

    // Update spectrum bar labels
    if (scene.spectrum) {
      labelLeft.textContent  = scene.spectrum.left;
      labelRight.textContent = scene.spectrum.right;
    }

    // Update clue chip
    if (scene.clue) {
      clueDisplay.classList.add("visible");
      clueWord.textContent = scene.clue;
    } else {
      clueDisplay.classList.remove("visible");
    }

    // Move needle with a fun spin-then-settle effect
    const pos = needlePositions[scene.id] ?? 50;
    // First spin past, then settle
    needle.style.transition = "left 0.3s ease";
    needle.style.left = `${Math.min(pos + 30, 95)}%`;
    setTimeout(() => {
      needle.style.transition = "left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)";
      needle.style.left = `${pos}%`;
    }, 300);

    // Chapter tracker
    const depth = pathTaken.length;
    const rounds = ["Round 1", "Round 2", "Round 3", "Final Result"];
    if (pathEl) pathEl.textContent = rounds[Math.min(depth - 1, 3)];

    // Ending badge
    if (scene.ending && badgeEl) {
      badgeEl.textContent = scene.endingLabel || "You Are:";
      badgeEl.style.display = "inline-block";
    } else if (badgeEl) {
      badgeEl.style.display = "none";
    }

    // Choices or replay
    if (scene.choices.length === 0) {
      const btn = document.createElement("button");
      btn.className = "choice-btn replay-btn";
      btn.textContent = "↩ Play Again";
      btn.onclick = () => startGame();
      choicesEl.appendChild(btn);
    } else {
      scene.choices.forEach((choice, i) => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = choice.label;
        btn.onclick = () => {
          btn.classList.add("chosen");
          setTimeout(() => loadScene(choice.next), 320);
        };
        choicesEl.appendChild(btn);
      });
    }

    // Fade in
    gameEl.classList.add("visible");
  }, 380);
}
