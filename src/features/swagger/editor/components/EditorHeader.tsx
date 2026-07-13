import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SavedUserSchema, SchemaFormat } from '@/types/schema';
import useOrientation from '../hooks/useOrientation';
import ValidateStatus from './ValidateStatus';

interface HeaderProps {
  lineCount: number;
  format: SchemaFormat;
  onFormatChange: (format: 'yaml' | 'json') => void;
  isValid: boolean;
  isAuthenticated?: boolean;
  onSave: () => void;
  savedSchemaId: string | null;
  savedSchemas: SavedUserSchema[];
  onSchemaSelect: (id: string) => void;
}

export default function EditorHeader({
  lineCount,
  format,
  onFormatChange,
  isValid,
  isAuthenticated,
  onSave,
  savedSchemaId,
  savedSchemas,
  onSchemaSelect,
}: HeaderProps) {
  const isLandscape = useOrientation();
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-3 justify-between">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-1 md:flex">
        <Button
          variant={format === 'yaml' ? 'switcher' : 'ghost'}
          onClick={() => onFormatChange('yaml')}
        >
          YAML
        </Button>
        <Button
          variant={format === 'json' ? 'switcher' : 'ghost'}
          onClick={() => onFormatChange('json')}
        >
          JSON
        </Button>
      </div>

      {isAuthenticated && savedSchemas && (
        <div
          className={`order-last w-full ${isLandscape ? '' : 'md:order-0 md:w-auto'}`}
        >
          <Select onValueChange={onSchemaSelect} value={savedSchemaId ?? ''}>
            <SelectTrigger
              className={`w-full ${isLandscape ? '' : 'md:w-auto'}`}
            >
              <SelectValue placeholder="Select Schemas" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Saved Schemas</SelectLabel>
                <SelectItem value="new">Add new schema</SelectItem>
                {savedSchemas.map((schema) => (
                  <SelectItem key={schema.id} value={schema.id}>
                    {schema.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-5">
        <ValidateStatus isValid={isValid} />
        <span>{lineCount}L</span>

        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={!isAuthenticated ? 0 : undefined}>
              <Button
                variant="outline"
                disabled={!isAuthenticated}
                onClick={onSave}
              >
                {savedSchemaId ? 'Update' : 'Save'}
              </Button>
            </span>
          </TooltipTrigger>
          {!isAuthenticated && (
            <TooltipContent>
              <p>Only for authorized users</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  );
}
