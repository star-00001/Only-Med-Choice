from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import or_, and_
from models import (
    db, ProviderInfo, ProviderAddress,
    ProviderSpeciality, ProviderCertification, ProviderLanguage,ProviderAffiliation,
    ProviderVisitMode, ProviderRatings, ProviderConfig
)
import config

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(config)

# Enable CORS
CORS(app)

# Initialize DB
db.init_app(app)

# Create tables if not already present
with app.app_context():
    db.create_all()

# -------------------------
# In-memory admin config
# -------------------------
provider_config = {
    "rating": True,
    "yearsOfExperience": True,
    "phoneNumber": True,
    "acceptingStatus": True,
    "virtualCareStatus": True
}

######################
# ✅ Health Check
######################
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Healthcare Provider API is running ✅"}), 200


# -------------------------
# Save In-Memory UI Config
# -------------------------
@app.route("/api/config", methods=["POST"])
def save_ui_config():
    global provider_config
    data = request.json
    if data:
        provider_config.update(data)
    return jsonify({"message": "Configuration saved", "config": provider_config}), 200


# -------------------------
# Get Current UI Config
# -------------------------
@app.route("/api/config", methods=["GET"])
def get_ui_config():
    return jsonify({"config": provider_config}), 200


######################
# ✅ Get All Providers
######################
@app.route("/api/providers", methods=["GET"])
def get_providers_paginated_filtered():
    # Pagination
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 9))
    offset = (page - 1) * per_page

    # Filters
    name = request.args.get("name", "").strip().lower()
    specialty = request.args.get("specialty", "").strip().lower()
    location = request.args.get("location", "").strip().lower()
    gender = request.args.get("gender")
    min_experience = int(request.args.get("minExperience", 0))
    board_certified = request.args.get("boardCertified")
    accepting_new = request.args.get("acceptingNewPatients")
    virtual_care = request.args.get("virtualCare")
    hospital_affiliations = request.args.get("hospitalAffiliations")
    languages = request.args.getlist("languagesSpoken")  # array

    # Optional UI config (if saved from frontend)
    provider_config = {
        "gender": True,
        "npiId": True,
        "phoneNumber": True,
        "emailId": True,
        "yearsOfExperience": True,
        "rating": True,
        "acceptingStatus": True,
        "virtualCareStatus": True,
        "boardCertified": True,
        "boardName": True,
        "affiliationName": True,
        "hospitalAffiliation": True
    }

    query = ProviderInfo.query

    # -----------------
    # Apply filters
    # -----------------
    if name:
        query = query.filter(
            or_(
                ProviderInfo.ProviderFirstName.ilike(f"%{name}%"),
                ProviderInfo.ProviderLastName.ilike(f"%{name}%"),
                ProviderInfo.ProviderMiddleInitial.ilike(f"%{name}%")
            )
        )

    if specialty:
        query = query.join(ProviderInfo.specialities).filter(
            ProviderSpeciality.ProviderSpecialityName.ilike(f"%{specialty}%")
        )

    if location:
        query = query.join(ProviderInfo.addresses).filter(
            or_(
                ProviderAddress.ProviderCity.ilike(f"%{location}%"),
                ProviderAddress.ProviderState.ilike(f"%{location}%"),
                ProviderAddress.ProviderZIPCode.ilike(f"%{location}%")
            )
        )

    if gender:
        query = query.filter(ProviderInfo.ProviderGender == gender)

    if min_experience > 0:
        query = query.join(ProviderInfo.certifications).filter(
            ProviderCertification.ProviderYearsOfExperience >= min_experience
        )

    if board_certified:
        query = query.join(ProviderInfo.certifications).filter(
            ProviderCertification.ProviderBoardCertified == ('Yes' if board_certified == 'true' else 'No')
        )

    if accepting_new:
        query = query.join(ProviderInfo.visit_modes).filter(
            ProviderVisitMode.Acceptingnewpatients == ('Yes' if accepting_new == 'true' else 'No')
        )

    if virtual_care:
        query = query.join(ProviderInfo.visit_modes).filter(
            ProviderVisitMode.VirtualCare == ('Yes' if virtual_care == 'true' else 'No')
        )

    if hospital_affiliations:
        if hospital_affiliations == 'true':
            query = query.join(ProviderInfo.affiliations)
        else:
            query = query.outerjoin(ProviderInfo.affiliations).filter(
                ProviderAffiliation.ProviderAffiliationName == None
            )

    if languages:
        query = query.join(ProviderInfo.languages).filter(
            ProviderLanguage.ProviderLanguage.overlap(languages)
        )

    # -----------------
    # Sorting
    # -----------------
    sort_by = request.args.get("sortBy", "rating")
    if sort_by == "name-asc":
        query = query.order_by(ProviderInfo.ProviderFirstName.asc())
    elif sort_by == "name-desc":
        query = query.order_by(ProviderInfo.ProviderFirstName.desc())
    elif sort_by == "experience":
        query = query.join(ProviderInfo.certifications).order_by(
            ProviderCertification.ProviderYearsOfExperience.desc()
        )
    elif sort_by == "rating":
        query = query.outerjoin(ProviderInfo.ratings).order_by(
            ProviderRatings.RatingValue.desc()
        )

    # -----------------
    # Pagination
    # -----------------
    total = query.count()
    providers = query.offset(offset).limit(per_page).all()

    # -----------------
    # Result construction
    # -----------------
    result = []
    for p in providers:
        address = p.addresses[0] if p.addresses else None
        contact = p.communications[0] if p.communications else None
        specialty = p.specialities[0] if p.specialities else None
        certification = p.certifications[0] if p.certifications else None
        insurance = p.insurances[0] if p.insurances else None
        affiliation = p.affiliations[0] if p.affiliations else None
        visit_mode = p.visit_modes[0] if p.visit_modes else None

        languages_spoken = list(
            set(lang for lang_obj in p.languages for lang in (lang_obj.ProviderLanguage or []))
        )
        rating = (
            sum([r.RatingValue for r in p.ratings]) / len(p.ratings)
            if p.ratings
            else None
        )

        provider_data = {
            "id": p.ProviderID,
            "firstName": p.ProviderFirstName,
            "middleInitial": p.ProviderMiddleInitial,
            "lastName": p.ProviderLastName,
            "degree": certification.ProviderDegree if certification else "",
            "type": p.ProviderType,
            "specialtyName": specialty.ProviderSpecialityName if specialty else "",
            "addressLine1": address.ProviderAddressLine1 if address else "",
            "addressLine2": address.ProviderAddressLine2 if address else "",
            "city": address.ProviderCity if address else "",
            "state": address.ProviderState if address else "",
            "zipCode": address.ProviderZIPCode if address else "",
            "planName": insurance.ProviderPlanName[0] if insurance and insurance.ProviderPlanName else "",
            "acceptedAllPlans": insurance.ProviderPlanName if insurance and insurance.ProviderPlanName else [],
            "workingHours": "Mon-Fri: 8:00 AM - 5:00 PM",
            "languagesSpoken": languages_spoken,
        }

        # Conditionally include fields
        if provider_config.get("gender", True):
            provider_data["gender"] = p.ProviderGender
        if provider_config.get("npiId", True):
            provider_data["npiId"] = p.ProviderNPI
        if provider_config.get("phoneNumber", True):
            provider_data["phoneNumber"] = contact.ProviderPhoneNo if contact else ""
        if provider_config.get("emailId", True):
            provider_data["emailId"] = contact.ProviderEmail if contact else ""
        if provider_config.get("yearsOfExperience", True):
            provider_data["yearOfExperience"] = certification.ProviderYearsOfExperience if certification else 0
        if provider_config.get("rating", True):
            provider_data["rating"] = float(rating) if rating else None
        if provider_config.get("acceptingStatus", True):
            provider_data["acceptingNewPatients"] = (
                visit_mode.Acceptingnewpatients == "Yes" if visit_mode else False
            )
        if provider_config.get("virtualCareStatus", True):
            provider_data["virtualCareAvailable"] = (
                visit_mode.VirtualCare == "Yes" if visit_mode else False
            )
        if provider_config.get("boardCertified", True):
            provider_data["boardCertified"] = (
                certification.ProviderBoardCertified == "Yes" if certification else False
            )
        if provider_config.get("boardName", True):
            provider_data["boardName"] = certification.ProviderBoardName if certification else ""
        if provider_config.get("affiliationName", True):
            provider_data["affiliationName"] = affiliation.ProviderAffiliationName if affiliation else ""
        if provider_config.get("hospitalAffiliation", True):
            provider_data["hospitalAffiliations"] = True if affiliation else False

        result.append(provider_data)

    return jsonify({
        "providers": result,
        "total": total,
        "page": page,
        "pages": (total + per_page - 1) // per_page
    }), 200

######################
# ✅ Brand & Logo Config
######################
@app.route("/config", methods=["GET"])
def get_brand_logo_config():
    config = ProviderConfig.query.order_by(ProviderConfig.id.desc()).first()
    if not config:
        return jsonify({"brand_name": "", "logo": None})
    
    logo_base64 = config.logo.hex() if config.logo else None
    return jsonify({
        "brand_name": config.brand_name,
        "logo": logo_base64
    })


@app.route("/config", methods=["POST", "PUT"])
def update_brand_logo_config():
    brand_name = request.form.get("brand_name")
    logo_file = request.files.get("logo")

    if not brand_name:
        return jsonify({"error": "Brand name is required"}), 400

    logo_binary = logo_file.read() if logo_file else None

    # Update last record or create new
    config = ProviderConfig.query.order_by(ProviderConfig.id.desc()).first()
    if config:
        config.brand_name = brand_name
        if logo_binary:
            config.logo = logo_binary
    else:
        config = ProviderConfig(brand_name=brand_name, logo=logo_binary)
        db.session.add(config)

    db.session.commit()
    return jsonify({"message": "Configuration updated successfully!"})


###########################
# Run the server
###########################
if __name__ == "__main__":
    app.run(debug=True)
