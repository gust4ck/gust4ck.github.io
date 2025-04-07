class FocusCounter {
  constructor() {
    this.seconds = 0;
    this.mainInterval = null;
    this.isRunning = false;
    this.adCountdown = 30;
    this.adInterval = null;
    this.fonts = [
      'Roboto Mono', 'Inter', 'Space Grotesk',
      'Courier New', 'Arial', 'Verdana',
      'Georgia', 'Times New Roman', 'Helvetica'
    ];

    this.translator = new Translator();
    this.translator.applyTranslations();

    this.initElements();
    this.initEvents();
    this.loadSettings();
    this.updateDisplay();
    this.loadGoogleFonts();

    if (!sessionStorage.getItem('adShown')) {
      this.showAdPopup();
      sessionStorage.setItem('adShown', 'true');
    }
  }

  initElements() {
    this.timerDisplay = document.getElementById('timerDisplay');
    this.hoursDisplay = document.getElementById('hoursDisplay');
    this.minutesDisplay = document.getElementById('minutesDisplay');
    this.secondsDisplay = document.getElementById('secondsDisplay');

    this.startBtn = document.getElementById('startBtn');
    this.stopBtn = document.getElementById('stopBtn');
    this.resetBtn = document.getElementById('resetBtn');

    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.getElementById('themeIcon');

    this.adPopup = document.getElementById('adPopup');
    this.overlay = document.getElementById('overlay');
    this.countdownDisplay = document.getElementById('countdown');

    this.settingsToggle = document.getElementById('settingsToggle');
    this.settingsMenu = document.getElementById('settingsMenu');
    this.fontSearch = document.getElementById('fontSearch');
    this.fontOptions = document.getElementById('fontOptions');

    this.decreaseBtnSize = document.getElementById('decreaseBtnSize');
    this.resetBtnSize = document.getElementById('resetBtnSize');
    this.increaseBtnSize = document.getElementById('increaseBtnSize');

    this.decreaseTimerSize = document.getElementById('decreaseTimerSize');
    this.resetTimerSize = document.getElementById('resetTimerSize');
    this.increaseTimerSize = document.getElementById('increaseTimerSize');
  }

  initEvents() {
    this.startBtn.addEventListener('click', () => this.start());
    this.stopBtn.addEventListener('click', () => this.stop());
    this.resetBtn.addEventListener('click', () => this.reset());
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    this.settingsToggle.addEventListener('click', () => this.toggleSettingsMenu());
    this.fontSearch.addEventListener('input', () => this.filterFonts());

    this.decreaseBtnSize.addEventListener('click', () => this.adjustButtonSize(-5));
    this.resetBtnSize.addEventListener('click', () => this.resetButtonSize());
    this.increaseBtnSize.addEventListener('click', () => this.adjustButtonSize(5));

    this.decreaseTimerSize.addEventListener('click', () => this.adjustTimerSize(-5));
    this.resetTimerSize.addEventListener('click', () => this.resetTimerSize());
    this.increaseTimerSize.addEventListener('click', () => this.adjustTimerSize(5));

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        this.isRunning ? this.stop() : this.start();
      }
      if (e.code === 'Escape') {
        this.reset();
      }
    });
  }

  toggleSettingsMenu() {
    this.settingsMenu.classList.toggle('active');
  }

  loadGoogleFonts() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDxHyUYHtwpYx1XPB7lzZ3bJ5KjGJwz1Yw')
      .then(response => response.json())
      .then(data => {
        this.fonts = data.items.map(font => font.family);
        this.renderFontOptions();
      })
      .catch(() => {
        this.renderFontOptions();
      });
  }

  renderFontOptions() {
    this.fontOptions.innerHTML = '';
    this.fonts.forEach(font => {
      const option = document.createElement('div');
      option.className = 'font-option';
      option.textContent = font;
      option.style.fontFamily = font;

      const checkIcon = document.createElement('span');
      checkIcon.className = 'material-icons';
      checkIcon.textContent = 'check';

      option.appendChild(checkIcon);
      option.addEventListener('click', () => this.selectFont(font));

      this.fontOptions.appendChild(option);
    });
  }

  filterFonts() {
    const searchTerm = this.fontSearch.value.toLowerCase();
    const options = this.fontOptions.querySelectorAll('.font-option');

    options.forEach(option => {
      const fontName = option.textContent.replace('check', '').toLowerCase();
      option.style.display = fontName.includes(searchTerm) ? 'flex' : 'none';
    });
  }

  selectFont(font) {
    const options = this.fontOptions.querySelectorAll('.font-option');
    options.forEach(opt => opt.classList.remove('active'));

    const selectedOption = [...options].find(opt => opt.textContent.includes(font));
    if (selectedOption) selectedOption.classList.add('active');

    document.querySelector('.timer-display').style.fontFamily = font;
    localStorage.setItem('fc_timer_font', font);
  }

  adjustButtonSize(change) {
    const buttons = document.querySelectorAll('.btn');
    const currentSize = parseFloat(getComputedStyle(buttons[0]).width);
    const newSize = Math.max(40, Math.min(80, currentSize + change));

    buttons.forEach(btn => {
      btn.style.width = `${newSize}px`;
      btn.style.height = `${newSize}px`;
    });

    localStorage.setItem('fc_button_size', newSize);
  }

  resetButtonSize() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.style.width = '';
      btn.style.height = '';
    });

    localStorage.removeItem('fc_button_size');
  }

  adjustTimerSize(change) {
    const timerDisplay = document.querySelector('.timer-display');
    const currentSize = parseFloat(getComputedStyle(timerDisplay).fontSize);
    const newSize = Math.max(40, Math.min(160, currentSize + change));

    timerDisplay.style.fontSize = `${newSize}px`;
    localStorage.setItem('fc_timer_size', newSize);
  }

  resetTimerSize() {
    const timerDisplay = document.querySelector('.timer-display');
    timerDisplay.style.fontSize = '';
    localStorage.removeItem('fc_timer_size');
  }

  loadSettings() {
    const savedTheme = localStorage.getItem('fc_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.themeIcon.textContent = savedTheme === 'dark' ? 'dark_mode' : 'light_mode';

    const savedFont = localStorage.getItem('fc_timer_font');
    if (savedFont) {
      document.querySelector('.timer-display').style.fontFamily = savedFont;

      setTimeout(() => {
        const options = this.fontOptions.querySelectorAll('.font-option');
        options.forEach(opt => {
          if (opt.textContent.includes(savedFont)) {
            opt.classList.add('active');
          }
        });
      }, 500);
    }

    const savedBtnSize = localStorage.getItem('fc_button_size');
    if (savedBtnSize) {
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(btn => {
        btn.style.width = `${savedBtnSize}px`;
        btn.style.height = `${savedBtnSize}px`;
      });
    }

    const savedTimerSize = localStorage.getItem('fc_timer_size');
    if (savedTimerSize) {
      document.querySelector('.timer-display').style.fontSize = `${savedTimerSize}px`;
    }
  }

  showAdPopup() {
    this.adPopup.style.display = 'block';
    this.overlay.style.display = 'block';

    this.startAdCountdown();

    (adsbygoogle = window.adsbygoogle || []).push({});
  }

  startAdCountdown() {
    this.adCountdown = 2;
    this.updateAdCountdown();

    if (this.adInterval) clearInterval(this.adInterval);

    this.adInterval = setInterval(() => {
      this.adCountdown--;
      this.updateAdCountdown();

      if (this.adCountdown <= 0) {
        this.closeAdPopup();
      }
    }, 1000);
  }

  updateAdCountdown() {
    this.countdownDisplay.textContent = this.adCountdown;
  }

  closeAdPopup() {
    clearInterval(this.adInterval);
    this.adPopup.style.display = 'none';
    this.overlay.style.display = 'none';
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.updateButtonStates();

    this.mainInterval = setInterval(() => {
      this.seconds++;
      this.updateDisplay();
    }, 1000);
  }

  stop() {
    if (!this.isRunning) return;

    clearInterval(this.mainInterval);
    this.isRunning = false;
    this.updateButtonStates();
  }

  reset() {
    this.stop();
    this.seconds = 0;
    this.updateDisplay();
  }

  updateButtonStates() {
    this.startBtn.disabled = this.isRunning;
    this.stopBtn.disabled = !this.isRunning;
  }

  updateDisplay() {
    const hours = Math.floor(this.seconds / 3600);
    const mins = Math.floor((this.seconds % 3600) / 60);
    const secs = this.seconds % 60;

    this.hoursDisplay.textContent = this.pad(hours);
    this.minutesDisplay.textContent = this.pad(mins);
    this.secondsDisplay.textContent = this.pad(secs);
  }

  pad(num) {
    return num.toString().padStart(2, '0');
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    this.themeIcon.textContent = newTheme === 'dark' ? 'dark_mode' : 'light_mode';
    localStorage.setItem('fc_theme', newTheme);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FocusCounter();

  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-5476969319933047",
    enable_page_level_ads: true
  });
});