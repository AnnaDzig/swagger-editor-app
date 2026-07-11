export type Technology = {
  name: string;
  description: string;
  version: string;
};

export type TeamMember = {
  name: string;
  githubUsername: string;
  role: string;
  contributions: string[];
  accent: 'indigo' | 'emerald' | 'green';
};

export type ProjectResource = {
  title: string;
  description: string;
  href: string;
};

export const projectTags = [
  'v0.1.0',
  'OpenAPI',
  'Next.js',
  'React',
  'TypeScript',
  'Open Source',
];

export const technologies: Technology[] = [
  {
    name: 'Next.js',
    description: 'Full-stack React framework',
    version: '16.2.9',
  },
  {
    name: 'React',
    description: 'Component-based UI library',
    version: '19.2.4',
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript development',
    version: '5',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first styling framework',
    version: '4',
  },
  {
    name: 'Firebase',
    description: 'Authentication and server integration',
    version: '12.15.0',
  },
  {
    name: 'Zustand',
    description: 'Lightweight application state management',
    version: '5.0.14',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Anna Dzhyhota',
    githubUsername: 'AnnaDzig',
    role: 'Authentication · Infrastructure',
    accent: 'green',
    contributions: [
      'Application header and navigation',
      'Sign In and Sign Up flows',
      'Firebase authentication',
      'Protected routes and error handling',
      'History and analytics',
      'Server-side request proxy',
      'Database and user schema persistence',
    ],
  },
  {
    name: 'Michael Elsky',
    githubUsername: 'michael-elsky',
    role: 'Swagger Viewer · API Interaction',
    accent: 'emerald',
    contributions: [
      'OpenAPI endpoint rendering',
      'Path, query, header, and cookie parameters',
      'Request and response schemas',
      'Try It Out functionality',
      'API response visualization',
      'cURL generation and copying',
      'About page design',
    ],
  },
  {
    name: 'Mikhail Kruk',
    githubUsername: 'mikekruk',
    role: 'Swagger Editor · Internationalization',
    accent: 'indigo',
    contributions: [
      'JSON and YAML file loading',
      'Automatic schema format detection',
      'JSON and YAML conversion',
      'OpenAPI schema validation',
      'Responsive split-view editor',
      'Client-side schema persistence',
      'Application internationalization',
    ],
  },
];

export const projectResources: ProjectResource[] = [
  {
    title: 'GitHub Repository',
    description: 'Source code, issues, and pull requests',
    href: 'https://github.com/AnnaDzig/swagger-editor-app',
  },
  {
    title: 'RS School',
    description: 'Free community-based software engineering education',
    href: 'https://rs.school/',
  },
  {
    title: 'OpenAPI Specification',
    description: 'The official OpenAPI 3.0.3 specification',
    href: 'https://spec.openapis.org/oas/v3.0.3.html',
  },
];
