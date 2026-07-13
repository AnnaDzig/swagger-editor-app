import { Editor } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { Check, Copy } from 'lucide-react';

interface ResultEditorProps {
  appType: string;
  onCopy: () => void;
  isCopied: boolean;
  onEditorWillMount: (monaco: typeof import('monaco-editor')) => void;
  responseBody: string;
  onMount: (editor: Monaco.editor.IStandaloneCodeEditor) => void;
}

const ResultEditor = ({
  appType,
  onCopy,
  isCopied,
  onEditorWillMount,
  responseBody,
  onMount,
}: ResultEditorProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] text-[#484f58] font-mono">{appType}</span>

        <button
          onClick={onCopy}
          className="flex items-center gap-1 text-xs text-[#8b949e] hover:text-[#c9d1d9] transition-colors cursor-pointer"
        >
          {isCopied ? (
            <>
              <Check size={13} className="text-[#56d364]" />
              <span className="text-[#56d364]">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="border border-[#30363D] rounded-md bg-[#161B22] px-3">
        <Editor
          beforeMount={onEditorWillMount}
          theme="swagger-dark"
          language="json"
          value={responseBody}
          onMount={onMount}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            lineNumbers: 'off',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            scrollBeyondLastLine: false,
            renderLineHighlight: 'none',
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'auto',
            },
            padding: {
              top: 12,
              bottom: 12,
            },
          }}
        />
      </div>
    </>
  );
};

export default ResultEditor;
