export type Location = {
  latitude: number;
  longitude: number;
};

export type SearchedAddressByKeyword = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

export type SearchedAddressByLocation = {
  address: {
    b_code: string;
    h_code: string;
    x: string;
    y: string;
  } & Address;
  address_name: string;
  address_type: string;
  road_address: {
    x: string;
    y: string;
    zone_no: string;
  } & RoadAddress;
  x: string;
  y: string;
};

export type Address = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
};

export type RoadAddress = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
};

export type SelectedMyAddress = {
  uuid: string;
  name: string;
  address: string;
  address_type: string;
  latitude: number;
  longitude: number;
  is_main?: boolean;
};
