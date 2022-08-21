import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/layouts/Footer';
import NavBar from './components/layouts/NavBar';
import AdminContext, { AdminProvider } from './contexts/admin';
import { SaleProvider } from './contexts/sales';
import { UserProvider } from './contexts/user';
import AdminAirdrop from './pages/admin/AdminAirdrop';
import AdminSales from './pages/admin/AdminSales';
import AirDrop from './pages/AirDrop';
import PrivateSaleA from './pages/PrivateSaleA';

function App() {
  return (
    <UserProvider>
      <AdminProvider>
        <SaleProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <NavBar title="MEHG"/>
            <main className='container mx-auto px-3 py-12'>
              <Routes>
                <Route path='/' element={<AirDrop/>}/> 
                <Route path='/sale/private/a' element={<PrivateSaleA/>}/> 
                <Route path='/sale/private/b' element={<PrivateSaleA/>}/> 
                <Route path='/sale/public' element={<PrivateSaleA/>}/> 
                
                  <Route path='/admin/airdrop' element={<AdminAirdrop/>}/> 
                  <Route path='/admin/sale' element={<AdminSales/>}/> 
                
                {/* <Route path='*' element={<PageNotFound/>}/> */}
              </Routes>
            </main>
          <Footer/>
          </div>
        </Router>
        </SaleProvider>
      </AdminProvider>
    </UserProvider>
  );
}

export default App;
