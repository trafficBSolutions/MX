import React, { useState, useEffect } from 'react';
import '../css/fleet.css';
import '../css/headerfooter.css';
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
import MXFleetGallery from '../components/MXFleetGal';
import axios from 'axios';
import Header from '../components/headerviews/HeaderFleet';
const states = [
    { abbreviation: 'AL', name: 'Alabama' },
    { abbreviation: 'AK', name: 'Alaska' },
    { abbreviation: 'AZ', name: 'Arizona' },
    { abbreviation: 'AR', name: 'Arkansas' },
    { abbreviation: 'CA', name: 'California' },
    { abbreviation: 'CO', name: 'Colorado' },
    { abbreviation: 'CT', name: 'Connecticut' },
    { abbreviation: 'DE', name: 'Delaware' },
    { abbreviation: 'FL', name: 'Florida' },
    { abbreviation: 'GA', name: 'Georgia' },
    { abbreviation: 'HI', name: 'Hawaii' },
    { abbreviation: 'ID', name: 'Idaho' },
    { abbreviation: 'IL', name: 'Illinois' },
    { abbreviation: 'IN', name: 'Indiana' },
    { abbreviation: 'IA', name: 'Iowa' },
    { abbreviation: 'KS', name: 'Kansas' },
    { abbreviation: 'KY', name: 'Kentucky' },
    { abbreviation: 'LA', name: 'Louisiana' },
    { abbreviation: 'ME', name: 'Maine' },
    { abbreviation: 'MD', name: 'Maryland' },
    { abbreviation: 'MA', name: 'Massachusetts' },
    { abbreviation: 'MI', name: 'Michigan' },
    { abbreviation: 'MN', name: 'Minnesota' },
    { abbreviation: 'MS', name: 'Mississippi' },
    { abbreviation: 'MO', name: 'Missouri' },
    { abbreviation: 'MT', name: 'Montana' },
    { abbreviation: 'NE', name: 'Nebraska' },
    { abbreviation: 'NV', name: 'Nevada' },
    { abbreviation: 'NH', name: 'New Hampshire' },
    { abbreviation: 'NJ', name: 'New Jersey' },
    { abbreviation: 'NM', name: 'New Mexico' },
    { abbreviation: 'NY', name: 'New York' },
    { abbreviation: 'NC', name: 'North Carolina' },
    { abbreviation: 'ND', name: 'North Dakota' },
    { abbreviation: 'OH', name: 'Ohio' },
    { abbreviation: 'OK', name: 'Oklahoma' },
    { abbreviation: 'OR', name: 'Oregon' },
    { abbreviation: 'PA', name: 'Pennsylvania' },
    { abbreviation: 'RI', name: 'Rhode Island' },
    { abbreviation: 'SC', name: 'South Carolina' },
    { abbreviation: 'SD', name: 'South Dakota' },
    { abbreviation: 'TN', name: 'Tennessee' },
    { abbreviation: 'TX', name: 'Texas' },
    { abbreviation: 'UT', name: 'Utah' },
    { abbreviation: 'VT', name: 'Vermont' },
    { abbreviation: 'VA', name: 'Virginia' },
    { abbreviation: 'WA', name: 'Washington' },
    { abbreviation: 'WV', name: 'West Virginia' },
    { abbreviation: 'WI', name: 'Wisconsin' },
    { abbreviation: 'WY', name: 'Wyoming' }
  ];
  const finishOptions = [
    { name: 'Matte', disabled: false },
    { name: 'Gloss', disabled: false },
    { name: 'ORAFOL 5600RA (Reflective Fleet Graphics)', disabled: false }
  ];
  const vehicleType = [
    { name: 'Box Truck', disabled: false },
    { name: 'Car/Pickup Truck/SUV/Van', disabled: false },
    { name: '18-Wheeler', disabled: false },
    { name: 'Motorcycle', disabled: false },
    { name: 'Bus', disabled: false },
    { name: 'Trailer', disabled: false }
  ];
const FleetGraphics = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState(''); // New state for vehicle type
  const [availableMakes, setAvailableMakes] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
    const [phone, setPhone] = useState('');
    const [lengthUnit, setLengthUnit] = useState(''); // Default to feet
    const [widthUnit, setWidthUnit] = useState(''); // Default to Feet
    const [doorLengthUnit, setDoorLengthUnit] = useState(''); // Default to feet
    const [doorWidthUnit, setDoorWidthUnit] = useState(''); // Default to Feet
    const [addedVehicles, setAddVehicles] = useState([]);
    const [addedDriverSizes, setAddedDriverSizes] = useState([]);
    const [addedPassengerSizes, setAddedPassengerSizes] = useState([]);
    const [driverLengthUnit, setDriverLengthUnit] = useState('');
    const [driverWidthUnit, setDriverWidthUnit] = useState('');
    const [passengerLengthUnit, setPassengerLengthUnit] = useState('');
    const [passengerWidthUnit, setPassengerWidthUnit] = useState('');
    const [addedSizes, setAddedSizes] = useState([]);
    const [addedDoors, setAddedDoors] = useState([]);
    const [selectedFinishing, setSelectedFinishing] = useState('');
    const [addedFinishing, setAddedFinishing] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
      first: '',
      last: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      vehicle: '',
      driverSize: { length: '', width: '' },
      passengerSize: { length: '', width: '' },
      doorSize: { length: '', width: '' },
      finishing: '',
      img: null,
      message: ''
    });
    
    const [errors, setErrors] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    
    const handleStateChange = (e) => {
      setSelectedState(e.target.value);
      setErrors({ ...errors, state: '' }); // Clear state error when state changes
    };
    const handlePhoneChange = (event) => {
      const input = event.target.value;
      const formatted = input.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      setPhone(formatted);
      setFormData({ ...formData, phone: formatted });
    };
    const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [fileType]: file });
  };
  
  const handleFileRemove = (fileType) => {
    setFormData({ ...formData, [fileType]: null });
  };
  const handleAddVehicle = () => {
    // Validate that all fields (year, make, and model) are filled
    if (selectedYear && selectedMake && selectedModel) {
      const newVehicle = `${selectedYear} ${selectedMake} ${selectedModel}`;
      
      // Append the new vehicle to the existing list of vehicles
      setAddVehicles([...addedVehicles, newVehicle]);
  
      // Clear the form fields to allow adding another vehicle
      setSelectedYear('');  
      setSelectedMake('');
      setSelectedModel('');
      
      // Clear any previous error messages
      setErrorMessage('');   
    } else {
      // Set an error message if any field is missing
      setErrorMessage('Please select year, make, and model before adding a vehicle.');
    }
  };
  
  // Function to remove a vehicle by index
  const handleRemoveVehicle = (index) => {
    const updatedVehicles = addedVehicles.filter((_, i) => i !== index); // Remove vehicle at index
    setAddVehicles(updatedVehicles);
  };
  
  // Function to handle adding a vehicle size
  const handleAddDriverSize = () => {
    if (formData.driverSize && formData.driverSize.length && formData.driverSize.width) {
      const newDriverSize = `${formData.driverSize.length} ${driverLengthUnit} x ${formData.driverSize.width} ${driverWidthUnit}`;
      setAddedDriverSizes([...addedDriverSizes, newDriverSize]);
  
      // Clear the form
      setFormData((prevState) => ({
        ...prevState,
        driverSize: { length: '', width: '' }
      }));
      setDriverLengthUnit('');
      setDriverWidthUnit('');
    } else {
      setErrorMessage('Please enter both driver length and width.');
    }
  };
  
  const handleAddPassengerSize = () => {
    if (formData.passengerSize && formData.passengerSize.length && formData.passengerSize.width) {
      const newPassengerSize = `${formData.passengerSize.length} ${passengerLengthUnit} x ${formData.passengerSize.width} ${passengerWidthUnit}`;
      setAddedPassengerSizes([...addedPassengerSizes, newPassengerSize]);
  
      // Clear the form
      setFormData((prevState) => ({
        ...prevState,
        passengerSize: { length: '', width: '' }
      }));
      setPassengerLengthUnit('');
      setPassengerWidthUnit('');
    } else {
      setErrorMessage('Please enter both passenger length and width.');
    }
  };
  
  const handleRemoveDriverSize = (index) => {
    const updatedDriverSizes = addedDriverSizes.filter((_, i) => i !== index);
    setAddedDriverSizes(updatedDriverSizes);
  };
  const handleRemovePassengerSize = (index) => {
    const updatedPassengerSizes = addedPassengerSizes.filter((_, i) => i !== index);
    setAddedPassengerSizes(updatedPassengerSizes);
  };
  
  const handleSizeChange = (type, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [field]: value
      }
    }));
  };


// Function to handle adding a door size
const handleAddDoorSize = () => {
  if (formData.doorSize.length && formData.doorSize.width) {
    const newDoorSize = `${formData.doorSize.length} ${doorLengthUnit} x ${formData.doorSize.width} ${doorWidthUnit}`;
    setAddedDoors([...addedDoors, newDoorSize]);

    // Clear the form
    setFormData({
      ...formData,
      doorSize: { length: '', width: '' }
    });
    setDoorLengthUnit('');
    setDoorWidthUnit('');
  } else {
    setErrorMessage('Please enter both door length and width.');
  }
};

// Function to remove a door size
const handleRemoveDoorSize = (index) => {
  const updatedDoor = addedDoors.filter((_, i) => i !== index);
  setAddedDoors(updatedDoor);
};

const handleAddFinishing = () => {
  if (selectedFinishing && addedFinishing.length < 3) {
    setAddedFinishing([...addedFinishing, selectedFinishing]);
    setSelectedFinishing('');
  } else {
    setErrorMessage('Please select a finishing option.');
  }
};
// Function to remove a finishing
const handleRemoveFinishing = (index) => {
  const updatedFinishing = addedFinishing.filter((_, i) => i !== index);
  setAddedFinishing(updatedFinishing);
};
// Handle Vehicle Type Change
const handleTypeChange = (e) => {
  const vehicleType = e.target.value;
  setSelectedVehicleType(vehicleType);
  setSelectedYear('');
  setSelectedMake('');
  setSelectedModel('');

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
        setSubmissionErrorMessage('');
        setSubmissionMessage('');
        const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'message'];
const newErrors = {};
    
      
requiredFields.forEach(field => {
  if (!formData[field]) {
    let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
    if (field === 'first') fieldLabel = 'First Name';
    if (field === 'last') fieldLabel = 'Last Name';
    if (field === 'company') fieldLabel = 'Company Name';
    if (field === 'phone') fieldLabel = 'Phone Number';
    if (field === 'address') fieldLabel = 'Address';
    if (field === 'city') fieldLabel = 'City';
    if (field === 'state') fieldLabel = 'State';
    if (field === 'zip') fieldLabel = 'Zip Code';
    if (field === 'img') fieldLabel = 'Logo';
    newErrors[field] = `${fieldLabel} is required!`;
  }
});

if (Object.keys(newErrors).length > 0) {
  setErrorMessage('Required fields are missing.');
  setErrors(newErrors);
  return;
}

try {
  const formDataToSubmit = {
    ...formData,
    vehicle: addedVehicles.join(', '), // Convert the vehicle array to a comma-separated string
    driverSize: addedDriverSizes.join(', '),
    passengerSize: addedPassengerSizes.join(', '),
    doorSize: addedDoors.join(', '),
    finishing: addedFinishing.join(', '),
  };

  const response = await axios.post('/fleet-graphics', formDataToSubmit, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Set success message
  setSubmissionMessage('Fleet/Decal Vehicle Graphics Request Submitted! We will be with you within 48 hours!');
  console.log(response.data);

  // Clear form fields after successful submission
  setFormData({
    first: '',
    last: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    vehicle: '',
    driverSize: { length: '', width: '' },
    passengerSize: { length: '', width: '' },
    doorSize: { length: '', width: '' },
    finishing: '',
    img: null,
    message: ''
  });
  setAddedDriverSizes([]);
  setAddedPassengerSizes([]);
  setAddedDoors([]);
  setAddedFinishing([]);
  setErrors({});
  setPhone('');
} catch (error) {
  console.error('Error submitting Fleet/Decal Vehicle Graphics job:', error);
  setSubmissionErrorMessage('An error occurred while submitting. Please try again.');
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
  <div className="name-section-fleet">
    <label className="first-fleet-name-label">Name: </label>
      <div className="first-name-fleet-input">

  <div className="first-fleet-name">
    <div className="firstname-fleet-input">
    <div className="input-first-fleet-container">
<label className="first-fleet-label-name">First Name *</label>
<input
name="first"
type="text"
className="firstname-fleet-name-input"
text="first-name--input"
placeholder="Enter First Name"

value={formData.first}
onChange={(e) => setFormData({ ...formData, first: e.target.value })}
/>
{errors.last && <div className="error-message">{errors.first}</div>}
</div>
    </div>
  </div>
  <div className="last-fleet-name">
    <div className="last-fleet-input">
    <div className="last-fleet-input-container">
<label className="last-fleet-label-name">Last Name *</label>
<input
name="last"
type="text"
className="lastname-fleet-name-input"
text="last-name--input"
placeholder="Enter Last Name"

value={formData.last}
onChange={(e) => setFormData({ ...formData, last: e.target.value })}

/>
{errors.last && <div className="error-message">{errors.last}</div>}
</div>
    </div>
  </div>
</div>
</div>
<div className="company-fleet-section">
<label className="fleet-company-label">Company/Excavator: </label>
<div className="company-fleet-input">
  <div className="company-fleet">
    <div className="fleet-company-name-input">
    <div className="fleet-input-container">
      <label className="company-fleet-name">Company *</label>
      <input name="company-fleet-name-input" type="text" className="company-fleet-name-input" text="company--input" placeholder="Enter Company Name"
        value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}

        />
        {errors.company && <span className="error-message">{errors.company}</span>}
        </div>
    </div>
  </div>
  </div>
  </div>
  <div className="emailphone-fleet-section">
  <label className="emailphone-fleet-label">Email/Phone Number:</label>
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
onChange={(e) => setFormData({ ...formData, email: e.target.value })}

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
onChange={handlePhoneChange}
/>
{errors.phone && <div className="error-message">{errors.phone}</div>}
</div>
    </div>
  </div>
</div>
</div>
<div className="address-fleet-section">
<label className="address-fleet-label">Company Address: </label>
<div className="address-fleet-input-container">
<div className="address-fleet-input">
<div className="address-fleet-container">
  <div className="address-fleet-inputing">
<label className="addr-fleet-label">Address *</label>
<input
name="address-box"
type="text"
className="address-fleet-box"
text="address--input"
placeholder="Enter Address"
value={formData.address}
onChange={(e) => setFormData({ ...formData, address: e.target.value })}
/>
{errors.address && <span className="error-message">{errors.address}</span>}
</div>
<div className="city-fleet-input">
<label className="city-fleet-label">City *</label>

<input
name="city-input"
type="text"
className="city-fleet-box"
text="city--input"
placeholder="City"
value={formData.city}
onChange={(e) => setFormData({ ...formData, city: e.target.value })}
/>
{errors.city && <span className="error-message">{errors.city}</span>}
</div>
</div>
<div className="city-fleet-state">
<div className="state-fleet-input">
<label className="state-fleet-label">State *</label>
<select
      name="state"
      className="state-fleet-box"
      
      value={formData.state}
      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
    >
      <option value="">Select State</option>
      {states.map(state => (
        <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
      ))}
    </select>
    {errors.state && <span className="error-message">{errors.state}</span>}
    </div>
    <div className="zip-fleet-input">
<label className="zip-fleet-label">Zip Code *</label>
<input
        name="zip"
        type="text"
        className="zip-fleet-box"
        value={formData.zip}
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
        placeholder="Zip Code"
        maxLength={5}
        pattern="\d{5}"
        title="Zip code must be 5 digits"
      />
      {errors.zip && <span className="error-message">{errors.zip}</span>}
</div>
</div>
</div>
</div>
</div>
<div className="vehicle-type-fleet-section">
<label className="type-fleet-label" htmlFor="vehicleType">Vehicle Type:</label>
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

      {/* Year Dropdown */}
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
    </div>
    <button className="btn-submit btn--full submit-vehicle" type="button" onClick={handleAddVehicle}>
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
            className="btn-submit btn--full submit-vehicle"
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
</div>
{errors.vehicle && <span className="error-message">{errors.vehicle}</span>}
</div>
<div className="vehicle-size-fleet-section">
<label className="size-fleet-label">Size of Vehicle:</label>
{/* Driver Size Section */}
<div className="size-fleet-section">
  <label className="size-driver-fleet-note">Driver Side:</label>
  <div className="driver-side-section">
    <div className="driver-length-section">
    <label className="length-fleet-label" htmlFor="driver-length">Length *</label>
    <input
      className="length-fleet-box"
      type="number"
      name="driver-length"
      value={formData.driverSize.length} // Tied to driverSize state
      onChange={(e) => handleSizeChange('driverSize', 'length', e.target.value)} // Correct type and field
      placeholder="Enter driver length"
    />

    <select
      className="length-fleet-select"
      value={driverLengthUnit}
      onChange={(e) => setDriverLengthUnit(e.target.value)}
    >
      <option value="" disabled>Select Measurement</option>
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
</div>
    <div className="driver-width-section">
    <label className="width-fleet-label" htmlFor="driver-width">Width *</label>
    <input
      className="width-fleet-box"
      type="number"
      name="driver-width"
      value={formData.driverSize.width}
      onChange={(e) => handleSizeChange('driverSize', 'width', e.target.value)}
      placeholder="Enter driver width"
    />

    <select
      className="length-fleet-select"
      value={driverWidthUnit}
      onChange={(e) => setDriverWidthUnit(e.target.value)}
    >
      <option value="" disabled>Select Measurement</option>
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
    {/* Added Driver Sizes */}
    {addedDriverSizes.length > 0 ? (
      addedDriverSizes.map((size, index) => (
        <li className="vehicle-driver-size-li" key={index}>
          {size}
          <button
            className="btn-submit btn--full driver-remove-submit-size"
            type="button"
            onClick={() => handleRemoveDriverSize(index)}
          >
            REMOVE DRIVER SIZE
          </button>
        </li>
      ))
    ) : (
      <p className="no-added-vehicles">No Driver sizes added yet.</p>
    )}
  </div>
  <button
      type="button"
      className="btn-submit btn--full driver-submit-size"
      onClick={handleAddDriverSize}
    >
      ADD DRIVER SIZE
    </button>
</div>
</div>
{errors.driverSize && <span className="error-message">{errors.driverSize}</span>}

{/* Passenger Size Section */}
<div className="size-fleet-section">
  <label className="size-passenger-fleet-note">Passenger Side:</label>
  <div className="passenger-side-section">
    <div className="passenger-length-section">
    <label className="length-fleet-label" htmlFor="passenger-length">Length *</label>
    <input
      className="length-fleet-box"
      type="number"
      name="passenger-length"
      value={formData.passengerSize.length} // Tied to passengerSize state
      onChange={(e) => handleSizeChange('passengerSize', 'length', e.target.value)}
      placeholder="Enter passenger length"
    />

    <select
      className="length-fleet-select"
      value={passengerLengthUnit}
      onChange={(e) => setPassengerLengthUnit(e.target.value)}
    >
      <option value="" disabled>Select Measurement</option>
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
</div>
<div className="passenger-side-width">
    <label className="width-fleet-label" htmlFor="passenger-width">Width *</label>
    <input
      className="width-fleet-box"
      type="number"
      name="passenger-width"
      value={formData.passengerSize.width}
      onChange={(e) => handleSizeChange('passengerSize', 'width', e.target.value)}
      placeholder="Enter passenger width"
    />

    <select
      className="length-fleet-select"
      value={passengerWidthUnit}
      onChange={(e) => setPassengerWidthUnit(e.target.value)}
    >
      <option value="" disabled>Select Measurement</option>
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
</div>
    <button
      type="button"
      className="btn-submit btn--full passenger-submit-size"
      onClick={handleAddPassengerSize}
    >
      ADD PASSENGER SIZE
    </button>

    {/* Added Passenger Sizes */}
    {addedPassengerSizes.length > 0 ? (
      addedPassengerSizes.map((passengerSize, index) => (
        <li className="vehicle-passenger-size-li" key={index}>
          {passengerSize}
          <button
            className="btn-submit btn--full passenger-remove-submit-size"
            type="button"
            onClick={() => handleRemovePassengerSize(index)}
          >
            REMOVE PASSENGER SIZE
          </button>
        </li>
      ))
    ) : (
      <p className="no-added-vehicles">No Passenger sizes added yet.</p>
    )}
  </div>
</div>

{errors.passengerSize && <span className="error-message">{errors.passengerSize}</span>}
</div>
<div className="door-size-fleet-section">
<label className="size-fleet-label">Size of Backdoor/Tailgate Side Vehicle:</label>
<div className="size-door-fleet-section">
  <div className="length-door-fleet-section">
    <label className="length-fleet-label" htmlFor="length">Length *</label>
    <input
      className="length-door-fleet-box"
      type="number"
      name="length"
      value={formData.doorSize.length} // Refers to the doorSize state
      onChange={(e) => handleSizeChange('doorSize', 'length', e.target.value)} // Handle door size changes
      placeholder="Enter length"
    />
    <select
      className="length-fleet-select"
      value={doorLengthUnit}
      onChange={(e) => setDoorLengthUnit(e.target.value)} // Set unit for length
    >
      <option value="" disabled>Select Measurement</option>
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <div className="width-door-fleet-section">
    <label className="width-fleet-label" htmlFor="width">Width *</label>
    <input
      className="width-door-fleet-box"
      type="number"
      name="width"
      value={formData.doorSize.width} // Refers to the doorSize state
      onChange={(e) => handleSizeChange('doorSize', 'width', e.target.value)} // Handle door size changes
      placeholder="Enter width"
    />
    <select
      className="width-fleet-select"
      value={doorWidthUnit}
      onChange={(e) => setDoorWidthUnit(e.target.value)} // Set unit for width
    >
      <option value="" disabled>Select Measurement</option>
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <button
    className="btn-submit btn--full door-length-submit-size"
    type="button" // Make sure this button doesn't act like a form submit
    onClick={handleAddDoorSize}
  >
    ADD BACKDOOR/TAILGATE SIZE
  </button>

  {/* Display added door sizes */}
  <ul>
  {addedDoors.length > 0 ? (
    addedDoors.map((doorSize, index) => (
      <li className="door-list" key={index}>
        {doorSize}
        <button
          type="button"
          className="btn-submit btn--full door-remove-length-submit-size"
          onClick={() => handleRemoveDoorSize(index)} // Handle removing door sizes
        >
          REMOVE BACKDOOR/TAILGATE SIZE
        </button>
      </li>
    ))
  ) : (
    <p className="no-added-vehicles">No Back Door/Tailgate sizes added yet.</p>
  )}
</ul>
{errors.doorSize && <span className="error-message">{errors.doorSize}</span>}
</div>
</div>
<div className="finishing-fleet-section">
<label className="finish-fleet-label">Finishing Touch:</label>
<div className="fleet-finish-img-section">
  <div className="matte-img-fleet">
    <img className="matte-img" alt="matte" src="../public/vinyls/matte.jpg"/>
    <h2 className="matte-fleet-note">Matte</h2>
  </div>
  <div className="gloss-img-fleet">
    <img className="gloss-img" alt="gloss" src="../public/vinyls/gloss.jpg"/>  
    <h2 className="gloss-fleet-note">Gloss</h2>
  </div>
  <div className="ra-img-fleet">
    <img className="ORAFOL-img" alt="orafol" src="../public/vinyls/orafol 5600.jpg"/>  
    <h2 className="orafol-fleet-note">ORALITE 5600RA(Fleet Graphics)</h2>
  </div>
</div>

<div className="finish-fleet-section">
  <label className="finish-label" htmlFor="finishing">Finishing *</label>
  <select
    name="finishing"
    className="finish-fleet-select"
    value={selectedFinishing}
    onChange={(e) => setSelectedFinishing(e.target.value)}
    disabled={addedFinishing.length === 3}
  >
    <option value="">Select Finishing Type</option>
    {finishOptions.map((option, index) => (
      <option key={index} value={option.name}>
        {option.name}
      </option>
    ))}
  </select>
  <button className="btn btn--full submit-finishing" type="button" onClick={handleAddFinishing}>
    ADD FINISHING
  </button>
  <div className="finishing-list">
  <ul>
  {addedFinishing.length > 0 ? (
    addedFinishing.map((finishing, index) => (
      <li className="finishing-item" key={index}>
        {finishing}
        <button
          className="btn btn--full remove-finishing"
          onClick={() => handleRemoveFinishing(index)}
        >
          REMOVE FINISHING
        </button>
      </li>
    ))
  ) : (
    <p className="no-added-vehicles">No Finishing items added yet.</p>
  )}
</ul>
    {errors.finishing && <span className="error-message">{errors.finishing}</span>}
  </div>
</div>
</div>
<div className="fleet-file-section">
<label className="fleet-file-label">Logo/Image:</label>
<h2 className="fleet-warn"><b className="fleet-notice">NOTICE</b>: If you're submitting a PNG, JPG, or any file that has PIXELATED Images, there will be a vectorizing fee to vectorize your logo depending on 
    how long it takes us to vectorize. If you want to avoid the vectorization fee, it is better to submit PDFs or SVGs that already have vectorization inside. 
    These PDF/SVG files cannot have any PNGs or JPGs inside because the PDF/SVG have been exported or saved as a PDF/SVG but has a JPG/PNG file inside making it much worse to vectorize. 
    JPG/PNG files are compressed Image files making them Blurry and Pixelated. That is why vectorization plays an important role in order for your items to not print blurry or pixelated.
    <p className="log-re">Logo Redesigning(Optional)</p>
    <p className="logo-warn"><b className="logo-notice">NOTICE</b>: If you need us to design a new logo for you, there will be fee for
    redesigning your logo depending on how much time it takes us and how fastidious you are at your logo redesign. Please Specify if you need your logo redesigned
    in the Message Section.
</p>
</h2>
<div className="file-fleet-section">
<label htmlFor="logo-select" className="fleet-logo">Logo/Image for Graphics *</label>
<div className="choose-logo-contain">
    <label className="file-fleet-label">
    {formData.img ? (
            <span>{formData.img.name}</span>
          ) : (
            <span>Choose Your Logo For Your Vehicle</span>
          )}
          <input type="file" name="img" accept=".pdf,.svg,.doc,.png,.jpg,.jpeg" onChange={(e) => handleFileChange(e, 'img')} />
          </label>
          {formData.img && (
            <button type="button" className="remove-fleet-file-button" onClick={() => handleFileRemove('img')}>Remove</button>
          )}
        
        {errors.img && <span className="error-message">{errors.img}</span>}
</div>
</div>
</div>
<div className="fleet-message-container">
<label className="message-fleet-label">Message: </label>
<h1 className="message-fleet-note">Tell us about your vehicle fleet/decal job and how you want it designed! Please specify if you need
  logo redesigning and if there are more specifications about your vehicle like if you want us to 
  design HOOD Decals, TOP FRONTS of your box truck, door decals on your box truck, etc...
If you need to drop off your vehicle to have us work on it, please specify here that
you need to drop off your vehicle. Submit this form first and we will give
you a call to discuss how we can make your vehicle look like a professional vehicle. We will
usually respond within 48 hours or less. Our shop is located on
723 N. Wall St, Calhoun GA, 30701. Please note that we are open Monday-Friday 8:00am-4:00pm EST and once 
we are closed, we will respond the next business day. Please note that we do not work on Saturdays, Sundays, or Holidays.
  </h1>

<textarea className="message-fleet-text" name="message" type="text" placeholder="Enter Message"
  value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
  />
  {errors.message && <span className="error-message">{errors.message}</span>}
  {submissionMessage && (
  <div className="submission-message">{submissionMessage}</div>
)}

{submissionErrorMessage && (
  <div className="submission-error-message">{submissionErrorMessage}</div>
)}

  </div>
  <button type="submit" className="btn-fleet-submit btn--full submit-fleet" onClick={handleSubmit}>SUBMIT VEHICLE FLEET/DECAL GRAPHICS</button>
  {submissionErrorMessage &&
            <div className="submission-error-message">{submissionErrorMessage}</div>
          }
          {errorMessage &&
            <div className="submission-error-message">{errorMessage}</div>
          }
</div>
</div>
        </form>
        </main>
        <footer className="material-footer">
      <div className="social-icons">
                <a className="social-icon" href="https://www.facebook.com/tbssigns2022/" target="_blank" rel="noopener noreferrer">
                    <img className="facebook-img" src="../public/social media/facebook.png" alt="Facebook" />
                </a>
                <a className="social-icon" href="https://www.tiktok.com/@tbsmaterialworx?_t=8lf08Hc9T35&_r=1" target="_blank" rel="noopener noreferrer">
                    <img className="tiktok-img" src="../public/social media/tiktok.png" alt="TikTok" />
                </a>
                <a className="social-icon" href="https://www.instagram.com/tbsmaterialworx?igsh=YzV4b3doaTExcjN4&utm_source=qr" target="_blank" rel="noopener noreferrer">
                    <img className="insta-img" src="../public/social media/instagram.png" alt="Instagram" />
                </a>
            </div>
        <div className="site-material-footer__inner container container--narrow">
          <div className="footer-content">
            <img className="mx-img" alt="TBS logo" src="../public/MX Photos/MX-removebg-preview.png" />
            <ul className="footer-navigate">
              <li><a className="footer-material-nav-link" href="/about-us">About Us</a></li>
              <li><a className="footer-material-nav-link" href="/pay-invoice">Pay Invoice</a></li>
              <li><a className="footer-material-nav-link" href="/services">Services</a></li>
              <li><a className="footer-material-nav-link" href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <div className="statement-box">
              <p className="trademark-warning">
                <b className="warning-trade">WARNING:</b><b> Trademark Notice</b><img className="trademark-img" src="../public/MX Photos/MX-removebg-preview.png" alt="TBS Logo"></img> is a registered trademark of Traffic & Barrier Solutions, LLC. 
                Unauthorized use of this logo is strictly prohibited and may result in legal action. 
                All other trademarks, logos, and brands are the property of their respective owners.
              </p>
            </div>
            <h1 className="footer-number" href="tel:+17062630175">706-263-0175</h1>
          </div>
        </div>
      </footer>
        </div>
        
    )
};
export default FleetGraphics;
