import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/layouts/Footer';
import NavBar from './components/layouts/NavBar';
import AdminContext, { AdminProvider } from './contexts/admin';
import { AirdropProvider } from './contexts/airdrop';
import { SaleProvider } from './contexts/private_sales_1';
import { RoundBProvider } from './contexts/private_round_2';
import { RoundCProvider } from './contexts/seed_sales'; 
import { UserProvider } from './contexts/user';
import AdminAirdrop from './pages/admin/AdminAirdrop';
import AdminSales from './pages/admin/AdminSales';
import AirDrop from './pages/AirDrop';
import PrivateSaleA from './pages/PrivateSaleA';
import PrivateSaleRound2 from './pages/PrivateSaleRound2';
import SeedSale from './pages/SeedSale';

function App() {
  return (
    <UserProvider>

      <AdminProvider>
      <SaleProvider>
      <RoundBProvider>
        <RoundCProvider>
          <AirdropProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <NavBar title="MEHG"/>
            <main className='container mx-auto px-3 py-12'>
              <Routes>
                <Route path='/' element={<AirDrop/>}/> 
                <Route path='/airdrop/' element={<AirDrop/>}/> 
                <Route path='/airdrop/referral/:referredBy' element={<AirDrop/>}/> 
                <Route path='/sale/private/1' element={<PrivateSaleA/>}/> 
                <Route path='/sale/private/2' element={<PrivateSaleRound2/>}/> 
                <Route path='/sale/seed' element={<SeedSale/>}/> 
                
                  <Route path='/admin/airdrop' element={<AdminAirdrop/>}/> 
                  <Route path='/admin/sale' element={<AdminSales/>}/> 
                
                {/* <Route path='*' element={<PageNotFound/>}/> */}
              </Routes>
              <ToastContainer/>
            </main>
          <Footer/>
          </div>
        </Router>
        </AirdropProvider>
        </RoundCProvider>
        </RoundBProvider>
        </SaleProvider>
      </AdminProvider>
    </UserProvider>
  );
}

export default App;
