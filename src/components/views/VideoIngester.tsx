import React, { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { CheckCircle2, Film } from 'lucide-react';

interface VideoPayload {
  classLevel: string;
  subjectCode: string;
  lookupKey: string;
  videoUrl: string;
  videoTitle: string;
  duration: string;
}

export function VideoIngester() {
  const subjects = useQuery(api.admin.listSubjects);
  const notesList = useQuery(api.notesIngestion.listAllNotes);

  // Form states
  const [classLevel, setClassLevel] = useState('Basic 9');
  const [subjectCode, setSubjectCode] = useState('');
  const [lookupKey, setLookupKey] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  
  // Status states
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [registry, setRegistry] = useState<VideoPayload[]>([]);

  // Load registry from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('edusphere_video_registry');
    if (saved) {
      try {
        setRegistry(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update default subject code when subjects query completes
  useEffect(() => {
    if (subjects && subjects.length > 0 && !subjectCode) {
      setSubjectCode(subjects[0].code);
    }
  }, [subjects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!lookupKey.trim()) {
      setErrorMsg('ERROR: LOCAL DATA ARRAY KEY MATCH REQUIRED');
      return;
    }
    if (!videoUrl.trim()) {
      setErrorMsg('ERROR: VIDEO STREAM URL REQUIRED');
      return;
    }
    if (!videoTitle.trim()) {
      setErrorMsg('ERROR: VIDEO DESCRIPTIVE NAME REQUIRED');
      return;
    }

    const payload: VideoPayload = {
      classLevel,
      subjectCode,
      lookupKey: lookupKey.trim(),
      videoUrl: videoUrl.trim(),
      videoTitle: videoTitle.trim(),
      duration: '14:22'
    };

    // Save individual payload for NotesView access
    localStorage.setItem(`video_payload_${payload.lookupKey}`, JSON.stringify(payload));

    // Update main list registry
    const updatedRegistry = [payload, ...registry.filter(item => item.lookupKey !== payload.lookupKey)];
    localStorage.setItem('edusphere_video_registry', JSON.stringify(updatedRegistry));
    setRegistry(updatedRegistry);

    setStatus('success');
    setVideoUrl('');
    setVideoTitle('');
  };

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-black p-6 rounded-none shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative select-none space-y-8 text-left">
      <div className="absolute -top-4 -left-4 bg-[#FF007F] border-2 border-black px-2 py-1 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
        VIDEO_PIPELINE
      </div>

      <div className="border-b-4 border-black pb-4">
        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
          VIDEO CURRICULUM INGESTER
        </h2>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
          Link Stream Lesson Reference Payloads to Active Academic Topics
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-[#A7F3D0] border-4 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center gap-4 text-center">
          <CheckCircle2 size={40} className="text-black" />
          <div>
            <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black">
              VIDEO PIPELINE UPDATED
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-wider text-black/75 mt-1">
              Video attachment deployed and cached successfully!
            </p>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-mono text-[10px] uppercase font-bold py-2 px-4 transition-colors cursor-pointer"
          >
            INGEST ANOTHER VIDEO
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="bg-[#FCA5A5] border-2 border-black p-3 font-mono text-[9px] font-bold uppercase text-black">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Level select */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                CLASS LEVEL //
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:ring-0 placeholder-gray-400"
              >
                <option value="Basic 7">BASIC 7</option>
                <option value="Basic 8">BASIC 8</option>
                <option value="Basic 9">BASIC 9</option>
              </select>
            </div>

            {/* Subject Code select */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                SUBJECT CODE //
              </label>
              <select
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:ring-0 placeholder-gray-400"
              >
                {subjects?.map((sub) => (
                  <option key={sub._id} value={sub.code}>
                    {sub.name} ({sub.code})
                  </option>
                )) || <option value="">NO SUBJECTS DETECTED</option>}
              </select>
            </div>
          </div>

          {/* Target Note Selection / Lookup Key */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
              <span>TARGET NOTES TOPIC KEY //</span>
              <span className="text-gray-400">REQUIRED</span>
            </label>
            <select
              value={lookupKey}
              onChange={(e) => setLookupKey(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:ring-0 placeholder-gray-400"
            >
              <option value="">-- SELECT TARGET TOPIC --</option>
              {notesList?.map((note) => (
                <option key={note._id} value={note.staticLookupKey}>
                  {note.title} [{note.staticLookupKey}]
                </option>
              ))}
            </select>
          </div>

          {/* Video Title */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
              VIDEO LESSON TITLE //
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="E.G., HOW SPREADSHEETS CALCULATE FORMULAS"
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:ring-0 placeholder-gray-400"
            />
          </div>

          {/* Video URL */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
              STREAM SOURCE URL //
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="E.G., HTTPS://WWW.YOUTUBE.COM/EMBED/..."
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:ring-0 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00FF88] text-black border-2 border-black py-3 font-mono font-black text-sm uppercase rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            [🚀 UPDATE VIDEO PIPELINE]
          </button>
        </form>
      )}

      {/* Registry Preview Engine */}
      <div className="space-y-4 pt-6 border-t-4 border-black">
        <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
          <Film size={14} />
          <span>CURATED_VIDEO_REGISTRY //</span>
        </h3>
        <div className="max-h-48 overflow-y-auto pr-1">
          {registry.length > 0 ? (
            registry.map((item, idx) => (
              <div key={idx} className="border-2 border-black mb-2 p-3 bg-[#F9F9F9] flex justify-between items-center font-mono text-xs font-bold rounded-none">
                <div className="flex flex-col text-left">
                  <span className="text-black uppercase">{item.videoTitle}</span>
                  <span className="text-[9px] text-gray-500 lowercase mt-0.5">{item.videoUrl}</span>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="bg-black text-[#00FF88] px-2 py-0.5 border border-black text-[9px] uppercase">
                    {item.subjectCode}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">{item.lookupKey}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 border border-dashed border-gray-300 font-mono text-[9px] text-gray-400 uppercase tracking-wider">
              [ NO VIDEO LINKS REGISTERED ]
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
