import { Separator } from '@/components/ui/separator';
import Header from './Header';

export default function Editor() {
  return (
    <section className="flex flex-col bg-background">
      <Header />
      <Separator className="m-0 p-0" />
    </section>
  );
}
