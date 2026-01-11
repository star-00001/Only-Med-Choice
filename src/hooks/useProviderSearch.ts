import React from 'react';
import type{ Provider, SearchFilters } from '../types/provider';

export const useProviderSearch = (providers: Provider[]) => {
  const [filteredProviders, setFilteredProviders] = React.useState<Provider[]>(providers);

  const filterProviders = React.useCallback((filters: SearchFilters) => {
    let filtered = [...providers];

    // Name filter
    if (filters.name.trim()) {
      const searchTerm = filters.name.toLowerCase();
      filtered = filtered.filter(provider => 
        provider.firstName.toLowerCase().includes(searchTerm) ||
        provider.lastName.toLowerCase().includes(searchTerm) ||
        (provider.middleInitial && provider.middleInitial.toLowerCase().includes(searchTerm))
      );
    }

    // Specialty filter
    if (filters.specialty.trim()) {
      filtered = filtered.filter(provider => 
        provider.specialtyName.toLowerCase().includes(filters.specialty.toLowerCase())
      );
    }

    // Location filter
    if (filters.location.trim()) {
      const locationTerm = filters.location.toLowerCase();
      filtered = filtered.filter(provider => 
        provider.city.toLowerCase().includes(locationTerm) ||
        provider.state.toLowerCase().includes(locationTerm) ||
        provider.zipCode.includes(filters.location.trim())
      );
    }

    // Accepting new patients filter
    if (filters.acceptingNewPatients !== undefined) {
      filtered = filtered.filter(provider => 
        provider.acceptingNewPatients === filters.acceptingNewPatients
      );
    }

    // Languages filter
    if (filters.languagesSpoken.length > 0) {
      filtered = filtered.filter(provider => 
        filters.languagesSpoken.some(lang => 
          provider.languagesSpoken.includes(lang)
        )
      );
    }

    // Gender filter
    if (filters.gender) {
      filtered = filtered.filter(provider => 
        provider.gender === filters.gender
      );
    }

    // Virtual care filter
    if (filters.virtualCare !== undefined) {
      filtered = filtered.filter(provider => 
        provider.virtualCareAvailable === filters.virtualCare
      );
    }

    // Hospital affiliations filter
    if (filters.hospitalAffiliations !== undefined) {
      filtered = filtered.filter(provider => 
        provider.hospitalAffiliations === filters.hospitalAffiliations
      );
    }

    // Board certified filter
    if (filters.boardCertified !== undefined) {
      filtered = filtered.filter(provider => 
        provider.boardCertified === filters.boardCertified
      );
    }

    // Minimum experience filter
    if (filters.minExperience > 0) {
      filtered = filtered.filter(provider => 
        provider.yearOfExperience >= filters.minExperience
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name-asc':
          return a.lastName.localeCompare(b.lastName);
        case 'name-desc':
          return b.lastName.localeCompare(a.lastName);
        case 'experience':
          return b.yearOfExperience - a.yearOfExperience;
        default:
          return 0;
      }
    });

    setFilteredProviders(filtered);
  }, [providers]);

  return { filteredProviders, filterProviders };
};