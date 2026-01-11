from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from uuid import uuid4

db = SQLAlchemy()

#######################
# Provider_Info_Table #
#######################

class ProviderInfo(db.Model):
    __tablename__ = 'Provider_Info'
    ProviderID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    ProviderFirstName = db.Column(db.String)
    ProviderMiddleInitial = db.Column(db.String)
    ProviderLastName = db.Column(db.String)
    ProviderNameSuffix = db.Column(db.String)
    ProviderType = db.Column(db.String)
    ProviderGender = db.Column(db.String)
    ProviderRaceEthnicity = db.Column(db.String)
    ProviderDOB = db.Column(db.Date)
    ProviderAge = db.Column(db.Integer)
    ProviderNPI = db.Column(db.String)

##########################
# Provider_Address_Table #
##########################

class ProviderAddress(db.Model):
    __tablename__ = 'Provider_Address'

    AddressID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )
    ProviderAddressType = db.Column(db.String)
    ProviderAddressLine1 = db.Column(db.String)
    ProviderAddressLine2 = db.Column(db.String)
    ProviderAddressLine3 = db.Column(db.String)
    ProviderCity = db.Column(db.String)
    ProviderState = db.Column(db.String)
    ProviderCounty = db.Column(db.String)
    ProviderCountry = db.Column(db.String)
    ProviderZIPCode = db.Column(db.String)
    ProviderLatitude = db.Column(db.Numeric)
    ProviderLongitude = db.Column(db.Numeric)

    # Relationship to access provider from address
    provider = db.relationship('ProviderInfo', backref=db.backref('addresses', cascade='all, delete-orphan'))

################################
# Provider_Communication_Table #
################################ 

class ProviderCommunication(db.Model):
    __tablename__ = 'Provider_Communication'

    CommunicationID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )
    ProviderContactType = db.Column(db.String)
    ProviderPhoneNo = db.Column(db.String)
    ProviderEmail = db.Column(db.String)

    # Relationship to access provider from communication
    provider = db.relationship('ProviderInfo', backref=db.backref('communications', cascade='all, delete-orphan'))

#############################
# Provider_Speciality_Table #
#############################

class ProviderSpeciality(db.Model):
    __tablename__ = 'Provider_Speciality'

    SpecialityID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )
    ProviderSpecialityCode = db.Column(db.String)
    ProviderSpecialityType = db.Column(db.String)
    ProviderSpecialityName = db.Column(db.String)
    ProviderSpecialityStartDate = db.Column(db.Date)
    ProviderSpecialityEndDate = db.Column(db.Date)

    # Relationship to access provider from speciality
    provider = db.relationship('ProviderInfo', backref=db.backref('specialities', cascade='all, delete-orphan'))


################################
# Provider_Certification_Table #
################################

class ProviderCertification(db.Model):
    __tablename__ = 'Provider_Certification'

    CertificationID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )
    ProviderBoardCertified = db.Column(db.String)
    ProviderCertificateIssueDate = db.Column(db.Date)
    ProviderCertificateExpiryDate = db.Column(db.Date)
    ProviderDegree = db.Column(db.String)
    ProviderBoardName = db.Column(db.String)
    ProviderYearsOfExperience = db.Column(db.Integer)

    # Relationship to access provider from certification
    provider = db.relationship('ProviderInfo', backref=db.backref('certifications', cascade='all, delete-orphan'))

###########################
# Provider_Language_Table #
###########################


class ProviderLanguage(db.Model):
    __tablename__ = 'Provider_Language'

    LanguageRecordID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )
    LocationID = db.Column(
        db.String,
        db.ForeignKey('Provider_Location.ProviderLocationID', ondelete='CASCADE'),
        nullable=False
    )
    ProviderLanguageID = db.Column(db.String)
    ProviderLanguage = db.Column(ARRAY(db.String))
    ProviderLanguageStartDate = db.Column(db.Date)
    ProviderLanguageEndDate = db.Column(db.Date)

    # Relationships
    provider = db.relationship('ProviderInfo', backref=db.backref('languages', cascade='all, delete-orphan'))
    location = db.relationship('ProviderLocation', backref=db.backref('languages', cascade='all, delete-orphan'))

###########################
# Provider_Location_Table #
###########################

class ProviderLocation(db.Model):
    __tablename__ = 'Provider_Location'

    ProviderLocationID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )
    ProviderAvailabilityDayOfWeek = db.Column(db.String)
    ProviderAvailabilityStartTime = db.Column(db.Time)
    ProviderAvailabilityEndTime = db.Column(db.Time)

    # Relationship to access provider from location
    provider = db.relationship('ProviderInfo', backref=db.backref('locations', cascade='all, delete-orphan'))

############################
# Provider_Insurance_Table #
############################


class ProviderInsurance(db.Model):
    __tablename__ = 'Provider_Insurance'

    InsuranceRecordID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )
    
    LocationID = db.Column(
        db.String,
        db.ForeignKey('Provider_Location.ProviderLocationID', ondelete='CASCADE'),
        nullable=False
    )
    
    ProviderInsuranceID = db.Column(db.String)
    ProviderInsuranceName = db.Column(db.String)
    ProviderPlanID = db.Column(db.String)
    ProviderPlanName = db.Column(ARRAY(db.String))  # Array of strings
    ProviderNetworkType = db.Column(db.String)
    ProviderPlanStartDate = db.Column(db.Date)
    ProviderPlanEndDate = db.Column(db.Date)
    ProviderContractStatus = db.Column(db.String)

    # Relationships
    provider = db.relationship('ProviderInfo', backref=db.backref('insurances', cascade='all, delete-orphan'))
    location = db.relationship('ProviderLocation', backref=db.backref('insurances', cascade='all, delete-orphan'))

##############################
# Provider_Affiliation_Table #
##############################

class ProviderAffiliation(db.Model):
    __tablename__ = 'Provider_Affiliation'

    AffiliationID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )
    
    ProviderAffliated = db.Column(db.String)
    ProviderAffiliationName = db.Column(db.String)
    ProviderAffiliationType = db.Column(db.String)
    ProviderAffiliationStartDate = db.Column(db.Date)
    ProviderAffiliationEndDate = db.Column(db.Date)

    # Relationship to access provider from affiliation
    provider = db.relationship('ProviderInfo', backref=db.backref('affiliations', cascade='all, delete-orphan'))


#############################
# Provider_Visit_Mode_Table #
#############################


class ProviderVisitMode(db.Model):
    __tablename__ = 'Provider_VisitMode'

    VisitModeID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )
    
    LocationID = db.Column(
        db.String,
        db.ForeignKey('Provider_Location.ProviderLocationID', ondelete='CASCADE'),
        nullable=False
    )
    
    Acceptingnewpatients = db.Column(db.String)
    VirtualCare = db.Column(db.String)
    VisitMode = db.Column(db.String)

    # Relationships
    provider = db.relationship('ProviderInfo', backref=db.backref('visit_modes', cascade='all, delete-orphan'))
    location = db.relationship('ProviderLocation', backref=db.backref('visit_modes', cascade='all, delete-orphan'))

#########################
# Provider_Rating_Table #
#########################

class ProviderRatings(db.Model):
    __tablename__ = 'Provider_Ratings'

    RatingID = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    
    ProviderID = db.Column(
        db.String,
        db.ForeignKey('Provider_Info.ProviderID', ondelete='CASCADE'),
        nullable=False
    )

    RatingSourceID = db.Column(db.String)
    RatingSourceName = db.Column(db.String)
    RatingType = db.Column(db.String)
    RatingValue = db.Column(db.Numeric)
    RatingStartDate = db.Column(db.Date)
    RatingEndDate = db.Column(db.Date)

    # Relationship
    provider = db.relationship('ProviderInfo', backref=db.backref('ratings', cascade='all, delete-orphan'))


class ProviderConfig(db.Model):
    __tablename__ = 'brand'

    id = db.Column(db.Integer, primary_key=True)
    brand_name = db.Column(db.String(255))
    logo = db.Column(db.LargeBinary)
    
