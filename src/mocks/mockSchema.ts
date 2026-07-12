import { OpenAPIV3 } from 'openapi-types';
import { dump } from 'js-yaml';

export const MOCK_SCHEMA: OpenAPIV3.Document = {
  openapi: '3.0.0',

  info: {
    title: 'PetStore API',
    version: '1.0.0',
    description:
      'Mock schema for Swagger Viewer with full CRUD operations and detailed request bodies',
  },

  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local development server',
    },
    {
      url: 'https://api.petstore.com/v1',
      description: 'Production server',
    },
    {
      url: 'https://staging.petstore.com/v1',
      description: 'Staging environment',
    },
  ],

  tags: [
    {
      name: 'Users',
      description: 'Operations about users and profile management',
    },
    {
      name: 'Auth',
      description: 'Authentication and session management',
    },
    {
      name: 'Pets',
      description: 'Pet inventory and management operations',
    },
  ],

  paths: {
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by ID',
        description:
          'Returns detailed user information based on the unique identifier.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The unique identifier of the user',
            example: 'usr_777',
          },
          {
            name: 'expand',
            in: 'query',
            required: false,
            description: 'Include additional related objects in the response',
            example: true,
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
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                  },
                },
                example: {
                  id: 'usr_777',
                  name: 'John Doe',
                  email: 'john@example.com',
                },
              },
            },
          },
          '404': { description: 'User not found' },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Update user',
        description:
          'Updates a user profile with the provided information. This replaces the entire user object.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'status'],
                properties: {
                  name: {
                    type: 'string',
                    description: 'Full name of the user',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Primary contact email',
                  },
                  age: {
                    type: 'integer',
                    description: 'Age of the user in years',
                  },
                  status: {
                    type: 'string',
                    enum: ['active', 'inactive', 'suspended'],
                    description: 'Current account status',
                  },
                  notifications_enabled: {
                    type: 'boolean',
                    description:
                      'Whether the user wants to receive push notifications',
                  },
                  metadata: {
                    type: 'object',
                    description: 'Additional custom key-value pairs',
                  },
                },
              },
              example: {
                name: 'John Doe Updated',
                email: 'john_new@example.com',
                age: 30,
                status: 'active',
                notifications_enabled: true,
              },
            },
          },
        },
        responses: {
          '200': { description: 'User successfully updated' },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user',
        description: 'Permanently removes the user record from the database.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '204': { description: 'User deleted successfully' },
          '404': { description: 'User not found' },
        },
      },
    },

    '/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login',
        description: 'Authenticates a user and returns a session token.',
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
                    description:
                      'The email address associated with the account',
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: 'Secure account password',
                  },
                  device_token: {
                    type: 'string',
                    description: 'Optional FCM or APNS token for notifications',
                  },
                  stay_logged_in: {
                    type: 'boolean',
                    description: 'Extend session lifetime if true',
                  },
                },
              },
              example: {
                email: 'john@example.com',
                password: 'secret_password',
                stay_logged_in: true,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Authorized',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                  },
                },
                example: { token: 'eyJhbGciOiJIUzI1Ni...' },
              },
            },
          },
          '401': { description: 'Invalid credentials' },
        },
      },
    },

    '/pets': {
      get: {
        tags: ['Pets'],
        summary: 'Get pets',
        description: 'Returns a list of pets with pagination and filtering.',
        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer' },
            example: 10,
          },
          {
            name: 'type',
            in: 'query',
            required: false,
            description: 'Filter by pet species (e.g. Dog, Cat)',
            schema: { type: 'string' },
            example: 'Dog',
          },
        ],
        responses: {
          '200': {
            description: 'A list of pets',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      name: { type: 'string' },
                    },
                  },
                },
                example: [
                  { id: 1, name: 'Tom' },
                  { id: 2, name: 'Spike' },
                ],
              },
            },
          },
        },
      },
      post: {
        tags: ['Pets'],
        summary: 'Create pet',
        description: 'Adds a new pet record to the collection.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'type', 'breed'],
                properties: {
                  name: {
                    type: 'string',
                    description: 'Official name of the pet',
                  },
                  type: {
                    type: 'string',
                    description: 'Species type (e.g., Cat, Dog, Bird)',
                  },
                  breed: {
                    type: 'string',
                    description: 'Specific breed of the animal',
                  },
                  age: {
                    type: 'integer',
                    description: 'Approximate age in years',
                  },
                  is_vaccinated: {
                    type: 'boolean',
                    description: 'Current vaccination status',
                  },
                  weight: {
                    type: 'integer',
                    description: 'Weight of the pet in grams',
                  },
                  tags: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Custom searchable labels',
                  },
                },
              },
              example: {
                name: 'Charlie',
                type: 'Dog',
                breed: 'Golden Retriever',
                age: 2,
                is_vaccinated: true,
                weight: 24000,
                tags: ['friendly', 'trained'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Pet created successfully',
          },
        },
      },
    },

    '/pets/{petId}': {
      parameters: [
        {
          name: 'petId',
          in: 'path',
          required: true,
          description: 'Unique ID of the pet to operate on',
          schema: { type: 'integer' },
        },
      ],
      put: {
        tags: ['Pets'],
        summary: 'Replace pet record',
        description: 'Replaces all fields for a specific pet.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'type'],
                properties: {
                  name: { type: 'string', description: 'Name of the pet' },
                  type: { type: 'string', description: 'Type of the pet' },
                  status: {
                    type: 'string',
                    enum: ['available', 'pending', 'sold'],
                    description: 'Inventory status',
                  },
                },
              },
              example: {
                name: 'Rex',
                type: 'Dog',
                status: 'available',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Pet replaced successfully',
          },
        },
      },
      delete: {
        tags: ['Pets'],
        summary: 'Remove pet',
        description: 'Deletes the pet record from the inventory.',
        responses: {
          '200': {
            description: 'Deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                  },
                },
                example: { success: true },
              },
            },
          },
        },
      },
    },
  },
};

export const MOCK_SCHEMA_YAML = dump(MOCK_SCHEMA);
