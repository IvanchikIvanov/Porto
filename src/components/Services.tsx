import React from 'react';
import TerminalBox from './ui/TerminalBox';
import DecodingText from './ui/DecodingText';
import { Bot, Globe, Layers, Cpu, Gamepad2, Brain, Code2, LucideIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  Layout: Globe,
  Bot: Bot,
  Palette: Layers,
  Cpu: Code2,
  Gamepad: Gamepad2,
  Brain: Brain
};

const Services: React.FC = () => {
  const { t } = useApp();

  // Cast to specific type or any to avoid typescript errors during rapid prototyping
  const servicesList = t('services.items') as any[];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(servicesList) && servicesList.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Globe;

            return (
              <TerminalBox
                key={index}
                title={`module_${service.id}.js`}
                className="hover:translate-y-[-4px] transition-transform h-full group cursor-default shadow-lg hover:shadow-cyber-green/10"
                borderColor={index % 2 === 0 ? 'green' : 'gray'}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 group-hover:border-cyber-green transition-colors rounded-md">
                    <IconComponent className="w-6 h-6 text-cyber-green" />
                  </div>
                  <div className="text-xs text-neutral-600 font-mono">v{3}.{index}.{0}</div>
                </div>

                <h3 className="text-xl text-white font-bold font-mono mb-2 group-hover:text-cyber-green transition-colors min-h-[56px] flex items-end">
                  <DecodingText
                    text={service.title}
                    triggerOnHover={true}
                    scrambleClassName="text-cyber-accent"
                  />
                </h3>

                <p className="text-white/80 font-bold mb-2 text-sm">
                  {service.desc} //
                </p>

                <p className="text-neutral-400 text-sm mb-6 leading-relaxed h-[80px] overflow-hidden">
                  {service.full_desc}
                </p>

                <div className="pt-4 border-t border-neutral-800">
                  <code className="text-xs text-blue-400 bg-black/10 px-2 py-1 block w-fit font-mono">
                    &gt; {service.command}
                  </code>
                </div>
              </TerminalBox>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;