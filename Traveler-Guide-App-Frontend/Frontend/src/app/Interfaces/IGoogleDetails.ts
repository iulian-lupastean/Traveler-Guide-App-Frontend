import { IAddressComponents } from './IAddressComponents';
export interface IGoogleDetails {
  result: {
    name: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: any;
        lng: any;
      };
    };
    address_components: Array<IAddressComponents>;
  };
}
