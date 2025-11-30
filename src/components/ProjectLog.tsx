import React from 'react';
import DecodingText from './ui/DecodingText';
import { useApp } from '../context/AppContext';

const ProjectLog: React.FC = () => {
  const { t } = useApp();

  const projects = [
    {
      id: '0x01',
      name: t('portfolio.p1'),
      status: t('portfolio.s_completed'),
      type: 'WEB_APP',
      metrics: ['React', 'D3.js', 'Node'],
      date: '2024-03-15'
    },
    {
      id: '0x02',
      name: t('portfolio.p2'),
      status: t('portfolio.s_online'),
      type: 'AUTOMATION',
      metrics: ['Python', 'AWS', 'WebSockets'],
      date: '2024-02-28'
    },
    {
      id: '0x03',
      name: t('portfolio.p3'),
      status: t('portfolio.s_deployed'),
      type: 'PLATFORM',
      metrics: ['Next.js', 'Stripe', 'Redis'],
      date: '2024-01-10'
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden transition-colors">
      {/* Decorative vertical lines */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-neutral-900 hidden md:block opacity-50"></div>
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-neutral-900 hidden md:block opacity-50"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-12 border-b border-neutral-800 pb-4">
           <div>
             <h2 className="text-2xl font-bold text-white font-mono">
               <DecodingText text={t('portfolio.header')} />
             </h2>
             <span className="text-xs text-neutral-500 font-mono">{t('portfolio.sub')}</span>
           </div>
           <div className="hidden sm:block text-xs text-cyber-green font-mono animate-pulse">
             ● {t('portfolio.live')}
           </div>
        </div>

        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-mono text-neutral-600 uppercase tracking-wider px-4">
             <div className="col-span-1">{t('portfolio.col_id')}</div>
             <div className="col-span-4">{t('portfolio.col_name')}</div>
             <div className="col-span-2">{t('portfolio.col_status')}</div>
             <div className="col-span-3">{t('portfolio.col_stack')}</div>
             <div className="col-span-2 text-right">{t('portfolio.col_time')}</div>
          </div>

          {projects.map((project) => (
            <div 
              key={project.id}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border border-neutral-900 bg-neutral-900/20 hover:bg-neutral-900/50 hover:border-cyber-green/30 transition-all font-mono items-center"
            >
              <div className="col-span-1 text-neutral-500 text-xs">{project.id}</div>
              <div className="col-span-4 text-white font-bold text-lg md:text-base group-hover:text-cyber-green transition-colors">
                <DecodingText text={project.name} triggerOnHover={true} />
              </div>
              <div className="col-span-2">
                <span className={`text-xs px-2 py-1 ${project.status === t('portfolio.s_online') ? 'bg-violet-900/30 text-violet-400' : 'bg-neutral-800 text-neutral-300'}`}>
                  {project.status}
                </span>
              </div>
              <div className="col-span-3 text-xs text-neutral-400 flex gap-2 flex-wrap">
                 {project.metrics.map(m => (
                   <span key={m} className="before:content-['#']">{m}</span>
                 ))}
              </div>
              <div className="col-span-2 text-right text-xs text-neutral-600">
                {project.date}
              </div>
            </div>
          ))}

          <div className="p-4 text-center border border-dashed border-neutral-800 text-neutral-600 font-mono text-sm hover:text-cyber-green hover:border-cyber-green transition-colors cursor-pointer bg-neutral-900/10">
             {t('portfolio.load_more')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectLog;