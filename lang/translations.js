const translations = {
  'en': {
    // Main UI
    'title': 'FocusCounter | Infinite Counter',
    'description': 'Minimalist infinite counter for focus',
    'footer': 'FOCUSCOUNTER',
    'backButton': 'Back',

    // Ad messages
    'adMessage1': "We won't clutter your screen. We just need 1 ad to keep the site alive.",
    'adMessage2': "After this ad, no others will appear during your use of the site.",
    'adCountdownText': 'The ad will close automatically in:',

    // About Page
    'aboutTitle': 'About FocusCounter',
    'aboutIntro': 'FocusCounter is a minimalist productivity tool designed to help you stay focused and track your work sessions.',
    'aboutFeaturesTitle': 'Key Features',
    'aboutFeature1': 'Infinite counter with hour/minute/second precision',
    'aboutFeature2': 'Keyboard shortcuts (Space to play/pause, Esc to reset)',
    'aboutFeature3': 'Dark/light mode toggle',
    'aboutFeature4': 'Multi-language support (12 languages)',
    'aboutFeature5': 'Minimalist distraction-free design',

    // Privacy Page
    'privacyTitle': 'Privacy Policy',
    'privacyIntro': 'We take your privacy seriously. This policy explains what data we collect and how we use it.',
    'privacyDataTitle': 'Data We Collect',
    'privacyData1': 'Theme preference (dark/light mode)',
    'privacyData2': 'Language selection',
    'privacyData3': 'Anonymous usage statistics',

    // Terms Page
    'termsTitle': 'Terms of Service',
    'termsIntro': 'By using FocusCounter, you agree to these terms:',
    'termsUseTitle': 'Acceptable Use',
    'termsUse1': 'For personal productivity purposes only',
    'termsUse2': 'No automated or bulk usage',
    'termsUse3': 'No reverse engineering or modification',

    // Contact Page
    'contactTitle': 'Contact Us',
    'contactIntro': 'Get in touch with us for partnerships, advertising or support:',
    'contactEmail': 'Advertising email:',
    'contactWhatsApp': 'Business WhatsApp:',
    'contactHours': 'Response hours: Mon-Fri, 9AM-5PM'
  },
  'pt': {
    // Main UI
    'title': 'FocusCounter | Contador Infinito',
    'description': 'Contador infinito minimalista para focar no que importa',
    'footer': 'FOCUSCOUNTER',
    'backButton': 'Voltar',

    // Ad messages
    'adMessage1': 'Não vamos poluir sua tela. Só precisamos de 1 anúncio pra manter o site vivo.',
    'adMessage2': 'Após esse anúncio, não aparecerá nenhum outro durante o uso do site.',
    'adCountdownText': 'O anúncio fechará automaticamente em:',

    // About Page
    'aboutTitle': 'Sobre o FocusCounter',
    'aboutIntro': 'FocusCounter é uma ferramenta minimalista de produtividade para ajudar na concentração e medir sessões de trabalho.',
    'aboutFeaturesTitle': 'Principais Recursos',
    'aboutFeature1': 'Contador infinito com precisão de horas/minutos/segundos',
    'aboutFeature2': 'Atalhos de teclado (Espaço para play/pause, Esc para resetar)',
    'aboutFeature3': 'Alternar entre modo escuro/claro',
    'aboutFeature4': 'Suporte a múltiplos idiomas (12 idiomas)',
    'aboutFeature5': 'Design minimalista sem distrações',
    'aboutFeature6': 'Não deixamos anúncios de forma "bombardeada" no site, você verá somente 1 anúncio ao entrar no site ou recarregar a página, e adiante não verá mais nenhum anúncio. Um diferencial de todos os timers para o nosso da FocusCounter.',

    // Privacy Page
    'privacyTitle': 'Política de Privacidade',
    'privacyIntro': 'Levamos sua privacidade a sério. Esta política explica quais dados coletamos e como os usamos.',
    'privacyDataTitle': 'Dados que Coletamos',
    'privacyData1': 'Preferência de tema (modo escuro/claro)',
    'privacyData2': 'Seleção de idioma',
    'privacyData3': 'Navegações sua na web passadas para um anúncio dedicado a você.',

    // Terms Page
    'termsTitle': 'Termos de Serviço',
    'termsIntro': 'Bem-vindo ao FocusCounter! Estes termos visam uma experiência transparente e segura:',
    'termsUseTitle': 'Nosso Compromisso',
    'termsUse1': 'Foco total na sua produtividade: Utilizamos apenas cookies para armazenar sua preferência de tema do site (light/dark), e serviços de terceiros do Google Adsense. Não coletamos nenhum tipo de dados pessoais.',
    'termsUse2': 'Uso individual e humano: proibido automações ou redistribuição não autorizada.',
    'termsUse3': 'Integridade do serviço: não desmonte ou modifique o FocusCounter.',

    // Contact Page
    'contactTitle': 'Contato',
    'contactIntro': 'Entre em contato para parcerias, publicidade ou suporte:',
    'contactEmail': 'E-mail comercial:',
    'contactWhatsApp': 'WhatsApp comercial:',
    'contactHours': 'Horário de resposta: Domingo a Sabádo, 24h por dia.'
  }
};

class Translator {
  constructor() {
    this.lang = this.detectLanguage();
    document.documentElement.lang = this.lang;
  }

  detectLanguage() {
    const browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  }

  t(key) {
    return translations[this.lang][key] || translations['en'][key] || key;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    document.title = this.t('title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = this.t('description');
  }
}