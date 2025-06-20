import { MotionLazyContainer } from "./components/animate";
import { ThemeSettings } from "./components/settings";
import SnackbarProvider from "./components/snackbar";
import Router from "./routes";
import { SocketProvider } from "./socket/SocketProvider";
import ThemeProvider from "./theme";

function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <SocketProvider>
            <SnackbarProvider>
              <Router />
            </SnackbarProvider>
          </SocketProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}

export default App;
