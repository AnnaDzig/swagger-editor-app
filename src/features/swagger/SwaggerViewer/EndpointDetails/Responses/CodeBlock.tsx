import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { renderJSON } from './renderJSON';

function CodeBlock({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const lines = content.split('\n');

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="relative rounded-md overflow-hidden group"
      style={{ background: '#0d1117', borderColor: '#30363d' }}
    >
      <button
        onClick={copy}
        className="absolute top-2 right-2 flex items-center gap-1 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
        style={{
          background: '#1c2128',
          color: copied ? '#56d364' : '#8b949e',
          border: '1px solid #30363d',
        }}
      >
        {copied ? <Check size={9} /> : <Copy size={9} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre
        className="text-[11px] overflow-auto leading-relaxed"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          maxHeight: '220px',
          color: '#e6edf3',
          scrollbarWidth: 'thin',
          scrollbarColor: '#30363d transparent',
        }}
      >
        {lines.map((ln, i) => (
          <div key={i}>{renderJSON(ln)}</div>
        ))}
      </pre>
    </div>
  );
}

export default CodeBlock;
