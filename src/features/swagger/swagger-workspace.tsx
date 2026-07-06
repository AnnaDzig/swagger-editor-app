import SwaggerViewer from './SwaggerViewer/SwaggerViewer';

export function SwaggerWorkspace() {
  return (
    <main className="grid min-h-[calc(100vh-130px)] grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      <section className="min-h-[500px] border border-black p-4">
        <h2 className="mb-4 text-xl font-semibold">Swagger Editor</h2>

        <div className="flex h-[420px] items-center justify-center border border-dashed border-black">
          Editor area
        </div>
      </section>

      <section className="min-h-125 border border-[#30363D] flex-1 flex flex-col overflow-hidden relative">
        <SwaggerViewer />
      </section>
    </main>
  );
}
