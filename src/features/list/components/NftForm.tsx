import { getStorage, ref, uploadBytes } from "firebase/storage";

const NFTForm = () => {
  const storage = getStorage();

  const handleSubmit = (e: React.FormEvent) => {
    console.log(e);
  };
  return (
    <form
      className={
        "flex flex-col gap-4 w-full max-w-[1024px] mx-auto py-4 rounded-sm bg-slate-100"
      }
      onSubmit={handleSubmit}
    >
      <label className={"text-gray-800 font-serif"}>
        Mint Your Unique NFT!
      </label>
      <input
        className={"bg-slate-100 px-2 py-1 border"}
        placeholder={"title"}
      />
      <input className={"bg-slate-100 px-2 py-1 border"} placeholder={"desc"} />
      <input type={"file"} />
      <button className={"p-2 border font-serif"} type={"submit"}>
        Upload
      </button>
    </form>
  );
};

export default NFTForm;
