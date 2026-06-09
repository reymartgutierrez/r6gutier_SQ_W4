export const scene = {
  id: "scene_1",
  title: "The Psychic Has Spoken",
  spectrum: { left: "TOTALLY COLD", right: "TOTALLY HOT" },
  clue: "\"Campfire\"",
  text: "The Psychic closes their eyes. The dial spins. When it stops, they flip the card: COLD ←→ HOT. They smile and say one word: \"Campfire.\" The room erupts. Your team huddles. Campfire is warm — but is it HOT hot? Or just... cozy? You feel the answer somewhere between your gut and your memory. Where does the needle land?",
  choices: [
    { label: "Lean HOT — campfire burns, it's intense", next: "scene_2a" },
    { label: "Lean COLD — campfire is comfort, not heat", next: "scene_2b" }
  ]
};
