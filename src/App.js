import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Feed from "./Components/Feed/Feed";
import Newsletter from "./Components/Newsletter/Newsletter";
import AuthPage from "./Components/Auth/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { useEffect } from "react";
import { saveUser } from "./slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(saveUser(authUser));
      } else {
        dispatch(saveUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      {user ? (
        <div className="app">
          <Sidebar />
          <Feed />
          <Newsletter />
        </div>
      ) : (
        <AuthPage />
      )}
    </>
  );
}

export default App;
