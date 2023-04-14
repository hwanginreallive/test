import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './pages/router';
import ContextProvider from './store/provider';
function App() {
    return (
        <div className="App">
            <ContextProvider>
                <BrowserRouter>
                    <ToastContainer />
                    <Router />
                </BrowserRouter>
            </ContextProvider>
        </div>
    );
}

export default App;
