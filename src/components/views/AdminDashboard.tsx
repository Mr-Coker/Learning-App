import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Shield, Users, CreditCard, Send, Activity, MessageSquare } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';
import { ViewState } from '../../types';
import { NoteIngester } from './NoteIngester';
import { SubjectManager } from './SubjectManager';
import { VideoIngester } from './VideoIngester';

interface AdminDashboardProps {
  userEmail: string;
  onLogout?: () => void;
  currentView: ViewState;
}

export function AdminDashboard({ userEmail, onLogout, currentView }: AdminDashboardProps) {
  const adminProfile = useQuery(api.users.getCurrentUserRole, { email: userEmail });
  const stats = useQuery(api.dashboard.getAdminMetrics);
  const roster = useQuery(api.admin.getStudentRoster);
  const financials = useQuery(api.admin.getDetailedFinancials);
  const teachers = useQuery(api.admin.getTeachers);

  const [selectedTeacher, setSelectedTeacher] = useState<{ _id: string; name: string; email: string } | null>(null);
  const [messageText, setMessageText] = useState('');
  const [ingesterTab, setIngesterTab] = useState<'notes' | 'videos'>('notes');

  // Fetch messages between admin and selected teacher
  const messages = useQuery(
    api.chat.getMessages,
    adminProfile?._id && selectedTeacher?._id
      ? { user1Id: adminProfile._id as Id<"users">, user2Id: selectedTeacher._id as Id<"users"> }
      : "skip"
  );

  const sendMessageMutation = useMutation(api.chat.sendMessage);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !adminProfile?._id || !selectedTeacher?._id) return;

    try {
      await sendMessageMutation({
        senderId: adminProfile._id as Id<"users">,
        receiverId: selectedTeacher._id as Id<"users">,
        content: messageText.trim(),
        type: 'admin_teacher',
      });
      setMessageText('');
    } catch (err: any) {
      alert(`Dispatch Error: ${err.message}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 md:p-10 bg-white overflow-y-auto select-none">
      {/* System Overview Cards */}
      {currentView === 'home' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="border-4 border-black bg-[#FFD833] text-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            <div className="font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-1.5">
              <Users size={14} />
              <span>TOTAL_ENROLLED_LEARNERS</span>
            </div>
            <div className="text-5xl font-black tracking-tighter mt-2">
              {stats ? stats.totalStudents : '...'}
            </div>
          </div>

          <div className="border-4 border-black bg-[#FFD833] text-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            <div className="font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-1.5">
              <Users size={14} />
              <span>ACTIVE_FACILITATORS</span>
            </div>
            <div className="text-5xl font-black tracking-tighter mt-2">
              {stats ? stats.totalFacilitators : '...'}
            </div>
          </div>

          <div className="border-4 border-black bg-[#FFD833] text-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            <div className="font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-1.5">
              <CreditCard size={14} />
              <span>GROSS_REVENUE_METRICS</span>
            </div>
            <div className="text-5xl font-black tracking-tighter mt-2">
              ${stats ? stats.totalRevenue : '...'}
            </div>
          </div>
        </div>
      )}

      {/* Student Class Roster Table */}
      {currentView === 'assignments' && (
        <div className="space-y-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-black font-bold mb-4 flex items-center gap-2">
              <Activity size={14} />
              <span>STUDENT_CLASS_ROSTER // SYSTEM_ACTIVE</span>
            </div>
            <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-auto max-h-[500px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white font-mono text-xs uppercase tracking-widest border-b-4 border-black">
                    <th className="p-3 border-r-2 border-black">Name</th>
                    <th className="p-3 border-r-2 border-black">Email</th>
                    <th className="p-3 border-r-2 border-black">Class Layer</th>
                    <th className="p-3">XP Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black font-mono text-xs">
                  {roster?.map((st) => (
                    <tr key={st._id} className="hover:bg-gray-50 text-black">
                      <td className="p-3 border-r-2 border-black font-bold uppercase">{st.name}</td>
                      <td className="p-3 border-r-2 border-black lowercase">{st.email}</td>
                      <td className="p-3 border-r-2 border-black font-bold text-center">
                        <span className="bg-[#38BDF8] border border-black px-1.5 py-0.5 font-bold uppercase">
                          {st.classId}
                        </span>
                      </td>
                      <td className="p-3 font-bold">{st.xp} XP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Financial Metrics Terminal & Teacher Dispatch Desk */}
      {currentView === 'library' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left 2 Cols: Financials */}
          <div className="xl:col-span-2 space-y-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-black font-bold mb-4 flex items-center gap-2">
                <CreditCard size={14} />
                <span>FINANCIAL_METRICS_TERMINAL // LOGS</span>
              </div>
              <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-auto max-h-[500px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black text-white font-mono text-xs uppercase tracking-widest border-b-4 border-black">
                      <th className="p-3 border-r-2 border-black">Tx ID</th>
                      <th className="p-3 border-r-2 border-black">Learner Node</th>
                      <th className="p-3 border-r-2 border-black">Amount</th>
                      <th className="p-3">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-black font-mono text-xs">
                    {financials?.map((fin) => (
                      <tr key={fin._id} className="hover:bg-gray-50 text-black">
                        <td className="p-3 border-r-2 border-black text-gray-500 font-bold truncate max-w-[100px]" title={fin._id}>
                          {fin._id}
                        </td>
                        <td className="p-3 border-r-2 border-black font-bold uppercase">
                          {fin.studentName}
                          <span className="block text-[8px] font-normal lowercase tracking-normal text-gray-400">{fin.studentEmail}</span>
                        </td>
                        <td className="p-3 border-r-2 border-black font-bold text-emerald-600">${fin.amount}.00</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 border border-black font-bold text-[9px] uppercase ${
                            fin.paymentStatus === 'success' ? 'bg-[#A7F3D0] text-black' : 'bg-[#FF3B30] text-white'
                          }`}>
                            {fin.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Teacher Dispatch Desk */}
          <div className="lg:col-span-1">
            <div className="font-mono text-xs uppercase tracking-widest text-black font-bold mb-4 flex items-center gap-2">
              <MessageSquare size={14} />
              <span>TEACHER_DISPATCH_DESK // PIPE</span>
            </div>

            <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col min-h-[500px]">
              {/* Staff list sidebar header */}
              <div className="p-4 bg-[#FFD833] border-b-4 border-black font-mono text-[10px] uppercase tracking-wider font-bold">
                SELECT FACILITATOR NODE
              </div>

              {/* List of Teachers */}
              <div className="flex-1 overflow-y-auto divide-y-2 divide-black max-h-[200px]">
                {teachers?.map((t) => {
                  const isSelected = selectedTeacher?._id === t._id;
                  return (
                    <button
                      key={t._id}
                      onClick={() => setSelectedTeacher({ _id: t._id, name: t.name, email: t.email })}
                      className={`w-full text-left p-3 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex justify-between items-center ${
                        isSelected ? 'bg-black text-white' : 'hover:bg-gray-100 text-black bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{t.name}</div>
                        <div className="text-[8px] opacity-70 lowercase mt-0.5">{t.email}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Transmission panel */}
              <div className="flex-1 border-t-4 border-black bg-[#F3F4F6] flex flex-col justify-between">
                {selectedTeacher ? (
                  <>
                    {/* Message Stream */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 font-mono text-[10px]">
                      {messages?.map((msg) => {
                        const isSelf = msg.senderId === adminProfile?._id;
                        return (
                          <div key={msg._id} className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                            <div className={`p-2.5 border-2 border-black max-w-[85%] shadow-[1px_1px_0_0_rgba(0,0,0,1)] ${
                              isSelf ? 'bg-[#FFD833] text-black' : 'bg-white text-black'
                            }`}>
                              <p>{msg.content}</p>
                            </div>
                          </div>
                        );
                      })}
                      {messages?.length === 0 && (
                        <div className="text-center text-gray-400 mt-8 tracking-widest text-[9px]">
                          &gt; PIPELINE SYNCED. DISPATCH SECURE TEXT.
                        </div>
                      )}
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSendMessage} className="border-t-2 border-black flex bg-white">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="DISPATCH INSTRUCTION..."
                        className="flex-1 bg-white p-3 font-mono text-[9px] uppercase tracking-widest focus:outline-none focus:bg-[#FFF3C4]"
                      />
                      <button
                        type="submit"
                        className="bg-black text-white hover:bg-white hover:text-black border-l-2 border-black px-4 py-3 font-mono text-[9px] uppercase tracking-widest font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>SEND</span>
                        <Send size={10} />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
                    <MessageSquare size={32} className="text-black/30 mb-2" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">
                      AWAITING FACILITATOR LINK...
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {currentView === 'notes' && (
        <div className="flex flex-col items-center py-6 w-full max-w-2xl mx-auto space-y-6">
          {/* Curation Tab Selection */}
          <div className="flex border-4 border-black bg-white p-1.5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none w-full">
            <button
              onClick={() => setIngesterTab('notes')}
              className={`flex-1 py-2 font-mono font-bold text-xs uppercase rounded-none border-2 transition-all cursor-pointer text-center
                ${ingesterTab === 'notes'
                  ? 'bg-[#FFD833] text-black border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white text-black border-transparent hover:bg-gray-100'
                }
                active:translate-x-0.5 active:translate-y-0.5
              `}
            >
              [📝 NOTE_METADATA_INGESTER]
            </button>
            <button
              onClick={() => setIngesterTab('videos')}
              className={`flex-1 py-2 font-mono font-bold text-xs uppercase rounded-none border-2 transition-all cursor-pointer text-center
                ${ingesterTab === 'videos'
                  ? 'bg-[#FF007F] text-white border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white text-black border-transparent hover:bg-gray-100'
                }
                active:translate-x-0.5 active:translate-y-0.5
              `}
            >
              [🎥 VIDEO_CURRICULUM_INGESTER]
            </button>
          </div>

          <div className="w-full flex justify-center">
            {ingesterTab === 'notes' ? <NoteIngester /> : <VideoIngester />}
          </div>
        </div>
      )}

      {currentView === 'admin_subjects' && (
        <div className="flex justify-center items-center py-6">
          <SubjectManager />
        </div>
      )}
    </div>
  );
}
