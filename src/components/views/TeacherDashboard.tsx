import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Book, Users, MessageSquare, Send, ShieldAlert, Award } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';

interface TeacherDashboardProps {
  userEmail: string;
}

export function TeacherDashboard({ userEmail }: TeacherDashboardProps) {
  const teacher = useQuery(api.users.getCurrentUserRole, { email: userEmail });
  const subjects = useQuery(api.teacher.getTeacherSubjects, { teacherEmail: userEmail });
  const students = useQuery(api.admin.getStudentRoster);
  
  const allUsers = useQuery(api.admin.getSystemUsers);
  const admins = allUsers ? allUsers.filter(u => u.role === 'admin') : [
    { _id: 'admin_sys' as any, name: 'EduSphere Admin Node', email: 'admin@edusphere.net', role: 'admin' }
  ];

  const [chatTab, setChatTab] = useState<'student' | 'admin'>('student');
  const [selectedRecipient, setSelectedRecipient] = useState<{ _id: string; name: string; email: string; role: string } | null>(null);
  const [messageText, setMessageText] = useState('');

  // Fetch messages between teacher and selected recipient
  const messages = useQuery(
    api.chat.getMessages,
    teacher?._id && selectedRecipient?._id
      ? { user1Id: teacher._id as Id<"users">, user2Id: selectedRecipient._id as Id<"users"> }
      : "skip"
  );

  const sendMessageMutation = useMutation(api.chat.sendMessage);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !teacher?._id || !selectedRecipient?._id) return;

    try {
      const commsType = selectedRecipient.role === 'admin' ? 'admin_teacher' : 'teacher_student';
      await sendMessageMutation({
        senderId: teacher._id as Id<"users">,
        receiverId: selectedRecipient._id as Id<"users">,
        content: messageText.trim(),
        type: commsType,
      });
      setMessageText('');
    } catch (err: any) {
      alert(`Error sending transmission: ${err.message}`);
    }
  };

  const getRecipientList = () => {
    if (chatTab === 'student') {
      return students || [];
    }
    return admins;
  };

  const activeRecipients = getRecipientList();

  return (
    <div className="flex-1 flex flex-col p-6 md:p-10 bg-white overflow-y-auto select-none">
      {/* Immersive Header */}
      <div className="border-4 border-black bg-[#FFD833] text-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-black uppercase tracking-tighter">
            FACILITATOR_DASHBOARD // {teacher?.name || 'SYS_USER'}
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-black/70 mt-1">
            NODE_LINK: {userEmail} // STRUCTURAL_ROLE: {teacher?.role || 'TEACHER'}
          </p>
        </div>
        <div className="border-2 border-black bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-[2px_2px_0_0_#FFD833]">
          <Award size={14} className="text-[#FFD833]" />
          <span>FACILITATOR // ACTIVE</span>
        </div>
      </div>

      {/* Subject Grid */}
      <div className="mb-10">
        <div className="font-mono text-xs uppercase tracking-widest text-black font-bold mb-4 flex items-center gap-2">
          <Book size={14} />
          <span>REGISTERED_SUBJECTS // L1_CORE</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects?.map((subj) => (
            <div
              key={subj._id}
              className="border-4 border-black p-6 bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-widest bg-black text-white px-2 py-0.5 border border-black font-bold">
                  {subj.code}
                </span>
                <h3 className="font-serif text-xl font-bold uppercase tracking-tight mt-3 mb-1">
                  {subj.name}
                </h3>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">ASSIGNED_STUDENTS</span>
                <div className="border-2 border-black bg-white px-3 py-1 font-mono font-bold text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  {subj.assignedStudents}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Chat Hub */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-black font-bold mb-4 flex items-center gap-2">
          <MessageSquare size={14} />
          <span>COMMUNICATION_HUB // PIPELINES</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-white min-h-[450px]">
          {/* Sidebar Area */}
          <div className="lg:col-span-1 border-r-4 border-black flex flex-col">
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 border-b-4 border-black">
              <button
                onClick={() => { setChatTab('student'); setSelectedRecipient(null); }}
                className={`font-mono text-[10px] uppercase tracking-wider py-3 font-bold border-r-2 border-black transition-colors cursor-pointer ${
                  chatTab === 'student' ? 'bg-[#FFD833] text-black' : 'hover:bg-gray-100 text-black'
                }`}
              >
                STUDENT COMMS
              </button>
              <button
                onClick={() => { setChatTab('admin'); setSelectedRecipient(null); }}
                className={`font-mono text-[10px] uppercase tracking-wider py-3 font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  chatTab === 'admin' ? 'bg-[#FF3B30] text-white' : 'hover:bg-gray-100 text-black'
                }`}
              >
                <ShieldAlert size={12} />
                <span>ADMIN PIPELINE</span>
              </button>
            </div>

            {/* Recipient List */}
            <div className="flex-1 overflow-y-auto divide-y-2 divide-black bg-[#F9FAFB]">
              {activeRecipients.map((rec) => {
                const isSelected = selectedRecipient?._id === rec._id;
                return (
                  <button
                    key={rec._id}
                    onClick={() => setSelectedRecipient({ _id: rec._id, name: rec.name, email: rec.email, role: rec.role || (chatTab === 'admin' ? 'admin' : 'student') })}
                    className={`w-full text-left p-4 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer flex justify-between items-center ${
                      isSelected ? 'bg-black text-white' : 'hover:bg-gray-100 text-black bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{rec.name}</div>
                      <div className="text-[9px] opacity-70 lowercase mt-0.5">{rec.email}</div>
                    </div>
                    {chatTab === 'admin' && (
                      <span className="bg-[#FF3B30] text-white text-[8px] font-bold px-1.5 py-0.5 border border-black">
                        SECURE
                      </span>
                    )}
                  </button>
                );
              })}
              {activeRecipients.length === 0 && (
                <div className="p-8 text-center font-mono text-[10px] tracking-widest text-gray-400">
                  NO ACTIVE ENDPOINTS FOUND
                </div>
              )}
            </div>
          </div>

          {/* Active Conversation Area */}
          <div className="lg:col-span-2 flex flex-col bg-white">
            {selectedRecipient ? (
              <>
                {/* Active Title bar */}
                <div className="border-b-4 border-black p-4 bg-black text-white font-mono text-xs uppercase tracking-widest flex justify-between items-center">
                  <span>ROOM // {selectedRecipient.name}</span>
                  <span className="text-[10px] opacity-60 lowercase font-bold">{selectedRecipient.email}</span>
                </div>

                {/* Message Log */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F3F4F6] font-mono text-xs">
                  {messages?.map((msg) => {
                    const isSelf = msg.senderId === teacher?._id;
                    return (
                      <div key={msg._id} className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                        <div className={`p-3 border-2 border-black max-w-[80%] shadow-[2px_2px_0_0_rgba(0,0,0,1)] ${
                          isSelf ? 'bg-[#FFD833] text-black' : 'bg-white text-black'
                        }`}>
                          <p>{msg.content}</p>
                        </div>
                        <span className="text-[8px] text-gray-500 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })}
                  {messages?.length === 0 && (
                    <div className="h-full flex items-center justify-center text-center text-gray-400 tracking-widest text-[10px]">
                      &gt; PROTOCOL ESTABLISHED. COMMENCE TRANSMISSION.
                    </div>
                  )}
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="border-t-4 border-black flex">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="ENTER SECURE MESSAGE TRANSMISSION..."
                    className="flex-1 bg-white p-4 font-mono text-xs uppercase tracking-widest placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4]"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white hover:bg-white hover:text-black border-l-4 border-black px-6 py-4 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>SEND</span>
                    <Send size={12} />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-[#F9FAFB]">
                <MessageSquare size={48} className="text-black mb-3" />
                <span className="font-mono text-xs uppercase tracking-widest text-black font-bold">
                  SELECT NODE FROM DIRECTORY
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-1">
                  SECURE END-TO-END CHANNELS REGISTERED
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
