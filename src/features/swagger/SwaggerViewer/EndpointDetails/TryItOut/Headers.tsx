import { HeadersPops } from '@/types/SwaggerViewer';
import { Plus, Trash2 } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

const Headers = ({ onHeaders }: HeadersPops) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-[10px] text-[#6e7681] font-semibold uppercase tracking-widest mb-2">
          Headers
        </h5>
        <button className="flex items-center gap-1 text-[10px] text-[#6366f1] px-1.5 py-0.5 rounded border border-[#6366f130] bg-[#6366f10a]">
          <Plus size={9} />
          Add
        </button>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <input
            placeholder="Authorization"
            className="flex-1 text-[11px] font-mono text-[#79c0ff] px-2 py-1.5 rounded-md border border-[#30363d] bg-[#161b22]  focus:outline-none transition-all"
            onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
            onBlur={(e) => (e.target.style.borderColor = '#30363d')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const newName = e.target.value;
              setName(newName);

              if (newName) {
                onHeaders?.((prevState) => ({
                  ...prevState,
                  [newName]: value,
                }));
              }
            }}
          />
          <input
            placeholder="Bearer xxx"
            className="flex-1 text-[11px] font-mono text-[#79c0ff] px-2 py-1.5 rounded-md border border-[#30363d] bg-[#161b22]  focus:outline-none transition-all"
            onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
            onBlur={(e) => (e.target.style.borderColor = '#30363d')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;
              setValue(newValue);

              if (name) {
                onHeaders?.((prevState) => ({
                  ...prevState,
                  [name]: newValue,
                }));
              }
            }}
          />
          <button className="text-[#484f58] text-[0px]">
            <Trash2 size={11} />
            Trash
          </button>
        </div>
      </div>
    </div>
  );
};

export default Headers;
