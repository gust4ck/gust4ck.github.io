class FocusCounter {
  constructor() {
    this.seconds = 0;
    this.mainInterval = null;
    this.isRunning = false;
    this.adCountdown = 30;
    this.adInterval = null;

    this.translator = new Translator();
    this.translator.applyTranslations();

    this.initElements();
    this.initEvents();
    this.loadSettings();
    this.updateDisplay();
    this.showAdPopup();
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
  }

  initEvents() {
    this.startBtn.addEventListener('click', () => this.start());
    this.stopBtn.addEventListener('click', () => this.stop());
    this.resetBtn.addEventListener('click', () => this.reset());
    this.themeToggle.addEventListener('click', () => this.toggleTheme());

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

  showAdPopup() {
    this.adPopup.style.display = 'block';
    this.overlay.style.display = 'block';

    this.startAdCountdown();

    (adsbygoogle = window.adsbygoogle || []).push({});
  }

  startAdCountdown() {
    this.adCountdown = 30;
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

  loadSettings() {
    const savedTheme = localStorage.getItem('fc_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.themeIcon.textContent = savedTheme === 'dark' ? 'dark_mode' : 'light_mode';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FocusCounter();

  // Configura AdSense global
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-XXXXXXXXXXXXXXXX",
    enable_page_level_ads: true
  });
});
