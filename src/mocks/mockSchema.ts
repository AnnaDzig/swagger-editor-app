import { OpenAPIV3 } from 'openapi-types';
import { dump } from 'js-yaml';

export const MOCK_SCHEMA: OpenAPIV3.Document = {
  openapi: '3.0.0',

  info: {
    title: 'PetStore API',
    version: '1.0.0',
    description: 'Mock schema for Swagger Viewer',
  },

  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local',
    },
    {
      url: 'https://api.petstore.com/v1',
      description: 'Production',
    },
    {
      url: 'https://staging.petstore.com/v1',
      description: 'Staging',
    },
  ],

  tags: [
    {
      name: 'Users',
      description: 'Operations about users',
    },
    {
      name: 'Auth',
      description: 'Authentication',
    },
    {
      name: 'Pets',
      description: 'Pet management',
    },
  ],

  paths: {
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by ID',
        description: 'Returns user information',

        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'User ID',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'expand',
            in: 'query',
            required: false,
            schema: {
              type: 'boolean',
            },
            example: true,
          },
          {
            name: 'X-Request-ID',
            in: 'header',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'session',
            in: 'cookie',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],

        responses: {
          '200': {
            description: 'User found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    name: {
                      type: 'string',
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                    },
                  },
                },

                example: {
                  id: '1',
                  name: 'John',
                  email: 'john@example.com',
                },
              },
            },
          },

          '404': {
            description: 'User not found',
          },
        },
      },
    },

    '/login': {
      post: {
        tags: ['Auth'],

        summary: 'Login',
        description: 'Authenticates a user and returns a session token',

        parameters: [
          {
            name: 'X-Client-Version',
            in: 'header',
            required: false,
            description: 'Version of the client application',
            schema: {
              type: 'string',
            },
            example: '1.2.0',
          },
        ],

        requestBody: {
          required: true,

          content: {
            'application/json': {
              schema: {
                type: 'object',

                required: ['email', 'password'],

                properties: {
                  email: {
                    type: 'string',
                  },

                  password: {
                    type: 'string',
                    format: 'password',
                  },
                },
              },

              example: {
                email: 'john@example.com',
                password: 'secret',
              },
            },
          },
        },

        responses: {
          '200': {
            description: 'Authorized',
          },

          '401': {
            description: 'Invalid credentials',
          },
        },
      },
    },

    '/pets': {
      get: {
        tags: ['Pets'],

        summary: 'Get pets',
        description: 'Returns a list of pets',

        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,

            schema: {
              type: 'integer',
            },

            example: 10,
          },
          {
            name: 'offset',
            in: 'query',
            required: false,
            description:
              'Number of items to skip before starting to collect the result set',
            schema: {
              type: 'integer',
            },
            example: 0,
          },
          {
            name: 'type',
            in: 'query',
            required: false,
            description: 'Filter pets by type',
            schema: {
              type: 'string',
            },
            example: 'Dog',
          },
          {
            name: 'sort',
            in: 'query',
            required: false,
            description: 'Sort order for results',
            schema: {
              type: 'string',
              enum: ['asc', 'desc'],
            },
            example: 'asc',
          },
          {
            name: 'X-Request-ID',
            in: 'header',
            required: false,
            description: 'Unique request identifier for tracing',
            schema: {
              type: 'string',
            },
          },
        ],

        responses: {
          '200': {
            description: 'Pet list',

            content: {
              'application/json': {
                schema: {
                  type: 'array',

                  items: {
                    type: 'object',

                    properties: {
                      id: {
                        type: 'integer',
                      },

                      name: {
                        type: 'string',
                      },

                      type: {
                        type: 'string',
                      },
                    },
                  },
                },

                example: [
                  {
                    id: 1,
                    name: 'Tom',
                    type: 'Cat',
                  },
                  {
                    id: 2,
                    name: 'Spike',
                    type: 'Dog',
                  },
                ],
              },
            },
          },
        },
      },

      post: {
        tags: ['Pets'],

        summary: 'Create pet',
        description: 'Creates a new pet record',

        parameters: [
          {
            name: 'X-Request-ID',
            in: 'header',
            required: false,
            description: 'Unique request identifier for tracing',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'notify',
            in: 'query',
            required: false,
            description: 'Whether to send a notification after creation',
            schema: {
              type: 'boolean',
            },
            example: false,
          },
        ],

        requestBody: {
          required: true,

          content: {
            'application/json': {
              schema: {
                type: 'object',

                required: ['name', 'type'],

                properties: {
                  name: {
                    type: 'string',
                  },

                  type: {
                    type: 'string',
                  },
                },
              },

              example: {
                name: 'Charlie',
                type: 'Dog',
              },
            },
          },
        },

        responses: {
          '201': {
            description: 'Pet created',
          },
        },
      },
    },
  },
};

export const MOCK_SCHEMA_YAML = dump(MOCK_SCHEMA);
