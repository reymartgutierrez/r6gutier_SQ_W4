export const scene = {
  id: "scene_2a",
  title: "Leaning Hot",
  spectrum: { left: "SAFE", right: "DANGEROUS" },
  clue: "\"Jaywalking\"",
  text: "You nudge the dial toward HOT. The Psychic opens their eyes and nods — you're close, but the bullseye is just slightly cooler than you landed. 3 points. Not bad. Now it's your turn to be the Psychic. The new card appears: SAFE ←→ DANGEROUS. You spin the dial in secret and peek. The target is just barely on the dangerous side. You think of a clue. Something that sounds risky but... isn't really.",
  choices: [
    { label: "Say \"Jaywalking\" — technically illegal, pretty harmless", next: "scene_3a" },
    { label: "Say \"Skydiving\" — sounds wild but controlled by experts", next: "scene_3b" }
  ]
};
