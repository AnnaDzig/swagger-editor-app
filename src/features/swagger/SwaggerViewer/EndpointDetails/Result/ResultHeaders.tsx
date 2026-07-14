interface ResultHeadersProps {
  headers: Record<string, string>;
}

const ResultHeaders = ({ headers }: ResultHeadersProps) => {
  return (
    <ul className="rounded-md border overflow-hidden divide-y">
      {Object.entries(headers).map(([key, value]) => (
        <li
          className="grid grid-cols-[220px_1fr] px-3 py-2 text-sm"
          key={`${key}-${value}`}
        >
          <p className="font-mono text-blue-400">{key}</p>
          <p className="font-mono text-[#a5d6ff] break-all">{value}</p>
        </li>
      ))}
    </ul>
  );
};

export default ResultHeaders;
