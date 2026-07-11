'use client';
import useOrientation from '@/shared/hooks/useOrientation';
import Editor from './editor/components/Editor';
import SwaggerViewer from './SwaggerViewer/SwaggerViewer';

export function SwaggerWorkspace() {
  const isLandscape = useOrientation();
  return (
    <main
      className={`grid min-h-[calc(100vh-130px)] ${isLandscape ? 'grid-cols-2' : 'grid-cols-1 overflow-y-auto'}`}
    >
      <Editor />

      <section className="min-h-125 border border-[#30363D] flex-1 flex flex-col overflow-hidden relative">
        <SwaggerViewer />
      </section>
    </main>
  );
}
