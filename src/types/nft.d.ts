interface NFTItem {
  url: string;
  id: string;
  title: string;
  desc: string;
}

interface NFTCreatePayload {
  title: string;
  desc: string;
  url: string;
}

type NFTList = NFTItem[];

declare namespace NFT {
  type Item = NFTItem;
  type List = NFTList;
  type CreatePayload = NFTCreatePayload;
}
