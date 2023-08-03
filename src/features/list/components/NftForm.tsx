import contractPayload from "@/abi/payload";
import { storage } from "@/firebase/firebaseClient";
import useFirestore from "@/hooks/useFirestore";
import { useInput } from "@/hooks/useInput";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useContractWrite, useNetwork, usePrepareContractWrite } from "wagmi";

const NFTForm = () => {
  const [title, onChangeTitle] = useInput("");
  const [desc, onChangeDesc] = useInput("");
  const sourceURI = useRef<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { createNFTItem } = useFirestore();
  const { chain } = useNetwork();
  const { config: mintConfig, error: mintError } = usePrepareContractWrite({
    ...contractPayload({
      method: "mintNFT",
      chainId: chain?.id,
    }),
    args: [title, desc, sourceURI.current],
  });
  const {
    write: mintNFT,
    isLoading: mintLoading,
    isSuccess: mintSuccess,
    data: mintData,
  } = useContractWrite(mintConfig);

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

  const handleClickSubmit = async () => {
    const uploadedResult = await uplaodImageToFireStore();
    if (!uploadedResult) return;

    const { isSuccess, bucket, path } = uploadedResult;
    if (!isSuccess) return;

    const imgURI = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
      path
    )}?alt=media`;

    const data = await createNFTItem({
      title,
      desc,
      url: imgURI,
    });
    sourceURI.current = imgURI;
    mintNFT?.();
  };

  useEffect(() => {
    toast("Minting Success!", {
      icon: "🖼️",
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
  }, [mintSuccess]);

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
