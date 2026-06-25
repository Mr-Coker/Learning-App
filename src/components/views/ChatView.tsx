import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { Send, MessageSquare, ShieldAlert } from 'lucide-react';

interface ChatViewProps {
  userEmail: string;
}

export function ChatView({ userEmail }: ChatViewProps) {
  const user = useQuery(api.users.getCurrentUserRole, { email: userEmail });
  const allSubjects = useQuery(api.chat.getAllSubjects);

  // States
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  // Mutator
  const sendMessageMutation = useMutation(api.chat.sendMessage);

  // Teacher specific subjects
  const teacherSubjects = useQuery(
    api.teacher.getTeacherSubjects,
    user?.role === 'teacher' ? { teacherEmail: userEmail } : 'skip'
  );

  // Active threads for a subject (Teacher only)
  const activeThreads = useQuery(
    api.chat.getSubjectThreads,
    user?.role === 'teacher' && selectedSubjectId
      ? { subjectId: selectedSubjectId as Id<"subjects"> }
      : 'skip'
  );

  // Messages log
  const messages = useQuery(
    user?.role === 'teacher'
      ? api.chat.getSubjectMessages
      : api.chat.getSubjectMessages,
    user && selectedSubjectId
      ? {
          subjectId: selectedSubjectId as Id<"subjects">,
          studentId: (user.role === 'teacher' ? selectedStudentId : user._id) as Id<"users">,
        }
      : 'skip'
  );

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center font-mono text-xs uppercase tracking-widest animate-pulse">
        Initializing Secure Telemetry Channel...
      </div>
    );
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedSubjectId) return;

    try {
      if (user.role === 'student') {
        const subjectsList = allSubjects || [];
        const currentSubj = subjectsList.find(s => s._id === selectedSubjectId);
        if (!currentSubj) return;

        await sendMessageMutation({
          senderId: user._id as Id<"users">,
          receiverId: currentSubj.teacherId as Id<"users">,
          subjectId: selectedSubjectId as Id<"subjects">,
          content: messageText.trim(),
          type: 'teacher_student',
        });
      } else if (user.role === 'teacher') {
        if (!selectedStudentId) return;
        await sendMessageMutation({
          senderId: user._id as Id<"users">,
          receiverId: selectedStudentId as Id<"users">,
          subjectId: selectedSubjectId as Id<"subjects">,
          content: messageText.trim(),
          type: 'teacher_student',
        });
      }
      setMessageText('');
    } catch (err: any) {
      alert(`Error transmitting message: ${err.message}`);
    }
  };

  // Student view configuration
  if (user.role === 'student') {
    const activeSubject = allSubjects?.find(s => s._id === selectedSubjectId);

    return (
      <div className="flex-1 flex overflow-hidden w-full h-full min-h-[500px] border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] select-none">
        {/* Subject Directory Sidebar */}
        <div className="w-56 md:w-64 bg-[#F9FAFB] border-r-4 border-black flex flex-col flex-shrink-0 h-full">
          <div className="p-4 border-b-4 border-black bg-[#FFD833] text-black">
            <h3 className="font-mono text-xs font-black uppercase tracking-wider">
              SUBJECTS_DIRECTORY
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto divide-y-2 divide-black">
            {allSubjects?.map((subj) => {
              const isSelected = selectedSubjectId === subj._id;
              return (
                <button
                  key={subj._id}
                  onClick={() => setSelectedSubjectId(subj._id)}
                  className={`w-full text-left p-4 font-mono text-[10px] md:text-xs uppercase tracking-wider transition-all cursor-pointer block ${
                    isSelected
                      ? 'bg-black text-white font-bold'
                      : 'bg-white text-black hover:bg-gray-100 hover:translate-x-[2px]'
                  }`}
                >
                  <span className="opacity-60 block text-[9px] mb-1">// {subj.code}</span>
                  {subj.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#F3F4F6] relative h-full">
          {selectedSubjectId ? (
            <>
              {/* Header with Teacher Obscurity Rules */}
              <header className="h-20 border-b-4 border-black px-6 bg-white flex items-center justify-between flex-shrink-0">
                <div className="flex flex-col">
                  <span className="font-serif text-lg md:text-xl font-black uppercase tracking-tight">
                    {activeSubject?.name}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-[#FF3B30] font-bold">
                    [ FACILITATOR IDENTITY CLASSIFIED ]
                  </span>
                </div>
                <div className="text-xs border border-black px-2 py-1 bg-black text-white font-mono uppercase tracking-widest">
                  SECURE_DESK
                </div>
              </header>

              {/* Messages Stream */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
                <div className="flex justify-center my-2">
                  <span className="text-[9px] border-2 border-black px-3 py-1 bg-black text-white font-mono uppercase tracking-widest shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    &gt;&gt; SECURE ENCRYPTED NODE INTERACTION INITIALIZED &lt;&lt;
                  </span>
                </div>

                {messages?.map((msg) => {
                  const isSelf = msg.senderId === user._id;
                  return (
                    <div
                      key={msg._id}
                      className={`flex flex-col max-w-[75%] ${
                        isSelf ? 'align-self-end self-end items-end' : 'align-self-start self-start items-start'
                      }`}
                    >
                      <div
                        className={`p-4 border-2 border-black rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] font-mono text-xs ${
                          isSelf ? 'bg-white text-black' : 'bg-[#FFD833] text-black font-bold'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <span className="text-[8px] text-gray-500 font-mono mt-1 px-1">
                        {isSelf ? 'STUDENT' : 'OFFICIAL INSTRUCTION'} // {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendMessage} className="border-t-4 border-black flex flex-shrink-0 bg-white">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="TRANSMIT CHALLENGE DETAILS OR BOTTLENECKS..."
                  className="flex-1 bg-white p-4 font-mono text-xs uppercase tracking-widest placeholder-gray-400 focus:outline-none focus:bg-amber-50"
                />
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-white hover:text-black border-l-4 border-black px-6 py-4 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>SEND</span>
                  <Send size={12} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
              <MessageSquare size={48} className="text-black mb-3 animate-bounce" />
              <span className="font-mono text-xs uppercase tracking-widest text-black font-black">
                SELECT A SUBJECT CODE
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-2">
                TRANSCEIVER ONLINE // SECURE CONNECTIONS DETECTED
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Teacher experience view
  if (user.role === 'teacher') {
    const activeSubject = teacherSubjects?.find(s => s._id === selectedSubjectId);
    const activeStudent = activeThreads?.find(st => st._id === selectedStudentId);

    return (
      <div className="flex-1 flex overflow-hidden w-full h-full min-h-[500px] border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] select-none">
        {/* Sidebar with Subject switcher tabs & active student threads */}
        <div className="w-64 bg-[#F9FAFB] border-r-4 border-black flex flex-col flex-shrink-0 h-full">
          {/* Subject Selector Tabs */}
          <div className="border-b-4 border-black bg-black p-3 text-white">
            <span className="font-mono text-[10px] uppercase font-black tracking-widest">
              FACILITATING_COURSES
            </span>
          </div>
          <div className="bg-white border-b-2 border-black p-2 flex flex-col gap-1.5">
            {teacherSubjects?.map((subj) => {
              const isSelected = selectedSubjectId === subj._id;
              return (
                <button
                  key={subj._id}
                  onClick={() => {
                    setSelectedSubjectId(subj._id);
                    setSelectedStudentId(null);
                  }}
                  className={`w-full text-left px-3 py-2 font-mono text-[10px] uppercase tracking-wider transition-all rounded-none border-2 border-black cursor-pointer ${
                    isSelected ? 'bg-[#FFD833] text-black font-bold' : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {subj.code} - {subj.name}
                </button>
              );
            })}
          </div>

          {/* Incoming Student Issue Threads */}
          <div className="p-3 border-b-2 border-black bg-gray-100 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase font-bold text-gray-600">
              INCOMING STUDENT CHALLENGES
            </span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y-2 divide-black">
            {activeThreads?.map((thread) => {
              const isSelected = selectedStudentId === thread._id;
              return (
                <button
                  key={thread._id}
                  onClick={() => setSelectedStudentId(thread._id)}
                  className={`w-full text-left p-4 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer block ${
                    isSelected ? 'bg-black text-white font-bold' : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold block truncate max-w-[120px]">{thread.name}</span>
                    <span className="text-[8px] opacity-60">
                      {new Date(thread.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[9px] opacity-75 truncate mt-1 lowercase font-light">
                    {thread.lastMessage}
                  </p>
                </button>
              );
            })}
            {(!selectedSubjectId || !activeThreads || activeThreads.length === 0) && (
              <div className="p-8 text-center font-mono text-[9px] tracking-wider text-gray-400">
                NO ACTIVE CHANNELS REPORTED ON THIS NODE
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#F3F4F6] relative h-full">
          {selectedSubjectId && selectedStudentId ? (
            <>
              {/* Header */}
              <header className="h-20 border-b-4 border-black px-6 bg-white flex items-center justify-between flex-shrink-0">
                <div className="flex flex-col">
                  <span className="font-serif text-lg md:text-xl font-black uppercase tracking-tight">
                    {activeStudent?.name}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-[#FFD833] font-bold bg-black px-1.5 py-0.5 w-fit uppercase">
                    SUBJECT // {activeSubject?.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs border-2 border-black px-2.5 py-1 bg-[#FF3B30] text-white font-mono uppercase tracking-widest font-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <ShieldAlert size={12} />
                  <span>SECURE CHANNEL</span>
                </div>
              </header>

              {/* Messages Stream */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
                {messages?.map((msg) => {
                  const isSelf = msg.senderId === user._id;
                  return (
                    <div
                      key={msg._id}
                      className={`flex flex-col max-w-[75%] ${
                        isSelf ? 'align-self-end self-end items-end' : 'align-self-start self-start items-start'
                      }`}
                    >
                      <div
                        className={`p-4 border-2 border-black rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] font-mono text-xs ${
                          isSelf ? 'bg-[#FFD833] text-black font-bold' : 'bg-white text-black'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <span className="text-[8px] text-gray-500 font-mono mt-1 px-1">
                        {isSelf ? 'FACILITATOR RESPONSE' : 'STUDENT INQUIRY'} // {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendMessage} className="border-t-4 border-black flex flex-shrink-0 bg-white">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="ENTER SECURE RESOLUTION TRANSMISSION..."
                  className="flex-1 bg-white p-4 font-mono text-xs uppercase tracking-widest placeholder-gray-400 focus:outline-none focus:bg-amber-50"
                />
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-white hover:text-black border-l-4 border-black px-6 py-4 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>TRANSMIT</span>
                  <Send size={12} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
              <MessageSquare size={48} className="text-black mb-3 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-black font-black">
                SELECT STUDENT WORKSPACE
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-2">
                ACTIVE QUEUE CORRELATOR STABLE
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
