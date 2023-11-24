export type TfullName = {
  firstName: string;
  lastName: string;
};

export type Tadress = {
  street: string;
  city: string;
  country: string;
};

export type Torder = {
  productName: string;
  price: number;
  quantity: number;
};

export type Tuser = {
  userId: number;
  username: string;
  password: string;
  fullName: TfullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Tadress;
  orders: Torder[];
};