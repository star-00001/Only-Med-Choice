import { useState } from 'react';

// Type definitions
interface AdminUser {
  id: string;
  email: string;
  companyId: string;
  companyName: string;
  role: string;
}

interface InsuranceCompany {
  id: string;
  name: string;
  providers: any[];
  isConfigured: boolean;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
}
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './admin/pages/LoginPage';
import { SignupPage } from './admin/pages/SignupPage';
import Configure from './admin/pages/Configure';
// TODO: Uncomment and fix the path below if Configure exists elsewhere
// import Configure from '../correct/path/to/Configure';
import MainApp from './app/App';

function App() {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [currentCompany, setCurrentCompany] = useState<InsuranceCompany | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isConfigured, setIsConfigured] = useState(false);


  const handleSignup = (email: string, companyName: string) => {
    // Mock registration - in real app, this would make API calls
    const mockUser: AdminUser = {
      id: '1',
      email,
      companyId: '1',
      companyName,
      role: 'admin'
    };
    const mockCompany: InsuranceCompany = {
      id: '1',
      name: companyName,
      providers: [],
      isConfigured: false
    };
    setCurrentUser(mockUser);
    setCurrentCompany(mockCompany);
  };

  // Mock login function
  const handleLogin = (email: string) => {
    // In a real app, validate credentials and fetch user/company info
    const mockUser: AdminUser = {
      id: '1',
      email,
      companyId: '1',
      companyName: 'Demo Insurance',
      role: 'admin'
    };
    const mockCompany: InsuranceCompany = {
      id: '1',
      name: 'Demo Insurance',
      providers: [],
      isConfigured: false
    };
    setCurrentUser(mockUser);
    setCurrentCompany(mockCompany);
  };

  const handleConfigurationComplete = () => {
    if (currentCompany) {
      setCurrentCompany({
        ...currentCompany,
        isConfigured: true
      });
      setIsConfigured(true);
    }
  };

  // If user is not authenticated, show auth pages
  if (!currentUser || !currentCompany) {
    if (authMode === 'login') {
      return (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthMode('signup')}
        />
      );
    } else {
      return (
        <SignupPage
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  // If user is authenticated but company not configured, show configuration
  if (!currentCompany.isConfigured && !isConfigured) {
    return (
      <Configure onSave={handleConfigurationComplete} />

    );
  }

  // If everything is set up, show the main app
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainApp
             
            />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;