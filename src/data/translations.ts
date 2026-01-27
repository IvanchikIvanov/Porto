export const translations = {
    en: {
        nav: {
            services: '. /SERVICES',
            portfolio: '. /PORTFOLIO',
            contact: '. /CONTACT',
            status: 'SYSTEM: SECURE',
            core: 'CORE: ACTIVE',
            mobile_status: 'SYS_Integrity: 100%'
        },
        meta: {
            title: "Siteberry // Digital Production Studio // Web3 & AI",
            description: "High-performance web applications, AI-integrated Telegram bots, and experimental UI design. Smart contracts, full-stack development, and pure code aesthetics.",
            keywords: "web development, telegram bots, AI integration, smart contracts, web3, ui/ux design, dark mode, react, node.js, high performance"
        },
        hero: {
            cmd: "init_sequence.sh",
            digital: "DIGITAL",
            reality: "REALITY",
            architects: "MASTERS",
            desc: "We engineer high-performance web systems, decentralized networks, and AI-driven ecosystems. No corporate fluff—just pure code, scalable architecture, and radical aesthetics.",
            btn_start: "./START_PROJECT",
            btn_docs: "read_docs.md",
            clean_code: "CLEAN_CODE",
            scalable: "SCALABLE",
            global: "GLOBAL"
        },
        services: {
            header_cmd: "ls -la ./services",
            header_desc: "Full-cycle production: from R&D to deployment. We build tools that define the future.",
            items: [
                {
                    id: "web",
                    icon: "Layout",
                    title: "Web Applications",
                    desc: "SPA / PWA / SSR",
                    command: "./deploy_web.sh",
                    full_desc: "High-load React/Next.js applications with optimized rendering paths. We build scalable microservices architectures using Node.js and Bun. Focus on Core Web Vitals and SEO dominance."
                },
                {
                    id: "bots",
                    icon: "Bot",
                    title: "Telegram Bots & AI",
                    desc: "Automation / Mini Apps",
                    command: "./init_bot.py",
                    full_desc: "Complex Telegram Mini Apps (TMA) with React interfaces. Python-based backends handling payment gateways, AI (LLM/RAG) integration, and user flow automation."
                },
                {
                    id: "ui",
                    icon: "Palette",
                    title: "UI/UX Design",
                    desc: "Dark Mode First",
                    command: "./render_ui.css",
                    full_desc: "Experimental interfaces with fluid animations (Framer Motion, GSAP). Dark mode navigation, glitch effects, and data visualization. Figma to Code with pixel-perfect precision."
                },
                {
                    id: "web3",
                    icon: "Cpu",
                    title: "Web3 & Smart Contracts",
                    desc: "Solidity / Rust",
                    command: "./deploy_contract.sol",
                    full_desc: "Secure smart contract development for Ethereum and Solana. Tokenomics architecture, dApp integration, wallet connections (RainbowKit, Wagmi), and auditing."
                },
                {
                    id: "gamedev",
                    icon: "Gamepad",
                    title: "Browser Games",
                    desc: "WebGL / Three.js",
                    command: "./start_engine.exe",
                    full_desc: "Immersive browser-based gaming experiences using Three.js and React Three Fiber. Performance-optimized shaders and physics engines for the web."
                },
                {
                    id: "ai",
                    icon: "Brain",
                    title: "AI Integration",
                    desc: "LLM / RAG / Agents",
                    command: "./train_model.py",
                    full_desc: "Custom AI solutions for business logic. RAG systems for knowledge bases, autonomous agents, and neural network integration into existing web platforms."
                }
            ]
        },
        works: {
            header_cmd: "cat ./portfolio.log",
            header_desc: "Selected commercial cases and R&D experiments. Proven results in production environments.",
            items: [
                {
                    title: 'Geo Transport',
                    description: 'Logistics aggregator platform. Real-time cargo tracking, map integration, and automated routing.',
                    url: 'https://geo-transport.ru/',
                    tech: 'React, TypeScript, Node.js',
                    challenge: 'Creating a real-time tracking system for 50k+ daily shipments while maintaining 60fps performance on mobile devices.',
                    solution: 'Implemented WebSocket connections for live updates, optimized map rendering using WebGL, and built a custom caching layer.'
                },
                {
                    title: 'Crypto Exchange Bot',
                    description: 'Telegram Mini App for P2P crypto trading. Secure escrow and wallet management.',
                    url: '#',
                    tech: 'Python, Aiogram, TON SDK',
                    challenge: 'Ensuring 100% security for transactions and handling high concurrency during market volatility.',
                    solution: 'Developed a microservices architecture with isolated payment modules and automated dispute resolution via AI.'
                },
                {
                    title: 'Neon DeFi Dashboard',
                    description: 'Analytics dashboard for high-frequency traders. Dark mode UI with real-time charts.',
                    url: '#',
                    tech: 'Next.js, D3.js, Tailwind',
                    challenge: 'Visualizing massive datasets without browser lag. Creating a "cyberpunk" feel without sacrificing usability.',
                    solution: 'Used Canvas API for heavy charting and implemented a custom design system with semantic color tokens.'
                },
                {
                    title: 'Sotovik',
                    description: 'Modern e-commerce platform for mobile phones. Sleek UI with dark/light theme toggle and product catalog.',
                    url: 'https://sotovik.vercel.app/',
                    tech: 'React, Vite, TypeScript, Tailwind',
                    challenge: 'Creating a fast, responsive e-commerce experience with seamless theme switching and optimized product filtering.',
                    solution: 'Built with Vite for instant HMR, implemented context-based theme management, and optimized image loading with lazy load.'
                }
            ]
        },
        footer: {
            contact: "CONTACT_US",
            rights: "ALL RIGHTS RESERVED",
            status: "SYSTEM STATUS: STABLE"
        },
        works: {
            view_case: "View Case",
            system_status: "SYSTEM_STATUS",
            deployed_projects: "DEPLOYED_PROJECTS",
            avg_performance: "AVG_PERFORMANCE",
            server_load: "SERVER_LOAD",
            last_commit: "LAST_COMMIT",
            production_timeline: "Production Timeline",
            case_study: "CASE STUDY",
            challenge: "Challenge",
            solution: "Solution",
            stack: "Stack",
            visit_site: "Visit Site",
            project_preview: "[PROJECT PREVIEW IMAGE]"
        },
        showcase: {
            badge: "Interactive Experience",
            title_1: "CREATIVE",
            title_2: "SURFACE",
            desc: "Touch the void. A high-performance Navier-Stokes fluid solver running directly in your browser. Move your cursor to paint with light and gravity.",
            webgl: "WebGL 2.0",
            fps: "60 FPS SIM",
            bloom: "BLOOM FX",
            move_to_interact: "Move to interact",
            fluid_buffer: "0x42 / FLUID_BUFFER_ALPHA",
            stable_solver: "STABLE_SOLVER_V2.1",
            latency: "LATENCY: 1.4MS",
            redesign: "RE_DESIGN_2026"
        },
        playground: {
            badge: "EXPERIMENTAL // R&D",
            title_1: "THE",
            title_2: "LAB",
            desc: "A collection of UI experiments, physics simulations, and interaction patterns not suitable for standard production.",
            magnet_title: "magnet_physics.ts",
            glitch_title: "visual_distortion.glsl",
            geometry_title: "geometry_morph.ts",
            fluid_title: "fluid_dynamics.glsl",
            fluid_hint: "Move Surface"
        }
    },
    ru: {
        nav: {
            services: '. /УСЛУГИ',
            portfolio: '. /ПОРТФОЛИО',
            contact: '. /КОНТАКТЫ',
            status: 'СИСТЕМА: ЗАЩИЩЕНА',
            core: 'ЯДРО: АКТИВНО',
            mobile_status: 'SYS_Integrity: 100%'
        },
        meta: {
            title: "Siteberry // Студия Цифрового Продакшена // Web3 & AI",
            description: "Разработка высоконагруженных веб-приложений, Telegram-ботов с ИИ и экспериментальных UI. Смарт-контракты, чистый код и эстетика киберпанка.",
            keywords: "разработка сайтов, telegram боты, искусственный интеллект, смарт-контракты, web3, ui/ux дизайн, react, node.js, высоконагруженные системы"
        },
        hero: {
            cmd: "init_sequence.sh",
            digital: "ЦИФРОВАЯ",
            reality: "РЕАЛЬНОСТЬ",
            architects: "МАСТЕРА",
            desc: "Мы создаём high-performance веб-системы, децентрализованные сети и ИИ-экосистемы. Никакой корпоративной воды — только чистый код, масштабируемая архитектура и радикальная эстетика.",
            btn_start: "./ЗАПУСТИТЬ",
            btn_docs: "читай_док.md",
            clean_code: "ЧИСТЫЙ_КОД",
            scalable: "МАСШТАБИРУЕМО",
            global: "ГЛОБАЛЬНО"
        },
        services: {
            header_cmd: "ls -la ./services",
            header_desc: "Полный цикл продакшена: от R&D до деплоя. Мы создаём инструменты, определяющие будущее.",
            items: [
                {
                    id: "web",
                    icon: "Layout",
                    title: "Веб-Приложения",
                    desc: "SPA / PWA / SSR",
                    command: "./deploy_web.sh",
                    full_desc: "High-load приложения на React/Next.js с оптимизированным рендерингом. Строим масштабируемые микросервисы на Node.js и Bun. Фокус на Core Web Vitals и SEO доминировании."
                },
                {
                    id: "bots",
                    icon: "Bot",
                    title: "Telegram Боты и ИИ",
                    desc: "Автоматизация / Mini Apps",
                    command: "./init_bot.py",
                    full_desc: "Сложные Telegram Mini Apps (TMA) с React-интерфейсами. Python-бекенды, интеграция платежей, внедрение ИИ (LLM/RAG) и полная автоматизация пользовательских путей."
                },
                {
                    id: "ui",
                    icon: "Palette",
                    title: "UI/UX Дизайн",
                    desc: "Dark Mode First",
                    command: "./render_ui.css",
                    full_desc: "Экспериментальные интерфейсы с плавной анимацией (Framer Motion, GSAP). Dark mode навигация, глитч-эффекты и визуализация данных. Figma to Code с пиксельной точностью."
                },
                {
                    id: "web3",
                    icon: "Cpu",
                    title: "Web3 и Смарт-Контракты",
                    desc: "Solidity / Rust",
                    command: "./deploy_contract.sol",
                    full_desc: "Безопасные смарт-контракты для Ethereum и Solana. Архитектура токеномики, интеграция dApps, подключение кошельков (RainbowKit, Wagmi) и аудит безопасности."
                },
                {
                    id: "gamedev",
                    icon: "Gamepad",
                    title: "Браузерные Игры",
                    desc: "WebGL / Three.js",
                    command: "./start_engine.exe",
                    full_desc: "Иммерсивные игровые миры прямо в браузере на Three.js и React Three Fiber. Оптимизированные шейдеры и физические движки для веба."
                },
                {
                    id: "ai",
                    icon: "Brain",
                    title: "Интеграция ИИ",
                    desc: "LLM / RAG / Агенты",
                    command: "./train_model.py",
                    full_desc: "Кастомные ИИ-решения для бизнес-логики. RAG-системы для баз знаний, автономные агенты и внедрение нейросетей в существующие веб-платформы."
                }
            ]
        },
        works: {
            header_cmd: "cat ./portfolio.log",
            header_desc: "Избранные коммерческие кейсы и R&D эксперименты. Доказанные результаты в продакшене.",
            items: [
                {
                    title: 'Geo Transport',
                    description: 'Логистический агрегатор. Real-time трекинг грузов, интеграция карт и автоматическая маршрутизация.',
                    url: 'https://geo-transport.ru/',
                    tech: 'React, TypeScript, Node.js',
                    challenge: 'Создание системы трекинга для 50k+ ежедневных отправлений при сохранении 60fps на мобильных устройствах водителей.',
                    solution: 'Вдрили WebSocket для живых обновлений, оптимизировали рендеринг карт через WebGL и создали кастомный слой кеширования.'
                },
                {
                    title: 'Crypto Exchange Bot',
                    description: 'Telegram Mini App для P2P торговли криптой. Безопасный эскроу и управление кошельками.',
                    url: '#',
                    tech: 'Python, Aiogram, TON SDK',
                    challenge: 'Обеспечение 100% безопасности транзакций и обработка высокой конкурентности во время волатильности рынка.',
                    solution: 'Разработали микросервисную архитектуру с изолированными платежными модулями и авто-диспутами через ИИ.'
                },
                {
                    title: 'Neon DeFi Dashboard',
                    description: 'Аналитическая панель для трейдеров. Dark mode UI с графиками в реальном времени.',
                    url: '#',
                    tech: 'Next.js, D3.js, Tailwind',
                    challenge: 'Визуализация массивных датасетов без лагов браузера. Создание "киберпанк" атмосферы без ущерба юзабилити.',
                    solution: 'Использовали Canvas API для тяжелых графиков и внедрили дизайн-систему с семантическими токенами.'
                },
                {
                    title: 'Sotovik',
                    description: 'Современный e-commerce магазин мобильных телефонов. Стильный UI с переключением тёмной/светлой темы.',
                    url: 'https://sotovik.vercel.app/',
                    tech: 'React, Vite, TypeScript, Tailwind',
                    challenge: 'Создание быстрого, отзывчивого e-commerce с плавным переключением тем и оптимизированной фильтрацией товаров.',
                    solution: 'Использовали Vite для мгновенного HMR, контекст для управления темой и ленивую загрузку изображений.'
                }
            ]
        },
        footer: {
            contact: "CONTACT_US",
            rights: "ВСЕ ПРАВА ЗАЩИЩЕНЫ",
            status: "СТАТУС СИСТЕМЫ: НОРМА"
        },
        works: {
            view_case: "Смотреть кейс",
            system_status: "СТАТУС_СИСТЕМЫ",
            deployed_projects: "РАЗВЕРНУТО_ПРОЕКТОВ",
            avg_performance: "СРЕД_ПРОИЗВОДИТЕЛЬНОСТЬ",
            server_load: "НАГРУЗКА_СЕРВЕРА",
            last_commit: "ПОСЛЕДНИЙ_КОММИТ",
            production_timeline: "Временная шкала продакшена",
            case_study: "КЕЙС",
            challenge: "Задача",
            solution: "Решение",
            stack: "Стек",
            visit_site: "Открыть сайт",
            project_preview: "[ПРЕВЬЮ ПРОЕКТА]"
        },
        showcase: {
            badge: "Интерактивный опыт",
            title_1: "ТВОРЧЕСКАЯ",
            title_2: "ПОВЕРХНОСТЬ",
            desc: "Коснись пустоты. Высокопроизводительный решатель уравнений Навье-Стокса работает прямо в твоём браузере. Двигай курсором, чтобы рисовать светом и гравитацией.",
            webgl: "WebGL 2.0",
            fps: "60 FPS SIM",
            bloom: "BLOOM FX",
            move_to_interact: "Двигай для взаимодействия",
            fluid_buffer: "0x42 / FLUID_BUFFER_ALPHA",
            stable_solver: "STABLE_SOLVER_V2.1",
            latency: "ЗАДЕРЖКА: 1.4МС",
            redesign: "РЕДИЗАЙН_2026"
        },
        playground: {
            badge: "ЭКСПЕРИМЕНТАЛЬНО // R&D",
            title_1: "ЛАБОРАТОРИЯ",
            title_2: "",
            desc: "Коллекция UI-экспериментов, физических симуляций и паттернов взаимодействия, не подходящих для стандартного продакшена.",
            magnet_title: "magnet_physics.ts",
            glitch_title: "visual_distortion.glsl",
            geometry_title: "geometry_morph.ts",
            fluid_title: "fluid_dynamics.glsl",
            fluid_hint: "Двигай поверхность"
        }
    }
};
