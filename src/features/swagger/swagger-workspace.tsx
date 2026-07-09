import Editor from './editor/components/Editor';
import SwaggerViewer from './SwaggerViewer/SwaggerViewer';

export function SwaggerWorkspace() {
  return (
    <main className="grid min-h-[calc(100vh-130px)] grid-cols-1 pb-4 lg:grid-cols-2">
      <Editor />

      <section className="min-h-125 border border-[#30363D] flex-1 flex flex-col overflow-hidden relative">
        <SwaggerViewer />
      </section>
    </main>
  );
}
