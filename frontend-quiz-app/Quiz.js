const themeToggle = document.querySelector('#slide');
const htmlBody = document.querySelectorAll('html, body');
const quizQuestions = document.querySelector('#quiz-question');
const questionContent = document.querySelector('#questions');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('#progress');
const subjects = document.querySelectorAll('.subjects');
const quizMenu = document.querySelector('#quiz-menu');
const currentQuestion = document.querySelector('#current-question');
const playAgainButton = document.querySelector('#play-again');
const scoreDisplay = document.querySelector('#score');
const submitButton = document.querySelector('#submit');
const quizCompletedSec = document.querySelector('#quiz-completed-sec');
const optionLi = document.querySelectorAll('.list-items');
//Dark mode switch

function updateBackground(isDarkMode) {
  const mobile = window.matchMedia('(max-width: 599px)');
  const tablet = window.matchMedia(
    '(min-width: 600px) and (max-width: 1023px)'
  );
  const desktop = window.matchMedia('(min-width: 1024px)');

  htmlBody.forEach((hb) => {
    if (isDarkMode) {
      if (mobile.matches) {
        hb.style.background =
          'url(frontend-quiz-app/starter-code/assets/images/pattern-background-mobile-dark.svg) var(--Blue-900) no-repeat';
      } else if (tablet.matches) {
        hb.style.background =
          'url(frontend-quiz-app/starter-code/assets/images/pattern-background-tablet-dark.svg) var(--Blue-900) no-repeat';
      } else if (desktop.matches) {
        hb.style.background =
          'url(frontend-quiz-app/starter-code/assets/images/pattern-background-desktop-dark.svg) var(--Blue-900) no-repeat';
        hb.style.backgroundSize = 'cover';
      }
    } else {
      hb.style.background = '';
    }
  });
}

themeToggle.addEventListener('change', (e) => {
  const darkJpeg = document.getElementById('dark-img');
  const lightJpeg = document.getElementById('light-img');
  const pick = document.querySelector('#welcome-message p');
  const isDarkMode = e.target.checked;

  updateBackground(isDarkMode);

  if (isDarkMode) {
    document.querySelector('main').style.color = 'var(--white)';
    darkJpeg.style.fill = 'var(--white)';
    lightJpeg.style.fill = 'var(--white)';

    pick.style.color = 'var(--Blue-200)';

    document
      .querySelectorAll('#different-subject article')
      .forEach((article) => {
        article.style.backgroundColor = 'var(--Blue-850)';
      });
    document.querySelector('#question').style.color = 'var(--white)';
    optionLi.forEach((option) => {
      option.style.backgroundColor = 'var(--Blue-850)';
      option.style.color = 'var(--white)';
    });

    document.querySelector('.the-question p').style.color = 'var(--Blue-200)';
  } else {
    darkJpeg.style.fill = '';
    lightJpeg.style.fill = '';
    pick.style.color = '';
    document.querySelector('main').style.color = '';

    document
      .querySelectorAll('#different-subject article')
      .forEach((article) => {
        article.style.backgroundColor = '';
      });
    document.querySelector('#question').style.color = '';
    optionLi.forEach((option) => {
      option.style.backgroundColor = '';
      option.style.color = '';
    });

    document.querySelector('.the-question p').style.color = '';
  }
});

window.addEventListener('resize', () => {
  const isDarkMode = themeToggle.checked;
  updateBackground(isDarkMode);
});

//Dark Mode Switch end

let currentIndex = 0;
let currentSection = null;
let score = 0;

function displayQuestion(section, questionIndex) {
  const secQ = section.questions;
  currentSection = section;
  console.log(currentSection);

  if (questionIndex >= 0 && questionIndex < secQ.length) {
    const currentQ = secQ[questionIndex];
    questionContent.textContent = currentQ.question;
    currentQuestion.textContent = `${questionIndex + 1} of ${secQ.length}`;
    progress.style.width = `${((questionIndex + 1) / secQ.length) * 100}%`;

    optionLi.forEach((li) => {
      li.classList.remove('selected', 'correct', 'incorrect');
      li.style.pointerEvents = 'auto';
    });

    const options = currentQ.options;
    console.log(options);
    optionLi.forEach((listItem, index) => {
      listItem.innerHTML = `<span class="answer-tag">${String.fromCharCode(
        65 + index
      )}</span> 
      <span class="option-update">
        ${escapeHtml(`${options[index]}`)}
      </span> 
      <span class="auth-img"></span>`;
      console.log(options[index]);
      listItem.addEventListener('click', () => {
        optionLi.forEach((li) => li.classList.remove('selected'));
        listItem.classList.add('selected');
      });
    });
    submitButton.textContent = 'Submit Answer';
  } else {
    quizQuestions.style.display = 'none';
    quizCompletedSec.style.display = 'block';
    scoreDisplay.textContent = score;
  }
}

//change <> to strings
function escapeHtml(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

//CreateImge
function createImage(src, alt, className = '') {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.width = '2.5rem';
  img.style.height = '2.5rem';
  if (className) img.classList.add(className);
  return img;
}

function checkAnswer() {
  const selectedLi = document.querySelector('.list-items.selected');

  if (!selectedLi) {
    document.querySelector('.no-answer-selected').style.display = 'block';
    return false;
  }
  const answerTag = selectedLi.querySelector('.answer-tag');
  console.log(answerTag);
  document.querySelector('.no-answer-selected').style.display = 'none';

  const selectedOption = selectedLi.textContent.slice(0, 1); // Get "A", "B", etc.
  const currentQ = currentSection.questions[currentIndex];
  const correctIndex = currentQ.options.indexOf(currentQ.answer);
  const correctOption = String.fromCharCode(65 + correctIndex); // Convert to A, B, C, D

  if (selectedOption === correctOption) {
    score++;
    selectedLi.classList.add('correct');
    answerTag.style.backgroundColor = 'var(--Green-500)';
    const correctImg = createImage(
      'frontend-quiz-app/starter-code/assets/images/icon-correct.svg',
      'Correct'
    );
    selectedLi.querySelector('.auth-img').appendChild(correctImg);
  } else if (selectedOption !== correctOption) {
    // showing the correct answer even if the wrong one is clicked
    const gg = optionLi[correctIndex];
    gg.classList.add('auth-when-correct');
    const correctImg = createImage(
      'frontend-quiz-app/starter-code/assets/images/icon-correct.svg',
      'Correct'
    );
    gg.querySelector('.auth-img').appendChild(correctImg);

    //incorrect auth
    selectedLi.classList.add('incorrect');
    answerTag.style.backgroundColor = 'var(--Red)';
    const inCorrectImg = createImage(
      'frontend-quiz-app/starter-code/assets/images/icon-incorrect.svg',
      'Incorrect'
    );

    selectedLi.querySelector('.auth-img').appendChild(inCorrectImg);
  }
  optionLi.forEach((li) => (li.style.pointerEvents = 'none')); // Disable further clicks
  submitButton.textContent = 'Next Question';
  return true;
}

submitButton.addEventListener('click', () => {
  if (submitButton.textContent === 'Submit Answer') {
    if (checkAnswer()) {
      // Answer checked, wait for next click
    }
  } else {
    currentIndex++;
    displayQuestion(currentSection, currentIndex);
  }
});

playAgainButton.addEventListener('click', () => {
  quizCompletedSec.style.display = 'none';
  quizMenu.style.display = 'block';
  currentIndex = 0;
  score = 0;
});

function redirectToQuestionForSubject(data, selectedSubject) {
  const quizSections = data.quizzes;

  const section = quizSections.find(
    (sec) => sec.title.toLowerCase() === selectedSubject.toLowerCase()
  );
  const backgroundColors = [
    'var(--Orange-50)',
    'var(--Green-100)',
    'var(--Blue-50)',
    'var(--Purple-100)',
  ];

  if (section) {
    const logoSection = document.getElementById('subject-name-and-logo');
    const sectionName = logoSection.querySelector('.section-name');

    sectionName.textContent = section.title;

    const existingLogoWrapper = logoSection.querySelector('.logo-wrapper');
    if (existingLogoWrapper) {
      existingLogoWrapper.remove();
    }

    // Create a wrapper for the logo
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'logo-wrapper';

    // Find the index of the selected section and pick a color
    const sectionIndex = quizSections.findIndex(
      (sec) => sec.title.toLowerCase() === selectedSubject.toLowerCase()
    );
    logoWrapper.style.backgroundColor =
      backgroundColors[sectionIndex % backgroundColors.length]; // Cycle through colors
    logoWrapper.style.display = 'inline-block';
    logoWrapper.style.padding = '0.2rem';
    logoWrapper.style.borderRadius = '10px';

    const logo = document.createElement('img');
    logo.src = section.icon;
    logoWrapper.appendChild(logo);
    logoSection.insertBefore(logoWrapper, sectionName);

    currentIndex = 0;
    score = 0;
    displayQuestion(section, currentIndex);
  } else {
    console.error(`No quiz found for subject: ${selectedSubject}`);
  }
}

fetch('frontend-quiz-app/starter-code/data.json')
  .then((Response) => {
    if (!Response.ok) {
      throw new Error('failed to fetch quiz');
    }
    return Response.json();
  })
  .then((data) => {
    subjects.forEach((subject) => {
      subject.addEventListener('click', () => {
        quizMenu.style.display = 'none';
        quizQuestions.style.display = 'block';

        redirectToQuestionForSubject(data, subject.textContent.trim());
      });
    });
  })
  .catch((error) => console.error(error));
