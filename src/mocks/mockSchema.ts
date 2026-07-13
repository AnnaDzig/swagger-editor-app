import { OpenAPIV3 } from 'openapi-types';
import { dump } from 'js-yaml';

export const MOCK_SCHEMA: OpenAPIV3.Document = {
  openapi: '3.0.0',

  info: {
    title: 'Fake Store API',
    version: '1.0.0',
    description: 'Mock schema for Swagger Viewer based on Fake Store API',
  },

  servers: [
    {
      url: 'https://fakestoreapi.com',
      description: 'Production',
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Local',
    },
  ],

  tags: [
    {
      name: 'Products',
      description: 'Product management',
    },
    {
      name: 'Users',
      description: 'User management',
    },
    {
      name: 'Auth',
      description: 'Authentication',
    },
    {
      name: 'Categories',
      description: 'Product categories',
    },
  ],

  paths: {
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Get all products',
        description: 'Returns a list of products',

        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,
            description: 'Limit number of products',
            schema: {
              type: 'integer',
            },
            example: 5,
          },
          {
            name: 'X-Request-ID',
            in: 'header',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],

        responses: {
          '200': {
            description: 'Product list',

            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Product',
                  },
                },

                example: [
                  {
                    id: 1,
                    title: 'Fjallraven Backpack',
                    price: 109.95,
                    category: 'men clothing',
                  },
                ],
              },
            },
          },
        },
      },

      post: {
        tags: ['Products'],
        summary: 'Create product',
        description: 'Creates a new product',

        requestBody: {
          required: true,

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateProduct',
              },

              example: {
                title: 'New product',
                price: 20,
                category: 'electronics',
              },
            },
          },
        },

        responses: {
          '201': {
            description: 'Product created',
          },
        },
      },
    },

    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get product by ID',

        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Product identifier',
            schema: {
              type: 'integer',
            },
            example: 1,
          },
        ],

        responses: {
          '200': {
            description: 'Product found',

            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },

                example: {
                  id: 1,
                  title: 'Backpack',
                  price: 109.95,
                  category: 'men clothing',
                },
              },
            },
          },

          '404': {
            description: 'Product not found',
          },
        },
      },

      delete: {
        tags: ['Products'],
        summary: 'Delete product',

        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],

        responses: {
          '200': {
            description: 'Product deleted',
          },
        },
      },
    },

    '/products/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get product categories',

        responses: {
          '200': {
            description: 'Categories list',

            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },

                example: [
                  'electronics',
                  'jewelery',
                  "men's clothing",
                  "women's clothing",
                ],
              },
            },
          },
        },
      },
    },

    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by ID',

        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],

        responses: {
          '200': {
            description: 'User information',

            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },

                example: {
                  id: 1,
                  username: 'johnd',
                  email: 'john@example.com',
                },
              },
            },
          },
        },
      },
    },

    '/auth/login': {
      post: {
        tags: ['Auth'],

        summary: 'User login',
        description: 'Returns authentication token',

        parameters: [
          {
            name: 'X-Client-Version',
            in: 'header',
            required: false,
            schema: {
              type: 'string',
            },
            example: '1.0.0',
          },
        ],

        requestBody: {
          required: true,

          content: {
            'application/json': {
              schema: {
                type: 'object',

                required: ['username', 'password'],

                properties: {
                  username: {
                    type: 'string',
                  },

                  password: {
                    type: 'string',
                    format: 'password',
                  },
                },
              },

              example: {
                username: 'mor_2314',
                password: '83r5^_',
              },
            },
          },
        },

        responses: {
          '200': {
            description: 'Successful login',

            content: {
              'application/json': {
                example: {
                  token: 'eyJhbGciOiJIUzI1...',
                },
              },
            },
          },

          '401': {
            description: 'Invalid credentials',
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Product: {
        type: 'object',

        properties: {
          id: {
            type: 'integer',
          },

          title: {
            type: 'string',
          },

          price: {
            type: 'number',
          },

          description: {
            type: 'string',
          },

          category: {
            type: 'string',
          },

          image: {
            type: 'string',
            format: 'uri',
          },
        },
      },

      CreateProduct: {
        type: 'object',

        required: ['title', 'price', 'category'],

        properties: {
          title: {
            type: 'string',
          },

          price: {
            type: 'number',
          },

          category: {
            type: 'string',
          },
        },
      },

      User: {
        type: 'object',

        properties: {
          id: {
            type: 'integer',
          },

          username: {
            type: 'string',
          },

          email: {
            type: 'string',
            format: 'email',
          },
        },
      },
    },
  },
};

export const MOCK_SCHEMA_YAML = dump(MOCK_SCHEMA);
