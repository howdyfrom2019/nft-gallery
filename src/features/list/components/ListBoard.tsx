import useFirestore from "@/hooks/useFirestore";
import { useEffect, useState } from "react";

const ListBoard = () => {
  const { fetchNFTList } = useFirestore();
  const [nftList, setNftList] = useState<NFT.List>([]);

  useEffect(() => {
    fetchNFTList().then((res) => setNftList(res));
  }, []);

  console.log(nftList);

  return (
    <div
      className={
        "flex flex-wrap gap-4 w-full max-w-[1024px] items-center mx-auto"
      }
    >
      hi
    </div>
  );
};

export default ListBoard;
