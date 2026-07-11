'use client';
import { SchemaFormat } from '@/types/schema';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';

interface MonacoEditorProps {
  language: SchemaFormat;
  value: string;
  onChange: (value: string) => void;
  onLineCountChange: (count: number) => void;
}

export default function MonacoEditor({
  language,
  value,
  onChange,
  onLineCountChange,
}: MonacoEditorProps) {
  const monaco = useMonaco();
  useEffect(() => {
    if (!monaco) return;
    monaco.editor.defineTheme('custom-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0f172a',
      },
    });

    monaco.editor.setTheme('custom-theme');
  }, [monaco]);

  return (
    <Editor
      className="px-4"
      height="100%"
      language={language}
      value={value}
      theme="custom-theme"
      onChange={(value) => onChange(value ?? '')}
      onMount={(editor) => {
        onLineCountChange(editor.getModel()?.getLineCount() ?? 0);
        editor.onDidChangeModelContent(() => {
          onLineCountChange(editor.getModel()?.getLineCount() ?? 0);
        });
      }}
      options={{
        lineNumbers: 'on',
        tabSize: 2,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 15 },
        wrappingStrategy: 'advanced',
      }}
    />
  );
}
