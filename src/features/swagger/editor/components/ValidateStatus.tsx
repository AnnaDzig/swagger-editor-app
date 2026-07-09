import { Badge } from '@/components/ui/badge';

interface ValidateStatusProps {
  isValid: boolean;
}

export default function ValidateStatus({ isValid }: ValidateStatusProps) {
  const colorStatus = isValid ? 'text-green-600' : 'text-red-600';
  return (
    <Badge
      className="bg-transparent text-md"
      variant={isValid ? 'default' : 'destructive'}
    >
      <span className={`${colorStatus} size-2 rounded-full bg-current`} />
      <span className={colorStatus}>{isValid ? 'Valid' : 'Invalid'}</span>
    </Badge>
  );
}
