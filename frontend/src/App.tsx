import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from 'react-toastify';
import Navbar from './layout/Navbar'
import Profile from './pages/Profile'

function App() {
    
    return (
        <div className='bg-theme-1 min-h-screen font-mono text-shadow-lg'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                className={`mt-15`}
                transition={Slide}
            />   
            <Router>
                <header>
                    <Navbar/>
                </header>
                <main className='min-h-screen flex items-center  justify-center mn px-3'>
                    <Routes>
                        <Route path="/" element={<Profile />} />
                        <Route path="/:urlWalletAddress" element={<Profile />} />
                    </Routes>
                </main>
                <footer>

                </footer>
            </Router>
        </div>
    )
}

export default App
