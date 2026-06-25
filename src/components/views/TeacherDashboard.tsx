import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Book, Users, MessageSquare, Send, ShieldAlert, Award } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';
import { ViewState } from '../../types';
import { ChatView } from './ChatView';

interface TeacherDashboardProps {
  userEmail: string;
  onLogout?: () => void;
  currentView: ViewState;
}

export function TeacherDashboard({ userEmail, onLogout, currentView }: TeacherDashboardProps) {
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
      {/* Subject Grid */}
      {currentView === 'home' && (
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
      )}

      {/* Split Chat Hub */}
      {currentView === 'chat' && (
        <ChatView userEmail={userEmail} />
      )}
    </div>
  );
}
