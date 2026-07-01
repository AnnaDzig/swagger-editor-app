import { OpenAPIV3 } from 'openapi-types';

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
