const messages = [
  "Are you lost?",
  "You seem to be lost.",
  "You should not be here.",
  "There is nothing here for you.",
  "Turn around.",
  "Wrong turn, perhaps?",
  "They are watching you.",
  "You won't find it here.",
  "What are you searching for?",
  "Someone's keeping tabs.",
  "Look behind you.",
  "There are no secrets left.",
];

document.getElementById("message-404").innerHTML =
  messages[Math.floor(Math.random() * messages.length)];
