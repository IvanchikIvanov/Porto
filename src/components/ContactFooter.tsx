import React from 'react';
import { Send } from 'lucide-react';
import DecodingText from './ui/DecodingText';
import { useApp } from '../context/AppContext';

const ContactFooter: React.FC = () => {
  const { t } = useApp();

  return (
    <footer id="contact" className="bg-cyber-black border-t border-neutral-800 pt-20 pb-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-4xl font-bold text-white mb-6 font-mono">
          {t('footer.title_pre')} <span className="text-cyber-green"><DecodingText text={t('footer.title_highlight')} scrambleClassName="text-white" /></span>?
        </h2>
        <p className="text-neutral-400 mb-10 font-mono">
          {t('footer.desc')}
        </p>

        <form className="max-w-md mx-auto space-y-4 text-left">
           <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <span className="text-neutral-600 font-mono text-sm">&gt;</span>
             </div>
             <input 
               type="text" 
               placeholder={t('footer.ph_name')}
               className="block w-full pl-8 pr-3 py-3 bg-neutral-900/50 border border-neutral-800 text-white placeholder-neutral-600 font-mono focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-colors"
             />
           </div>

           <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <span className="text-neutral-600 font-mono text-sm">&gt;</span>
             </div>
             <input 
               type="email" 
               placeholder={t('footer.ph_email')}
               className="block w-full pl-8 pr-3 py-3 bg-neutral-900/50 border border-neutral-800 text-white placeholder-neutral-600 font-mono focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-colors"
             />
           </div>

           <div className="relative group">
             <div className="absolute top-3 left-3 pointer-events-none">
               <span className="text-neutral-600 font-mono text-sm">&gt;</span>
             </div>
             <textarea 
               rows={4}
               placeholder={t('footer.ph_msg')}
               className="block w-full pl-8 pr-3 py-3 bg-neutral-900/50 border border-neutral-800 text-white placeholder-neutral-600 font-mono focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-colors resize-none"
             ></textarea>
           </div>

           <button type="submit" className="w-full flex items-center justify-center gap-2 bg-cyber-green text-white font-bold font-mono py-3 hover:bg-neutral-300 hover:text-black transition-colors">
             <Send className="w-4 h-4" />
             {t('footer.btn_send')}
           </button>
        </form>

        <div className="mt-20 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 font-mono">
          <div>
            {t('footer.rights')}
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-cyber-green">GITHUB</a>
             <a href="#" className="hover:text-cyber-green">TELEGRAM</a>
             <a href="#" className="hover:text-cyber-green">TWITTER</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;