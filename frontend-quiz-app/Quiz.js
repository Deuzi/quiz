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

subjects.forEach((subject) => {
  subject.addEventListener('click', () => {
    const quizMenu = document.querySelector('#quiz-menu');
    quizMenu.style.display = 'none';
    quizQuestions.style.display = 'block';
  });
});

fetch('frontend-quiz-app/starter-code/data.json')
  .then((Response) => {
    if (!Response.ok) {
      throw new Error('failed to fetch quiz');
    }
    return Response.json();
  })
  .then((data) => {
    const subjectHtml = document.querySelector('#html');
    subjectHtml.addEventListener('click', () => {
      const quiz = data.quizzes[0];
      const logo = document.createElement('img');
      logo.classList.add('html-svg');
      logo.src = quiz.icon;
      const logoSection = document.getElementById('subject-name-and-logo');
      const sectionName = document.querySelector('.section-name');
      logoSection.appendChild(logo);
      logoSection.insertBefore(logo, sectionName);
      sectionName.textContent = `${quiz.title}`;

      //
      document.getElementById('questions').textContent =
        quiz.questions[0].question;

      const optionsLi = document.querySelectorAll('#question-list li');
      quiz.questions[0].options.forEach((option, index) => {
        const answerTag = optionsLi[index].querySelector('.answer-tag');
        optionsLi[index].textContent = option;
        optionsLi[index].prepend(answerTag);
      });
    });
  });
