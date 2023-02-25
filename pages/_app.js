import Alert from "@/components/Alert";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { StateContextProvider } from "@/context/stateContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Alert />
      <Component {...pageProps} />
    </StateContextProvider>
  );
}
