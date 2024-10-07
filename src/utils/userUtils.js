import { db } from '../firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getUserData = async (userId) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.data();
};

export const incrementUsage = async (userId) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    usageCount: increment(1)
  });
};

export const checkUserAccess = async (userId) => {
  const userData = await getUserData(userId);
  if (userData.isPaid) return true;
  return userData.usageCount < 3; // Assuming 3 free uses
};

export const getUserIdFromEmail = async (email) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id;
  }
  return null;
};

export const updatePaymentStatus = async (userId, isPaid) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { isPaid });
};