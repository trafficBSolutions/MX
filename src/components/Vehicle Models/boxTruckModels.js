const chevroletBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Chevrolet 3500 (Dump Truck)', disabled: false, type: 'Dump Truck' },
    { name: 'Chevrolet Express 3500 (Box Truck)', disabled: false, type: 'Van/Box Truck' },
    { name: 'Chevrolet Express 2500 (Box Truck)', disabled: false, type: 'Van/Box Truck' },
    { name: 'Chevrolet Silverado 3500 (Flatbed Truck)', disabled: false, type: 'Flatbed Truck' },
    { name: 'Chevrolet Silverado 2500 (Flatbed Truck)', disabled: false, type: 'Flatbed Truck' },
    { name: 'Chevrolet Low Cab Forward (Box Truck)', disabled: false, type: 'Box Truck' },
    { name: 'Chevrolet Kodiak (Heavy Duty Truck)', disabled: false, type: 'Heavy Duty Truck' },
    { name: 'Chevrolet W-Series (Heavy Duty Truck)', disabled: false, type: 'Heavy Duty Truck' },
    { name: 'Chevrolet C-Series (Utility Truck)', disabled: false, type: 'Utility Truck' },
    { name: 'Chevrolet T-Series (Utility Truck)', disabled: false, type: 'Utility Truck' },
    { name: 'Chevrolet 4500 (Dump Truck)', disabled: false, type: 'Dump Truck' },
    { name: 'Chevrolet 5500 (Concrete Truck)', disabled: false, type: 'Concrete Truck' },
    { name: 'Chevrolet 6500 (Concrete Truck)', disabled: false, type: 'Concrete Truck' },
    { name: 'Chevrolet 7500 (Utility Truck)', disabled: false, type: 'Utility Truck' },
    { name: 'Chevrolet 8500 (Heavy Duty Truck)', disabled: false, type: 'Heavy Duty Truck' },
    { name: 'Chevrolet 4500HD (Dump Truck)', disabled: false, type: 'Dump Truck' },
    { name: 'Chevrolet 5500HD (Concrete Truck)', disabled: false, type: 'Concrete Truck' },
    { name: 'Chevrolet 6500HD (Utility Truck)', disabled: false, type: 'Utility Truck' },
    { name: 'Chevrolet 7500HD (Dump Truck)', disabled: false, type: 'Dump Truck' },
    { name: 'Chevrolet 8500HD (Heavy Duty Truck)', disabled: false, type: 'Heavy Duty Truck' }
];
const fordBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Ford E-Series Cutaway (Box Truck/Van)', disabled: false, type: 'Van/Box Truck' },
    { name: 'Ford F-350 (Flatbed Truck)', disabled: false, type: 'Flatbed Truck' },
    { name: 'Ford F-450 (Dump Truck)', disabled: false, type: 'Dump Truck' },
    { name: 'Ford F-550 (Concrete Truck)', disabled: false, type: 'Concrete Truck' },
    { name: 'Ford Transit 350 (Box Truck/Box)', disabled: false, type: 'Van/Box Truck' },
    { name: 'Ford F-650 (Heavy Duty Truck)', disabled: false, type: 'Heavy Duty Truck' },
    { name: 'Ford F-750 (Heavy Duty Truck)', disabled: false, type: 'Heavy Duty Truck' },
    { name: 'Ford E-450 (Box Truck/Box)', disabled: false, type: 'Van/Box Truck' },
    { name: 'Ford Low Cab Forward (Box Truck)', disabled: false, type: 'Box Truck' },
    { name: 'Ford Super Duty (Utility Truck)', disabled: false, type: 'Utility Truck' }
];
const freightlinerBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Freightliner 3500 (Dump Truck)', disabled: false, type: 'Dump Truck' },
    { name: 'Freightliner 4500 (Dump Truck)', disabled: false, type: 'Dump Truck' },
    { name: 'Freightliner 5500 (Concrete Truck)', disabled: false, type: 'Concrete Truck' },
    { name: 'Freightliner 6500 (Utility Truck)', disabled: false, type: 'Utility Truck' },
    { name: 'Freightliner 7500 (Heavy Duty Truck)', disabled: false, type: 'Heavy Duty Truck' },
    { name: 'Freightliner 8500 (Heavy Duty Truck)', disabled: false, type: 'Heavy Duty Truck' },
    { name: 'Freightliner 4500HD (Dump Truck)', disabled: false, type: 'Dump Truck' },
    { name: 'Freightliner 5500HD (Concrete Truck)', disabled: false, type: 'Concrete Truck' }
];
const gmcBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'GMC Savana 3500 (Box Truck)', disabled: false, type: 'Van/Box Truck' },
    { name: 'GMC Sierra 3500 (Flatbed Truck)', disabled: false, type: 'Flatbed Truck' },
    { name: 'GMC Canyon (Utility Truck)', disabled: false, type: 'Utility Truck' },
    { name: 'GMC Topkick C4500 (Box Truck)', disabled: false, type: 'Box Truck' },
    { name: 'GMC Topkick C5500 (Dump Truck)', disabled: false, type: 'Dump Truck' },
    { name: 'GMC Sierra 2500 (Flatbed Truck)', disabled: false, type: 'Flatbed Truck' },
    { name: 'GMC Sierra 1500 (Utility Truck)', disabled: false, type: 'Utility Truck' }
];
const hinoBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Hino 268 (Box Truck)', disabled: false, type: 'Box Truck', year: 2005 },
    { name: 'Hino 338 (Box Truck)', disabled: false, type: 'Box Truck', year: 2007 },
    { name: 'Hino 195 (Box Truck)', disabled: false, type: 'Box Truck', year: 2010 },
    { name: 'Hino 258ALP (Box Truck)', disabled: false, type: 'Box Truck', year: 2012 },
    { name: 'Hino 268A (Box Truck)', disabled: false, type: 'Box Truck', year: 2015 },
    { name: 'Hino 195h (Hybrid Box Truck)', disabled: false, type: 'Box Truck', year: 2017 },
    { name: 'Hino XL Series (Box Truck)', disabled: false, type: 'Box Truck', year: 2020 },
    { name: 'Hino 500 Series (Box Truck)', disabled: false, type: 'Box Truck', year: 2023 },
    { name: 'Hino 300 Series (Box Truck)', disabled: false, type: 'Box Truck', year: 2025 }
];
const internationalBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'International 4300 (Box Truck)', disabled: false, type: 'Box Truck', year: 2000 },
    { name: 'International 4400 (Box Truck)', disabled: false, type: 'Box Truck', year: 2004 },
    { name: 'International 7600 (Box Truck)', disabled: false, type: 'Box Truck', year: 2007 },
    { name: 'International 4700 (Box Truck)', disabled: false, type: 'Box Truck', year: 2008 },
    { name: 'International 4800 (Box Truck)', disabled: false, type: 'Box Truck', year: 2010 },
    { name: 'International DuraStar (Box Truck)', disabled: false, type: 'Box Truck', year: 2015 },
    { name: 'International MV Series (Box Truck)', disabled: false, type: 'Box Truck', year: 2018 },
    { name: 'International HV Series (Box Truck)', disabled: false, type: 'Box Truck', year: 2020 },
    { name: 'International eMV Series (Electric Box Truck)', disabled: false, type: 'Box Truck', year: 2023 }
];
const IsuzuBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Isuzu NPR (Box Truck)', disabled: false, type: 'Box Truck', year: 1990 },
    { name: 'Isuzu NQR (Box Truck)', disabled: false, type: 'Box Truck', year: 1995 },
    { name: 'Isuzu NRR (Box Truck)', disabled: false, type: 'Box Truck', year: 2000 },
    { name: 'Isuzu FTR (Box Truck)', disabled: false, type: 'Box Truck', year: 2005 },
    { name: 'Isuzu FVR (Box Truck)', disabled: false, type: 'Box Truck', year: 2010 },
    { name: 'Isuzu N-Series Gas (Box Truck)', disabled: false, type: 'Box Truck', year: 2012 },
    { name: 'Isuzu N-Series Diesel (Box Truck)', disabled: false, type: 'Box Truck', year: 2015 },
    { name: 'Isuzu FTR 33,000 lbs. (Box Truck)', disabled: false, type: 'Box Truck', year: 2018 },
    { name: 'Isuzu NPR-HD (Box Truck)', disabled: false, type: 'Box Truck', year: 2020 },
    { name: 'Isuzu NRR Diesel (Box Truck)', disabled: false, type: 'Box Truck', year: 2023 }
];
const kenworthBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Kenworth K100 (Box Truck)', disabled: false, type: 'Box Truck', year: 1990 },
    { name: 'Kenworth T170 (Box Truck)', disabled: false, type: 'Box Truck', year: 1995 },
    { name: 'Kenworth T270 (Box Truck)', disabled: false, type: 'Box Truck', year: 2000 },
    { name: 'Kenworth T370 (Box Truck)', disabled: false, type: 'Box Truck', year: 2005 },
    { name: 'Kenworth T440 (Box Truck)', disabled: false, type: 'Box Truck', year: 2010 },
    { name: 'Kenworth T470 (Box Truck)', disabled: false, type: 'Box Truck', year: 2015 },
    { name: 'Kenworth T680 (Box Truck)', disabled: false, type: 'Box Truck', year: 2018 },
    { name: 'Kenworth T880 (Box Truck)', disabled: false, type: 'Box Truck', year: 2020 },
    { name: 'Kenworth W900 (Box Truck)', disabled: false, type: 'Box Truck', year: 2023 },
    { name: 'Kenworth K270 (Box Truck)', disabled: false, type: 'Box Truck', year: 2025 }
];
const mackBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Mack CH600 (Box Truck)', disabled: false, type: 'Box Truck', year: 1990 },
    { name: 'Mack CH700 (Box Truck)', disabled: false, type: 'Box Truck', year: 1995 },
    { name: 'Mack CL713 (Box Truck)', disabled: false, type: 'Box Truck', year: 1998 },
    { name: 'Mack RD688 (Box Truck)', disabled: false, type: 'Box Truck', year: 2000 },
    { name: 'Mack Granite (Box Truck)', disabled: false, type: 'Box Truck', year: 2005 },
    { name: 'Mack Pinnacle (Box Truck)', disabled: false, type: 'Box Truck', year: 2010 },
    { name: 'Mack Anthem (Box Truck)', disabled: false, type: 'Box Truck', year: 2015 },
    { name: 'Mack LR (Box Truck)', disabled: false, type: 'Box Truck', year: 2018 },
    { name: 'Mack Granite MHD (Box Truck)', disabled: false, type: 'Box Truck', year: 2020 },
    { name: 'Mack MD Series (Box Truck)', disabled: false, type: 'Box Truck', year: 2023 },
    { name: 'Mack MD6 (Box Truck)', disabled: false, type: 'Box Truck', year: 2025 }
];
const mercedesBenzBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Mercedes-Benz 814 (Box Truck)', disabled: false, type: 'Box Truck', year: 1990 },
    { name: 'Mercedes-Benz 1117 (Box Truck)', disabled: false, type: 'Box Truck', year: 1995 },
    { name: 'Mercedes-Benz Atego (Box Truck)', disabled: false, type: 'Box Truck', year: 2000 },
    { name: 'Mercedes-Benz Axor (Box Truck)', disabled: false, type: 'Box Truck', year: 2005 },
    { name: 'Mercedes-Benz Econic (Box Truck)', disabled: false, type: 'Box Truck', year: 2010 },
    { name: 'Mercedes-Benz Actros (Box Truck)', disabled: false, type: 'Box Truck', year: 2015 },
    { name: 'Mercedes-Benz Antos (Box Truck)', disabled: false, type: 'Box Truck', year: 2020 },
    { name: 'Mercedes-Benz eActros (Box Truck)', disabled: false, type: 'Box Truck', year: 2023 },
    { name: 'Mercedes-Benz Atego L (Box Truck)', disabled: false, type: 'Box Truck', year: 2025 }
];
const mitsubishiFusoBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Mitsubishi Fuso FE (Box Truck)', disabled: false, type: 'Box Truck', year: 1990 },
    { name: 'Mitsubishi Fuso FG (4WD Box Truck)', disabled: false, type: '4WD Box Truck', year: 1995 },
    { name: 'Mitsubishi Fuso FH (Box Truck)', disabled: false, type: 'Box Truck', year: 2000 },
    { name: 'Mitsubishi Fuso FK (Box Truck)', disabled: false, type: 'Box Truck', year: 2005 },
    { name: 'Mitsubishi Fuso FM (Box Truck)', disabled: false, type: 'Box Truck', year: 2010 },
    { name: 'Mitsubishi Fuso Canter (Box Truck)', disabled: false, type: 'Box Truck', year: 2015 },
    { name: 'Mitsubishi Fuso Canter Eco Hybrid (Box Truck)', disabled: false, type: 'Hybrid Box Truck', year: 2020 },
    { name: 'Mitsubishi Fuso eCanter (Electric Box Truck)', disabled: false, type: 'Electric Box Truck', year: 2023 },
    { name: 'Mitsubishi Fuso Canter Guts (Light Duty Box Truck)', disabled: false, type: 'Light Duty Box Truck', year: 2025 }
];
const nissanBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Nissan UD 1300 (Box Truck)', disabled: false, type: 'Box Truck', year: 1990 },
    { name: 'Nissan UD 1400 (Box Truck)', disabled: false, type: 'Box Truck', year: 1995 },
    { name: 'Nissan UD 1800CS (Box Truck)', disabled: false, type: 'Box Truck', year: 2000 },
    { name: 'Nissan UD 2000 (Box Truck)', disabled: false, type: 'Box Truck', year: 2005 },
    { name: 'Nissan UD 2300LP (Low Profile Box Truck)', disabled: false, type: 'Low Profile Box Truck', year: 2010 },
    { name: 'Nissan UD 2600 (Box Truck)', disabled: false, type: 'Box Truck', year: 2015 },
    { name: 'Nissan UD 3300 (Box Truck)', disabled: false, type: 'Box Truck', year: 2020 },
    { name: 'Nissan NV3500 HD (Box Truck)', disabled: false, type: 'Box Truck', year: 2023 },
    { name: 'Nissan NT500 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2025 }
];
const peterbiltBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Peterbilt 325 (Box Truck)', disabled: false, type: 'Box Truck', year: 1990 },
    { name: 'Peterbilt 330 (Box Truck)', disabled: false, type: 'Box Truck', year: 1995 },
    { name: 'Peterbilt 337 (Medium Duty Box Truck)', disabled: false, type: 'Medium Duty Box Truck', year: 2000 },
    { name: 'Peterbilt 348 (Box Truck)', disabled: false, type: 'Box Truck', year: 2005 },
    { name: 'Peterbilt 357 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2010 },
    { name: 'Peterbilt 365 (Box Truck)', disabled: false, type: 'Box Truck', year: 2015 },
    { name: 'Peterbilt 520 (Box Truck)', disabled: false, type: 'Box Truck', year: 2020 },
    { name: 'Peterbilt 567 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2023 },
    { name: 'Peterbilt 579 (Box Truck)', disabled: false, type: 'Box Truck', year: 2025 }
];
const ramBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'RAM 3500 (Box Truck)', disabled: false, type: 'Box Truck', year: 1994 },
    { name: 'RAM 4500 (Box Truck)', disabled: false, type: 'Box Truck', year: 2008 },
    { name: 'RAM 5500 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2011 },
    { name: 'RAM Promaster 1500 (Cargo Box Truck)', disabled: false, type: 'Cargo Box Truck', year: 2014 },
    { name: 'RAM Promaster 2500 (Cargo Box Truck)', disabled: false, type: 'Cargo Box Truck', year: 2015 },
    { name: 'RAM Promaster 3500 (Cargo Box Truck)', disabled: false, type: 'Cargo Box Truck', year: 2018 },
    { name: 'RAM Promaster City (Compact Box Truck)', disabled: false, type: 'Compact Box Truck', year: 2020 },
    { name: 'RAM 3500HD (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2023 },
    { name: 'RAM Promaster 3500HD (Cargo Box Truck)', disabled: false, type: 'Cargo Box Truck', year: 2025 }
];
const scaniaBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Scania P230 (Box Truck)', disabled: false, type: 'Box Truck', year: 1994 },
    { name: 'Scania P270 (Box Truck)', disabled: false, type: 'Box Truck', year: 1997 },
    { name: 'Scania P310 (Medium Duty Box Truck)', disabled: false, type: 'Medium Duty Box Truck', year: 2002 },
    { name: 'Scania P340 (Medium Duty Box Truck)', disabled: false, type: 'Medium Duty Box Truck', year: 2005 },
    { name: 'Scania P360 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2008 },
    { name: 'Scania R420 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2010 },
    { name: 'Scania R440 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2013 },
    { name: 'Scania R450 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2016 },
    { name: 'Scania G410 (Box Truck)', disabled: false, type: 'Box Truck', year: 2018 },
    { name: 'Scania G450 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2021 },
    { name: 'Scania L320 (Cargo Box Truck)', disabled: false, type: 'Cargo Box Truck', year: 2023 },
    { name: 'Scania R500 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2025 }
];
const volvoBoxTruckModels = [
    { name: 'Select Model', disabled: true, type: null },
    { name: 'Volvo FL6 (Box Truck)', disabled: false, type: 'Box Truck', year: 1990 },
    { name: 'Volvo FL7 (Box Truck)', disabled: false, type: 'Box Truck', year: 1993 },
    { name: 'Volvo FL10 (Box Truck)', disabled: false, type: 'Box Truck', year: 1997 },
    { name: 'Volvo FM7 (Medium Duty Box Truck)', disabled: false, type: 'Medium Duty Box Truck', year: 2000 },
    { name: 'Volvo FM9 (Medium Duty Box Truck)', disabled: false, type: 'Medium Duty Box Truck', year: 2004 },
    { name: 'Volvo FM12 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2007 },
    { name: 'Volvo FMX (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2010 },
    { name: 'Volvo FE (Medium Duty Box Truck)', disabled: false, type: 'Medium Duty Box Truck', year: 2013 },
    { name: 'Volvo FH16 (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2016 },
    { name: 'Volvo VHD (Heavy Duty Box Truck)', disabled: false, type: 'Heavy Duty Box Truck', year: 2019 },
    { name: 'Volvo FMX Electric (Box Truck)', disabled: false, type: 'Electric Box Truck', year: 2021 },
    { name: 'Volvo FE Electric (Medium Duty Box Truck)', disabled: false, type: 'Electric Box Truck', year: 2023 },
    { name: 'Volvo FH Electric (Heavy Duty Box Truck)', disabled: false, type: 'Electric Heavy Duty Box Truck', year: 2025 }
];

export { chevroletBoxTruckModels,
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
    volvoBoxTruckModels
};
