'use client';
import { Separator } from '@/components/ui/separator';
import {
  createCurrentUserSchema,
  getCurrentUserSchema,
  getCurrentUserSchemas,
  updateCurrentUserSchema,
} from '@/features/schemas/api/schemas-client';
import { MOCK_SCHEMA_YAML } from '@/mocks/mockSchema';
import { useAppStore } from '@/store/app-store';
import { SavedUserSchema, SchemaFormat } from '@/types/schema';
import { dump, load } from 'js-yaml';
import { useEffect, useState } from 'react';
import detectedFormat from '../utils/detectedFormat';
import validateSchema from '../utils/validateSchema';
import EditorHeader from './EditorHeader';
import MonacoEditor from './MonacoEditor';
import StatusBar from './StatusBar';

export default function Editor() {
  const [value, setValue] = useState<string>(() => '');
  const [format, setFormat] = useState<SchemaFormat>('yaml');
  const [lineCount, setLineCount] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [schemaId, setSchemaId] = useState<string | null>(null);
  const [savedSchemas, setSavedSchemas] = useState<SavedUserSchema[]>([]);
  const setSchema = useAppStore((state) => state.setSchema);
  const user = useAppStore((state) => state.user);
  const schema = useAppStore((state) => state.schema);
  const isAuthLoading = useAppStore((state) => state.isAuthLoading);

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

  useEffect(() => {
    if (isAuthLoading) return;
    const loadSchema = async () => {
      if (!user) {
        setValue(MOCK_SCHEMA_YAML);
        setFormat('yaml');
        return;
      }
      try {
        const schemas = await getCurrentUserSchemas();
        setSavedSchemas(schemas);
        if (schemas.length > 0) {
          const saved = schemas[0];
          setSchemaId(saved.id);
          setValue(saved.content);
          setFormat(saved.format);
        }
      } catch {
        console.error('Failed to load schemas.');
      }
    };

    loadSchema();
  }, [user, isAuthLoading]);

  const handleSchemaSelect = async (id: string) => {
    if (id === 'new') {
      setSchemaId(null);
      setValue('');
      return;
    }
    try {
      const schema = await getCurrentUserSchema(id);
      setSchemaId(id);
      setValue(schema.content);
      setFormat(schema.format);
    } catch {
      console.error('Failed to load schema.');
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      if (schemaId) {
        await updateCurrentUserSchema(schemaId, {
          name: schema.parsedContent?.info.title ?? 'New Schema',
          content: value,
          format,
        });
      } else {
        const savedSchema = await createCurrentUserSchema({
          name: schema.parsedContent?.info.title ?? 'New Schema',
          content: value,
          format,
        });
        setSchemaId(savedSchema.id);
      }
    } catch {
      console.error('Failed to save schema.');
    }
  };

  return (
    <section className="flex flex-col bg-background h-full min-h-120 md:min-h-0">
      <EditorHeader
        lineCount={lineCount}
        onFormatChange={handleFormatChange}
        format={format}
        isValid={isValid}
        isAuthenticated={!!user}
        onSave={handleSave}
        savedSchemaId={schemaId}
        savedSchemas={savedSchemas}
        onSchemaSelect={handleSchemaSelect}
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
