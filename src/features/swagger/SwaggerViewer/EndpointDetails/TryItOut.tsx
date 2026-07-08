import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TryItOut = () => {
  return (
    <div className="flex items-center gap-3 w-full pt-2">
      <Button
        size="lg"
        className="text-white font-semibold bg-[#12CB8E] rounded-sm hover:bg-[#1ad798]"
      >
        <Play className="size-3 fill-current" />
        Try it out
      </Button>
    </div>
  );
};

export default TryItOut;
