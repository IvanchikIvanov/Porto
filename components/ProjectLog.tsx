import React from 'react';
import DecodingText from './ui/DecodingText';

const projects = [
  {
    id: '0x01',
    name: 'FINTECH_DASHBOARD',
    status: 'COMPLETED',
    type: 'WEB_APP',
    metrics: ['React', 'D3.js', 'Node'],
    date: '2024-03-15'
  },
  {
    id: '0x02',
    name: 'CRYPTO_TRADING_BOT',
    status: 'ONLINE',
    type: 'AUTOMATION',
    metrics: ['Python', 'AWS', 'WebSockets'],
    date: '2024-02-28'
  },
  {
    id: '0x03',
    name: 'E-COMMERCE_V2',
    status: 'DEPLOYED',
    type: 'PLATFORM',
    metrics: ['Next.js', 'Stripe', 'Redis'],
    date: '2024-01-10'
  }
];

const ProjectLog: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-neutral-900 hidden md:block"></div>
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-neutral-900 hidden md:block"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-12 border-b border-neutral-800 pb-4">
           <div>
             <h2 className="text-2xl font-bold text-white font-mono">
               <DecodingText text="EXECUTION_LOGS" />
             </h2>
             <span className="text-xs text-neutral-500 font-mono">Displaying recent successful deployments</span>
           </div>
           <div className="hidden sm:block text-xs text-cyber-green font-mono animate-pulse">
             ● LIVE_FEED
           </div>
        </div>

        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-mono text-neutral-600 uppercase tracking-wider px-4">
             <div className="col-span-1">ID</div>
             <div className="col-span-4">PROJECT_NAME</div>
             <div className="col-span-2">STATUS</div>
             <div className="col-span-3">STACK</div>
             <div className="col-span-2 text-right">TIMESTAMP</div>
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
                <span className={`text-xs px-2 py-1 ${project.status === 'ONLINE' ? 'bg-violet-900/30 text-violet-400' : 'bg-neutral-800 text-neutral-300'}`}>
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

          <div className="p-4 text-center border border-dashed border-neutral-800 text-neutral-600 font-mono text-sm hover:text-cyber-green hover:border-cyber-green transition-colors cursor-pointer">
             [ LOAD_MORE_RECORDS ]
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectLog;