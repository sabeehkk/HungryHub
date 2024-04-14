import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import persistStore from "redux-persist/es/persistStore";

import UserRoute from "./route/userRoutes";
import AdminRoute from "./route/adminRoutes";
import RestaurentRoute from "./route/restaurentRoutes";
import employeeRoutes from "./route/employeeRoutes";

const persistor = persistStore(store);

function App() {
  const router = createBrowserRouter([ UserRoute,AdminRoute,RestaurentRoute,employeeRoutes]);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
//new file occured
export default App;




