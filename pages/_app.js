import '../styles/globals.css';
import { ThirdwebProvider } from "@3rdweb/react";

//Chain ID of Rinkeby is 4
const supportedChainIds = [4]

//injected - MetaMask
const connectors = {
  injected: {},
  walletconnect: {},
}

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
