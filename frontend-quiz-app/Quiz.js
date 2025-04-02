const themeToggle = document.querySelector('#slide');
const htmlBody = document.querySelectorAll('html, body');

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
