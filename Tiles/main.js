let iframeScrabbleBlackout;
let pointCounter;
let pointImage;
let pointRow;
let pointText;
let descriptionText;
let sidebar_open = false;

const sidebarPointDiv = document.createElement('div');
sidebarPointDiv.style.width = '25%';
sidebarPointDiv.style.position = 'absolute';
sidebarPointDiv.style.top = '0';
sidebarPointDiv.style.bottom = '0';
sidebarPointDiv.style.transition = 'right 0.3s ease';
sidebarPointDiv.style.display = 'flex';
sidebarPointDiv.style.flexDirection = 'column';
sidebarPointDiv.style.justifyContent = 'flex-start';
sidebarPointDiv.style.alignItems = 'center';
sidebarPointDiv.style.zIndex = '15';
sidebarPointDiv.style.backgroundColor = '#EFF5FF';
sidebarPointDiv.style.borderRadius = '10px 0 0 10px';
sidebarPointDiv.style.right = "-25%";
const sidebarHeader = document.createElement('p');
sidebarHeader.style.fontSize = '2.0vw';
sidebarHeader.style.fontWeight = 'bold';
sidebarHeader.style.color = '#141134';
sidebarHeader.style.marginBottom = '0.2vw';
sidebarHeader.style.marginTop = '0.2vw';
sidebarHeader.textContent = "Playtest";
sidebarHeader.style.fontFamily = "Roboto Mono";
const sidebarCloseButton = document.createElement('button');
sidebarCloseButton.style.top = '0.5vw';
sidebarCloseButton.style.right = '0.5vw';
sidebarCloseButton.style.margin = '2%';
sidebarCloseButton.style.fontSize = '1vw';
sidebarCloseButton.textContent = "X";
sidebarCloseButton.style.position = 'absolute';
sidebarCloseButton.style.color = '#ffffff';
sidebarCloseButton.style.backgroundColor = '#141134';
sidebarCloseButton.style.cursor = 'pointer';
sidebarCloseButton.style.border = 'none';
sidebarCloseButton.style.borderRadius = '2px';
sidebarCloseButton.style.padding = '.8% 2.2%';
sidebarCloseButton.addEventListener('click', () => {
  toggleSidebar();
});
const sidebarHeroImg = document.createElement('img');
sidebarHeroImg.style.width = '100%';
sidebarHeroImg.src = "./img/sidebar/hero_prize_banner.png";
const sidebarTabsDiv = document.createElement('div');
sidebarTabsDiv.style.width = '100%';
sidebarTabsDiv.style.display = 'flex';
sidebarTabsDiv.style.flexDirection = 'row';
sidebarTabsDiv.style.justifyContent = 'space-around';
const prizesTabButton = document.createElement('button');
prizesTabButton.classList.add("sidebar-tab-button");
prizesTabButton.classList.add("toggled");
prizesTabButton.textContent = "Prizes";
prizesTabButton.addEventListener('click', () => {
  prizesTabButton.style.color = 'white';
  prizesTabButton.style.backgroundColor = '#141134';
  prizesTabButton.style.padding = '1% 2%';
  rankingsTabButton.style.color = '#787878';
  prizesTab.style.display = "flex";
  rankingsTab.style.display = "none";
});
const rankingsTabButton = document.createElement('button');
rankingsTabButton.textContent = "Rankings";
rankingsTabButton.addEventListener('click', () => {
  rankingsTabButton.style.color = 'white';
  rankingsTabButton.style.backgroundColor = '#141134';
  rankingsTabButton.style.padding = '1% 2%';
  prizesTabButton.style.color = '#787878';
  rankingsTab.style.display = "flex";
  prizesTab.style.display = "none";
});
[prizesTabButton, rankingsTabButton].forEach(btn => {
  btn.style.border = 'none';
  btn.style.backgroundColor = 'transparent';
  btn.style.borderRadius = '3px';
  btn.style.fontSize = '1.4vw';
  btn.style.fontFamily = 'Roboto Mono';
  btn.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  btn.addEventListener('mouseover', () => {
    btn.style.cursor = 'pointer';
    btn.style.color = 'white';
    btn.style.backgroundColor = '#141134';
    btn.style.padding = '1% 2%';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.color = '#787878';
    btn.style.backgroundColor = 'transparent';
  });
});
sidebarTabsDiv.appendChild(prizesTabButton);
sidebarTabsDiv.appendChild(rankingsTabButton);

// Building the prize tab
const prizesTab = document.createElement('div');
prizesTab.style.marginTop = '2%';
prizesTab.style.display = "flex";
prizesTab.style.flexDirection = 'column';
prizesTab.style.justifyContent = 'center';
prizesTab.style.alignItems = 'center';
// Building the prize tab components
const prizeHeader = document.createElement('p');
prizeHeader.id = "prize-header";
prizeHeader.classList.add("plain");
prizeHeader.textContent = "The best part of any game: the Loot.";
const prizeHeroContainer = document.createElement('div');
prizeHeroContainer.id = "prize-hero-container";
const prizeHeroImg = document.createElement('img');
prizeHeroImg.id = "prize-hero-img";
prizeHeroImg.src = "./img/sidebar/prize_hero.png";
prizeHeroContainer.appendChild(prizeHeroImg);
const prizeFooter = document.createElement('p');
prizeFooter.id = "prize-footer";
prizeFooter.classList.add("styled");
prizeFooter.textContent = "The Loot!";
const signupCTAText = document.createElement('p');
signupCTAText.id = "signup-cta-text";
signupCTAText.classList.add("videogame");
signupCTAText.textContent = "Sign up to turn your points into prizes:";
prizesTab.appendChild(prizeHeader);
prizesTab.appendChild(prizeHeroContainer);
// prizesTab.appendChild(prizeFooter);
prizesTab.appendChild(signupCTAText);


// Building the ranking tab
const rankingsTab = document.createElement('div');
rankingsTab.style.display = "none";
rankingsTab.style.flexDirection = 'column';
rankingsTab.style.justifyContent = 'center';
rankingsTab.style.alignItems = 'center';
// Building the ranking tab components
const rankingCategoriesDiv = document.createElement('div');
rankingCategoriesDiv.id = "ranking-categories-div";
rankingCategoriesDiv.classList.add("ranking-container-element");
let rankTexts = ["Rank", "Username", "Points"];
// loop over rankTexts and create p tags and append as children into rankingCategoriesDiv
for (let i = 0; i < rankTexts.length; i++) {
  const text = document.createElement('p');
  if (i == 0) {
    text.style.width = "14%";
  } else if (i == 1) {
    text.style.width = "32%";
  } else {
    text.style.width = "34%";
  }
  text.classList.add("plain");
  text.classList.add("ranking-category-text");
  text.textContent = rankTexts[i];
  rankingCategoriesDiv.appendChild(text);
}
// Call Firebase, format into class .placement-row
// .username and .points can be applied to the p tags for the individual elements
const placementsDiv = document.createElement('div');
placementsDiv.id = "placements-div";

const moreRanksButton = document.createElement('button');
moreRanksButton.id = "more-ranks-button";
moreRanksButton.classList.add("ranking-container-element");
moreRanksButton.textContent = "more...";
rankingsTab.appendChild(rankingCategoriesDiv);
rankingsTab.appendChild(placementsDiv);
rankingsTab.appendChild(moreRanksButton)


// CTA button
const sidebarSignupButton = document.createElement('button');
sidebarSignupButton.id = "sidebar-signup-button";
sidebarSignupButton.classList.add("styled-button");
sidebarSignupButton.textContent = "Sign up";

// Adding things together to form the sidebar point div
sidebarPointDiv.appendChild(sidebarHeader);
sidebarPointDiv.appendChild(sidebarCloseButton);
sidebarPointDiv.appendChild(sidebarHeroImg);
sidebarPointDiv.appendChild(sidebarTabsDiv);
sidebarPointDiv.appendChild(prizesTab);
sidebarPointDiv.appendChild(rankingsTab);
sidebarPointDiv.appendChild(sidebarSignupButton);
document.body.appendChild(sidebarPointDiv);

function removeTypewriter(text, textElement, i = 0) {
  const currentText = textElement.textContent;
  const newText = text;

  if (currentText.length > 0) {
    // Remove the last character from the existing text
    textElement.textContent = currentText.substring(0, currentText.length - 1);
    setTimeout(() => removeTypewriter(text, textElement, i), 20);
  } else {
    setTimeout(() => typewriter(newText, textElement, i), 20);
  }
}
function typewriter(text, textElement, i = 0) {
  if (i < text.length) {
    const char = text.charAt(i);
    if (char === '<') {
      // Find the closing angle bracket '>'
      const closingIndex = text.indexOf('/', i);
      const finalBracketIndex = text.indexOf('>', closingIndex);
      if (closingIndex !== -1) {
        // Extract the HTML tag
        const tag = text.slice(i, finalBracketIndex + 1);
        textElement.insertAdjacentHTML('beforeend', tag);
        i = finalBracketIndex + 1;
      } else {
        const closingBracketIndex = text.indexOf('>', i);
        console.log(closingBracketIndex);
        const tag = text.slice(i, closingBracketIndex + 1);
        textElement.insertAdjacentHTML('beforeend', tag);
        i = closingBracketIndex + 1;
      }
    } else {
      textElement.insertAdjacentText('beforeend', char);
      i++;
    }
    setTimeout(() => typewriter(text, textElement, i), 20);
  }
}

function toggleSidebar() {
  if (sidebar_open == true) {
    sidebar_open = false;
    sidebarPointDiv.style.right = "-25%";
  } else {
    sidebar_open = true;
    sidebarPointDiv.style.right = "0%";
  }
}

function isValidScrabbleWord(word) {
  const scrabbleJsonPath = "../scrabble_2019.json";

  return fetch(scrabbleJsonPath)
    .then(response => response.json())
    .then(words => {
      const scrabbleSet = new Set(words);
      return scrabbleSet.has(word.toUpperCase());
    })
    .catch(error => {
      console.error('Error loading Scrabble words:', error);
    });
}

const inventory = document.createElement('div');
inventory.style.position = 'fixed';
inventory.style.display = 'flex';
inventory.style.flexDirection = 'column';
inventory.style.bottom = '20px';
inventory.style.right = '20px';
inventory.style.transition = 'opacity 0.5s ease';
inventory.style.zIndex = '9999999999';
const inventoryRow = document.createElement('div');
inventoryRow.style.display = 'flex';
inventoryRow.style.flexDirection = 'row';
inventoryRow.style.backgroundColor = 'brown';
inventoryRow.style.borderBottom = '7px #51391d';
inventoryRow.style.padding = '1vw';

// for (let i = 0; i < 7; i++) {

//   const inventorySpace = document.createElement('div');

//   inventorySpace.style.width = '30px';
//   inventorySpace.style.height = '30px';
//   inventorySpace.style.border = '1px solid black';
//   inventorySpace.style.marginRight = '5px';
//   inventorySpace.style.backgroundColor = "brown"

//   inventoryRow.appendChild(inventorySpace);

// }

const guessRow = document.createElement('div');
guessRow.style.display = 'flex';
guessRow.style.flexDirection = 'row';

for (let i = 0; i < 7; i++) {
  // if (i == 3) {
    // triple letter
    // ask chatGPT how to adjust background Image of div
  // } else if (i == 6) {
    // double word multiplier
  // }
  
  let guessSpace = document.createElement('div');
  guessSpace.classList.add('guess-space');

  guessSpace.style.width = '30px';
  guessSpace.style.height = '30px';
  guessSpace.style.border = '1px solid black';
  guessSpace.style.marginRight = '5px';
  guessSpace.style.borderRadius = '5px';
  guessSpace.style.position = 'relative';
  guessSpace.style.padding = '0.45vw';

  guessRow.appendChild(guessSpace);

}

const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';


// document.body.appendChild(inventory);
let clicks = 0;
let inventoryFilled = false;
let started = false;

// Get all p elements
const paragraphs = document.querySelectorAll('p');
let randomCounter = Math.ceil(Math.random() * paragraphs.length / 20 + 2);

paragraphs.forEach(p => {
  const nodes = Array.from(p.childNodes);

  // Filter out unwanted nodes (e.g., scripts, styles)
  const validNodes = nodes.filter(node => {
    return node.nodeType === Node.TEXT_NODE || node.nodeName === 'SPAN' || node.nodeName === 'BR';
  });

  const letterArray = [];
  const spanIndices = new Set();

  validNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      letterArray.push(...text.split(''));
    } else if (node.nodeName === 'SPAN') {
      const spanHTML = node.outerHTML;
      const spanLength = node.textContent.length;
      const startIndex = letterArray.length;
      for (let i = 0; i < spanLength; i++) {
        spanIndices.add(startIndex + i);
      }
      letterArray.push(spanHTML);
    } else if (node.nodeName === 'BR') {
      letterArray.push('<br>');
    }
  });

  // Replace some letters with spans
  for (let i = 0; i < randomCounter; i++) {
    const index = Math.floor(Math.random() * letterArray.length);

    // Skip if the index is already wrapped in a span or inside an existing span
    if (spanIndices.has(index)) {
      continue;
    }

    // Check if the character is a letter
    const char = letterArray[index];
    if (typeof char === 'string' && char.match(/[a-zA-Z]/) && char !== ' ') {
      // Wrap in span
      letterArray[index] = `<span class="scrabble">${char}</span>`;
      spanIndices.add(index);
    }
  }

  // Join and set innerHTML
  p.innerHTML = letterArray.join('');
});

// Get all elements with the class name "scrabble"
const scrabbleElements = document.querySelectorAll('span.scrabble');

let scrabblePoints = {
  "A": 1,
  "B": 3,
  "C": 3,
  "D": 2,
  "E": 1,
  "F": 4, 
  "G": 2,
  "H": 4,
  "I": 1,
  "J": 8,
  "K": 5,
  "L": 1,
  "M": 3,
  "N": 1,
  "O": 1, 
  "P": 3,
  "Q": 10,
  "R": 1,
  "S": 1, 
  "T": 1,
  "U": 1,
  "V": 4,
  "W": 4,
  "X": 8,
  "Y": 4,
  "Z": 10
}

scrabbleElements.forEach(element => {
  function addMouseoverAlert(el) {
    const alertElement = document.createElement('div');
    alertElement.classList.add('scrabble-alert');
    alertElement.style.position = 'absolute';
    alertElement.style.top = '-4vw';
    alertElement.style.backgroundColor = 'white';
    alertElement.style.fontSize = '1vw';
    alertElement.style.padding = '0.1vw 0.4vw';
    alertElement.style.display = 'none'; // Hide the alert by default
    alertElement.style.whiteSpace = 'nowrap'; // Prevent text from wrapping
    alertElement.style.fontFamily = 'sans-serif';
    alertElement.style.border = '0.3vw solid tan';
    alertElement.style.borderRadius = '0.2vw';

    el.addEventListener("mouseover", function(event) {
      if (inventoryFilled == false && el.style.backgroundColor !== "tan") {
        alertElement.style.display = 'block';
        alertElement.textContent = "Tile already added!";
      } else if (inventoryFilled == true && el.style.backgroundColor !== "tan") {
        alertElement.style.display = 'block';
        alertElement.textContent = "Max. tiles added!";
      } else if (inventoryFilled == false && el.style.backgroundColor == "tan") {
        alertElement.style.display = 'block';
        alertElement.textContent = "Click to add to inventory!";
      }
    });
    el.addEventListener("mouseout", function(event) {
      alertElement.style.display = 'none';
    });

    el.appendChild(alertElement);
  }

  addMouseoverAlert(element);
  let letter = element.textContent.toUpperCase();
  // Get current font size 
  let currentFontSize = window.getComputedStyle(element).fontSize;

  // styles for tiles
  element.style.color = "#5c4428"; // alex added this to remind to make letters a color too!
  element.style.borderStyle = "solid";
  element.style.borderTop = "2px solid #e2c19b";
  element.style.borderLeft = "2px solid #e2c19b";
  element.style.borderBottom = "2px solid #998369";
  element.style.borderRight = "2px solid #998369";
  element.style.backgroundColor = "tan";
  element.style.position = "relative";
  element.style.width = currentFontSize;
  element.style.height = currentFontSize;
  element.style.display = "inline-block";
  element.style.textAlign = "center";
  element.style.alignItems = "center";
  element.style.justifyContent = "center";
  element.style.fontFamily = "eurostile";
  element.style.fontSize = currentFontSize;
  element.style.textTransform = "uppercase";
  element.style.top = "-1%";
  element.style.borderRadius = "5px";
  element.style.lineHeight = element.style.height;
  element.style.lineHeight = element.style.width;
  element.style.fontWeight = "normal"

  // If a tile is clicked before 7 tiles have been reached, shade it
  element.addEventListener("click", function(event) {
    if (started == false) {
      started = true;
      inventory.appendChild(guessRow);
      document.body.appendChild(inventory);
      inventory.appendChild(inventoryRow);
      inventory.appendChild(submitButton);
    }
    if (this.style.backgroundColor === 'tan') {
      let inventoryLetter = this.cloneNode(true);
      const excludedChild = inventoryLetter.querySelector('.scrabble-alert');
      if (excludedChild) {
        excludedChild.parentNode.removeChild(excludedChild);
      }
      inventoryLetter.style.width = '3vw';
      inventoryLetter.style.height = '3vw';
      inventoryLetter.style.fontSize = '2vw';
      inventoryLetter.style.lineHeight = '3vw';
      inventoryLetter.addEventListener("click", function(event) {
        if (inventoryLetter.classList.contains('guessed')) {
          inventoryRow.appendChild(inventoryLetter);
          inventoryLetter.style.position = 'relative';
          inventoryLetter.style.top = "unset";
          inventoryLetter.style.left = "unset";
          inventoryLetter.classList.remove('guessed');
        } else {
          inventoryLetter.classList.add('guessed');
          // Find all elements with the class 'guess-space' inside the guessRow container
          const guessSpaces = guessRow.getElementsByClassName('guess-space');
          // Variable to store the target guess-space element
          let emptyGuessSpace = null;
          // Loop through each guess-space element to find the first empty one
          for (const space of guessSpaces) {
            if (!space.firstChild) { // Check if the guess-space element is empty
              emptyGuessSpace = space;
              break; // Stop the loop once you find the first empty guess-space element
            }
          }
          // Append the 'inventoryLetter' element to the target guess-space element (if found)
          if (emptyGuessSpace) {
            emptyGuessSpace.appendChild(inventoryLetter);
          } else {
            console.log("No empty guess-space element found inside guessRow.");
          }
          inventoryLetter.style.position = 'absolute';
          inventoryLetter.style.top = 0;
          inventoryLetter.style.left = 0;
        }
      });

      this.style.backgroundColor = '#b39265';
      this.style.color = '#000000'
      this.style.cursor = "not-allowed";
      inventoryRow.appendChild(inventoryLetter);
    }

    clicks++;
    if (clicks >= 7) {
      inventoryFilled = true;
      scrabbleElements.forEach(element => {
        element.style.backgroundColor = '#b39265';
        element.style.color = '#000000'
        element.style.cursor = "not-allowed";
      });
    }
  });
  // Create a new span for the point number
  const pointsSpan = document.createElement('span');

  // Style it
  pointsSpan.style.fontSize = "10px";
  pointsSpan.style.fontFamily = "sans-serif";
  pointsSpan.style.position = "absolute";
  pointsSpan.style.top = "10px";
  pointsSpan.style.right = "2px";

  // Find way to associate points with values
  console.log(scrabblePoints[letter]);
  pointsSpan.textContent = scrabblePoints[letter];

  // Append to element
  element.appendChild(pointsSpan);

});

// let wordstring = "dfdffdddfdf";
let wordstring = "heist";
function calculatePoints(wordstring) {

  // Initialize the points variable
  let points = 0;

  // Loop through each character in the inputString
  for (let i = 0; i < wordstring.length; i++) {
    // Convert the character to uppercase to handle lowercase letters as well
    let char = wordstring[i].toUpperCase();

    // Check if the character exists in scrabblePoints
    if (scrabblePoints.hasOwnProperty(char)) {
      // Add the points associated with the character to the points variable
      points += scrabblePoints[char];
    }
  }

  // Return the total points
  return points;
}

function countUpPoints(textElement, points) {
  // edit duration to change length of animation
  let duration = 2;
  const totalPoints = points;

  const startTime = performance.now();
  const interval = 16; // 60 FPS (1000ms / 60 frames)
  
  function exponentialEaseOut(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
  
  function updatePoints() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;
    
    if (elapsedTime >= duration * 1000) {
      textElement.textContent = Math.ceil(totalPoints);
      concludePointsDisplay();
      return;
    }
    
    const t = elapsedTime / (duration * 1000);
    const easing = exponentialEaseOut(t);
    const currentPoints = Math.ceil(totalPoints * easing);
    textElement.textContent = currentPoints;
    
    setTimeout(updatePoints, interval);
  }

  updatePoints();
}

function concludePointsDisplay() {
  // consider creating the sidebar element with Auth0 sign-up prior to this section and have it already added to the demoContainer, and then
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.8 },
    zIndex: 14,
  });
  setTimeout(() => {
    removeTypewriter("", descriptionText);

    setTimeout(() => {
      // fade out and remove point celeb elements
      iframeScrabbleBlackout.style.opacity = "0%";

      setTimeout(() => {
        iframeScrabbleBlackout.remove();
        inventory.style.opacity = "0%";

        // consider making these CSS properties a class of div that just gets added later .sidebar-point-row
        pointRow.style.position = 'fixed';
        pointRow.style.right = '5%';
        pointRow.style.bottom = '10%';
        pointRow.style.backgroundColor = '#ffffff';
        pointRow.style.borderRadius = '10px';
        pointRow.style.padding = '5%';
        pointRow.style.cursor = 'pointer';
        pointRow.style.border = '0.4vw solid #F4B831';
        pointRow.style.width = "12vw";
        pointRow.style.height = "7vw";
        pointRow.style.opacity = "0%";
        pointRow.style.padding = "0";
        pointText.style.color = "black";
        pointText.style.fontSize = "2vw";
        pointText.style.marginTop = "0";
        pointText.style.marginBottom = "0";
        pointText.style.marginRight = "0.4vw";
        pointImage.style.width = "2.9vw";
        pointImage.style.transform = "translateY(-8%)";

        document.body.appendChild(pointRow);
        const miniSidebarPointRow = pointRow.cloneNode(true);
        miniSidebarPointRow.style.backgroundColor = 'transparent';
        miniSidebarPointRow.style.border = 'none';
        miniSidebarPointRow.style.right = 'unset';
        miniSidebarPointRow.style.bottom = 'unset';
        miniSidebarPointRow.style.top = '0.5vw';
        miniSidebarPointRow.style.left = '0.5vw';
        miniSidebarPointRow.style.zIndex = '16';
        miniSidebarPointRow.style.opacity = '1.0';
        miniSidebarPointRow.style.display = 'flex';
        miniSidebarPointRow.style.flexDirection = 'row';
        miniSidebarPointRow.style.width = '8vw';
        miniSidebarPointRow.style.cursor = 'auto';
        miniSidebarPointRow.style.marginTop = '0.7vw';
        miniSidebarPointRow.style.opacity = "1.0";
        // change ID of the p tag and img tag inside of miniPointRow
        let miniSidebarPointText = miniSidebarPointRow.children[0];
        miniSidebarPointText.style.fontSize = '0.8vw';
        miniSidebarPointText.style.marginRight = "0.2vw";
        let miniSidebarPointImg = miniSidebarPointRow.children[1];
        miniSidebarPointImg.style.width = '1vw';
        miniSidebarPointImg.style.height = '1vw';
        sidebarPointDiv.appendChild(miniSidebarPointRow);
        pointRow.style.opacity = "100%";
        pointRow.addEventListener('click', () => {
          toggleSidebar();
        });
      }, 1000);
    }, 1400);
  }, 1000);
}

submitButton.addEventListener('click', function(event) {
  const guessedLetters = Array.from(guessRow.childNodes);
  const guessedWord = guessedLetters.map(letter => letter.textContent).join('');
  const sanitizedWord = guessedWord.replace(/\d+/g, '');
  console.log(sanitizedWord);
  isValidScrabbleWord(sanitizedWord)
  .then(isValid => {
    if (isValid) {
      let scrabblePoints = calculatePoints(sanitizedWord);
      console.log(`Total Points: ${scrabblePoints}`);
      iframeScrabbleBlackout = document.createElement("div");
      iframeScrabbleBlackout.style.transition = "opacity 0.5s ease";
      iframeScrabbleBlackout.style.position = "fixed";
      iframeScrabbleBlackout.style.top = "0";
      iframeScrabbleBlackout.style.left = "0";
      iframeScrabbleBlackout.style.width = "100%";
      iframeScrabbleBlackout.style.height = "100%";
      document.body.appendChild(iframeScrabbleBlackout);
      iframeScrabbleBlackout.style.opacity = "100%";
      iframeScrabbleBlackout.style.backgroundColor = "rgba(0,0,0, 0.8)";
      iframeScrabbleBlackout.style.zIndex = "13";
      iframeScrabbleBlackout.style.display = "flex";
      iframeScrabbleBlackout.style.flexDirection = "column";
      iframeScrabbleBlackout.style.alignItems = "center";
      iframeScrabbleBlackout.style.justifyContent = "center";

      // point counter has two elements it contains, p & div elements
      pointCounter = document.createElement("div");
      pointCounter.style.display = 'flex';
      pointCounter.style.flexDirection = 'column';
      pointCounter.style.justifyContent = 'center';
      pointCounter.style.alignItems = 'center';
      pointCounter.style.width = '80%';
      // descriptor text
      descriptionText = document.createElement("p");
      descriptionText.style.color = 'white';
      descriptionText.style.fontSize = '1.2vw';
      descriptionText.style.fontFamily = "Press Start 2P";
      descriptionText.textContent = ""
      // point row & its two children, p & img elements
      pointRow = document.createElement("div");
      pointRow.style.display = 'flex';
      pointRow.style.flexDirection = 'row';
      pointRow.style.justifyContent = 'center';
      pointRow.style.alignItems = 'center';
      pointRow.style.width = '50%';
      pointRow.style.transition = 'opacity 0.8s ease';
      pointText = document.createElement("p");
      pointText.style.color = 'white';
      pointText.style.fontSize = '4.2vw';
      pointText.style.marginRight = '3%';
      pointText.style.marginTop = '4%';
      pointText.style.transition = 'color 0.3s ease';
      pointText.style.fontFamily = "Press Start 2P";
      pointText.textContent = "0";
      pointImage = document.createElement("img");
      pointImage.style.width = '10%';
      pointImage.style.transform = 'translateY(-40%)';
      pointImage.src = "./img/hidden_elements/point_icon.png";
      // add elements to pointRow
      pointRow.appendChild(pointText);
      pointRow.appendChild(pointImage);
      // add description and point row to pointCounter
      pointCounter.appendChild(descriptionText);
      pointCounter.appendChild(pointRow);
      // add pointCounter to iframeScrabbleBlackout
      iframeScrabbleBlackout.appendChild(pointCounter);
      removeTypewriter("Congratulations! You earned some points with Playtest!", descriptionText);
      countUpPoints(pointText, scrabblePoints);
    } else {
      console.log("not valid word");
    }
  });
});