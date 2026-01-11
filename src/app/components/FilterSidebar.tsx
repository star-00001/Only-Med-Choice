import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import type { SearchFilters } from '../../types/provider';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    distance: true,
    availability: true,
    demographics: true,
    qualifications: true,
    sort: true,
  });

  const [settings, setSettings] = useState({
    filterAcceptingStatus: true,
    filterVirtualCare: true,
    filterHospitalAffiliation: true,
    filterGender: true,
    filterLanguages: true,
    filterBoardCertified: true,
    filterExperience: true,
    filterRating: true,
    sortAtoZ: true,
    sortZtoA: true,
    sortHighRated: true,
    sortExperience: true,
  });

  // Load saved admin settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('providerSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      name: '',
      specialty: '',
      location: '',
      distance: 25,
      acceptingNewPatients: undefined,
      languagesSpoken: [],
      gender: undefined,
      virtualCare: undefined,
      hospitalAffiliations: undefined,
      boardCertified: undefined,
      minExperience: 0,
      sortBy: 'rating',
    });
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full bg-white p-3 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filters</span>
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onToggle} />
      )}

      {/* Filter sidebar */}
      <div
        className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-full
        bg-white rounded-none lg:rounded-lg shadow-xl lg:shadow-sm border-0 lg:border border-gray-200
        transform transition-transform duration-300 ease-in-out z-50 lg:z-auto
        overflow-y-auto lg:overflow-visible
      `}
      >
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Sorts & Filters</h3>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 lg:p-6">
          {/* Desktop header */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sorts & Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-900 hover:text-blue-950 font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Sort Options */}
            <div>
              <button
                onClick={() => toggleSection('sort')}
                className="flex items-center justify-between w-full text-left py-2"
              >
                <h4 className="font-medium text-gray-900 text-sm lg:text-base">Sort By</h4>
                {expandedSections.sort ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.sort && (
                <div className="mt-3">
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange('sortBy', e.target.value as SearchFilters['sortBy'])
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {settings.sortHighRated && (
                      <option value="rating">Highest Rated</option>
                    )}
                    {settings.sortAtoZ && <option value="name-asc">Name (A to Z)</option>}
                    {settings.sortZtoA && <option value="name-desc">Name (Z to A)</option>}
                    {settings.sortExperience && <option value="experience">Most Experienced</option>}
                  </select>
                </div>
              )}
            </div>
            <br></br>
<h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <div className="space-y-4 lg:space-y-6">
            {/* Distance Filter */}
            <div>
              <button
                onClick={() => toggleSection('distance')}
                className="flex items-center justify-between w-full text-left py-2"
              >
                <h4 className="font-medium text-gray-900 text-sm lg:text-base">Distance</h4>
                {expandedSections.distance ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.distance && (
                <div className="mt-3 space-y-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Within {filters.distance} miles
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={filters.distance}
                    onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 mi</span>
                    <span>100 mi</span>
                  </div>
                </div>
              )}
            </div>

            {/* Availability Filters */}
            <div>
              <button
                onClick={() => toggleSection('availability')}
                className="flex items-center justify-between w-full text-left py-2"
              >
                <h4 className="font-medium text-gray-900 text-sm lg:text-base">Availability</h4>
                {expandedSections.availability ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.availability && (
                <div className="mt-3 space-y-3">
                  {settings.filterAcceptingStatus && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.acceptingNewPatients === true}
                        onChange={(e) =>
                          handleFilterChange(
                            'acceptingNewPatients',
                            e.target.checked ? true : undefined,
                          )
                        }
                        className="rounded border-gray-300 text-blue-900 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Accepting New Patients</span>
                    </label>
                  )}
                  {settings.filterVirtualCare && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.virtualCare === true}
                        onChange={(e) =>
                          handleFilterChange('virtualCare', e.target.checked ? true : undefined)
                        }
                        className="rounded border-gray-300 text-blue-900 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Virtual Care Available</span>
                    </label>
                  )}
                  {/* {settings.filterHospitalAffiliation && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.hospitalAffiliations === true}
                        onChange={(e) =>
                          handleFilterChange(
                            'hospitalAffiliations',
                            e.target.checked ? true : undefined,
                          )
                        }
                        className="rounded border-gray-300 text-blue-900 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Hospital Affiliations</span>
                    </label>
                  )} */}
                </div>
              )}
            </div>

            {/* Demographics */}
            {settings.filterGender || settings.filterLanguages ? (
              <div>
                <button
                  onClick={() => toggleSection('demographics')}
                  className="flex items-center justify-between w-full text-left py-2"
                >
                  <h4 className="font-medium text-gray-900 text-sm lg:text-base">Demographics</h4>
                  {expandedSections.demographics ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.demographics && (
                  <div className="mt-3 space-y-3">
                    {settings.filterGender && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender
                        </label>
                        <select
                          value={filters.gender || ''}
                          onChange={(e) =>
                            handleFilterChange('gender', e.target.value || undefined)
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Any</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    )}

                    {settings.filterLanguages && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Languages
                        </label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {['Spanish', 'Hindi', 'Portuguese'].map(
                            (lang) => (
                              <label key={lang} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={filters.languagesSpoken.includes(lang)}
                                  onChange={(e) => {
                                    const updated = e.target.checked
                                      ? [...filters.languagesSpoken, lang]
                                      : filters.languagesSpoken.filter((l) => l !== lang);
                                    handleFilterChange('languagesSpoken', updated);
                                  }}
                                  className="rounded border-gray-300 text-blue-900 focus:ring-blue-500 w-4 h-4"
                                />
                                <span className="ml-2 text-sm text-gray-700">{lang}</span>
                              </label>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}

            {/* Qualifications */}
            {settings.filterBoardCertified || settings.filterExperience ? (
              <div>
                <button
                  onClick={() => toggleSection('qualifications')}
                  className="flex items-center justify-between w-full text-left py-2"
                >
                  <h4 className="font-medium text-gray-900 text-sm lg:text-base">Qualifications</h4>
                  {expandedSections.qualifications ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.qualifications && (
                  <div className="mt-3 space-y-3">
                    {settings.filterBoardCertified && (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.boardCertified === true}
                          onChange={(e) =>
                            handleFilterChange('boardCertified', e.target.checked ? true : undefined)
                          }
                          className="rounded border-gray-300 text-blue-900 focus:ring-blue-500 w-4 h-4"
                        />
                        <span className="ml-2 text-sm text-gray-700">Board Certified</span>
                      </label>
                    )}

                    {settings.filterExperience && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Experience: {filters.minExperience} years
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={filters.minExperience}
                          onChange={(e) =>
                            handleFilterChange('minExperience', parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0 yrs</span>
                          <span>40+ yrs</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}

            

            {/* Mobile Clear All Button */}
            <div className="lg:hidden pt-4 border-t border-gray-200">
              <button
                onClick={clearAllFilters}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
