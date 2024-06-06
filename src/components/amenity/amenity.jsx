import "./amenity.scss";

import BuffetIcon from "../../assets/amenity/buffet.png";
import MountainViewIcon from "../../assets/amenity/mountain.png";
import EthernetViewIcon from "../../assets/amenity/ethernet.png";
import FireExtinguisherIcon from "../../assets/amenity/fire-extinguisher.png";
import LibraryIcon from "../../assets/amenity/library.png";
import FridgeIcon from "../../assets/amenity//refrigerator.png";
import PetIcon from "../../assets/amenity/pawprint.png";
import SwimmingPoolIcon from "../../assets/amenity/swimming-pool.png";
import WifiIcon from "../../assets/amenity/wifi.png";
import WasherIcon from "../../assets/amenity/washing-machine.png";
// import LuggageIcon from "../../assets/amenity/suitcase.png";
import CitySkylineViewIcon from "../../assets/amenity/city.png";
import CourtyardIcon from "../../assets/amenity/outdoor.png";
import CleaningProductIcon from "../../assets/amenity/basket.png";
import ShampooIcon from "../../assets/amenity/body-wash.png";
import DryerIcon from "../../assets/amenity/hairdryer.png";
import HangerIcon from "../../assets/amenity/clothes-hanger.png";
import BedLinesIcon from "../../assets/amenity/bed-sheets.png";
import IronIcon from "../../assets/amenity/iron.png";
import WardrobeIcon from "../../assets/amenity/wardrobe.png";
import ExerciseEquipmentIcon from "../../assets/amenity/pilates.png";
import AirConditioningIcon from "../../assets/amenity/air-conditioning.png";
import CeilingFanIcon from "../../assets/amenity/ceiling-fan.png";
import PortableFanIcon from "../../assets/amenity/electric-fan.png";
import SecurityCameraIcon from "../../assets/amenity/cctv-camera.png";
import FirstAddKitIcon from "../../assets/amenity/first-aid-kit.png";
import DedicatedWorkspaceIcon from "../../assets/amenity/workspace.png";
import KitchenIcon from "../../assets/amenity/kitchen.png";
import MicrowaveIcon from "../../assets/amenity/microwave-oven.png";
import StoveIcon from "../../assets/amenity/gas-stove.png";
import KettleIcon from "../../assets/amenity/electric-kettle.png";
import SmokingAllowedIcon from "../../assets/amenity/smoking.png";
import CleaningAvailableIcon from "../../assets/amenity/mop.png";
import ToasterIcon from "../../assets/amenity/toaster.png";
import BarbecueUtensilIcon from "../../assets/amenity/grill.png";
import EVChargerIcon from "../../assets/amenity/charging-station.png";
import ParkingIcon from "../../assets/amenity/electric-car.png";

import { useEffect, useState } from "react";
import {Image} from "react-bootstrap";

const amenities = [
   {
      name: "City skyline view",
      icon: CitySkylineViewIcon,
   },
   {
      name: "Courtyard view",
      icon: CourtyardIcon,
   },
   {
      name: "Mountain view",
      icon: MountainViewIcon,
   },
   {
      name: "Cleaning products",
      icon: CleaningProductIcon,
   },
   {
      name: "Shampoo",
      icon: ShampooIcon,
   },
   {
      name: "Washer",
      icon: WasherIcon,
   },
   {
      name: "Free dryer",
      icon: DryerIcon,
   },
   {
      name: "Hangers",
      icon: HangerIcon,
   },
   {
      name: "Bed linens",
      icon: BedLinesIcon,
   },
   {
      name: "Clothing storage",
      icon: WardrobeIcon,
   },
   {
      name: "Ethernet connection",
      icon: EthernetViewIcon,
   },
   {
      name: "Exercise equipment",
      icon: ExerciseEquipmentIcon,
   },
   {
      name: "Books and reading material",
      icon: LibraryIcon,
   },
   {
      name: "Clothing storage",
      icon: WardrobeIcon,
   },
   {
      name: "Air conditioning",
      icon: AirConditioningIcon,
   },
   {
      name: "Ceiling fan",
      icon: CeilingFanIcon,
   },
   {
      name: "Portable fans",
      icon: PortableFanIcon,
   },
   {
      name: "Exterior security cameras",
      icon: SecurityCameraIcon,
   },
   {
      name: "Fire extinguisher",
      icon: FireExtinguisherIcon,
   },
   {
      name: "First aid kit",
      icon: FirstAddKitIcon,
   },
   {
      name: "Wifi",
      icon: WifiIcon,
   },
   {
      name: "Dedicated workspace",
      icon: DedicatedWorkspaceIcon,
   },
   {
      name: "Kitchen",
      icon: KitchenIcon,
   },
   {
      name: "Refrigerator",
      icon: FridgeIcon,
   },
   {
      name: "Microwave",
      icon: MicrowaveIcon,
   },
   {
      name: "Stove",
      icon: StoveIcon,
   },
   {
      name: "Dedicated workspace",
      icon: DedicatedWorkspaceIcon,
   },
   {
      name: "Toaster",
      icon: ToasterIcon,
   },
   {
      name: "Free parking on premises",
      icon: ParkingIcon,
   },
   {
      name: "Barbecue utensils",
      icon: BarbecueUtensilIcon,
   },
   {
      name: "Shared pool",
      icon: SwimmingPoolIcon,
   },
   {
      name: "EV charger",
      icon: EVChargerIcon,
   },
   {
      name: "Pets allowed",
      icon: PetIcon,
   },
   {
      name: "Breakfast Buffet",
      icon: BuffetIcon,
   },
   {
      name: "Smoking allowed",
      icon: SmokingAllowedIcon,
   },
   {
      name: "Cleaning available during stay",
      icon: CleaningAvailableIcon,
   },
   {
      name: "Iron",
      icon: IronIcon,
   },
   {
      name: "Hot water kettle",
      icon: KettleIcon,
   },
];

const Amenity = ({ name }) => {
   const [amenity, setAmenity] = useState();

   useEffect(() => {
      setAmenity(amenities.find((amenity) => amenity.name === name));
   }, [name]);

   return (
      <div className="amenity d-flex align-items-center my-4">
         <Image src={amenity?.icon} width="28px" height="28px" />
         <p className="mb-0 ms-3">{amenity?.name}</p>
      </div>
   );
};

export default Amenity;
