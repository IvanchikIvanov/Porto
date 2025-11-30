import React from 'react';
import TerminalBox from './ui/TerminalBox';
import DecodingText from './ui/DecodingText';
import { ExternalLink, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Work {
  title: string;
  description: string;
  url: string;
  tech: string;
}

const Works: React.FC = () => {
  const { t } = useApp();

  const works: Work[] = [
    {
      title: 'Geo Transport',
      description: 'Агрегатор транспортной логистики. Платформа для поиска и заказа грузоперевозок с интеграцией карт, системой отзывов и автоматическим подбором оптимальных маршрутов.',
      url: 'https://geo-transport.ru/',
      tech: 'React, TypeScript, Node.js'
    },
    {
      title: 'Project 2',
      description: 'Description of project 2',
      url: 'https://example.com',
      tech: 'Next.js, Tailwind'
    },
    {
      title: 'Project 3',
      description: 'Description of project 3',
      url: 'https://example.com',
      tech: 'Vue.js, Node.js'
    }
  ];

  return (
    <section id="works" className="py-24 bg-cyber-gray/30 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
           <h2 className="text-3xl font-bold text-white font-mono mb-4 flex items-center">
             <span className="text-cyber-green mr-2">$</span>
             <DecodingText text={t('works.header_cmd')} />
           </h2>
           <p className="text-neutral-400 font-mono max-w-2xl">
             {t('works.header_desc')}
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left column - Project cards */}
          <div className="space-y-6">
            {works.map((work, index) => (
              <a
                key={index}
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <TerminalBox 
                  title={`project_${index + 1}.js`}
                  className="hover:translate-y-[-4px] transition-transform group cursor-pointer"
                  borderColor={index === 1 ? 'green' : 'gray'}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-neutral-900 border border-neutral-800 group-hover:border-cyber-green transition-colors">
                      <Globe className="w-6 h-6 text-cyber-green" />
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-cyber-green transition-colors" />
                      <div className="text-xs text-neutral-600 font-mono">v1.0.0</div>
                    </div>
                  </div>
                  <h3 className="text-xl text-white font-bold font-mono mb-3 group-hover:text-cyber-green transition-colors">
                    <DecodingText 
                      text={work.title} 
                      triggerOnHover={true} 
                      scrambleClassName="text-cyber-accent"
                    />
                  </h3>
                  <div className="pt-4 border-t border-neutral-800">
                    <code className="text-xs text-blue-400 bg-black/10 px-2 py-1 block w-fit font-mono">
                      &gt; {work.tech}
                    </code>
                  </div>
                </TerminalBox>
              </a>
            ))}
          </div>

          {/* Right column - Descriptions */}
          <div className="space-y-6">
            {works.map((work, index) => (
              <div 
                key={index}
                className="flex flex-col justify-start"
                style={{ minHeight: '200px' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-neutral-500 font-mono">#{index + 1}</span>
                  <h3 className="text-lg text-white font-bold font-mono">
                    {work.title}
                  </h3>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4 font-mono">
                  {work.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                  <span className="text-cyber-green">→</span>
                  <a 
                    href={work.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-cyber-green transition-colors"
                  >
                    {work.url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Works;

