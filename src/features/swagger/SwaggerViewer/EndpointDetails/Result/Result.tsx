import type * as Monaco from 'monaco-editor';
import ResultStatus from './ResultStatus';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import ResultEditor from './ResultEditor';
import ResultToggleOutput from './ResultToggleOutput';
import { useState } from 'react';
import ResultHeaders from './ResultHeaders';

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
  const [toggleData, setToggleData] = useState<string>('editor');

  if (!result) return null;

  const { status, analytics, headers, data } = result;

  const responseBody = data ? JSON.stringify(data, null, 2) : '{}';

  const handleCopy = () => {
    copy(responseBody);
  };

  const handleToggleOutput = (value: string) => {
    setToggleData(value);
  };

  return (
    <section className="rounded-md overflow-hidden">
      <ResultStatus status={status} duration={analytics.duration} />

      <ResultToggleOutput
        onToggleOutput={handleToggleOutput}
        toggleData={toggleData}
      />

      {toggleData === 'editor' && (
        <ResultEditor
          appType={appType}
          onCopy={handleCopy}
          isCopied={isCopied}
          onEditorWillMount={handleEditorWillMount}
          responseBody={responseBody}
          onMount={handleMount}
        />
      )}

      {toggleData === 'headers' && <ResultHeaders headers={headers} />}
    </section>
  );
};

export default Result;
