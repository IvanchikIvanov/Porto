import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ru';
type Theme = 'dark' | 'light';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.services': './services',
    'nav.portfolio': './portfolio',
    'nav.contact': './contact',
    'nav.status': 'SYSTEM: SECURE',
    'nav.core': 'CORE: ACTIVE',
    'nav.mobile_status': 'STATUS: ONLINE',
    
    'hero.cmd': 'initialize_sequence.sh',
    'hero.digital': 'DIGITAL',
    'hero.reality': 'REALITY',
    'hero.architects': 'MASTER',
    'hero.desc': '// We craft high-performance web applications, telegram bots, and digital ecosystems. No fluff, just pure code and aesthetics.',
    'hero.btn_start': './START_PROJECT',
    'hero.btn_docs': 'read_docs.md',
    'hero.clean_code': 'CLEAN_CODE',
    'hero.scalable': 'SCALABLE',
    'hero.global': 'GLOBAL',
    'hero.code_ready': '// Ready to deploy...',

    'services.header_cmd': 'ls -la ./services',
    'services.header_desc': 'Listing available modules... All systems operational. Select a capability to expand your digital infrastructure.',
    'services.web': 'WEB_APPLICATIONS',
    'services.web_desc': 'Full-stack solutions using React, Node.js, and modern architecture. Single Page Applications that feel native.',
    'services.bot': 'TELEGRAM_BOTS',
    'services.bot_desc': 'Complex automation bots, shop-bots, and AI-powered assistants integrated directly into Telegram.',
    'services.ui': 'UI/UX_DESIGN',
    'services.ui_desc': 'Digital product design focused on conversion and aesthetic. Dark mode first, always.',
    'services.ai': 'AI_INTEGRATION',
    'services.ai_desc': 'Leveraging LLMs and Neural Networks to make your business smarter. Custom RAG solutions.',
    'services.game': 'GAME_DEV',
    'services.game_desc': 'Browser-based games and interactive experiences to engage your audience.',
    'services.smart': 'SMART_CONTRACTS',
    'services.smart_desc': 'Web3 development, tokenomics, and secure blockchain integration on ETH/SOL.',

    'portfolio.header': 'EXECUTION_LOGS',
    'portfolio.sub': 'Displaying recent successful deployments',
    'portfolio.live': 'LIVE_FEED',
    'portfolio.col_id': 'ID',
    'portfolio.col_name': 'PROJECT_NAME',
    'portfolio.col_status': 'STATUS',
    'portfolio.col_stack': 'STACK',
    'portfolio.col_time': 'TIMESTAMP',
    'portfolio.load_more': '[ LOAD_MORE_RECORDS ]',
    'portfolio.p1': 'FINTECH_DASHBOARD',
    'portfolio.p2': 'CRYPTO_TRADING_BOT',
    'portfolio.p3': 'E-COMMERCE_V2',
    'portfolio.s_completed': 'COMPLETED',
    'portfolio.s_online': 'ONLINE',
    'portfolio.s_deployed': 'DEPLOYED',

    'footer.title_pre': 'READY TO',
    'footer.title_highlight': 'INITIATE',
    'footer.desc': 'Establish a secure connection with our team. We respond to all signals within 24 hours.',
    'footer.ph_name': 'Enter identifier (Name)',
    'footer.ph_email': 'Enter comms channel (Email)',
    'footer.ph_msg': 'Enter mission parameters...',
    'footer.btn_send': 'TRANSMIT_DATA',
    'footer.rights': '© 2024 SITEBERRY.PRO // ALL RIGHTS RESERVED'
  },
  ru: {
    'nav.services': './услуги',
    'nav.portfolio': './портфолио',
    'nav.contact': './контакты',
    'nav.status': 'СИСТЕМА: ЗАЩИЩЕНА',
    'nav.core': 'ЯДРО: АКТИВНО',
    'nav.mobile_status': 'СТАТУС: ОНЛАЙН',
    
    'hero.cmd': 'запуск_последовательности.sh',
    'hero.digital': 'ЦИФРОВАЯ',
    'hero.reality': 'РЕАЛЬНОСТЬ',
    'hero.architects': 'МАСТЕР',
    'hero.desc': '// Мы создаем высокопроизводительные веб-приложения, телеграм-ботов и цифровые экосистемы. Никакой воды, только чистый код и эстетика.',
    'hero.btn_start': './НАЧАТЬ_ПРОЕКТ',
    'hero.btn_docs': 'читать_док.md',
    'hero.clean_code': 'ЧИСТЫЙ_КОД',
    'hero.scalable': 'МАСШТАБИРУЕМОСТЬ',
    'hero.global': 'ГЛОБАЛЬНОСТЬ',
    'hero.code_ready': '// Готовность к деплою...',

    'services.header_cmd': 'ls -la ./услуги',
    'services.header_desc': 'Список доступных модулей... Все системы работают. Выберите возможность для расширения вашей цифровой инфраструктуры.',
    'services.web': 'ВЕБ_ПРИЛОЖЕНИЯ',
    'services.web_desc': 'Full-stack решения на React, Node.js и современной архитектуре. SPA, которые ощущаются как нативные приложения.',
    'services.bot': 'ТЕЛЕГРАМ_БОТЫ',
    'services.bot_desc': 'Сложные боты автоматизации, магазины и AI-ассистенты, интегрированные прямо в Telegram.',
    'services.ui': 'UI/UX_ДИЗАЙН',
    'services.ui_desc': 'Дизайн цифровых продуктов, ориентированный на конверсию и эстетику. Dark mode first.',
    'services.ai': 'AI_ИНТЕГРАЦИЯ',
    'services.ai_desc': 'Использование LLM и нейросетей для вашего бизнеса. Кастомные RAG решения.',
    'services.game': 'ГЕЙМ_ДЕВ',
    'services.game_desc': 'Браузерные игры и интерактивные возможности для вовлечения вашей аудитории.',
    'services.smart': 'СМАРТ_КОНТРАКТЫ',
    'services.smart_desc': 'Web3 разработка, токеномика и безопасная интеграция блокчейна на ETH/SOL.',

    'portfolio.header': 'ЖУРНАЛ_ИСПОЛНЕНИЯ',
    'portfolio.sub': 'Отображение последних успешных развертываний',
    'portfolio.live': 'ПРЯМОЙ_ЭФИР',
    'portfolio.col_id': 'ID',
    'portfolio.col_name': 'ПРОЕКТ',
    'portfolio.col_status': 'СТАТУС',
    'portfolio.col_stack': 'СТЕК',
    'portfolio.col_time': 'ВРЕМЯ',
    'portfolio.load_more': '[ ЗАГРУЗИТЬ_ЕЩЕ ]',
    'portfolio.p1': 'ФИНТЕХ_ДАШБОРД',
    'portfolio.p2': 'КРИПТО_БОТ',
    'portfolio.p3': 'E-COMMERCE_V2',
    'portfolio.s_completed': 'ЗАВЕРШЕН',
    'portfolio.s_online': 'ОНЛАЙН',
    'portfolio.s_deployed': 'ЗАДЕПЛОЕН',

    'footer.title_pre': 'ГОТОВЫ',
    'footer.title_highlight': 'НАЧАТЬ',
    'footer.desc': 'Установите защищенное соединение с нашей командой. Мы отвечаем на все сигналы в течение 24 часов.',
    'footer.ph_name': 'Введите идентификатор (Имя)',
    'footer.ph_email': 'Канал связи (Email)',
    'footer.ph_msg': 'Параметры миссии...',
    'footer.btn_send': 'ПЕРЕДАТЬ_ДАННЫЕ',
    'footer.rights': '© 2024 SITEBERRY.PRO // ВСЕ ПРАВА ЗАЩИЩЕНЫ'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Apply theme to HTML element
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
