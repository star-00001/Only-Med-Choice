import React,{useState} from 'react';
import { 
  X, Star, MapPin, Phone, Mail, Clock, User, 
  Award, Building, Video, CheckCircle, XCircle,
  Languages,ChevronDown, ChevronUp,
} from 'lucide-react';
import type { Provider } from '../../types/provider';

interface ProviderProfileProps {
  provider: Provider;
  onClose: () => void;
}

export const ProviderProfile: React.FC<ProviderProfileProps> = ({ provider, onClose }) => {
  const fullName = `${provider.firstName} ${provider.middleInitial ? provider.middleInitial + '. ' : ''}${provider.lastName}`;
  const fullAddress = `${provider.addressLine1}${provider.addressLine2 ? ', ' + provider.addressLine2 : ''}${provider.addressLine3 ? ', ' + provider.addressLine3 : ''}, ${provider.city}, ${provider.state} ${provider.zipCode}`;
   const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-xl sm:rounded-t-2xl">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Provider Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Provider Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  {fullName}, {provider.degree}
                </h1>
                <p className="text-sm sm:text-lg text-gray-600 mb-1">{provider.type}</p>
                <p className="text-lg sm:text-xl font-semibold text-blue-900">{provider.specialtyName}</p>
              </div>
              <div className="flex items-center space-x-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm self-start">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                <span className="text-base sm:text-lg font-semibold text-gray-900">{provider.rating}</span>
                <span className="text-xs sm:text-sm text-gray-500">rating</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />
                <span className="text-sm sm:text-base text-gray-700">{provider.yearOfExperience} years of experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />
                <span className="text-sm sm:text-base text-gray-700">Board Certified: {provider.boardCertified ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />
                 <p className="text-sm sm:text-base text-gray-900"></p>
                <span className="text-sm sm:text-base text-gray-700">Gender: {provider.gender} </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base text-gray-900 font-medium">Address</p>
                      <p className="text-sm sm:text-base text-gray-600 break-words">{fullAddress}</p>
                      <p className="text-sm sm:text-base text-gray-500">
                        {provider.county}, {provider.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">Phone</p>
                      <p className="text-sm sm:text-base text-gray-600">{provider.phoneNumber}</p>
                    </div>
                  </div>
                  {provider.emailId && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base text-gray-900 font-medium">Email</p>
                        <p className="text-sm sm:text-base text-gray-600 break-all">{provider.emailId}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Working Hours</h3>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-gray-700">{provider.workingHours}</p>
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Professional Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-4">

                
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">Board</p>
                    <p className="text-sm sm:text-base text-gray-900 break-words">{provider.boardName}</p>
                  </div>
                 
                 
                </div>
              </div>

              {/* Services */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Services</h3>
                <div className="space-y-3">
                  {provider.virtualCareAvailable && (
                    <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                      <span className="text-purple-800 font-medium text-xs sm:text-sm">Virtual Care Available</span>
                    </div>
                  )}
                  {provider.hospitalAffiliations && (
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900 flex-shrink-0" />
                      <span className="text-blue-800 font-medium text-xs sm:text-sm">Hospital Affiliations</span>
                    </div>
                  )}

                   <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">Affiliation</p>
                    <p className="text-sm sm:text-base text-gray-900 break-words">{provider.affiliationName}</p>
                  </div>
                  
                </div>
              </div>
              

              
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Availability Status */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Patient Accepting Status</h3>
                <div className="space-y-3">
                  <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                    provider.acceptingNewPatients ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    {provider.acceptingNewPatients ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                    )}
                    <span className={`font-medium text-xs sm:text-sm ${
                      provider.acceptingNewPatients ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {provider.acceptingNewPatients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                    </span>
                  </div>
                </div>
              </div>
     <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
      {/* Header with toggle */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm sm:text-base text-gray-900 break-all font-semibold ">Identifiers</p>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </div>

      {/* Collapsible content */}
      {isOpen && (
        <div className="mt-2">
          <p className="text-sm sm:text-base text-gray-900 break-all">
            NPI ID: {provider.npiId}
          </p>
        </div>
      )}
    </div>
{/* Languages */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Languages Spoken</h3>
                <div className="flex items-start space-x-3">
                  <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    {provider.languagesSpoken.map((language, index) => (
                      <span
                        key={index}
                        className="bg-lime-100 text-lime-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Insurance */}
<div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
    Insurance
  </h3>

  <div className="space-y-3">
    {/* Plan Name */}
    <p className="text-sm sm:text-base text-gray-700">
      <span className="font-medium">Plan:</span> {provider.planName}
    </p>

    {/* All Plans */}
    <div>
      <p className="text-sm sm:text-base text-gray-700 mb-1">
        <span className="font-medium">All Plans:</span>
      </p>

      <div className="flex flex-wrap gap-2">
        {Array.isArray(provider.acceptedAllPlans) && provider.acceptedAllPlans.map((plan, index) => (
          <span
            key={index}
            className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
          >
            {plan}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>


              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-900 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:bg-blue-950 transition-colors font-medium text-sm sm:text-base">
                  Book Appointment
                </button>
                {/* <button className="w-full border border-gray-300 text-gray-700 py-2.5 sm:py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base">
                  Add to  Favourites
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};