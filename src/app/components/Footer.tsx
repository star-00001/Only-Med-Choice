import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const [brandName, setBrandName] = useState('OnlyMedChoice');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // ✅ Fetch brand data from Flask backend
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={brandName}
                  className="h-12 sm:h-10 lg:h-20 w-auto"
                />
              ) : (
                <div className="h-12 sm:h-10 lg:h-20 w-12 bg-gray-700 rounded" />
              )}
              <h1 className="text-gray-400">{brandName}</h1>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting patients with qualified healthcare providers across the nation.
              Your health is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Find Providers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Specialties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Locations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Insurance Plans</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Accessibility</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">HIPAA Compliance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-0 text-center sm:text-left">
            © 2025 {brandName}. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
