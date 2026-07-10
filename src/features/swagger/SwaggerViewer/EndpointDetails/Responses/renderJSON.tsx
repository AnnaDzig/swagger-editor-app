const jsonValue = (val: string) => {
  const t = val.trim().replace(/[,\]}]+$/, '');
  const trail = val.trim().slice(t.length);
  let c = '#cde8f0';
  if (t.startsWith('"')) c = '#a5d6ff';
  else if (/^-?\d+(\.\d+)?$/.test(t)) c = '#d2a8ff';
  else if (['true', 'false', 'null'].includes(t)) c = '#d2a8ff';
  else if ('{[]}'.includes(t)) c = '#8b949e';
  return (
    <>
      <span style={{ color: c }}>{t}</span>
      <span style={{ color: '#8b949e' }}>{trail}</span>
    </>
  );
};

export const renderJSON = (line: string) => {
  const kv = line.match(/^(\s*)("[\w\s$/-]+")(:\s*)(.+)$/);
  if (kv) {
    const [, ind, key, sep, val] = kv;
    return (
      <>
        <span>{ind}</span>
        <span style={{ color: '#79c0ff' }}>{key}</span>
        <span style={{ color: '#8b949e' }}>{sep}</span>
        {jsonValue(val)}
      </>
    );
  }
  const t = line.trim();
  const lead = line.match(/^(\s*)/)?.[1] ?? '';
  if (t.startsWith('"')) {
    const v = t.replace(/,$/, '');
    const trail = t.endsWith(',') ? ',' : '';
    return (
      <>
        <span>{lead}</span>
        <span style={{ color: '#a5d6ff' }}>{v}</span>
        <span style={{ color: '#8b949e' }}>{trail}</span>
      </>
    );
  }
  return <span style={{ color: '#8b949e' }}>{line || ' '}</span>;
};
