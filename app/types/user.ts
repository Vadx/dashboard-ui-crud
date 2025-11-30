export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
  role: string;
  company: {
    name: string;
    title: string;
  };
}
