import HomePage from '@/app/[locale]/page';
import { TooltipProvider } from '@/components/ui/tooltip';
import { render, screen } from '@testing-library/react';

vi.mock('@/features/swagger/swagger-workspace', () => ({
  SwaggerWorkspace: () => (
    <div data-testid="swagger-workspace">Swagger workspace</div>
  ),
}));

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

    expect(screen.getByTestId('swagger-workspace')).toBeInTheDocument();
  });
});
