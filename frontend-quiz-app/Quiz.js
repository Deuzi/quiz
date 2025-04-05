const themeToggle = document.querySelector('#slide');
const htmlBody = document.querySelectorAll('html, body');
const quizQuestions = document.querySelector('#quiz-question');
const questionContent = document.querySelector('#questions');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('#progress');
const currentQuestion = document.querySelector('#current-question');
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
  }
});

window.addEventListener('resize', () => {
  const isDarkMode = themeToggle.checked;
  updateBackground(isDarkMode);
});

//Dark Mode Switch end

const subjects = document.querySelectorAll('.subjects');
const quizMenu = document.querySelector('#quiz-menu');

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
  } else {
    console.error(`No quiz found for subject: ${selectedSubject}`);
  }
}
