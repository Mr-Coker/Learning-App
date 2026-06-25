import React, { useState, useRef } from 'react';
import { useQuery, useAction, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { Upload, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export function NoteIngester() {
  const subjects = useQuery(api.admin.listSubjects);
  const ingestNoteText = useAction(api.notesIngestion.ingestNoteText);
  const generateUploadUrl = useMutation(api.notesIngestion.generateUploadUrl);
  const saveNoteMetadata = useMutation(api.notesIngestion.saveNoteMetadata);

  // Form states
  const [title, setTitle] = useState('');
  const [classLevel, setClassLevel] = useState('Basic 9');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  
  // Loading & Ingestion states
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [ingestedNoteId, setIngestedNoteId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('ERROR: NOTE TITLE REQUIRED');
      return;
    }
    if (!selectedSubjectId) {
      setErrorMsg('ERROR: SUBJECT IDENTIFICATION REQUIRED');
      return;
    }
    if (!selectedFile) {
      setErrorMsg('ERROR: SOURCE FILE PAYLOAD REQUIRED');
      return;
    }

    setStatus('processing');

    try {
      // Step 1: Generate Upload URL
      const uploadUrl = await generateUploadUrl();

      // Step 2: Upload File
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("HTTP upload request failed");
      }

      // Step 3: Parse response JSON to get storageId
      const { storageId } = await uploadResponse.json();

      if (!storageId) {
        throw new Error("Convex did not return a valid storageId");
      }

      // Step 4: Save metadata record
      const noteId = await saveNoteMetadata({
        title: title.trim(),
        classLevel,
        subjectId: selectedSubjectId as Id<"subjects">,
        storageId,
      });

      setIngestedNoteId(noteId);
      setStatus('success');
      setTitle('');
      setSelectedFile(null);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'SYSTEM_INGESTION_FAILURE: CHECK DATABASE TELEMETRY');
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative select-none">
      <div className="absolute -top-4 -left-4 bg-[#FF3B30] border-2 border-black px-2 py-1 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
        NOTE_INGESTION_GATEWAY
      </div>

      <div className="border-b-4 border-black pb-4 mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
          AI LESSON NOTE PARSER
        </h2>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
          Automated curriculum restructuring system
        </p>
      </div>

      {status === 'processing' ? (
        /* Thick Marquee Loader */
        <div className="flex flex-col items-center justify-center py-16 gap-6 bg-gray-50 border-2 border-black">
          <div className="w-full bg-black text-[#FFD833] border-y-4 border-black overflow-hidden py-3 relative">
            <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono text-xs font-black uppercase tracking-widest">
              <span>[ PROCESSING_SYSTEM: EXTRACTING_CURRICULUM_DATA... ]</span>
              <span>[ RUNNING_HEURISTIC_PARSER... ]</span>
              <span>[ STRUCTURING_NEO_BRUTALIST_BLOCKED_CANVAS... ]</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-[#FFD833] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.s' }}></div>
            <div className="w-4 h-4 bg-[#38BDF8] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-[#A7F3D0] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="font-mono text-[10px] text-black font-bold uppercase tracking-wider">
            Running secure compilation pipelines...
          </span>
        </div>
      ) : status === 'success' ? (
        /* Ingestion Success View */
        <div className="bg-[#A7F3D0] border-4 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center gap-4 text-center">
          <CheckCircle2 size={40} className="text-black" />
          <div>
            <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black">
              INGESTION COMPLETE
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-wider text-black/75 mt-1">
              Note parsed and deployed to database successfully!
            </p>
          </div>
          <div className="font-mono text-[8px] bg-white border border-black px-2 py-1 text-black font-bold uppercase">
            NODE_REF // {ingestedNoteId}
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-mono text-[10px] uppercase font-bold py-2 px-4 transition-colors cursor-pointer"
          >
            INGEST ANOTHER NOTE
          </button>
        </div>
      ) : (
        /* Main Upload Form */
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Note Title */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
              <span>LESSON TITLE //</span>
              <span className="text-gray-400">REQUIRED</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.G., INTRODUCTION TO POLYNOMIALS"
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Level Dropdown */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                CURRICULUM LEVEL //
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black focus:outline-none focus:bg-[#FFF3C4]"
              >
                <option value="Basic 7">Basic 7</option>
                <option value="Basic 8">Basic 8</option>
                <option value="Basic 9">Basic 9</option>
              </select>
            </div>

            {/* Subject Selector */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                ASSIGNED SUBJECT CODES //
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black focus:outline-none focus:bg-[#FFF3C4]"
              >
                <option value="">SELECT SUBJECT NODE</option>
                {subjects?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.code} - {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* File Dropzone */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
              SOURCE PDF / TEXT PAYLOAD //
            </label>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              className={`border-4 border-dashed rounded-none p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-3 ${
                isDragActive
                  ? 'border-[#FFD833] bg-[#FFFBEA]'
                  : 'border-black bg-white hover:bg-gray-50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.txt"
                className="hidden"
              />
              <Upload size={32} className="text-black" />
              {selectedFile ? (
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-black">
                  <FileText size={16} />
                  <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="font-mono text-xs font-bold uppercase text-black">
                    DRAG & DROP OR CLICK TO INGEST FILE
                  </p>
                  <p className="font-mono text-[8px] uppercase tracking-widest text-gray-400">
                    PDF, TXT files accepted
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="bg-[#FF3B30] text-black border-2 border-black p-3 rounded-none flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <AlertTriangle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#FFD833] border-2 border-black rounded-none py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center gap-2 cursor-pointer transition-all duration-100 ease-in-out hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          >
            <span>INGEST NOTE PAYLOAD</span>
            <Upload size={14} />
          </button>
        </form>
      )}
    </div>
  );
}
