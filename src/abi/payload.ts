import { MINT_ABI } from "@/abi/abi";

type MethodType = "mintNFT" | "getNFT" | "isOwnerOf";
interface payloadArgsType {
  method: MethodType;
  chainId?: number;
}

const contractRecord: Record<number, `0x${string}`> = {
  5: "0x3d6F3E40567F03bc3b159fa5A5f60E42b079adEe",
  11155111: "0x095D0386E07f7a7c7EcD54F1b58D6Bc239fa09f8",
};

export default function contractPayload({ method, chainId }: payloadArgsType) {
  const address = chainId ? contractRecord[chainId] : "0x";

  return {
    address: address as `0x${string}`,
    abi: MINT_ABI,
    functionName: method as string,
  };
}
