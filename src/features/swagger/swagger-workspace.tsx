export function SwaggerWorkspace() {
  return (
    <main className="grid min-h-[calc(100vh-130px)] grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      <section className="min-h-[500px] border border-black p-4">
        <h2 className="mb-4 text-xl font-semibold">Swagger Editor</h2>

        <div className="flex h-[420px] items-center justify-center border border-dashed border-black">
          Editor area
        </div>
      </section>

      <section className="min-h-[500px] border border-black p-4">
        <h2 className="mb-4 text-xl font-semibold">Swagger Viewer</h2>

        <div className="flex h-[420px] items-center justify-center border border-dashed border-black">
          Viewer area
        </div>
      </section>
    </main>
  );
}
