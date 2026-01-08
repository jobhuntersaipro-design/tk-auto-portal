export type CarStatus = 'in-stock' | 'in-transit' | 'customs' | 'sold';

export type ImportStatus = 'shipped' | 'arrived-port' | 'customs-clearance' | 'ready';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  image: string;
  status: CarStatus;
  isImport: boolean;
  importStatus?: ImportStatus;
  cifPrice: number;
  customsDuty: number;
  refurbishmentCosts: number;
  sellingPrice: number;
  color: string;
  mileage: number;
  vin: string;
  dateAdded: string;
  documents?: string[];
}

export interface ActivityLogEntry {
  id: string;
  message: string;
  timestamp: string;
  type: 'customs' | 'sale' | 'arrival' | 'update';
  carId?: string;
}

export interface CarFormData {
  make: string;
  model: string;
  year: number | '';
  color: string;
  mileage: number | '';
  vin: string;
  isImport: boolean;
  importStatus: ImportStatus;
  cifPrice: number | '';
  customsDuty: number | '';
  refurbishmentCosts: number | '';
  sellingPrice: number | '';
  documents: string[];
}

export const DEFAULT_FORM_DATA: CarFormData = {
  make: '',
  model: '',
  year: '',
  color: '',
  mileage: '',
  vin: '',
  isImport: false,
  importStatus: 'shipped',
  cifPrice: '',
  customsDuty: '',
  refurbishmentCosts: '',
  sellingPrice: '',
  documents: [],
};
