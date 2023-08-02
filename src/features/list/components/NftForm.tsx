import { storage } from "@/firebase/firebaseClient";
import useFirestore from "@/hooks/useFirestore";
import { useInput } from "@/hooks/useInput";
import { ref, uploadBytes } from "firebase/storage";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const NFTForm = () => {
  const [title, onChangeTitle] = useInput("");
  const [desc, onChangeDesc] = useInput("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { createNFTItem } = useFirestore();

  const uplaodImageToFireStore = async () => {
    if (!fileRef.current) return;
    const file = fileRef.current.files?.[0];

    if (!file) return;
    const extension = file.name.split(".").pop();
    const nftRef = ref(storage, `nft/${uuidv4()}.${extension}`);
    const snapshot = await uploadBytes(nftRef, file);

    return {
      isSuccess: Boolean(snapshot),
      bucket: snapshot.ref.bucket,
      path: snapshot.ref.fullPath,
    };
  };

  const mint = (payload: NFT.Item) => {};

  const handleClickSubmit = async () => {
    const uploadedResult = await uplaodImageToFireStore();
    if (!uploadedResult) return;

    const { isSuccess, bucket, path } = uploadedResult;
    if (!isSuccess) return;

    const data = await createNFTItem({
      title,
      desc,
      url: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
        path
      )}?alt=media`,
    });

    if (data.success && data.snapshot) {
      mint(data.snapshot);
    }
  };

  return (
    <div
      className={
        "flex flex-col gap-4 w-full max-w-[1024px] mx-auto py-4 rounded-sm bg-slate-100"
      }
    >
      <label className={"text-gray-800 font-serif"}>
        Mint Your Unique NFT!
      </label>
      <input
        className={"bg-slate-100 px-2 py-1 border"}
        placeholder={"title"}
        onChange={onChangeTitle}
        value={title}
      />
      <input
        className={"bg-slate-100 px-2 py-1 border"}
        placeholder={"desc"}
        onChange={onChangeDesc}
        value={desc}
      />
      <input type={"file"} accept={"image/*"} multiple={false} ref={fileRef} />
      <button className={"p-2 border font-serif"} onClick={handleClickSubmit}>
        Upload
      </button>
    </div>
  );
};

export default NFTForm;
