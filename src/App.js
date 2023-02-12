import './App.css';
import EmiCalculator from './Components/EmiCalculator/EmiCalculator';
import EmiHistory from './Components/EmiCalculatorHistory/EmiHistory';
import { createContext, useState } from 'react';
import SignIn from './Components/SignIn/SignIn';

export const HistoryContext = createContext();
export const EmiListContext = createContext();
export const AuthUserContext = createContext();

function App() {
  const [authUser, setauthUser] = useState(false)
  const [emisHistory, setEmisHistory] = useState({})
  const [emiList, seEmiList] = useState([])
  const values = [{ emisHistory, setEmisHistory }]
  const listValues = [{ emiList, seEmiList }]
  return (
    <AuthUserContext.Provider value={[{ authUser, setauthUser}]}>
      <HistoryContext.Provider value={values}>
        <EmiListContext.Provider value={listValues}>
          { authUser ?
            <div className='App'>
              <EmiCalculator />
              <div className='App-EmiHitory'><EmiHistory /></div>

            </div>: <SignIn/>}

        </EmiListContext.Provider>
      </HistoryContext.Provider>
    </AuthUserContext.Provider>
  );
}

export default App;
