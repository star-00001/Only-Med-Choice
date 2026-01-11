import React from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterSidebar } from './components/FilterSidebar';
import { ProviderCard } from './components/ProviderCard';
import { ProviderProfile } from './components/ProviderProfile';
import { Footer } from './components/Footer';
import type { Provider, SearchFilters } from '../types/provider';
import '../index.css';

function App() {
  const [selectedProvider, setSelectedProvider] = React.useState<Provider | null>(null);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const [filters, setFilters] = React.useState<SearchFilters>({
    name: '',
    specialty: '',
    location: '',
    distance: 2,
    acceptingNewPatients: undefined,
    languagesSpoken: [],
    gender: undefined,
    virtualCare: undefined,
    hospitalAffiliations: undefined,
    boardCertified: undefined,
    minExperience: 0,
    sortBy: 'rating',
  });

  const [providerList, setProviderList] = React.useState<Provider[]>([]);
  const [totalProviders, setTotalProviders] = React.useState(0);

  const [currentPage, setCurrentPage] = React.useState(1);
  const providersPerPage = 9;
  const [totalPages, setTotalPages] = React.useState(1);

  // ✅ Fetch providers from backend with filters & pagination
  const fetchProviders = async (page: number, appliedFilters: SearchFilters) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: providersPerPage.toString(),
        name: appliedFilters.name || '',
        specialty: appliedFilters.specialty || '',
        location: appliedFilters.location || '',
        distance: appliedFilters.distance?.toString() || '',
        acceptingNewPatients:
          appliedFilters.acceptingNewPatients !== undefined
            ? String(appliedFilters.acceptingNewPatients)
            : '',
        virtualCare:
          appliedFilters.virtualCare !== undefined
            ? String(appliedFilters.virtualCare)
            : '',
        gender: appliedFilters.gender || '',
        minExperience: appliedFilters.minExperience?.toString() || '',
        boardCertified:
          appliedFilters.boardCertified !== undefined
            ? String(appliedFilters.boardCertified)
            : '',
        hospitalAffiliations:
          appliedFilters.hospitalAffiliations !== undefined
            ? String(appliedFilters.hospitalAffiliations)
            : '',
        sortBy: appliedFilters.sortBy || 'rating',
      });

      // ✅ Languages array
      appliedFilters.languagesSpoken.forEach((lang) =>
        params.append('languagesSpoken', lang)
      );

      const res = await fetch(`http://localhost:5000/api/providers?${params.toString()}`);
      const data = await res.json();

      setProviderList(data.providers || []);
      setTotalProviders(data.total || 0);
      setTotalPages(Math.ceil((data.total || 0) / providersPerPage));
    } catch (err) {
      console.error('Error fetching providers:', err);
    }
  };

  // Fetch providers when page or filters change
  React.useEffect(() => {
    fetchProviders(currentPage, filters);
  }, [currentPage, filters]);

  // ✅ SearchBar -> updates filters
  const handleSearch = (query: string, location: string, specialty: string) => {
    setFilters((prev) => ({
      ...prev,
      name: query,
      location: location,
      specialty: specialty,
    }));
    setCurrentPage(1);
  };

  // ✅ FilterSidebar -> updates filters
  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchBar onSearch={handleSearch} />

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filter Sidebar */}
          <div className="w-full lg:w-60 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          {/* Main Content */}
          <div className="ml-0 flex-1 min-w-0">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Healthcare Providers
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {totalProviders} provider{totalProviders !== 1 ? 's' : ''} found
                {filters.location && ` in ${filters.location}`}
              </p>
            </div>

            {totalProviders === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  No providers found
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
                  Try adjusting your search criteria or filters to find more providers.
                </p>
                <button
                  onClick={() =>
                    handleFiltersChange({
                      name: '',
                      specialty: '',
                      location: '',
                      distance: 2,
                      acceptingNewPatients: undefined,
                      languagesSpoken: [],
                      gender: undefined,
                      virtualCare: undefined,
                      hospitalAffiliations: undefined,
                      boardCertified: undefined,
                      minExperience: 0,
                      sortBy: 'rating',
                    })
                  }
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {providerList.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onSelect={setSelectedProvider}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-full disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-gray-700 self-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-full disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {selectedProvider && (
        <ProviderProfile
          provider={selectedProvider}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}

export default App;
