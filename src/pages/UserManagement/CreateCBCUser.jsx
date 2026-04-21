import React, { useState } from 'react';
import { Paperclip, Calendar, CheckCircle } from 'lucide-react';
import { onboardService } from '../../api/apiService';
import { ENDPOINTS } from '../../api/apiConfig';
import './CreateCBCUser.css';

/**
 * CreateCBCUser Component
 * High quality, single-page professional form for NSDL Admin.
 */
const CreateCBCUser = () => {
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', ceoName: '',
    companyName: '', emailId: '', pan: '', mobileNumber: '',
    faxNumber: '', adminName: '', adminEmail: '', adminMobile: '',
    businessAddress: '', country: 'India', pinCode: '', state: '',
    district: '', city: '', accountNumber: '', gstNumber: '',
    institutionType: '', stdCode: '', telephoneNumber: '',
    affiliateFee: '', staffCount: '', agreementFrom: '', agreementTo: '',
    entityPan: '', incorporationAddress: '', productFeatures: 'ACCOUNT_OPENING',
    acceptedTerms: false
  });

  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };

  const validate = () => {
    const newErrors = {};

    // Required Field Checks
    const requiredFields = [
      'firstName', 'lastName', 'ceoName', 'companyName', 'emailId', 
      'pan', 'mobileNumber', 'adminName', 'adminEmail', 'adminMobile', 
      'businessAddress', 'pinCode', 'state', 'district', 'city', 
      'accountNumber', 'gstNumber', 'institutionType', 'telephoneNumber',
      'affiliateFee', 'staffCount', 'agreementFrom', 'agreementTo',
      'entityPan', 'incorporationAddress', 'productFeatures'
    ];

    requiredFields.forEach(field => {
      const val = formData[field];
      if (!val || (typeof val === 'string' && val.trim() === '')) {
        newErrors[field] = 'This field is required.';
      }
    });

    // Format Checks with specific messages
    if (formData.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email address.';
    }
    if (formData.adminEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Please enter a valid email address.';
    }
    if (formData.mobileNumber && !/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }
    if (formData.adminMobile && !/^[6-9]\d{9}$/.test(formData.adminMobile)) {
      newErrors.adminMobile = 'Please enter a valid 10-digit mobile number.';
    }
    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = 'Please enter a valid PAN (e.g. ABCDE1234F).';
    }
    if (formData.entityPan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.entityPan)) {
      newErrors.entityPan = 'Please enter a valid PAN.';
    }
    if (formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Please enter a valid 15-digit GST number.';
    }
    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN code.';
    }
    
    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'You must accept the terms and conditions.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      window.location.reload();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowConfirmModal(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalConfirm = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    try {
      // Map form state to the nested API structure
      const payload = {
        reqType: "CREATE",
        bankCode: "NSDL",
        username: "", // Optional for CREATE
        cbcDetails: {
          BasicInformation: {
            firstName: formData.firstName,
            middleName: formData.middleName || "",
            lastName: formData.lastName,
            mobileNumber: formData.mobileNumber,
            email: formData.emailId,
            country: formData.country,
            state: formData.state,
            district: formData.district,
            city: formData.city,
            pinCode: String(formData.pinCode)
          },
          BusinessDetails: {
            numberOfStaff: String(formData.staffCount),
            faxNumber: formData.faxNumber || "",
            businessAddress: formData.businessAddress,
            ceoName: formData.ceoName,
            companyName: formData.companyName,
            gstNumber: formData.gstNumber,
            pan: formData.pan,
            institutionType: formData.institutionType,
            latitude: 0.0,  // Defaults
            longitude: 0.0
          },
          AdminDetails: {
            adminName: formData.adminName,
            adminEmail: formData.adminEmail,
            adminMobileNumber: formData.adminMobile
          },
          BankDetails: {
            accountNumber: formData.accountNumber,
            bankResolution: "Completed" // Placeholder for resolution details
          },
          OtherDetails: {
            affiliationFee: formData.affiliateFee,
            telephoneNumber: formData.telephoneNumber,
            entityId: "N/A",
            agreementStartDate: formatDate(formData.agreementFrom),
            agreementEndDate: formatDate(formData.agreementTo),
            entityPanCard: formData.entityPan,
            authorizedSignatoryKyc: "Verified",
            certificateOfIncorporationDocumentPdf: "Upload_Pending",
            incorporationAddress: formData.incorporationAddress,
            firstAndLastPageAgreement: "Attached",
            productFeatures: [{ id: 1, featureName: formData.productFeatures }],
            termsAndConditions: "Accepted",
            businessProposal: "Submitted"
          }
        }
      };

      console.log('Sending Payload:', payload);
      const response = await onboardService.post(ENDPOINTS.ONBOARD_CBC, payload);
      
      if (response.success || response.status_code === 200) {
        setShowSuccessModal(true);
      } else {
        alert("API Error: " + (response.message || "Something went wrong"));
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert("Submission failed. Please check network connection or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-cbc-container">
      {/* ── Breadcrumbs ── */}
      <nav className="breadcrumbs">
        <span>User Management</span> <span className="separator">/</span> <span className="current">Create CBC User</span>
      </nav>

      <h1 className="page-title">Create CBC User</h1>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          
          <div className="form-grid">
            {/* Row 1 */}
            <div className="form-group">
              <label>First Name <span className="required">*</span></label>
              <input type="text" name="firstName" placeholder="Enter First Name" onChange={handleChange} className={errors.firstName ? 'error-border' : ''} />
              {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input type="text" name="middleName" placeholder="Enter Middle Name" onChange={handleChange} />
            </div>

            {/* Row 2 */}
            <div className="form-group">
              <label>Last Name <span className="required">*</span></label>
              <input type="text" name="lastName" placeholder="Enter Last Name" onChange={handleChange} className={errors.lastName ? 'error-border' : ''} />
              {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
            </div>
            <div className="form-group">
              <label>CEO Name <span className="required">*</span></label>
              <input type="text" name="ceoName" placeholder="Enter CEO Name" onChange={handleChange} className={errors.ceoName ? 'error-border' : ''} />
              {errors.ceoName && <span className="error-msg">{errors.ceoName}</span>}
            </div>

            {/* Row 3 */}
            <div className="form-group">
              <label>Company Name <span className="required">*</span></label>
              <input type="text" name="companyName" placeholder="Enter Company Name" onChange={handleChange} className={errors.companyName ? 'error-border' : ''} />
              {errors.companyName && <span className="error-msg">{errors.companyName}</span>}
            </div>
            <div className="form-group">
              <label>Email ID <span className="required">*</span></label>
              <input type="email" name="emailId" placeholder="Enter Email ID" onChange={handleChange} className={errors.emailId ? 'error-border' : ''} />
              {errors.emailId && <span className="error-msg">{errors.emailId}</span>}
            </div>

            {/* Row 4 */}
            <div className="form-group">
              <label>PAN <span className="required">*</span></label>
              <input type="text" name="pan" placeholder="Enter PAN" onChange={handleChange} className={errors.pan ? 'error-border' : ''} />
              {errors.pan && <span className="error-msg">{errors.pan}</span>}
            </div>
            <div className="form-group">
              <label>Mobile Number <span className="required">*</span></label>
              <input type="text" name="mobileNumber" placeholder="Enter Mobile Number" onChange={handleChange} className={errors.mobileNumber ? 'error-border' : ''} />
              {errors.mobileNumber && <span className="error-msg">{errors.mobileNumber}</span>}
            </div>

            {/* Row 5 */}
            <div className="form-group">
              <label>FAX Number</label>
              <input type="text" name="faxNumber" placeholder="Enter FAX Number" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Admin Name <span className="required">*</span></label>
              <input type="text" name="adminName" placeholder="Enter Admin Name" onChange={handleChange} className={errors.adminName ? 'error-border' : ''} />
              {errors.adminName && <span className="error-msg">{errors.adminName}</span>}
            </div>

            {/* Row 6 */}
            <div className="form-group">
              <label>Admin Email <span className="required">*</span></label>
              <input type="email" name="adminEmail" placeholder="Enter Admin Email" onChange={handleChange} className={errors.adminEmail ? 'error-border' : ''} />
              {errors.adminEmail && <span className="error-msg">{errors.adminEmail}</span>}
            </div>
            <div className="form-group">
              <label>Admin Mobile Number <span className="required">*</span></label>
              <input type="text" name="adminMobile" placeholder="Enter Admin Mobile Number" onChange={handleChange} className={errors.adminMobile ? 'error-border' : ''} />
              {errors.adminMobile && <span className="error-msg">{errors.adminMobile}</span>}
            </div>

            {/* Row 7 */}
            <div className="form-group">
              <label>Business Address Line <span className="required">*</span></label>
              <input type="text" name="businessAddress" placeholder="Enter Business Address Line" onChange={handleChange} className={errors.businessAddress ? 'error-border' : ''} />
              {errors.businessAddress && <span className="error-msg">{errors.businessAddress}</span>}
            </div>
            <div className="form-group">
              <label>Country <span className="required">*</span></label>
              <input type="text" name="country" value="India" readOnly className="readonly-input" />
            </div>

            {/* Row 8 */}
            <div className="form-group">
              <label>PIN Code <span className="required">*</span></label>
              <input type="text" name="pinCode" placeholder="Enter PIN Code" onChange={handleChange} className={errors.pinCode ? 'error-border' : ''} />
              {errors.pinCode && <span className="error-msg">{errors.pinCode}</span>}
            </div>
            <div className="form-group">
              <label>State <span className="required">*</span></label>
              <input type="text" name="state" placeholder="Enter State" onChange={handleChange} className={errors.state ? 'error-border' : ''} />
              {errors.state && <span className="error-msg">{errors.state}</span>}
            </div>

            {/* Row 9 */}
            <div className="form-group">
              <label>District <span className="required">*</span></label>
              <input type="text" name="district" placeholder="Enter District" onChange={handleChange} className={errors.district ? 'error-border' : ''} />
              {errors.district && <span className="error-msg">{errors.district}</span>}
            </div>
            <div className="form-group">
              <label>City <span className="required">*</span></label>
              <input type="text" name="city" placeholder="Enter City" onChange={handleChange} className={errors.city ? 'error-border' : ''} />
              {errors.city && <span className="error-msg">{errors.city}</span>}
            </div>

            {/* Row 10 */}
            <div className="form-group">
              <label>Account Number <span className="required">*</span></label>
              <input type="text" name="accountNumber" placeholder="Enter Account Number" onChange={handleChange} className={errors.accountNumber ? 'error-border' : ''} />
              {errors.accountNumber && <span className="error-msg">{errors.accountNumber}</span>}
            </div>
            <div className="form-group">
              <label>GST Number <span className="required">*</span></label>
              <input type="text" name="gstNumber" placeholder="Enter GST Number" onChange={handleChange} className={errors.gstNumber ? 'error-border' : ''} />
              {errors.gstNumber && <span className="error-msg">{errors.gstNumber}</span>}
            </div>

            {/* Row 11: Special telephone layout */}
            <div className="form-group">
              <label>Institution Type <span className="required">*</span></label>
              <select name="institutionType" className={`custom-select ${errors.institutionType ? 'error-border' : ''}`} onChange={handleChange}>
                <option value="">Select Institution Type</option>
                <option value="INDIVIDUAL">INDIVIDUAL</option>
                <option value="NON-INDIVIDUAL">NON-INDIVIDUAL</option>
              </select>
              {errors.institutionType && <span className="error-msg">{errors.institutionType}</span>}
            </div>
            <div className="form-group">
              <label>Telephone Number <span className="required">*</span></label>
              <div className="split-input">
                <input type="text" name="stdCode" placeholder="STD Code" className="std-input" onChange={handleChange} />
                <input type="text" name="telephoneNumber" placeholder="Telephone Number" onChange={handleChange} className={errors.telephoneNumber ? 'error-border' : ''} />
              </div>
              {errors.telephoneNumber && <span className="error-msg">{errors.telephoneNumber}</span>}
            </div>

            {/* Row 12 */}
            <div className="form-group">
              <label>Affiliate Fee <span className="required">*</span></label>
              <input type="text" name="affiliateFee" placeholder="Enter Affiliate Fee" onChange={handleChange} className={errors.affiliateFee ? 'error-border' : ''} />
              {errors.affiliateFee && <span className="error-msg">{errors.affiliateFee}</span>}
            </div>
            <div className="form-group">
              <label>Number of Staff <span className="required">*</span></label>
              <input type="text" name="staffCount" placeholder="Enter Number of Staff" onChange={handleChange} className={errors.staffCount ? 'error-border' : ''} />
              {errors.staffCount && <span className="error-msg">{errors.staffCount}</span>}
            </div>

            {/* Row 13: Dates with icons and specific IDs */}
            <div className="form-group">
              <label>Agreement From Date <span className="required">*</span></label>
              <div className="input-with-icon">
                <input 
                  type="date" 
                  id="mat-datepicker-0"
                  name="agreementFrom" 
                  onChange={handleChange} 
                  className={errors.agreementFrom ? 'error-border' : ''}
                />
                <Calendar className="input-icon-right" size={18} />
              </div>
              {errors.agreementFrom && <span className="error-msg">{errors.agreementFrom}</span>}
            </div>
            <div className="form-group">
              <label>Agreement To Date <span className="required">*</span></label>
              <div className="input-with-icon">
                <input 
                  type="date" 
                  id="mat-datepicker-1"
                  name="agreementTo" 
                  onChange={handleChange} 
                  className={errors.agreementTo ? 'error-border' : ''}
                />
                <Calendar className="input-icon-right" size={18} />
              </div>
              {errors.agreementTo && <span className="error-msg">{errors.agreementTo}</span>}
            </div>

            {/* Row 14 */}
            <div className="form-group">
              <label>Entity PAN Card <span className="required">*</span></label>
              <input type="text" name="entityPan" placeholder="Enter Entity PAN Card" onChange={handleChange} className={errors.entityPan ? 'error-border' : ''} />
              {errors.entityPan && <span className="error-msg">{errors.entityPan}</span>}
            </div>
            <div className="form-group">
              <label>Incorporation Address Line 1 <span className="required">*</span></label>
              <input type="text" name="incorporationAddress" placeholder="Enter Incorporation Address Line 1" onChange={handleChange} className={errors.incorporationAddress ? 'error-border' : ''} />
              {errors.incorporationAddress && <span className="error-msg">{errors.incorporationAddress}</span>}
            </div>
          </div>

          {/* Product Features Dropdown */}
          <div className="full-width-group">
            <label>Product Features <span className="required">*</span></label>
            <select name="productFeatures" value={formData.productFeatures} className={`custom-select ${errors.productFeatures ? 'error-border' : ''}`} onChange={handleChange}>
              <option value="ACCOUNT_OPENING">ACCOUNT_OPENING</option>
              <option value="WALLET_TOPUP">WALLET_TOPUP</option>
            </select>
            {errors.productFeatures && <span className="error-msg">{errors.productFeatures}</span>}
          </div>

          {/* Upload Section with Dashed Borders */}
          <div className="upload-grid">
            <FileUploadDashed label="Bank Resolution" error={errors.bankResolution} required />
            <FileUploadDashed label="Authorized Signatory KYC" error={errors.signatoryKyc} required />
            <FileUploadDashed label="Certificate of Incorporation" error={errors.incorporationCert} required />
            <FileUploadDashed label="First Page of Agreement" error={errors.agreementFirst} required />
            <FileUploadDashed label="Last Page of Agreement" error={errors.agreementLast} required />
            <FileUploadDashed label="Business Proposal" error={errors.businessProposal} required />
          </div>

          {/* Terms checkbox */}
          <div className="terms-container">
            <label className={`checkbox-wrapper ${errors.acceptedTerms ? 'error-shake' : ''}`}>
              <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} />
              <span className="terms-text">
                By using our services, you confirm that you are at least 18 years old and legally capable of entering into agreements. You are responsible for
                securing your account details and for any activity under your account. Fees may apply to certain services, which will be disclosed at the time
                of use. Services are provided for personal, lawful purposes only. Your personal data will be handled in accordance with our Privacy Policy. We
                may update these terms from time to time, and your continued use of the services constitutes acceptance of any changes. We are not liable 
                for any damages arising from the use of our services, except where required by law. We reserve the right to suspend or terminate your access
                if you violate these terms. These terms are governed by the laws of [Jurisdiction].
              </span>
            </label>
            {errors.acceptedTerms && <div className="error-msg" style={{marginTop: '10px'}}>{errors.acceptedTerms}</div>}
          </div>

          {/* Footer Actions */}
          <div className="form-footer">
            <button 
              type="submit" 
              className={`btn-create ${!formData.acceptedTerms ? 'btn-disabled' : ''}`}
              disabled={!formData.acceptedTerms}
            >
              Create
            </button>
            <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
          </div>

        </form>
      </div>

      {/* ── Confirmation Modal ── */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Are you sure you want to Create this User?</h2>
            <div className="modal-body">
              <p>Please review all the entered details carefully before confirming,</p>
              <p>as creating this user will permanently add them to the system.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-modal-no" onClick={() => setShowConfirmModal(false)}>NO</button>
              <button className="btn-modal-yes" onClick={handleFinalConfirm}>Yes Create</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Success Modal (After API Success) ── */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal-content">
            <div className="success-modal-header">
              <img src="/assets/nsdl_logo.png" alt="NSDL" className="modal-nsdl-logo" />
            </div>
            <div className="success-icon-wrapper">
              <div className="outer-circle">
                 <div className="inner-circle">
                   <CheckCircle size={80} color="#fff" />
                 </div>
              </div>
            </div>
            <h2 className="success-modal-text">User Created Successfully!</h2>
            <button className="btn-success-done" onClick={() => window.location.reload()}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Dashed border file upload matching latest screenshot */
const FileUploadDashed = ({ label, required, error }) => (
  <div className="form-group">
    <label>{label} {required && <span className="required">*</span>}</label>
    <div className={`upload-dashed-box ${error ? 'error-border' : ''}`}>
      <Paperclip size={18} className="upload-icon-left" />
      <span className="upload-placeholder">Upload {label} (.pdf Only)</span>
    </div>
    {error && <span className="error-msg">{error}</span>}
  </div>
);

export default CreateCBCUser;
