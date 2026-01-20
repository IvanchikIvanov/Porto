import React from 'react';
import { Send, Github, Instagram, Mail, MessageCircle } from 'lucide-react';
import DecodingText from './ui/DecodingText';
import GlowingButton from './ui/GlowingButton';
import { useApp } from '../context/AppContext';

const ContactFooter: React.FC = () => {
  const { t, language } = useApp();

  return (
    <footer id="contact" className="bg-cyber-black border-t border-neutral-800 pt-20 pb-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h2 className="text-4xl font-bold text-white mb-6 font-mono">
          {language === 'ru' ? 'ГОТОВЫ' : 'READY TO'} <span className="text-cyber-primary"><DecodingText text={language === 'ru' ? 'НАЧАТЬ' : 'INITIATE'} scrambleClassName="text-white" /></span>?
        </h2>
        <p className="text-neutral-400 mb-10 font-mono max-w-xl mx-auto">
          {language === 'ru'
            ? "Напишите нам в Telegram или на почту. Мы отвечаем на все сообщения в течение 24 часов. Никакой воды — только конкретика и решения."
            : "Reach out via Telegram or email. We respond to all messages within 24 hours. No fluff — just specifics and solutions."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <GlowingButton
            href="https://t.me/We7drr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-3 font-bold font-mono">
              <Send className="w-5 h-5" />
              TELEGRAM
            </span>
          </GlowingButton>
          <a
            href="mailto:contact@siteberry.pro"
            className="flex items-center gap-3 px-8 py-4 border border-neutral-700 text-white font-mono hover:border-cyber-primary hover:text-cyber-primary transition-all rounded-full"
          >
            <Mail className="w-5 h-5" />
            EMAIL
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 font-mono">
          <div>
            © 2025 SITEBERRY.PRO // {language === 'ru' ? 'ВСЕ ПРАВА ЗАЩИЩЕНЫ' : 'ALL RIGHTS RESERVED'}
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/IvanchikIvanov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyber-primary transition-colors"><Github className="w-4 h-4" /> GITHUB</a>
            <a href="https://t.me/We7drr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyber-primary transition-colors"><Send className="w-4 h-4" /> TELEGRAM</a>
            <a href="https://www.instagram.com/aleksandr77698/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyber-primary transition-colors"><Instagram className="w-4 h-4" /> INSTAGRAM</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;