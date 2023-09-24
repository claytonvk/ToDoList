const musicCheckbox = document.getElementById("musicCheckbox");
const music = document.getElementById("music");

musicCheckbox.addEventListener("change", () => {
  if (musicCheckbox.checked) {
    // If the checkbox is checked, play the music
    music.play();
    if (whiteNoiseCheckbox.checked) {
      music.volume = 0.4;
      whiteNoise.volume = 0.6;
    }
  } else {
    // If the checkbox is unchecked, pause the music
    music.pause();
    whiteNoise.volume = 1;
    // You can also use music.currentTime = 0; to reset the playback position
  }
});

music.addEventListener("ended", () => {
  music.currentTime = 0;
  music.play();
});

const whiteNoiseCheckbox = document.getElementById("whiteNoiseCheckbox");
const whiteNoise = document.getElementById("whiteNoise");

whiteNoiseCheckbox.addEventListener("change", () => {
  if (whiteNoiseCheckbox.checked) {
    // If the checkbox is checked, play the music
    whiteNoise.play();
    if (musicCheckbox.checked) {
      music.volume = 0.4;
      whiteNoise.volume = 0.6;
    }
  } else {
    // If the checkbox is unchecked, pause the music
    whiteNoise.pause();
    music.volume = 1;
    // You can also use music.currentTime = 0; to reset the playback position
  }
});

whiteNoise.addEventListener("ended", () => {
  whiteNoise.currentTime = 0;
  whiteNoise.play();
});

const partyCheckbox = document.getElementById("partyCheckbox");
const party = document.getElementById("party");
const partyText = document.getElementById("partyText");
const colors = ["red", "orange", "yellow", "green", "blue", "purple", "violet"];

partyCheckbox.addEventListener("change", () => {
  if (partyCheckbox.checked) {
    // If the checkbox is checked, play the music
    party.play();
    togglePartyText();
    if (musicCheckbox.checked) {
      music.pause();
    }
    if (whiteNoiseCheckbox.checked) {
      whiteNoise.pause();
    }
    rainbow(true);
  } else {
    party.pause();
    togglePartyText();

    if (whiteNoiseCheckbox.checked) {
      // If the checkbox is checked, play the music
      whiteNoise.play();
    }

    if (musicCheckbox.checked) {
      // If the checkbox is checked, play the music
      music.play();
    }
  }
});

party.addEventListener("ended", () => {
  party.currentTime = 0;
  party.play();
});

async function rainbow(on) {
  while (on) {
    for (const color of colors) {
      if (partyCheckbox.checked) {
        partyText.style.backgroundColor = color;
        await new Promise((resolve) => setTimeout(resolve, 200));
      } else {
        on = false;
      }
    }
  }
}

function togglePartyText() {
  const partyText = document.getElementById("partyText");
  partyText.classList.toggle("visible");
}
