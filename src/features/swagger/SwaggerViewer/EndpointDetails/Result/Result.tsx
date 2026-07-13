import { Editor } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { Check, Copy } from 'lucide-react';
import ResultStatus from './ResultStatus';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

interface ApiResultAnalytics {
  duration: number;
}

interface ApiResult {
  status: number;
  headers: Record<string, string>;
  analytics: ApiResultAnalytics;
  data: unknown;
}

interface ResultProps {
  result: ApiResult | undefined;
  appType: string;
}

const handleEditorWillMount = (monaco: typeof import('monaco-editor')) => {
  monaco.editor.defineTheme('swagger-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      {
        token: '',
        foreground: 'A5D6FF',
      },
      {
        token: 'string',
        foreground: 'A5D6FF',
      },
      {
        token: 'number',
        foreground: 'A5D6FF',
      },
      {
        token: 'keyword',
        foreground: 'A5D6FF',
      },
    ],
    colors: {
      'editor.background': '#161B22',
      'editor.foreground': '#A5D6FF',
      'editor.lineHighlightBackground': '#161B22',
      'editor.selectionBackground': '#264F78',
      'editorCursor.foreground': '#A5D6FF',
    },
  });
};

const handleMount = (editor: Monaco.editor.IStandaloneCodeEditor) => {
  const height = editor.getContentHeight();

  editor.layout({
    width: editor.getLayoutInfo().width,
    height,
  });
};

const Result = ({ result, appType }: ResultProps) => {
  const [isCopied, copy] = useCopyToClipboard();

  if (!result) return null;

  const { status, analytics, data } = result;

  const responseBody = data ? JSON.stringify(data, null, 2) : '{}';

  const handleCopy = () => {
    copy(responseBody);
  };

  return (
    <section className="rounded-md overflow-hidden">
      <ResultStatus status={status} duration={analytics.duration} />

      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] text-[#484f58] font-mono">{appType}</span>

        <button
          onClick={handleCopy}
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
          beforeMount={handleEditorWillMount}
          theme="swagger-dark"
          language="json"
          value={responseBody}
          onMount={handleMount}
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
    </section>
  );
};

export default Result;
