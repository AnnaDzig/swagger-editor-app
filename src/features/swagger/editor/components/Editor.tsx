'use client';
import { Separator } from '@/components/ui/separator';
import { MOCK_SCHEMA_YAML } from '@/mocks/mockSchema';
import { SchemaFormat } from '@/types/schema';
import { useState } from 'react';
import EditorHeader from './EditorHeader';
import MonacoEditor from './MonacoEditor';
import StatusBar from './StatusBar';

export default function Editor() {
  const [value, setValue] = useState<string>(MOCK_SCHEMA_YAML);
  const [format, setFormat] = useState<SchemaFormat>('yaml');
  const [lineCount, setLineCount] = useState<number>(0);
  return (
    <section className="flex flex-col bg-background h-full min-h-120 md:min-h-0">
      <EditorHeader
        lineCount={lineCount}
        onFormatChange={setFormat}
        format={format}
      />
      <Separator className="m-0 p-0" />
      <div className="flex-1 h-full">
        <MonacoEditor
          language={format}
          value={value}
          onChange={setValue}
          onLineCountChange={setLineCount}
        />
      </div>
      <StatusBar version="3.0.0" format={format} />
    </section>
  );
}
