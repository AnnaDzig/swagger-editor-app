import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ValidateStatus from './ValidateStatus';

export default function Header() {
  const schemaLength = 243;
  return (
    <div className="flex items-center gap-3 px-4 py-3 justify-between">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-1 md:flex">
        <Button variant="switcher">YAML</Button>
        <Button variant="ghost">JSON</Button>
      </div>

      <div className="flex items-center gap-5">
        <ValidateStatus isValid={false} />
        <span>{schemaLength}L</span>

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
