import React, { useEffect, useState } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Video,
  // Building,
} from 'lucide-react';
import type { Provider } from '../../types/provider';

interface ProviderCardProps {
  provider: Provider;
  onSelect: (provider: Provider) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onSelect,
}) => {
  const [settings, setSettings] = useState({
    rating: true,
    yearsOfExperience: true,
    phoneNumber: true,
    acceptingStatus: true,
    virtualCareStatus: true,
    planName: true,
    affiliatedStatus: true,

  });

  // Load saved admin settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('providerSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const fullName = `${provider.firstName} ${
    provider.middleInitial ? provider.middleInitial + '. ' : ''
  }${provider.lastName}`;
  const fullAddress = `${provider.addressLine1 || ''}${
    provider.city}, ${provider.state} ${provider.zipCode}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden group h-full flex flex-col">
      <div className="p-4 sm:p-6 flex flex-col h-full">
        {/* Header */}
        <div className="mb-2 sm:mb-3 min-h-[48px]">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-tight line-clamp-2">
            {fullName}
            {provider.degree && `, ${provider.degree}`}
          </h3>

          {provider.specialtyName && (
            <p className="text-sm sm:text-base font-medium text-blue-900 mt-1 line-clamp-1">
              {provider.specialtyName}
            </p>
          )}
        </div>

        {/* Experience and Rating */}
        {(settings.yearsOfExperience && provider.yearOfExperience) ||
        (settings.rating && provider.rating) ? (
          <div className="flex items-center justify-between mb-2 min-h-[28px]">
            {settings.yearsOfExperience && provider.yearOfExperience && (
              <div className="flex items-center text-sm text-gray-600 space-x-1">
                <Clock className="w-4 h-4" />
                <span>{provider.yearOfExperience} yrs exp</span>
              </div>
            )}

            {settings.rating && provider.rating && (
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium text-gray-900">
                  {provider.rating}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="min-h-[28px]" />
        )}

        {/* Address */}
        {provider.addressLine1 && (
          <div className="flex items-start space-x-2 text-sm text-gray-600 mb-2 min-h-[40px]">
            <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
            <p className="leading-relaxed line-clamp-2">{fullAddress}</p>
          </div>
        )}

        {/* Contact */}
        {settings.phoneNumber && provider.phoneNumber && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2 min-h-[24px]">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{provider.phoneNumber}</span>
          </div>
        )}

        {/* Status Badges with fixed height */}
        {/* Status Badges with uniform 3-slot layout */}
        <div className="flex flex-wrap gap-2 mb-3 min-h-[56px]">
          {/* Plan Name */}
          {settings.planName && provider.planName ? (
            <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              <span>{provider.planName}</span>
            </div>
          ) : (
            <div className="w-[90px] h-[24px] opacity-0" />
          )}

          {/* Accepting Patients */}
          {settings.acceptingStatus ? (
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                provider.acceptingNewPatients
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {provider.acceptingNewPatients ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <XCircle className="w-3 h-3" />
              )}
              <span>
                {provider.acceptingNewPatients
                  ? 'Accepting Patients'
                  : 'Not Accepting'}
              </span>
            </div>
          ) : (
            <div className="w-[110px] h-[24px] opacity-0" />
          )}

          {/* Virtual Care */}
          {settings.virtualCareStatus ? (
            provider.virtualCareAvailable ? (
              <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                <Video className="w-3 h-3" />
                <span>Virtual Care</span>
              </div>
            ) : (
              <div className="w-[95px] h-[24px] opacity-0" />
            )
          ) : (
            <div className="w-[95px] h-[24px] opacity-0" />
          )}
           {/* Hospital Affiliated
          {settings. affiliatedStatus ? (
            provider. hospitalAffiliations ? (
              <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                <Building className="w-3 h-3" />
                <span>Hospital Affiliated</span>
              </div>
            ) : (
              <div className="w-[95px] h-[24px] opacity-0" />
            )
          ) : (
            <div className="w-[95px] h-[24px] opacity-0" />
          )} */}
        </div>

        {/* Button at bottom */}
        <button
          onClick={() => onSelect(provider)}
          className="w-full mt-auto bg-blue-900 text-white py-2 sm:py-2.5 px-4 rounded-lg hover:bg-blue-950 transition-colors font-medium text-sm sm:text-base"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};
