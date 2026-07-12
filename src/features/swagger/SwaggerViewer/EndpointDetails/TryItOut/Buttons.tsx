import { Button } from '@/components/ui/button';
import { executeProxyRequest } from '@/features/api/client/proxy-client';
import { Play, RotateCcw, Terminal } from 'lucide-react';

const Buttons = () => {
  return (
    <div className="flex gap-1.5">
      <Button
        size="lg"
        className="text-white font-semibold bg-[#12CB8E] rounded-sm hover:bg-[#1ad798] px-3 py-2 cursor-pointer"
      >
        <Play className="size-3 fill-current" />
        Try it out
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="text-[#8b949e] font-semibold bg-transparent rounded-sm hover:text-[#b5bdc7] hover:bg-transparent px-3 py-2 border border-[#30363d] hover:border-[#595e63] cursor-pointer"
      >
        <Terminal className="size-3" />
        Try it out
      </Button>
      <Button
        size="lg"
        className="text-[#8b949e] font-semibold bg-transparent rounded-sm hover:text-[#b5bdc7] hover:bg-transparent px-3 py-2 border border-[#30363d] hover:border-[#595e63] cursor-pointer"
      >
        <RotateCcw className="size-3" />
        Try it out
      </Button>
    </div>
  );
};

export default Buttons;
