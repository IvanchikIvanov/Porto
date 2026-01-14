import React, { useState } from 'react';
import TerminalBox from './ui/TerminalBox';
import DecodingText from './ui/DecodingText';
import CaseStudyModal from './ui/CaseStudyModal';
import { ExternalLink, Globe, Eye, Server } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const Works: React.FC = () => {
  const { t } = useApp();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Cast to any[] to safely map over translated items
  const worksList = t('works.items') as any[];

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
          <div className="space-y-8">
            {Array.isArray(worksList) && worksList.map((work, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.01,
                  rotateX: 1,
                  rotateY: 1,
                  transition: { duration: 0.2 }
                }}
                className="perspective-1000"
                onClick={() => setSelectedProject(work)}
              >
                <div className="cursor-pointer">
                  <TerminalBox
                    title={`case_${index + 1}.log`}
                    className="group shadow-2xl hover:shadow-cyber-green/20 transition-all border-neutral-800 hover:border-cyber-green/50"
                    borderColor={index === 0 ? 'green' : 'gray'}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-neutral-900 border border-neutral-800 group-hover:border-cyber-green transition-colors rounded">
                        <Globe className="w-6 h-6 text-cyber-green" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-neutral-500 bg-neutral-900 px-2 py-1 rounded border border-neutral-800 group-hover:text-white transition-colors">
                          <Eye className="w-3 h-3" />
                          <span>View Case</span>
                        </div>
                        <div className="text-xs text-neutral-600 font-mono">Status: PROD</div>
                      </div>
                    </div>
                    <h3 className="text-xl text-white font-bold font-mono mb-3 group-hover:text-cyber-green transition-colors">
                      <DecodingText
                        text={work.title}
                        triggerOnHover={true}
                        scrambleClassName="text-cyber-accent"
                      />
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {work.description}
                    </p>
                    <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                      <code className="text-xs text-blue-400 bg-black/10 px-2 py-1 block w-fit font-mono">
                        &gt; {work.tech}
                      </code>
                      <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-cyber-green transition-colors" />
                    </div>
                  </TerminalBox>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right column - Descriptions & Context */}
          <div className="space-y-12 sticky top-24">
            <div className="bg-neutral-900/50 p-6 border border-neutral-800 rounded-lg backdrop-blur-sm">
              <h3 className="text-white font-bold mb-4 font-mono flex items-center gap-2">
                <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></span>
                SYSTEM_STATUS
              </h3>
              <div className="space-y-4 text-sm font-mono text-neutral-400">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span>DEPLOYED_PROJECTS</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span>AVG_PERFORMANCE</span>
                  <span className="text-green-400">99/100</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span>SERVER_LOAD</span>
                  <span className="text-blue-400">42%</span>
                </div>
                <div className="flex justify-between">
                  <span>LAST_COMMIT</span>
                  <span className="text-white">TODAY</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <h3 className="text-neutral-500 font-mono text-sm mb-4 uppercase tracking-wider">Production Timeline</h3>
              <div className="border-l-2 border-neutral-800 pl-6 space-y-8">
                {Array.isArray(worksList) && worksList.map((work, index) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 ${index === 0 ? 'bg-cyber-green border-cyber-green' : 'bg-neutral-900 border-neutral-700'}`}></div>
                    <div className="text-sm text-neutral-400 font-mono mb-1">
                      2025.Q{Math.max(1, 4 - index)}
                    </div>
                    <div className="text-white font-bold">{work.title}</div>
                    <div className="text-xs text-neutral-600 mt-1 line-clamp-1">{work.tech}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <CaseStudyModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default Works;
