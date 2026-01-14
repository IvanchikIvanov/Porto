import React from 'react';
import DecodingText from './ui/DecodingText';
import { useApp } from '../context/AppContext';
import { Code2, Bot, Palette, Cpu, Gamepad2, Brain, Zap, Shield, Globe } from 'lucide-react';

const ProjectLog: React.FC = () => {
  const { t, language } = useApp();

  const expertiseBlocks = language === 'ru' ? [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Разработка Telegram-ботов",
      text: "Создаём мощные Telegram боты на Python с интеграцией искусственного интеллекта. AI telegram bot для автоматизации бизнес-процессов, shop bot telegram для e-commerce, голосовые боты ИИ и telegram mini app разработка. Наши боты обрабатывают платежи, управляют пользователями и интегрируются с любыми API."
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Full-Stack Веб-Разработка",
      text: "High-performance web app на React, Next.js и Node.js. Разработка SPA с серверным рендерингом, оптимизацией Core Web Vitals и SEO. Fullstack react node js архитектура для масштабируемых систем. Мы строим приложения, которые выдерживают высокие нагрузки и работают без лагов."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "UI/UX Дизайн Dark Mode First",
      text: "Конверсионный UI/UX design dark mode с фокусом на эстетику и usability. Figma to React — пиксельное воплощение дизайна в код. Modern ui designer подход: минимализм, плавные анимации, глитч-эффекты и экспериментальные интерфейсы. Aesthetic web design для стартапов и криптопроектов."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Интеграция ИИ и Нейросетей",
      text: "Интеграция LLM (GPT, Claude, DeepSeek) в ваши продукты. RAG custom solution для создания умных баз знаний. AI в бизнес: чат-боты, автоматизация поддержки, генерация контента. Neural networks web app — внедрение машинного обучения прямо в браузер."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Web3 и Смарт-Контракты",
      text: "Smart contract разработка на Solidity и Rust для Ethereum и Solana. Web3 developer eth sol с опытом в DeFi и NFT. Tokenomics development, аудит безопасности контрактов, интеграция кошельков (RainbowKit, Wagmi). Blockchain integration web для вашего dApp."
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Браузерные Игры и WebGL",
      text: "Browser game development на Three.js и React Three Fiber. Иммерсивные 3D-миры прямо в браузере без установки. Experimental UI R&D: физические симуляции, партикл-системы, шейдерные эффекты. Создаём игровые механики для маркетинговых кампаний и геймификации."
    }
  ] : [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Telegram Bot Development",
      text: "We build powerful Telegram bots with Python and AI integration. AI-powered telegram bots for business automation, shop bots for e-commerce, voice AI bots, and telegram mini app development. Our bots handle payments, manage users, and integrate with any API."
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Full-Stack Web Development",
      text: "High-performance web apps using React, Next.js, and Node.js. SPA development with server-side rendering, Core Web Vitals optimization, and SEO dominance. Fullstack react node js architecture for scalable systems that handle high loads without lag."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "UI/UX Design Dark Mode First",
      text: "Conversion-focused UI/UX design with dark mode aesthetics. Figma to React with pixel-perfect precision. Modern UI designer approach: minimalism, fluid animations, glitch effects, and experimental interfaces. Aesthetic web design for startups and crypto projects."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI & Neural Network Integration",
      text: "LLM integration (GPT, Claude, DeepSeek) into your products. Custom RAG solutions for smart knowledge bases. AI in business: chatbots, support automation, content generation. Neural networks web app — machine learning directly in the browser."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Web3 & Smart Contracts",
      text: "Smart contract development in Solidity and Rust for Ethereum and Solana. Web3 developer with DeFi and NFT experience. Tokenomics development, security audits, wallet integration (RainbowKit, Wagmi). Blockchain integration for your dApp."
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Browser Games & WebGL",
      text: "Browser game development using Three.js and React Three Fiber. Immersive 3D worlds directly in the browser. Experimental UI R&D: physics simulations, particle systems, shader effects. Game mechanics for marketing campaigns and gamification."
    }
  ];

  return (
    <section id="about" className="py-24 bg-cyber-gray/20 relative overflow-hidden transition-colors">
      {/* Decorative */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-neutral-900 hidden md:block opacity-50"></div>
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-neutral-900 hidden md:block opacity-50"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white font-mono mb-4">
            <span className="text-cyber-green">$</span> <DecodingText text={language === 'ru' ? "cat ./expertise.md" : "cat ./expertise.md"} />
          </h2>
          <p className="text-neutral-400 font-mono max-w-2xl mx-auto">
            {language === 'ru'
              ? "Глубокая экспертиза в ключевых технологиях. Clean code, scalable architecture, no fluff — pure aesthetics."
              : "Deep expertise in key technologies. Clean code, scalable architecture, no fluff — pure aesthetics."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseBlocks.map((block, index) => (
            <article key={index} className="p-6 bg-neutral-900/30 border border-neutral-800 hover:border-cyber-green/30 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyber-green/10 text-cyber-green border border-cyber-green/20 rounded">
                  {block.icon}
                </div>
                <h3 className="text-white font-bold font-mono group-hover:text-cyber-green transition-colors">
                  {block.title}
                </h3>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {block.text}
              </p>
            </article>
          ))}
        </div>

        {/* Extra SEO text block */}
        <div className="mt-16 p-8 bg-neutral-900/50 border border-neutral-800 rounded-lg">
          <h3 className="text-xl font-bold text-white font-mono mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyber-green" />
            {language === 'ru' ? "Почему выбирают Siteberry?" : "Why Choose Siteberry?"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-400">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-cyber-green flex-shrink-0 mt-1" />
              <p>{language === 'ru'
                ? "100% чистый код без legacy-багажа. Мы пишем масштабируемые системы с первого дня."
                : "100% clean code with no legacy baggage. We write scalable systems from day one."}</p>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-cyber-green flex-shrink-0 mt-1" />
              <p>{language === 'ru'
                ? "Работаем глобально, remote-first подход. Клиенты из России, Европы, США и Азии."
                : "Working globally with a remote-first approach. Clients from Russia, Europe, USA, and Asia."}</p>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-cyber-green flex-shrink-0 mt-1" />
              <p>{language === 'ru'
                ? "High-performance deployment: 99.9% uptime, CDN-доставка, оптимизация под Core Web Vitals."
                : "High-performance deployment: 99.9% uptime, CDN delivery, Core Web Vitals optimization."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectLog;