import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ComponentProps } from 'react';
import EndpointDetails from '../../features/swagger/SwaggerViewer/EndpointDetails/EndpointDetails';

interface ExecutionResult {
  status: number;
  data: unknown;
  analytics: { duration: number };
}

vi.mock('@/lib/firebase/client', () => ({
  firebaseAuth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(() => vi.fn()),
  },
  firestore: {},
}));

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/Parameters',
  () => ({
    default: () => <div data-testid="params">Params</div>,
  }),
);

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/Responses/Responses',
  () => ({
    default: () => <div data-testid="responses">Responses</div>,
  }),
);

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/TryItOut/TryItOut',
  () => ({
    default: ({
      onResultExecute,
    }: {
      onResultExecute: (result: ExecutionResult) => void;
    }) => (
      <button
        onClick={() =>
          onResultExecute({
            status: 200,
            data: { ok: true },
            analytics: { duration: 100 },
          })
        }
      >
        Execute
      </button>
    ),
  }),
);

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/Request/RequestBody',
  () => ({
    default: () => <div data-testid="request-body">RequestBody</div>,
  }),
);

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/Result/Result',
  () => ({
    default: ({ result }: { result: ExecutionResult | null }) => (
      <div data-testid="result">{result ? 'Got Result' : 'No Result'}</div>
    ),
  }),
);

type EndpointDetailsProps = ComponentProps<typeof EndpointDetails>;

describe('EndpointDetails', () => {
  const mockProps = {
    operation: {
      description: 'Test description',
      parameters: [{ name: 'id', in: 'path' }],
      responses: { '200': { description: 'OK' } },
      requestBody: { content: { 'application/json': {} } },
    },
    method: 'GET',
    activeServer: 'https://api.com',
    endpointPath: '/users',
  };

  it('should render all sub-components and handle execution result', async () => {
    render(
      <EndpointDetails {...(mockProps as unknown as EndpointDetailsProps)} />,
    );

    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByTestId('params')).toBeInTheDocument();
    expect(screen.getByTestId('request-body')).toBeInTheDocument();
    expect(screen.getByTestId('responses')).toBeInTheDocument();
    expect(screen.getByTestId('result')).toHaveTextContent('No Result');

    const btn = screen.getByText('Execute');
    await act(async () => {
      btn.click();
    });

    expect(screen.getByTestId('result')).toHaveTextContent('Got Result');
  });
});
