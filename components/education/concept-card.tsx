type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ConceptCard({
  title,
  children,
}: Props) {
  return (

    <div className="my-10 rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 p-8 shadow-lg">

      <div className="inline-flex rounded-full bg-violet-600 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white">
        Key Concept
      </div>

      <h3 className="mt-6 text-3xl font-black text-slate-950">
        {title}
      </h3>

      <div className="mt-6 text-lg leading-9 text-slate-700">
        {children}
      </div>

    </div>

  );
}