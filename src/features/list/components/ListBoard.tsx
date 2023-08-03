import useFirestore from "@/hooks/useFirestore";
import { useEffect, useState } from "react";

const ListBoard = () => {
  const { fetchNFTList } = useFirestore();
  const [nftList, setNftList] = useState<NFT.List>([]);

  useEffect(() => {
    fetchNFTList().then((res) => setNftList(res));
  }, []);

  return (
    <div
      className={
        "grid grid-cols-3 gap-4 w-full max-w-[1024px] items-center mx-auto py-8"
      }
    >
      {nftList.map((item) => (
        <figure key={item.id}>
          <img
            src={item.url}
            alt={item.title}
            className={"w-full aspect-square object-contain bg-gray-100"}
          />
          <figcaption className={"font-serif font-bold text-xl"}>
            {item.title}
          </figcaption>
          <figcaption className={"font-serif text-sm truncate text-gray-600"}>
            {item.desc}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default ListBoard;
