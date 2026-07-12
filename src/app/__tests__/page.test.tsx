import HomePage from '@/app/page';
import { TooltipProvider } from '@/components/ui/tooltip';
import { render, screen } from '@testing-library/react';

function renderPage() {
  return render(
    <TooltipProvider>
      <HomePage />
    </TooltipProvider>,
  );
}

describe('HomePage', () => {
  it('renders Swagger workspace', () => {
    renderPage();

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Swagger Viewer')).toBeInTheDocument();
  });
});
