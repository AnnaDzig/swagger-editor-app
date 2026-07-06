import extractViewerData, {
  getOperations,
} from '@/features/swagger/SwaggerViewer/extractViewerData';
import { OpenAPIV3 } from 'openapi-types';

const schemaType = (empty = false) => {
  const paths = empty
    ? {}
    : {
        '/users': {
          get: { responses: {} },
          post: { responses: {} },
        },
        '/posts': {
          get: { responses: {} },
        },
      };
  const servers = empty
    ? []
    : [{ url: 'http://localhost:3000' }, { url: 'https://api.example.com' }];

  const tags = empty ? [] : [{ name: 'users' }, { name: 'posts' }];

  const data = {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    servers: [...servers],
    tags: [...tags],
    paths: { ...paths },
  } as OpenAPIV3.Document;

  return data;
};

describe('extractViewerData', () => {
  it('extracts basic viewer data', () => {
    const schema = schemaType();

    const result = extractViewerData(schema);

    expect(result.title).toBe('Test API');
    expect(result.version).toBe('1.0.0');
    expect(result.servers).toEqual([
      'http://localhost:3000',
      'https://api.example.com',
    ]);
    expect(result.tags).toEqual(['users', 'posts']);
  });

  it('counts endpoints correctly', () => {
    const schema = schemaType();

    const result = extractViewerData(schema);

    expect(result.endpointCount).toBe(3);
  });

  it('no data', () => {
    const schema = schemaType(true);

    const result = extractViewerData(schema);

    expect(result.servers).toHaveLength(0);
    expect(result.tags).toHaveLength(0);
    expect(result.endpointCount).toBe(0);
  });

  it('ignores undefined path items when counting endpoints', () => {
    const schema = schemaType();

    schema.paths['/broken'] = undefined as unknown as OpenAPIV3.PathItemObject;

    const result = extractViewerData(schema);

    expect(result.endpointCount).toBe(0);
  });
});

describe('getOperations', () => {
  it('returns all operations', () => {
    const schema = schemaType();

    const operations = getOperations(schema);

    expect(operations).toHaveLength(3);
  });

  it('returns all operations', () => {
    const schema = schemaType(true);

    const operations = getOperations(schema);

    expect(operations).toHaveLength(0);
  });

  it('ignores undefined path items when getting operations', () => {
    const schema = schemaType();

    schema.paths['/broken'] = undefined as unknown as OpenAPIV3.PathItemObject;

    const operations = getOperations(schema);

    expect(operations).toHaveLength(3);
  });
});
