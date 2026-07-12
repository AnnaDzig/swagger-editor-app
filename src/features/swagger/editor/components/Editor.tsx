'use client';
import { Separator } from '@/components/ui/separator';
import { MOCK_SCHEMA_YAML } from '@/mocks/mockSchema';
import { SchemaFormat } from '@/types/schema';
import { dump, load } from 'js-yaml';
import { useEffect, useState } from 'react';
import EditorHeader from './EditorHeader';
import MonacoEditor from './MonacoEditor';
import StatusBar from './StatusBar';
import detectedFormat from '../utils/detectedFormat';
import validateSchema from '../utils/validateSchema';
import { useAppStore } from '@/store/app-store';

export default function Editor() {
  const [value, setValue] = useState<string>(MOCK_SCHEMA_YAML);
  const [format, setFormat] = useState<SchemaFormat>('yaml');
  const [lineCount, setLineCount] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);
  const setSchema = useAppStore((state) => state.setSchema);

  const handleFormatChange = (newFormat: SchemaFormat) => {
    try {
      if (newFormat === 'yaml') {
        const parse = JSON.parse(value);
        setValue(dump(parse));
      } else {
        const parse = load(value);
        setValue(JSON.stringify(parse, null, 2));
      }
      setFormat(newFormat);
    } catch {
      setFormat(newFormat);
    }
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    const detected = detectedFormat(newValue);
    if (detected !== format) {
      setFormat(detected);
    }
  };

  useEffect(() => {
    const validate = async () => {
      const result = await validateSchema(value, format);
      setIsValid(result);
      setSchema({
        rawContent: value,
        parsedContent: result
          ? format === 'yaml'
            ? load(value)
            : JSON.parse(value)
          : null,
        format,
        isValid: result,
        error: result ? null : 'Invalid schema',
      });
    };
    const debounce = setTimeout(validate, 700);

    return () => {
      clearTimeout(debounce);
    };
  }, [value, format, setSchema]);

  return (
    <section className="flex flex-col bg-background h-full min-h-120 md:min-h-0">
      <EditorHeader
        lineCount={lineCount}
        onFormatChange={handleFormatChange}
        format={format}
        isValid={isValid}
      />
      <Separator className="m-0 p-0" />
      <div className="flex-1 h-full">
        <MonacoEditor
          language={format}
          value={value}
          onChange={handleValueChange}
          onLineCountChange={setLineCount}
        />
      </div>
      <StatusBar version="3.0.0" format={format} />
    </section>
  );
}
