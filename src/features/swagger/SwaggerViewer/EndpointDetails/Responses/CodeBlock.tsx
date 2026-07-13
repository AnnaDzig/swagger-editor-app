import { Check, Copy } from 'lucide-react';
import { renderJSON } from './renderJSON';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

function CodeBlock({ content }: { content: string }) {
  const [isCopied, copy] = useCopyToClipboard();

  return (
    <div className="relative rounded-md overflow-hidden group bg-[#0d1117] border-[#30363d]">
      <button
        onClick={() => copy(content)}
        className="absolute top-2 right-2 flex items-center gap-1 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-[#30363d] bg-[#1c2128]"
        style={{ color: isCopied ? '#56d364' : '#8b949e' }}
      >
        {isCopied ? <Check size={9} /> : <Copy size={9} />}
        {isCopied ? 'Copied' : 'Copy'}
      </button>
      <pre className="text-[11px] overflow-auto leading-relaxed text-[#e6edf3] font-mono scrollbar-thin">
        {content.split('\n').map((ln, i) => (
          <div key={i}>{renderJSON(ln)}</div>
        ))}
      </pre>
    </div>
  );
}

export default CodeBlock;
