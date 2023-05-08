import logo from './logo.svg';
import './App.css';
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from './firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import Login from './components/Login';
import Loading from './components/Loading';
import Home from './components/Home';
import EMF from './components/exps/EMF';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
function App() {
  const [user, loading] = useAuthState(auth)

  // if(true) return <Loading />
  if (loading) return <Loading />
  else if (!user) return <Login />
  return (
    <div >
      <SkeletonTheme>

        <Home />
      </SkeletonTheme>
    </div>
  );
}

export default App;
