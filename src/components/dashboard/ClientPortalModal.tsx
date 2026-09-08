import React, { useState, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  FolderPlus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Layers, 
  X, 
  ExternalLink,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subscribeUserBriefs, deleteProjectBrief, ProjectBriefRecord } from '../../services/briefsService';
import { DemoBadge } from '../visuals/DemoBadge';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  openBriefModal: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  openBriefModal,
}) => {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const [briefs, setBriefs] = useState<ProjectBriefRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setBriefs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeUserBriefs(
      user.uid,
      (data) => {
        setBriefs(data);
        setLoading(false);
      },
      (err) => {
        console.error('Failed to subscribe to briefs:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-10 h-10 rounded-full border border-slate-700"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {user ? user.displayName || 'Client Portal' : 'Client System Portal'}
              </h3>
              <p className="text-xs text-slate-400">
                {user ? user.email : 'Sign in with Google to view and manage your system architectures'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={() => signOutUser()}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1.5"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-slate-50/50 flex-1">
          {!user ? (
            /* Unauthenticated State */
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Access Your System Architectures
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Authenticate securely with Google to track project briefs, view active operational schematics, and sync your business requirements directly with Firestore.
              </p>
              <button
                onClick={() => signInWithGoogle()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mx-auto"
              >
                <User className="w-4 h-4" />
                <span>Continue with Google Sign-In</span>
              </button>
            </div>
          ) : loading ? (
            <div className="p-12 text-center text-xs font-mono text-slate-400">
              Loading active briefs from Firestore...
            </div>
          ) : briefs.length === 0 ? (
            /* Empty State */
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <p className="text-xs sm:text-sm text-slate-500">
                You haven't submitted any custom system briefs yet.
              </p>
              <button
                onClick={() => {
                  onClose();
                  openBriefModal();
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors inline-flex items-center gap-2"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Create Your First Project Brief</span>
              </button>
            </div>
          ) : (
            /* Briefs List */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  Your Active Systems ({briefs.length})
                </span>
                <button
                  onClick={() => {
                    onClose();
                    openBriefModal();
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>New Brief</span>
                </button>
              </div>

              {briefs.map((brief) => (
                <div
                  key={brief.id}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {brief.serviceType}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase">
                          {brief.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Company: {brief.companyName || brief.clientName}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteProjectBrief(brief.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete brief"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {brief.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>ID: {brief.id}</span>
                    <span className="text-indigo-600 font-semibold">
                      {brief.budgetRange ? `Budget: ${brief.budgetRange}` : 'Scope: Standard'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[11px]">DURABLE FIRESTORE PERSISTENCE</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
