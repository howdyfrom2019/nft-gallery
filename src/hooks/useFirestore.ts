import { db } from "@/firebase/firebaseClient";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function useFirestore() {
  const createNFTItem = async (payload: NFT.CreatePayload) => {
    const nftRef = await addDoc(collection(db, "nfts"), payload);
    console.log(nftRef);
  };

  const fetchNFTList = async () => {
    const nftSnapshot = await getDocs(collection(db, "nfts"));
    const result: NFTItem[] = [];
    nftSnapshot.forEach((doc) => {
      const row = {
        ...doc.data(),
        id: doc.id,
      };
      result.push(row as NFTItem);
    });

    return result;
  };

  return {
    createNFTItem,
    fetchNFTList,
  };
}
