import { useConnect, useAccount } from "wagmi";
import { disconnect } from "wagmi/actions";
import { goerli, sepolia } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const ListHeader = () => {
  const { connect, connectors } = useConnect({
    connector: new MetaMaskConnector({
      chains: [goerli, sepolia],
    }),
  });
  const { address } = useAccount();
  return (
    <header
      className={
        "flex justify-between w-full max-w-[1024px] mx-auto py-6 items-center"
      }
    >
      <span className={"font-serif font-bold"}>NFT GALLERY</span>
      <button
        className={"font-serif border border-black p-3 w-[160px] truncate"}
        onClick={() => connect()}
      >
        {address ? address : "Connect Wallet"}
      </button>
    </header>
  );
};

export default ListHeader;
