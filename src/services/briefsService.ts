import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export interface ProjectBriefRecord {
  id: string;
  userId: string;
  clientName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceType: string;
  budgetRange?: string;
  timeline?: string;
  description: string;
  status: 'submitted' | 'reviewing' | 'architecture_ready' | 'scheduled';
  createdAt?: any;
  updatedAt?: any;
}

export async function submitProjectBrief(
  briefData: Omit<ProjectBriefRecord, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const briefId = `brief_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const briefRef = doc(db, 'briefs', briefId);
  const payload = {
    ...briefData,
    id: briefId,
    status: 'submitted' as const,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(briefRef, payload);
    return briefId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `briefs/${briefId}`);
    throw error;
  }
}

export function subscribeUserBriefs(
  userId: string,
  onData: (briefs: ProjectBriefRecord[]) => void,
  onError?: (err: any) => void
) {
  const briefsRef = collection(db, 'briefs');
  const q = query(
    briefsRef,
    where('userId', '==', userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const items: ProjectBriefRecord[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as ProjectBriefRecord);
      });
      onData(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'briefs');
      if (onError) onError(error);
    }
  );
}

export async function deleteProjectBrief(briefId: string): Promise<void> {
  const briefRef = doc(db, 'briefs', briefId);
  try {
    await deleteDoc(briefRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `briefs/${briefId}`);
    throw error;
  }
}
