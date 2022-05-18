import { SocketProvider } from "./context/SocketContext";
import { Home } from "./pages/Home";

function App() {

  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
}

export default App;
