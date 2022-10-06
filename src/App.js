import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/layouts/Footer';
import NavBar from './components/layouts/NavBar';
import AdminContext, { AdminProvider } from './contexts/admin';
import { AirdropProvider } from './contexts/airdrop';
import { SaleProvider } from './contexts/private_sales_1';
import { UserProvider } from './contexts/user';
import AdminAirdrop from './pages/admin/AdminAirdrop';
import AdminSales from './pages/admin/AdminSales';
import AirDrop from './pages/AirDrop';
import PrivateSaleA from './pages/PrivateSaleA';
import PrivateSaleB from './pages/PrivateSaleB';
import SeedSale from './pages/SeedSale';

function App() {
  return (
    <UserProvider>
      <AdminProvider>
        <SaleProvider>
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
                <Route path='/sale/private/2' element={<PrivateSaleB/>}/> 
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
        </SaleProvider>
      </AdminProvider>
    </UserProvider>
  );
}

export default App;
