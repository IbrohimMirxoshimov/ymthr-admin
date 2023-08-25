import { readFile } from 'fs/promises';
import { resolve } from 'path';

export async function readStaticDate<T>(nameFile = 'data.json'): Promise<T> {
  return JSON.parse(
    (await readFile(resolve(__dirname, 'static/' + nameFile))).toString(),
  );
}

export declare module FacilityData {
  export interface FacilityGroupData {
    id: number;
    sort_order: number;
    status: number;
    icon_xl: string;
    icon_lg: string;
    icon_md: string;
    icon_sm: string;
    icon_xs: string;
    name: string;
  }

  export interface Amenitiy {
    id: number;
    native_facility_group_id: number;
    sort_order: number;
    status: number;
    popular: number;
    icon_xl: string;
    icon_lg: string;
    icon_md: string;
    icon_sm: string;
    icon_xs: string;
    booking_show_order: number;
    name: string;
  }
}

export declare module StaticData {
  export interface RoomType {
    id: number;
    name: string;
  }

  export interface RoomNameTemplate {
    id: number;
    name: string;
    room_type_id: number;
  }

  export interface Translation {
    id: number;
    bed_id: number;
    locale: string;
    name: string;
  }

  export interface Bed {
    id: number;
    sort_order: number;
    icon: string;
    status: number;
    name: string;
    translations: Translation[];
    icon_mobile?: any;
  }

  export interface Translation2 {
    id: number;
    service_id: number;
    locale: string;
    name: string;
  }

  export interface Facility {
    id: number;
    service_group_id: number;
    sort_order: number;
    status: number;
    icon: string;
    show_in_filter: number;
    popular: number;
    popular_order: number;
    mob_filter: number;
    mob_filter_order: number;
    mob_popular: number;
    mob_popular_order: number;
    icon_xl: string;
    icon_lg: string;
    icon_md: string;
    icon_sm: string;
    icon_xs: string;
    card_show_order: number;
    name: string;
    translations: Translation2[];
  }

  export interface PropertyType {
    id: number;
    name: string;
    description: string;
    image: string;
  }

  export interface City {
    id: number;
    name: string;
    image: string;
  }

  export interface Translation3 {
    id: number;
    lang_id: number;
    locale: string;
    name: string;
  }

  export interface Language {
    id: number;
    sort_order: number;
    status: number;
    name: string;
    translations: Translation3[];
  }

  export interface Data {
    room_types: RoomType[];
    room_name_templates: RoomNameTemplate[];
    beds: Bed[];
    services: Facility[];
    property_types: PropertyType[];
    cities: City[];
    languages: Language[];
  }
}
