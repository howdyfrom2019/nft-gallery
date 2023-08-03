import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { goerli, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { publicClient, webSocketPublicClient } = configureChains(
  [goerli, sepolia],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const WagmiProvider = ({ children }: React.PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WagmiProvider;
