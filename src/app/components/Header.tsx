import React, { useEffect, useState } from 'react';
import { Menu, Languages, X } from 'lucide-react';

interface HeaderProps {
  fallbackBrand?: string;
}

export const Header: React.FC<HeaderProps> = ({ fallbackBrand = 'OnlyMedChoice' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [brandName, setBrandName] = useState(fallbackBrand);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // ✅ Fetch brand name and logo from Flask backend
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/config');
        const data = await res.json();

        if (data.brand_name) setBrandName(data.brand_name);
        if (data.logo) {
          // Convert hex/base64 to usable image
          if (data.logo.startsWith('data:image')) {
            // Already base64
            setLogoUrl(data.logo);
          } else {
            // Convert hex to base64 PNG
            const byteArray = new Uint8Array(
              data.logo.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16))
            );
            const blob = new Blob([byteArray], { type: 'image/png' });
            setLogoUrl(URL.createObjectURL(blob));
          }
        }
      } catch (error) {
        console.error('Error fetching brand info:', error);
      }
    };

    fetchBrandData();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between py-4 lg:py-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src={logoUrl || '/fallback-logo.png'}
              alt="Logo"
              className="h-12 sm:h-10 lg:h-20 w-auto object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {brandName}
              </h1>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative inline-block text-left">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              </div>

              {languageOpen && (
                <div className="absolute mt-2 bg-white border rounded-lg shadow-md z-10 w-32">
                  <ul className="py-1 text-sm text-gray-700">
                    {['English', 'Hindi', 'Tamil', 'Spanish'].map((lang) => (
                      <li key={lang}>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                          {lang}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-950 transition-colors font-medium">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Language Dropdown */}
              <div className="relative inline-block text-left">
                <div
                  className="flex items-center space-x-2 cursor-pointer px-2"
                  onClick={() => setLanguageOpen(!languageOpen)}
                >
                  <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-gray-100 flex-shrink-0" />
                  <span className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Language
                  </span>
                </div>

                {languageOpen && (
                  <div className="mt-2 bg-white border rounded-lg shadow-md z-10 w-32">
                    <ul className="py-1 text-sm text-gray-700">
                      {['English', 'Hindi', 'Tamil', 'Spanish'].map((lang) => (
                        <li key={lang}>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                            {lang}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-200">
                <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-950 transition-colors font-medium">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
