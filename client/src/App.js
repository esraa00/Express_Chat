import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register.js";
import Login from "./pages//Login/Login";
import Chat from "./pages/Chat/Chat.js";
import Error from "./pages/Error/Error.js";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
