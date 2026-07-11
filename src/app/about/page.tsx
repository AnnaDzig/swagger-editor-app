import type { ReactNode } from 'react';
import {
  BookOpen,
  Code2,
  ExternalLink,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import {
  projectResources,
  projectTags,
  teamMembers,
  technologies,
  type TeamMember,
} from '@/features/about/about-data';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  id: string;
  icon: LucideIcon;
  children: ReactNode;
};

function SectionHeading({ id, icon: Icon, children }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-5 shrink-0 text-app-primary" aria-hidden="true" />

      <h2
        id={id}
        className="shrink-0 text-lg font-bold tracking-tight text-slate-100"
      >
        {children}
      </h2>

      <div className="h-px flex-1 bg-app-border" aria-hidden="true" />
    </div>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.344-3.369-1.344-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.841a9.59 9.59 0 0 1 2.504.337c1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.848-2.337 4.695-4.566 4.943.359.31.679.923.679 1.861 0 1.344-.012 2.428-.012 2.758 0 .268.18.58.688.482A10.025 10.025 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z" />
    </svg>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm transition-colors hover:border-app-primary/50 hover:bg-app-surface-hover">
      <div className="mb-5 flex items-center gap-4">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-app-primary/30 bg-app-primary/10 text-lg font-bold text-app-primary"
          aria-hidden="true"
        >
          {getInitials(member.name)}
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-slate-100">{member.name}</h3>

          <p className="mt-0.5 text-sm leading-5 text-slate-400">
            {member.role}
          </p>
        </div>
      </div>

      <ul className="space-y-2.5">
        {member.contributions.map((contribution) => (
          <li
            key={contribution}
            className="flex gap-3 text-sm leading-6 text-slate-400"
          >
            <span className="shrink-0 text-app-primary" aria-hidden="true">
              •
            </span>

            <span>{contribution}</span>
          </li>
        ))}
      </ul>

      <a
        href={`https://github.com/${member.githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${member.name}'s GitHub profile, @${member.githubUsername}`}
        className="mt-auto inline-flex w-fit items-center gap-2 rounded-md pt-6 text-sm font-semibold text-app-primary transition-colors hover:text-app-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary focus-visible:ring-offset-4 focus-visible:ring-offset-app-surface"
      >
        <GitHubIcon className="size-4" />

        <span>@{member.githubUsername}</span>

        <ExternalLink className="size-3.5 text-slate-500" aria-hidden="true" />
      </a>
    </article>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-app-background px-4 py-8 text-slate-100 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <section
          aria-labelledby="project-title"
          className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className="flex size-20 shrink-0 items-center justify-center rounded-3xl bg-app-primary text-white shadow-lg shadow-app-primary/20"
              aria-hidden="true"
            >
              <Zap className="size-10 fill-current" />
            </div>

            <div className="min-w-0">
              <h1
                id="project-title"
                className="text-3xl font-bold tracking-tight text-slate-100"
              >
                ApiFlux — OpenAPI Studio
              </h1>

              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-400 sm:text-lg">
                A browser-based Swagger and OpenAPI editor, documentation
                viewer, and REST client created as an RS School team project.
                ApiFlux provides JSON and YAML editing, schema validation,
                interactive API documentation, request execution, authenticated
                workflows, history, analytics, and user schema persistence.
              </p>

              <ul
                className="mt-6 flex flex-wrap gap-2"
                aria-label="Project technologies"
              >
                {projectTags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex rounded-full border border-app-border bg-app-background px-4 py-1.5 text-sm font-medium text-slate-400">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="rs-school-heading"
          className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm sm:p-8"
        >
          <div className="flex items-center gap-3">
            <BookOpen
              className="size-5 shrink-0 text-app-primary"
              aria-hidden="true"
            />

            <h2
              id="rs-school-heading"
              className="text-xl font-bold tracking-tight text-slate-100"
            >
              RS School
            </h2>
          </div>

          <div className="mt-5 space-y-4 text-base leading-7 text-slate-400">
            <p>
              ApiFlux was developed as a collaborative final project for the
              React course at{' '}
              <a
                href="https://rs.school/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-semibold text-slate-200 transition-colors hover:text-app-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary focus-visible:ring-offset-4 focus-visible:ring-offset-app-surface"
              >
                Rolling Scopes School
              </a>
              .
            </p>

            <p>
              RS School is a free community-based education program focused on
              practical software engineering. Its courses emphasize independent
              learning, teamwork, code reviews, mentoring, and building
              production-style applications.
            </p>
          </div>
        </section>

        <section aria-labelledby="technologies-heading">
          <SectionHeading id="technologies-heading" icon={Code2}>
            Technologies
          </SectionHeading>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((technology) => (
              <article
                key={technology.name}
                className="flex h-full flex-col rounded-xl border border-app-border bg-app-surface p-5 shadow-sm transition-colors hover:border-app-primary/50 hover:bg-app-surface-hover"
              >
                <h3 className="text-lg font-bold text-slate-100">
                  {technology.name}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {technology.description}
                </p>

                <p className="mt-auto pt-4 font-mono text-sm font-semibold text-app-primary">
                  {technology.version}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="team-heading">
          <SectionHeading id="team-heading" icon={Users}>
            Team
          </SectionHeading>

          <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.githubUsername} member={member} />
            ))}
          </div>
        </section>

        <section aria-labelledby="resources-heading">
          <SectionHeading id="resources-heading" icon={ExternalLink}>
            Resources
          </SectionHeading>

          <div className="mt-6 overflow-hidden rounded-2xl border border-app-border bg-app-surface shadow-sm">
            {projectResources.map((resource, index) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group flex items-center justify-between gap-6 p-5 transition-colors hover:bg-app-surface-hover focus-visible:bg-app-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-app-primary sm:px-6',
                  index < projectResources.length - 1 &&
                    'border-b border-app-border',
                )}
              >
                <span className="min-w-0">
                  <span className="block text-base font-bold text-slate-100 transition-colors group-hover:text-app-primary-hover">
                    {resource.title}
                  </span>

                  <span className="mt-1 block text-sm leading-6 text-slate-400">
                    {resource.description}
                  </span>
                </span>

                <ExternalLink
                  className="size-4 shrink-0 text-slate-500 transition-colors group-hover:text-app-primary"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
