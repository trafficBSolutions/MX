import React, { useState, useEffect } from 'react';
import '../css/fleet.css';
import '../css/headerfooter.css';
import '../css/toaster.css';
import vehicleData from '../components/Vehicle Types/regularVehicles';
import { acuraModels, 
  AlfaRomeoModels, 
  audiModels,
  bmwModels,
  buickModels,
 cadillacModels,
 chevroletModels,
chryslerModels,
dodgeModels,
fiatModels,
fordModels,
genesisModels,
gmcModels,
hondaModels,
hyundaiModels,
infinitiModels,
jaguarModels,
jeepModels,
kiaModels,
landRoverModels,
lexusModels,
lincolnModels,
mazdaModels,
mercedesBenzModels,
miniModels,
mitsubishiModels,
nissanModels,
paganiModels,
porscheModels,
ramModels,
subaruModels,
teslaModels,
toyotaModels,
volkswagenModels,
volvoModels} from '../components/Vehicle Models/vehicleModels';
import {chevroletBoxTruckModels,
  fordBoxTruckModels,
  freightlinerBoxTruckModels,
  gmcBoxTruckModels,
  hinoBoxTruckModels,
  internationalBoxTruckModels,
  IsuzuBoxTruckModels,
  kenworthBoxTruckModels,
  mackBoxTruckModels,
  mercedesBenzBoxTruckModels,
  mitsubishiFusoBoxTruckModels,
  nissanBoxTruckModels,
  peterbiltBoxTruckModels,
  ramBoxTruckModels,
  scaniaBoxTruckModels,
  volvoBoxTruckModels} from '../components/Vehicle Models/boxTruckModels';
import boxTruckVehicles from '../components/Vehicle Types/boxTruckVehicles';
import MXFleetGallery from '../photogallery/FleetMXgallery';
import axios from 'axios';
import Header from '../components/headerviews/HeaderFleet';
import {toast } from 'react-toastify';
import images from '../utils/dynamicImportImages';
  const finishOptions = [
    { name: 'Matte', disabled: false },
    { name: 'Gloss', disabled: false },
    { name: 'Reflective Fleet Graphics', disabled: false }
  ];
  const vehicleType = [
    { name: 'Box Truck', disabled: false },
    { name: 'Car/Pickup Truck/SUV/Van', disabled: false },
    { name: 'Trailer', disabled: false }
  ];
const FleetGraphics = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState(''); // New state for vehicle type
  const [availableMakes, setAvailableMakes] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); 
    const [phone, setPhone] = useState('');
    const [isTrailerSelected, setIsTrailerSelected] = useState(false); // New state for trailer selection
    const [addedVehicles, setAddVehicles] = useState([]);
    const [fileError, setFileError] = useState('');
    const [addedFinishing, setAddedFinishing] = useState([]);
    const [vehicleError, setVehicleError] = useState('');
    const [company, setCompany] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
      name: '',
      company: '',
      email: '',
      phone: '',
      vehicle: '',
      finishing: [],
      img: null,
      message: '',
      terms: false,
    });
    
    const [errors, setErrors] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    
    const handlePhoneChange = (event) => {
      const input = event.target.value;
      const rawInput = input.replace(/\D/g, ''); // Remove non-digit characters
      const formatted = rawInput.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      
      setPhone(formatted);
      setFormData({ ...formData, phone: formatted });
    
      // Check if the input has 10 digits and clear the error if it does
      if (rawInput.length === 10) {
        setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a valid 10-digit phone number.' }));
      }
    };
    const handleFileChange = (e, fileType) => {
      const newFiles = Array.from(e.target.files);
      setFormData(prevState => ({
        ...prevState,
        [fileType]: [...(prevState[fileType] || []), ...newFiles]
      }));
      setFileError('');
    };
    const handleFinishChange = (e) => {
      const { value, checked } = e.target;
      let updatedFinishing = [...formData.finishing];
    
      if (checked) {
        // Add if not already included
        if (!updatedFinishing.includes(value)) {
          updatedFinishing.push(value);
        }
      } else {
        // Remove if unchecked
        updatedFinishing = updatedFinishing.filter(item => item !== value);
      }
    
      setFormData({ ...formData, finishing: updatedFinishing });
    
      if (updatedFinishing.length > 0) {
        setErrors((prev) => ({ ...prev, finishing: '' }));
      }
    };
    const handleFileRemove = (fileType) => {
      setFormData({ ...formData, [fileType]: [] }); // Clear all files in the array
    };
    
    const handleAddVehicle = () => {
      let newVehicle;
    
      // Validate that all fields (year, make, model) are filled for cars/pickup trucks/SUVs/Vans
      if (selectedVehicleType === 'Trailer') {
        // If adding a trailer, just specify the type
        newVehicle = `Trailer`; // You can include more details if needed, such as specific trailer info
      } else if (selectedYear && selectedMake && selectedModel) {
        // If it's another type of vehicle, construct the full vehicle description
        newVehicle = `${selectedYear} ${selectedMake} ${selectedModel}`;
      } else {
        // Set an error message if any required field is missing
        setErrorMessage('Please select year, make, and model before adding a vehicle.');
        return; // Exit the function if validation fails
      }
    
      // Append the new vehicle to the existing list of vehicles
      setAddVehicles([...addedVehicles, newVehicle]);
    
      // Clear the form fields to allow adding another vehicle
      setSelectedYear('');  
      setSelectedMake('');
      setSelectedModel('');
      
      // Clear vehicle error message
      setVehicleError(''); // Clear the vehicle error when a vehicle is added
    
      // Clear any previous general error messages
      setErrorMessage('');   
    };
  // Function to remove a vehicle by index
  const handleRemoveVehicle = (index) => {
    const updatedVehicles = addedVehicles.filter((_, i) => i !== index); // Remove vehicle at index
    setAddVehicles(updatedVehicles);
  };
// Handle Vehicle Type Change
const handleTypeChange = (e) => {
  const vehicleType = e.target.value;
  setSelectedVehicleType(vehicleType);
  setSelectedYear('');
  setSelectedMake('');
  setSelectedModel('');
  if (vehicleType === 'Trailer') {
    // When trailer is selected, clear year, make, model, and set trailer selected to true
    setSelectedYear('');
    setSelectedMake('');
    setSelectedModel('');
    setIsTrailerSelected(true);
  } else {
    // Clear the trailer selection if another vehicle type is selected
    setIsTrailerSelected(false);
  }
  if (vehicleType === 'Car/Pickup Truck/SUV/Van') {
    setAvailableMakes(vehicleData.filter((make) => !make.disabled));
  } else if (vehicleType === 'Box Truck') {
    setAvailableMakes(boxTruckVehicles.filter((make) => !make.disabled));
  } else {
    setAvailableMakes([]);
  }
};

// Handle Year Change
const handleYearChange = (e) => {
  setSelectedYear(e.target.value);
  setSelectedMake('');
  setSelectedModel('');
};

// Handle Make Change
const handleMakeChange = (e) => {
  const selectedMake = e.target.value;
  setSelectedMake(selectedMake);
  setSelectedModel(''); // Clear model selection when make changes

  if (selectedMake === 'Acura' /*1*/) {
    setAvailableModels(acuraModels.filter((model) => !model.disabled)); // Show Acura models
  } else if (selectedMake === 'Alfa Romeo' /*2*/) {
    setAvailableModels(AlfaRomeoModels.filter((model) => !model.disabled)); // Show Alfa Romeo models
  } else if (selectedMake === 'Audi' /*3*/) {
    setAvailableModels(audiModels.filter((model) => !model.disabled)); // Show Audi models
  } else if (selectedMake === 'BMW' /*4*/) {
    setAvailableModels(bmwModels.filter((model) => !model.disabled)); // Show BMW models
  } else if (selectedMake === 'Buick' /*5*/) {
    setAvailableModels(buickModels.filter((model) => !model.disabled)); // Show Buick models
  } else if (selectedMake === 'Cadillac' /*6*/) {
    setAvailableModels(cadillacModels.filter((model) => !model.disabled)); // Show Cadillac models
  } else if (selectedMake === 'Chevrolet') {
    setAvailableModels(chevroletModels.filter((model) => !model.disabled)); // Show Chevrolet regular models
  } else if (selectedMake === 'Chrysler' /*8*/) {
    setAvailableModels(chryslerModels.filter((model) => !model.disabled)); // Show Chrysler models
  } else if (selectedMake === 'Dodge' /*9*/) {
    setAvailableModels(dodgeModels.filter((model) => !model.disabled)); // Show Dodge models
  } else if (selectedMake === 'Fiat' /*10*/) {
    setAvailableModels(fiatModels.filter((model) => !model.disabled)); // Show Fiat models
  } else if (selectedMake === 'Ford' /*11*/) {
    setAvailableModels(fordModels.filter((model) => !model.disabled)); // Show Ford 
  } else if (selectedMake === 'Genesis' /*12*/) {
    setAvailableModels(genesisModels.filter((model) => !model.disabled)); // Show Genesis models
  } else if (selectedMake === 'GMC' /*13*/) {
    setAvailableModels(gmcModels.filter((model) => !model.disabled)); // Show GMC models
  } else if (selectedMake === 'Honda' /*14*/) {
    setAvailableModels(hondaModels.filter((model) => !model.disabled)); // Show Honda models
  } else if (selectedMake === 'Hyundai' /*15*/) {
    setAvailableModels(hyundaiModels.filter((model) => !model.disabled)); // Show Hyundai models
  } else if (selectedMake === 'Infiniti' /*16*/) {
    setAvailableModels(infinitiModels.filter((model) => !model.disabled)); // Show Infiniti models
  } else if (selectedMake === 'Jaguar' /*17*/) {
    setAvailableModels(jaguarModels.filter((model) => !model.disabled)); // Show Jaguar models
  } else if (selectedMake === 'Jeep' /*18*/) {
    setAvailableModels(jeepModels.filter((model) => !model.disabled)); // Show Jeep models
  } else if (selectedMake === 'Kia' /*19*/) {
    setAvailableModels(kiaModels.filter((model) => !model.disabled)); // Show Kia models
  } else if (selectedMake === 'Land Rover' /*20*/) {
    setAvailableModels(landRoverModels.filter((model) => !model.disabled)); //
  } else if (selectedMake === 'Lexus' /*21*/) {
    setAvailableModels(lexusModels.filter((model) => !model.disabled)); // Show Lexus models
  } else if (selectedMake === 'Lincoln' /*22*/) {
    setAvailableModels(lincolnModels.filter((model) => !model.disabled)); // Show Lincoln models
  } else if (selectedMake === 'Mazda' /*23*/) {
    setAvailableModels(mazdaModels.filter((model) => !model.disabled)); // Show Mazda models
  } else if (selectedMake === 'Mercedes-Benz' /*24*/) {
    setAvailableModels(mercedesBenzModels.filter((model) => !model.disabled)); // Show Mercedes-Benz models
  } else if (selectedMake === 'Mini' /*25*/) {
    setAvailableModels(miniModels.filter((model) => !model.disabled)); // Show MINI models
  } else if (selectedMake === 'Mitsubishi' /*26*/) {
    setAvailableModels(mitsubishiModels.filter((model) => !model.disabled)); // Show Mitsubishi models
  } else if (selectedMake === 'Nissan' /*27*/) {
    setAvailableModels(nissanModels.filter((model) => !model.disabled)); // Show Nissan models
  } else if (selectedMake === 'Pagani' /*28*/) {
    setAvailableModels(paganiModels.filter((model) => !model.disabled)); // Show Pagani models
  } else if (selectedMake === 'Porsche' /*29*/) {
    setAvailableModels(porscheModels.filter((model) => !model.disabled)); // Show Porsche models
  } else if (selectedMake === 'RAM' /*30*/) {
    setAvailableModels(ramModels.filter((model) => !model.disabled)); // Show Ram models
  } else if (selectedMake === 'Subaru' /*31*/) {
    setAvailableModels(subaruModels.filter((model) => !model.disabled)); // Show Subaru models
  } else if (selectedMake === 'Tesla' /*32*/) {
    setAvailableModels(teslaModels.filter((model) => !model.disabled)); // Show Tesla models
  } else if (selectedMake === 'Toyota' /*33*/) {
    setAvailableModels(toyotaModels.filter((model) => !model.disabled)); // Show Toyota models
  } else if (selectedMake === 'Volkswagen' /*34*/) {
    setAvailableModels(volkswagenModels.filter((model) => !model.disabled)); // Show Volkswagen models
  } else if (selectedMake === 'Volvo' /*35*/) {
    setAvailableModels(volvoModels.filter((model) => !model.disabled)); // Show Volvo models
  } else {
    setAvailableModels([]); // Clear models if no valid make is selected
  }

  //Box Truck Model Selections
  if (selectedVehicleType === 'Box Truck' && selectedMake === 'Chevrolet') {
    setAvailableModels(chevroletBoxTruckModels.filter((model) => !model.disabled));
  } else if (selectedMake === 'Chevrolet') {
    setAvailableModels(chevroletModels.filter((model) => !model.disabled));
  } else if (selectedMake === 'Ford') {
    // Check if the vehicleType is "Box Truck"
    if (selectedVehicleType === 'Box Truck') {
        setAvailableModels(fordBoxTruckModels.filter((model) => !model.disabled)); // Show Ford box truck models
    } else {
        setAvailableModels(fordModels.filter((model) => !model.disabled)); // Show Ford regular models
    } 
} else if (selectedMake === 'Freightliner') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(freightlinerBoxTruckModels.filter((model) => !model.disabled)); // Show Freightliner box truck models
  } else {
      setAvailableModels(freightlinerModels.filter((model) => !model.disabled)); // Show regular Freightliner models
  }
} else if (selectedMake === 'GMC') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(gmcBoxTruckModels.filter((model) => !model.disabled)); // Show GMC box truck models
  } else {
      setAvailableModels(gmcModels.filter((model) => !model.disabled)); // Show regular GMC models
  }
}else if (selectedMake === 'Hino') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(hinoBoxTruckModels.filter((model) => !model.disabled)); // Show Hino box truck models
  } else {
      setAvailableModels(hinoModels.filter((model) => !model.disabled)); // Show regular Hino models
  }
}
else if (selectedMake === 'International') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(internationalBoxTruckModels.filter((model) => !model.disabled)); // Show International box truck models
  } else {
      setAvailableModels(internationalModels.filter((model) => !model.disabled)); // Show regular International models
  }
} else if (selectedMake === 'Isuzu') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(IsuzuBoxTruckModels.filter((model) => !model.disabled)); // Show Isuzu box truck models
  } else {
      setAvailableModels(IsuzuBoxTruckModels.filter((model) => !model.disabled)); // Show regular Isuzu models
  }
} else if (selectedMake === 'Kenworth') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(kenworthBoxTruckModels.filter((model) => !model.disabled)); // Show Kenworth box truck models
  } else {
      setAvailableModels(kenworthModels.filter((model) => !model.disabled)); // Show regular Kenworth models
  }
} else if (selectedMake === 'Mack') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(mackBoxTruckModels.filter((model) => !model.disabled)); // Show Mack box truck models
  } else {
      setAvailableModels(mackModels.filter((model) => !model.disabled)); // Show regular Mack models
  }
} else if (selectedMake === 'Mercedes-Benz') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(mercedesBenzBoxTruckModels.filter((model) => !model.disabled)); // Show Mercedes-Benz box truck models
  } else {
      setAvailableModels(mercedesBenzModels.filter((model) => !model.disabled)); // Show regular Mercedes-Benz models
  }
} else if (selectedMake === 'Mitsubishi Fuso') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(mitsubishiFusoBoxTruckModels.filter((model) => !model.disabled)); // Show Mitsubishi Fuso box truck models
  } else {
      setAvailableModels(mitsubishiFusoModels.filter((model) => !model.disabled)); // Show regular Mitsubishi Fuso models
  }
} else if (selectedMake === 'Nissan') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(nissanBoxTruckModels.filter((model) => !model.disabled)); // Show Nissan box truck models
{
      setAvailableModels(nissanModels.filter((model) => !model.disabled)); // Show regular Nissan models
  }
}
} else if (selectedMake === 'Peterbilt') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(peterbiltBoxTruckModels.filter((model) => !model.disabled)); // Show Peterbilt box truck models
  } else {
      setAvailableModels(peterbiltModels.filter((model) => !model.disabled)); // Show regular Peterbilt models
  }
} else if (selectedMake === 'Ram') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(ramBoxTruckModels.filter((model) => !model.disabled)); // Show Ram box truck models
} else {
      setAvailableModels(ramModels.filter((model) => !model.disabled)); // Show regular Ram models
  }
} else if (selectedMake === 'Scania') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(scaniaBoxTruckModels.filter((model) => !model.disabled)); // Show Scania box truck models
  } else {
      setAvailableModels(scaniaModels.filter((model) => !model.disabled)); // Show regular Scania models
  }
} else if (selectedMake === 'Volvo') {
  // Check if the vehicleType is "Box Truck"
  if (selectedVehicleType === 'Box Truck') {
      setAvailableModels(volvoBoxTruckModels.filter((model) => !model.disabled)); // Show Volvo box truck models
  } else {
      setAvailableModels(volvoModels.filter((model) => !model.disabled)); // Show regular Volvo models
  }
}
} 

const handleModelChange = (e) => {
  const selectedModel = e.target.value;
  setSelectedModel(selectedModel); // Update selected model
};
      const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try { const requiredFields = ['name', 'company', 'email', 'phone', 'message', 'terms'];
    const newErrors = {};
let hasError = false;
  requiredFields.forEach(field => {
    if (!formData[field]) {
      let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
      if (field === 'name') fieldLabel = 'Name';
      if (field === 'company') fieldLabel = 'Company Name';
      if (field === 'email') fieldLabel = 'Email';
      if (field === 'phone') fieldLabel = 'Phone Number';
      if (field === 'img') fieldLabel = 'Logo';
      if (field === 'terms') fieldLabel = 'Terms & Conditions';
      newErrors[field] = `${fieldLabel} is required!`;
      hasError = true;
    }
  });

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Required fields are missing.'); // Set the general error message
      setErrors(newErrors);
      return;
    }
        if (!termsAccepted) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            terms: 'You must agree to pay upon job completion.'
          }));
          setErrorMessage('You must accept the terms and conditions.');
          setIsSubmitting(false);
          return;
        }  
const formDataToSend = new FormData();

if (formData.img?.length > 0) {
  formData.img.forEach((file) => {
    formDataToSend.append('img', file);
  });
}

formDataToSend.append('name', formData.name);
formDataToSend.append('company', formData.company);
formDataToSend.append('email', formData.email);
formDataToSend.append('phone', formData.phone);
formDataToSend.append('vehicle', addedVehicles.join(', '));
formDataToSend.append('message', formData.message);
formDataToSend.append('terms', termsAccepted);
formDataToSend.append('finishing', formData.finishing.join(', ')); // ✅ correctly from formData.finishing


        
  setIsSubmitting(true);
      const response = await axios.post('/fleet-graphics', formDataToSend, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
      console.log(response.data); // Now this works
           
      setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      vehicle: '',
      finishing: [],
      img: null,
      message: '',
      terms: ''
      });
        setAddedFinishing([]);
        setErrors({});
        setPhone('');
      setSubmissionMessage(
        '✅ Fleet/Decal Vehicle Graphics Request Submitted!'
      );}
      catch (err) {
        console.error(err);
        toast.success('✅ Job submitted! Check your email for confirmation.');
        setSubmissionErrorMessage("There was an error submitting your request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
  };
    return (
        <div>
            <Header/>
            <main className="main-fleet-graphics">
            <div className="page-fleet-banner">
    <div className="fleet-name-container">
    <h1 className="fleet-description">FLEET & DECALED VEHICLE GRAPHICS</h1>
</div>
</div>
<div className="photo-fleet-gal-fleet">
  <MXFleetGallery />
        </div>
        <form className="fleet-set -- box"
        onSubmit={handleSubmit}
        >
            <div className="fleet-form-container container--narrow page-section">
        <div className="fleet-form-info">
        <h1 className="fleet-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
<h2 className="fleet-fill">Please Fill Out the Form Below to Submit Your FLEET GRAPHICS Information to get an Inquiry or Quote.</h2>
</div>
<div className="fleet-actual">
<div className="name-section-apparel">
<div className="first-name-apparel-input">

  <div className="first-apparel-name">
    <div className="firstname-apparel-input">
    <div className="input-first-apparel-container">
<label className="first-apparel-label-name">Name *</label>
<input
  name="name"
  type="text"
  className="firstname-apparel-name-input"
  placeholder="Enter First & Last Name"
  value={formData.name}
  onChange={(e) => {
    setFormData({ ...formData, name: e.target.value });
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' })); // Clear the error
    }
  }}
/>
{errors.name && <div className="error-message">{errors.name}</div>}
<label className="project-control-label">Company Name *</label>
<p className="project-company-input-label">
  If you are wanting to submit a project that isn't for a company, please enter your name in the company field.
</p>
  <input
    className="project-company-input"
    type="text"
    placeholder="Enter Company Name"
    value={formData.company}
    onChange={(e) => {
      const  value = e.target.value;
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setCompany(capitalizedValue);
      setFormData({ ...formData, company: capitalizedValue });
      // Clear error if the input is no longer empty
      if (value.trim() !== '') {
        setErrors((prevErrors) => ({ ...prevErrors, company: '' }));
      }
    }
    }
  />
{errors.company && <div className="error-message">{errors.company}</div>}
</div>
    </div>
  </div>
</div>
<div className="emailphone-fleet-input">
  <div className="email-fleet">
    <div className="email-fleet-input">
    <div className="email-fleet-input-container">
<label className="email-fleet-name">Email *</label>
<input
name="email"
type="text"
className="email-fleet-box"
text="email--input"
placeholder="Enter Email"

value={formData.email}
onChange={(e) => {
  setFormData({ ...formData, email: e.target.value });
  if (e.target.value) {
    setErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Clear the error
  }
}}
/>
{errors.email && <div className="error-message">{errors.email}</div>}
</div>
    </div>
  </div>

  <div className="phone-fleet">
    <div className="fleet-phone-name-input">
    <div className="fleet-phone-input-container">
<label className="phone-fleet-label">Phone Number *</label>
<input
name="phone"
type="text"
className="phone-fleet-box"
text="phone--input"
placeholder="Enter Phone Number"

value={phone}
onChange={(e) => {
  handlePhoneChange(e);
}}
/>
{errors.phone && <div className="error-message">{errors.phone}</div>}
</div>
    </div>
  </div>
</div>
</div>
<div className="vehicle-type-fleet-section">
<label className="type-fleet-label" htmlFor="vehicleType">Vehicle Type *</label>
<div className="type-fleet-section">
  {/* Vehicle Type Dropdown */}
  <select className="type-fleet-box" value={selectedVehicleType} onChange={handleTypeChange}>
    <option value="">Select Vehicle Type</option>
    {vehicleType.map((type) => (
      <option key={type.name} value={type.name} disabled={type.disabled}>
        {type.name}
      </option>
    ))}
  </select>

  {/* Conditionally Render Year Dropdown */}
  {!isTrailerSelected && (
    <>
      <label className="year-fleet-label" htmlFor="year">Year *</label>
      <select className="year-fleet-box" value={selectedYear} onChange={handleYearChange} disabled={!selectedVehicleType}>
        <option value="">Select Year</option>
        {Array.from({ length: currentYear - 1990 + 1 }, (_, i) => 1990 + i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Make Dropdown */}
      <label className="make-fleet-label" htmlFor="make">Make *</label>
      <select className="make-fleet-box" value={selectedMake} onChange={handleMakeChange} disabled={!selectedYear}>
        <option value="">Select Make</option>
        {availableMakes.map((make) => (
          <option key={make.name} value={make.name}>
            {make.name}
          </option>
        ))}
      </select>

      {/* Model Dropdown */}
      <label className="model-fleet-label" htmlFor="model">Model *</label>
      <select
        className="model-fleet-box"
        value={selectedModel}
        onChange={handleModelChange}
        disabled={!selectedMake}
      >
        <option value="">Select Model</option>
        {availableModels.map((model) => (
          <option key={model.name} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
    </>
  )}
</div>

    <button className="btn -- submit-vehicle" type="button" onClick={handleAddVehicle}>
          ADD VEHICLE
        </button>
<div className="vehicle-section">
  <label className="added-vehicle-label">Added Vehicles:</label>
  <ul>
    {addedVehicles.length > 0 ? (
      addedVehicles.map((vehicle, index) => (
        <li className="vehicle-list" key={index}>
          {vehicle}
          <button 
            className="btn -- submit-vehicle"
            type="button" 
            onClick={() => handleRemoveVehicle(index)}
          >
            REMOVE VEHICLE
          </button>
        </li>
      ))
    ) : (
      <p className="no-added-vehicles">No vehicles added yet.</p>
    )}
  </ul>
  {vehicleError && <span className="error-message">{vehicleError}</span>}
</div>
{errors.vehicle && <span className="error-message">{errors.vehicle}</span>}
</div>
<div className="finishing-fleet-section">
  <label className="finish-label">Finishing Options *</label>
<div className="finish-fleet-section">
<div className="checkbox-finish-options">
  {finishOptions.map((option, index) => (
    <div key={index} className="finish-checkbox-item">
     <input
  type="checkbox"
  id={`finish-${index}`}
  value={option.name}
  checked={formData.finishing.includes(option.name)}
  onChange={handleFinishChange}
/>
      <label htmlFor={`finish-${index}`}>{option.name}</label>
    </div>
  ))}
</div>
{errors.finishing && <div className="error-message">{errors.finishing}</div>}
  </div>
</div>
<div className="fleet-file-section">
<label className="fleet-file-label">Logo/Image *</label>
<h2 className="apparel-warn">
    <b className="apparel-notice">NOTICE</b>: Submitting PNG or JPG files may require a vectorization fee if they're pixelated. To avoid this, please upload true vector files (PDF or SVG without embedded images). This ensures your apparel prints crisp and clean.
    <p className="log-re">Need a new logo?</p>
    <p className="logo-warn">
      <b className="logo-notice">LOGO REDESIGN</b>: You can upload your old logo <a href="/new-logo">here</a> for a redesign quote.
    </p>
  </h2>
<div className="file-fleet-section">


<div className="choose-logo-contain">
  <label className="file-fleet-label">
    {formData.img && formData.img.length > 0 ? (
      <span>Add More Photos or Logos</span>
    ) : (
      <span>Choose Your Logo or Photos for Your Vehicle</span>
    )}
    <input
  type="file"
  name="img" // ✅ This is correct
  accept=".pdf,.svg,.doc,.png,.jpg,.jpeg"
  onChange={(e) => handleFileChange(e, 'img')}
  multiple
/>
  </label>

  {formData.img && formData.img.length > 0 && (
    <button type="button" className="remove-fleet-file-button" onClick={() => handleFileRemove('img')}>
      Remove All
    </button>
  )}

  {fileError && <span className="error-message">{fileError}</span>}

  {formData.img && formData.img.length > 0 && (
    <ul className="selected-fleet-files-list">
      {formData.img.map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
    </ul>
  )}
</div>

</div>
</div>
<div className="fleet-message-container">
<label className="message-fleet-label">Message *</label>
<h1 className="message-fleet-note">
  Tell us about your vehicle fleet/decal job and how you want it designed! 
</h1>


<textarea className="message-fleet-text" name="message" type="text" placeholder="Enter Message"
  value={formData.message} onChange={(e) => {
    setFormData({ ...formData, message: e.target.value });
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, message: '' })); // Clear the error
    }
  }}
  />
  {errors.message && <span className="error-message">{errors.message}</span>}
  <div className="terms-checkbox">
  <label className="terms-label">Terms & Conditions *</label>
  <input
    type="checkbox"
    id="terms"
    checked={termsAccepted}
    onChange={(e) => {
      const checked = e.target.checked;
      setTermsAccepted(checked);
      setFormData((prev) => ({ ...prev, terms: checked }));
      if (checked) {
        setErrors((prevErrors) => ({ ...prevErrors, terms: '' }));
      }
    }}
  />
<p className="terms-text">
  <strong>PLEASE READ AND CHECK:</strong><br />
  You agree to pay for all custom shirts and labor once production begins. No cancellations after materials are ordered or work has started.
</p>
</div>
{errors.terms && <div className="error-message">{errors.terms}</div>}
  </div>
  <div className="submit-button-wrapper">
    <button
    type="submit"
    className="btn -- submit-fleet"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <div className="spinner-button">
        <span className="spinner"></span> Submitting...
      </div>
    ) : (
      'SUBMIT VEHICLE FLEET/DECAL GRAPHICS'
    )}
  </button>
  {submissionMessage && (
    <div className="custom-toast success">{submissionMessage}</div>
  )}
  {submissionErrorMessage && (
    <div className="custom-toast error">{submissionErrorMessage}</div>
  )}
  {errorMessage && (
    <div className="custom-toast error">{errorMessage}</div>
  )}
         </div> 
</div>
</div>
        </form>
        </main>
        <footer className="material-footer">
  <div className="site-material-footer__inner">
    <img className="mx-img" alt="TBS logo" src={images["../assets/MX Logos/MX.svg"].default} />
    <div className="footer-navigation-content">
      <h2 className="footer-title">Navigation</h2>
    <ul className="footer-navigate">
      <li><a className="footer-material-nav-link" href="/about-us">About Us</a></li>
      <li><a className="footer-material-nav-link" href="/blog">Blog</a></li>
      <li><a className="footer-material-nav-link" href="/services">Services</a></li>
      <li><a className="footer-material-nav-link" href="/contact-us">Contact Us</a></li>
    </ul>
    </div>
    <div className="footer-contact">
      <h2 className="footer-title">Contact</h2>
      <p className="contact-info">
        <a className="will-phone" href="tel:+17062630175">Call: 706-263-0175</a>
        <a className="will-email" href="mailto: tbsolutions1999@gmail.com">Email: tbsolutions1999@gmail.com</a>
        <a className="will-address" href="https://www.google.com/maps/place/Traffic+%26+Barrier+Solutions%2FMaterial+WorX+Sign+Shop/@34.5115302,-84.9476215,94m/data=!3m1!1e3!4m6!3m5!1s0x886007df83843f3b:0x84510d87790af625!8m2!3d34.5117917!4d-84.948025!16s%2Fg%2F11l28zhlzt?entry=ttu&g_ep=EgoyMDI0MDkyNC4wIKXMDSoASAFQAw%3D%3D"
      >
        723 N. Wall St, Calhoun, GA, 30701</a>
      </p>
    </div>

    <div className="social-icons">
      <h2 className="footer-title">Follow Us</h2>
      <a className="social-icon" href="https://www.facebook.com/tbssigns2022/" target="_blank" rel="noopener noreferrer">
        <img className="facebook-img" src={images["../assets/social media/facebook.png"].default} alt="Facebook" />
      </a>
      <a className="social-icon" href="https://www.tiktok.com/@tbsmaterialworx?_t=8lf08Hc9T35&_r=1" target="_blank" rel="noopener noreferrer">
        <img className="tiktok-img" src={images["../assets/social media/tiktok.png"].default} alt="TikTok" />
      </a>
      <a className="social-icon" href="https://www.instagram.com/tbsmaterialworx?igsh=YzV4b3doaTExcjN4&utm_source=qr" target="_blank" rel="noopener noreferrer">
        <img className="insta-img" src={images["../assets/social media/instagram.png"].default} alt="Instagram" />
      </a>
    </div>
  </div>
</footer>
<div className="footer-copyright">
      <p className="footer-copy-p">&copy; 2025 Traffic & Barrier Solutions, LLC/Material WorX - 
        Website MERN Stack Coded & Deployed by <a className="footer-face"href="https://www.facebook.com/will.rowell.779" target="_blank" rel="noopener noreferrer">William Rowell</a> - All Rights Reserved.</p>
    </div>
    </div>
        
    )
};
export default FleetGraphics;
