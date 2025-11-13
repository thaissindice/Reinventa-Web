import NewJobForm from '../jobs/new/NewJobForm';

export const metadata = { title: 'Publicar vaga — Reinventa+' };

export default function PostJobPage() {
  return (
    <main className="min-h-screen bg-muted/20 text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">Publicar nova vaga</h1>
        <NewJobForm />
      </div>
    </main>
  );
}
