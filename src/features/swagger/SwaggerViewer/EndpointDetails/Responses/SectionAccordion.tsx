import React, { useState } from 'react';

import { ChevronDown, ChevronRight } from 'lucide-react';

import Span from '../../Span';

interface SectionAccordionProps {
  title: string;
  value: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SectionAccordion = ({
  title,
  value,
  badge,
  children,
}: SectionAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeColor = isOpen ? '#e6edf3' : '#8b949e';

  return (
    <div className="w-full bg-[#0D1117] px-3 py-2 space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center font-medium text-left text-xs gap-1.5 py-1.5 transition-colors cursor-pointer"
      >
        {isOpen ? (
          <ChevronDown size={12} color={activeColor} />
        ) : (
          <ChevronRight size={12} color="#8b949e" />
        )}

        <div className="flex justify-between w-full">
          <span
            className="text-[12px] text-[#8b949e] font-bold"
            style={{ color: activeColor }}
          >
            {title}
          </span>
          {value && (
            <Span color="#8b949e" borderColor="#232933" bg="#12161D">
              {value}
            </Span>
          )}
        </div>

        {badge && (
          <span className="ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded border">
            {badge}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="border border-[#30363D] rounded-sm py-4 px-3 mt-1.5">
          <pre>{children}</pre>
        </div>
      )}
    </div>
  );
};

export default SectionAccordion;
