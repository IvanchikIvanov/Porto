import React from 'react';
import TerminalBox from './ui/TerminalBox';
import DecodingText from './ui/DecodingText';
import { Bot, Globe, Layers, Cpu, Code2, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Services: React.FC = () => {
  const { t } = useApp();

  const services = [
    {
      title: t('services.web'),
      icon: <Globe className="w-6 h-6 text-cyber-green" />,
      desc: t('services.web_desc'),
      cmd: 'npm run build:web'
    },
    {
      title: t('services.bot'),
      icon: <Bot className="w-6 h-6 text-cyber-green" />,
      desc: t('services.bot_desc'),
      cmd: 'python3 bot.py --start'
    },
    {
      title: t('services.ui'),
      icon: <Layers className="w-6 h-6 text-cyber-green" />,
      desc: t('services.ui_desc'),
      cmd: 'figma export --format=svg'
    },
    {
      title: t('services.ai'),
      icon: <Cpu className="w-6 h-6 text-cyber-green" />,
      desc: t('services.ai_desc'),
      cmd: 'import torch'
    },
    {
      title: t('services.game'),
      icon: <Smartphone className="w-6 h-6 text-cyber-green" />,
      desc: t('services.game_desc'),
      cmd: 'unity -batchmode'
    },
    {
      title: t('services.smart'),
      icon: <Code2 className="w-6 h-6 text-cyber-green" />,
      desc: t('services.smart_desc'),
      cmd: 'npx hardhat deploy'
    }
  ];

  return (
    <section id="services" className="py-24 bg-cyber-gray/30 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
           <h2 className="text-3xl font-bold text-white font-mono mb-4 flex items-center">
             <span className="text-cyber-green mr-2">$</span>
             <DecodingText text={t('services.header_cmd')} />
           </h2>
           <p className="text-neutral-400 font-mono max-w-2xl">
             {t('services.header_desc')}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <TerminalBox 
              key={index} 
              title={`mod_${index + 1}.js`}
              className="hover:translate-y-[-4px] transition-transform h-full group cursor-default"
              borderColor={index === 1 ? 'green' : 'gray'}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-neutral-900 border border-neutral-800 group-hover:border-cyber-green transition-colors">
                  {service.icon}
                </div>
                <div className="text-xs text-neutral-600 font-mono">v2.4.0</div>
              </div>
              <h3 className="text-xl text-white font-bold font-mono mb-3 group-hover:text-cyber-green transition-colors">
                <DecodingText 
                  text={service.title} 
                  triggerOnHover={true} 
                  scrambleClassName="text-cyber-accent"
                />
              </h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                {service.desc}
              </p>
              <div className="pt-4 border-t border-neutral-800">
                <code className="text-xs text-blue-400 bg-black/10 px-2 py-1 block w-fit font-mono">
                  &gt; {service.cmd}
                </code>
              </div>
            </TerminalBox>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;