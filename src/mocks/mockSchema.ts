import { OpenAPIV3 } from 'openapi-types';

export const MOCK_SCHEMA: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Test API',
    version: '1.0.0',
    description: 'Mock schema for Viewer development',
  },
  paths: {
    '/users/{id}': {
      get: {
        summary: 'Get user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'User unique identifier',
          },
          {
            name: 'X-Request-ID',
            in: 'header',
            required: false,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
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
              },
            },
          },
        },
      },
    },
    '/login': {
      post: {
        summary: 'User Login',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string', format: 'password' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Logged in' },
        },
      },
    },
  },
};
