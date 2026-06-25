import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { Book, Plus, Trash2, AlertTriangle } from 'lucide-react';

export function SubjectManager() {
  const subjects = useQuery(api.admin.listSubjects);
  const createSubject = useMutation(api.admin.createSubject);
  const deleteSubject = useMutation(api.admin.deleteSubject);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('ERROR: SUBJECT NAME IS REQUIRED');
      return;
    }
    if (!code.trim()) {
      setErrorMsg('ERROR: SUBJECT CODE IS REQUIRED');
      return;
    }

    try {
      await createSubject({
        name: name.trim(),
        code: code.trim(),
      });
      setName('');
      setCode('');
      setSuccessMsg('SUBJECT SUCCESSFULLY REGISTERED');
    } catch (err: any) {
      setErrorMsg(err.message || 'FAILED TO CREATE SUBJECT');
    }
  };

  const handleDelete = async (id: Id<"subjects">) => {
    if (!confirm('ARE YOU SURE YOU WANT TO REMOVE THIS SUBJECT NODE?')) return;
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await deleteSubject({ id });
      setSuccessMsg('SUBJECT NODE REMOVED');
    } catch (err: any) {
      setErrorMsg(err.message || 'FAILED TO DELETE SUBJECT');
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative select-none">
      <div className="absolute -top-4 -left-4 bg-black border-2 border-black px-2 py-1 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
        SUBJECTS_WORKSPACE
      </div>

      <div className="border-b-4 border-black pb-4 mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
          SUBJECTS CONSOLE
        </h2>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
          Synchronize database indexes for course modules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Registration Form */}
        <div className="border-4 border-black rounded-none p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-black font-bold mb-2 flex items-center gap-1.5 border-b-2 border-black pb-2">
              <Plus size={14} />
              <span>REGISTER NEW SUBJECT</span>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                Subject Name //
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.G., COMPUTATIONAL MATHEMATICS"
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4]"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                Subject Code //
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="E.G., MATH01"
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4]"
              />
            </div>

            {errorMsg && (
              <div className="bg-[#FF3B30] text-black border-2 border-black p-3 rounded-none flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide">
                <AlertTriangle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-[#A7F3D0] text-black border-2 border-black p-3 rounded-none flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide">
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="bg-[#FFD833] text-black font-bold uppercase border-2 border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all px-4 py-3 rounded-none cursor-pointer w-full text-xs font-mono tracking-widest shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            >
              SAVE SUBJECT RECORD
            </button>
          </form>
        </div>

        {/* Active Subjects Table */}
        <div className="border-4 border-black rounded-none p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col">
          <div className="font-mono text-xs uppercase tracking-widest text-black font-bold mb-4 flex items-center gap-1.5 border-b-2 border-black pb-2">
            <Book size={14} />
            <span>ACTIVE SUBJECT REGISTRY</span>
          </div>

          <div className="flex-1 overflow-auto max-h-[300px] border-2 border-black">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-widest border-b-2 border-black">
                  <th className="p-2.5 border-r border-black">Code</th>
                  <th className="p-2.5 border-r border-black">Subject Module</th>
                  <th className="p-2.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black font-mono text-xs">
                {subjects?.map((subj) => (
                  <tr key={subj._id} className="hover:bg-gray-50 text-black">
                    <td className="p-2.5 border-r border-black font-bold uppercase">{subj.code}</td>
                    <td className="p-2.5 border-r border-black uppercase truncate max-w-[150px]" title={subj.name}>
                      {subj.name}
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => handleDelete(subj._id)}
                        className="bg-[#FF3B30] text-white border border-black text-[9px] uppercase font-bold py-1 px-2 hover:bg-white hover:text-[#FF3B30] transition-colors cursor-pointer rounded-none"
                      >
                        [ REMOVE ]
                      </button>
                    </td>
                  </tr>
                ))}
                {(!subjects || subjects.length === 0) && (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                      NO SUBJECT RECORDS FOUND
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
