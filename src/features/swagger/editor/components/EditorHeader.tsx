import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SchemaFormat } from '@/types/schema';
import ValidateStatus from './ValidateStatus';

interface HeaderProps {
  lineCount: number;
  format: SchemaFormat;
  onFormatChange: (format: 'yaml' | 'json') => void;
  isValid: boolean;
}

export default function EditorHeader({
  lineCount,
  format,
  onFormatChange,
  isValid,
}: HeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 justify-between">
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

      <div className="flex items-center gap-5">
        <ValidateStatus isValid={isValid} />
        <span>{lineCount}L</span>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Save</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Only for authorized users</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
