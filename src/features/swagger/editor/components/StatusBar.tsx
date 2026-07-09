import { SchemaFormat } from '@/types/schema';

interface StatusBarProps {
  version: string;
  format: SchemaFormat;
}

export default function StatusBar({ version, format }: StatusBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2 text-sm border-t border-border">
      <div className="flex items-center gap-3 text-xs">
        <span className="text-primary text-version">{version}</span>
        <span>UTF-8</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span>{format.toUpperCase()}</span>
        <span>Spaces: 2</span>
      </div>
    </div>
  );
}
