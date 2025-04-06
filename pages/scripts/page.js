class Page {
  constructor() {
    this.translator = new Translator();
    this.translator.applyTranslations();
    this.initThemeToggle();
  }

  initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    if (themeToggle && themeIcon) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? 'dark_mode' : 'light_mode';
        localStorage.setItem('fc_theme', newTheme);
      });

      // Load saved theme
      const savedTheme = localStorage.getItem('fc_theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      themeIcon.textContent = savedTheme === 'dark' ? 'dark_mode' : 'light_mode';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Page();
});