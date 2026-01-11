-- 1. Core Provider Info
CREATE TABLE "Provider_Info" (
  "ProviderID" UUID PRIMARY KEY,
  "ProviderFirstName" VARCHAR,
  "ProviderMiddleInitial" VARCHAR,
  "ProviderLastName" VARCHAR,
  "ProviderNameSuffix" VARCHAR,
  "ProviderType" VARCHAR,
  "ProviderGender" VARCHAR,
  "ProviderRaceEthnicity" VARCHAR,
  "ProviderDOB" DATE,
  "ProviderAge" INT,
  "ProviderNPI" VARCHAR
);

-- 2. Address
CREATE TABLE "Provider_Address" (
  "AddressID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "ProviderAddressType" VARCHAR,
  "ProviderAddressLine1" VARCHAR,
  "ProviderAddressLine2" VARCHAR,
  "ProviderAddressLine3" VARCHAR,
  "ProviderCity" VARCHAR,
  "ProviderState" VARCHAR,
  "ProviderCounty" VARCHAR,
  "ProviderCountry" VARCHAR,
  "ProviderZIPCode" VARCHAR,
  "ProviderLatitude" DECIMAL,
  "ProviderLongitude" DECIMAL
);

-- 3. Communication
CREATE TABLE "Provider_Communication" (
  "CommunicationID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "ProviderContactType" VARCHAR,
  "ProviderPhoneNo" VARCHAR,
  "ProviderEmail" VARCHAR
);

-- 4. Speciality
CREATE TABLE "Provider_Speciality" (
  "SpecialityID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "ProviderSpecialityCode" VARCHAR,
  "ProviderSpecialityType" VARCHAR,
  "ProviderSpecialityName" VARCHAR,
  "ProviderSpecialityStartDate" DATE,
  "ProviderSpecialityEndDate" DATE
);

-- 5. Certification
CREATE TABLE "Provider_Certification" (
  "CertificationID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "ProviderBoardCertified" VARCHAR,
  "ProviderCertificateIssueDate" DATE,
  "ProviderCertificateExpiryDate" DATE,
  "ProviderDegree" VARCHAR,
  "ProviderBoardName" VARCHAR,
  "ProviderYearsOfExperience" INT
);

-- 6. Location
CREATE TABLE "Provider_Location" (
  "ProviderLocationID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "ProviderAvailabilityDayOfWeek" VARCHAR,
  "ProviderAvailabilityStartTime" TIME,
  "ProviderAvailabilityEndTime" TIME
);

-- 7. Language
CREATE TABLE "Provider_Language" (
  "LanguageRecordID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "LocationID" UUID REFERENCES "Provider_Location"("ProviderLocationID") ON DELETE CASCADE,
  "ProviderLanguageID" UUID,
  "ProviderLanguage" VARCHAR[],
  "ProviderLanguageStartDate" DATE,
  "ProviderLanguageEndDate" DATE
);

-- 8. Insurance
CREATE TABLE "Provider_Insurance" (
  "InsuranceRecordID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "LocationID" UUID REFERENCES "Provider_Location"("ProviderLocationID") ON DELETE CASCADE,
  "ProviderInsuranceID" UUID,
  "ProviderInsuranceName" VARCHAR,
  "ProviderPlanID" UUID,
  "ProviderPlanName" VARCHAR[],  
  "ProviderNetworkType" VARCHAR,
  "ProviderPlanStartDate" DATE,
  "ProviderPlanEndDate" DATE,
  "ProviderContractStatus" VARCHAR
);

-- 9. Affiliation
CREATE TABLE "Provider_Affiliation" (
  "AffiliationID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "ProviderAffliated" VARCHAR,
  "ProviderAffiliationName" VARCHAR,
  "ProviderAffiliationType" VARCHAR,
  "ProviderAffiliationStartDate" DATE,
  "ProviderAffiliationEndDate" DATE
);

-- 10. License
CREATE TABLE "Provider_License" (
  "LicenseRecordID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "LicenseNumber" VARCHAR,
  "LicenseState" VARCHAR,
  "IssueDate" DATE,
  "ExpiryDate" DATE,
  "Status" VARCHAR
);

-- 11. Visit Mode
CREATE TABLE "Provider_VisitMode" (
  "VisitModeID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "LocationID" UUID REFERENCES "Provider_Location"("ProviderLocationID") ON DELETE CASCADE,
  "Acceptingnewpatients" VARCHAR,
  "VirtualCare" VARCHAR,
  "VisitMode" VARCHAR
);

-- 12. Ratings
CREATE TABLE "Provider_Ratings" (
  "RatingID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "RatingSourceID" UUID,
  "RatingSourceName" VARCHAR,
  "RatingType" VARCHAR,
  "RatingValue" DECIMAL,
  "RatingStartDate" DATE,
  "RatingEndDate" DATE
);

-- 13. Leave Schedule
CREATE TABLE "Provider_LeaveSchedule" (
  "LeaveID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "LocationID" UUID REFERENCES "Provider_Location"("ProviderLocationID") ON DELETE CASCADE,
  "LeaveType" VARCHAR,
  "LeaveStartDate" DATE,
  "LeaveEndDate" DATE,
  "LeaveReason" VARCHAR,
  "IsRecurring" BOOLEAN,
  "RecurringPattern" VARCHAR
);

-- 14. Working Hours
CREATE TABLE "Provider_WorkingHours" (
  "WorkingHourID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "LocationID" UUID REFERENCES "Provider_Location"("ProviderLocationID") ON DELETE CASCADE,
  "DayOfWeek" VARCHAR,
  "StartTime" TIME,
  "EndTime" TIME,
  "IsActive" BOOLEAN
);


ALTER TABLE "Provider_Address" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Communication" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Speciality" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Certification" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Location" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Affiliation" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_License" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Ratings" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_LeaveSchedule" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_WorkingHours" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");
