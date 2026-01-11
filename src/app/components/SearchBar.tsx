import React from 'react';
import { Search, MapPin, Stethoscope } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, location: string, specialty: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [specialty, setSpecialty] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location, specialty);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            Find Your Perfect Healthcare Provider
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Search through thousands of qualified healthcare professionals in your area. 
            Filter by specialty, location, availability, and more.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
              {/* Name/Provider Search */}
              <div className="relative sm:col-span-2 lg:col-span-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent placeholder-gray-500"
                />
              </div>

              {/* Location Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by city, state, or zip"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent placeholder-gray-500"
                />
              </div>

              {/* Specialty Search */}
              <div className="relative sm:col-span-2 lg:col-span-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-8 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Specialties</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="family-medicine">Family Medicine</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="psychiatry">Psychiatry</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2.5 sm:py-3 px-6 rounded-lg hover:bg-blue-950 transition-colors font-medium text-sm sm:text-base lg:text-lg"
            >
              Search Providers
            </button>
          </div>
        </form>

        {/* Quick filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-4">
          <button className="bg-white text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium shadow-sm">
           All Primary Care Physician
          </button>
          <button className="bg-white text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium shadow-sm">
           All Virtual Care Availablity
          </button>
          <button className="bg-white text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium shadow-sm">
          All Medical Specialties
          </button>
          
        </div>
      </div>
    </div>
  );
};