import {
  FaBriefcase,
  FaHardHat,
  FaTruck,
  FaSeedling,
  FaRunning,
  FaSchool,
  FaStore,
} from "react-icons/fa";

/**
 * Occupation values sent to API
 */
export type OccupationType =
  | "Farmer"
  | "OfficeWorker"
  | "DeliveryExecutive"
  | "ConstructionWorker"
  | "OutdoorVendor"
  | "Tourist"
  | "Athlete"
  | "SchoolStudent";

/**
 * Runtime occupation metadata (NO ENUMS)
 */
export const Occupations = {
  Farmer: {
    value: "Farmer" as OccupationType,
    label: "Farmer",
    icon: FaSeedling,
  },
  OfficeWorker: {
    value: "OfficeWorker" as OccupationType,
    label: "Office Worker",
    icon: FaBriefcase,
  },
  DeliveryExecutive: {
    value: "DeliveryExecutive" as OccupationType,
    label: "Delivery Executive",
    icon: FaTruck,
  },
  ConstructionWorker: {
    value: "ConstructionWorker" as OccupationType,
    label: "Construction Worker",
    icon: FaHardHat,
  },
  OutdoorVendor: {
    value: "OutdoorVendor" as OccupationType,
    label: "Outdoor Vendor",
    icon: FaStore,
  },
  Tourist: {
    value: "Tourist" as OccupationType,
    label: "Tourist",
    icon: FaRunning,
  },
  Athlete: {
    value: "Athlete" as OccupationType,
    label: "Athlete",
    icon: FaRunning,
  },
  SchoolStudent: {
    value: "SchoolStudent" as OccupationType,
    label: "School Student",
    icon: FaSchool,
  },
} as const;

/**
 * Helper array for dropdowns
 */
export const OccupationList = Object.values(Occupations);
