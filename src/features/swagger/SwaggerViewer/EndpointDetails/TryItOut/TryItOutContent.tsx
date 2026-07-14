import TryItOutItem from './TryItOutItem';
import { Editor } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { TryItOutContentProps } from '@/types/SwaggerViewer';

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

const TryItOutContent = ({
  title,
  parameters,
  body,
  onRequestBody,
  query,
  onQueryParameters,
}: TryItOutContentProps) => {
  let element;

  if (Array.isArray(parameters)) {
    element = (
      <TryItOutItem
        parameters={parameters}
        onQueryParameters={onQueryParameters}
        query={query}
      />
    );
  } else {
    element = (
      <div className="border border-[#30363D] rounded-md bg-[#161B22] px-3">
        <Editor
          beforeMount={handleEditorWillMount}
          theme="swagger-dark"
          language="json"
          value={body}
          onChange={(value) => onRequestBody && onRequestBody(value ?? '')}
          onMount={handleMount}
          options={{
            readOnly: false,
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
    );
  }

  return (
    <div>
      <h5 className="text-[10px] text-[#6e7681] font-semibold uppercase tracking-widest mb-2">
        {title}
      </h5>

      {element}
    </div>
  );
};

export default TryItOutContent;
