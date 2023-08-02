import { db } from "@/firebase/firebaseClient";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { toast } from "react-hot-toast/headless";

interface createSnapShotType {
  success: boolean;
  snapshot?: NFTItem;
}

export default function useFirestore() {
  const createNFTItem = async (
    payload: NFT.CreatePayload
  ): Promise<createSnapShotType> => {
    try {
      const nftRef = await addDoc(collection(db, "nfts"), payload);
      toast(`document is successfully created. id: ${nftRef.id}`, {
        icon: "📜",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      return new Promise((resolve, reject) => {
        onSnapshot(
          nftRef,
          (snapshot) => {
            resolve({ success: true, snapshot: snapshot.data() as NFT.Item });
          },
          (error) => {
            reject({ success: false });
          }
        );
      });
    } catch (e: unknown) {
      toast(`Error occurs with firestore`, {
        icon: "⛔",
        style: { borderRadius: "10px", background: "	#913831", color: "#fff" },
      });
      return Promise.reject({ success: false });
    }
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
