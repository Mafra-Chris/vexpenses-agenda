export interface Contact {
  id?: number,
  name: string,
  address: Array<Address>
  phonenumbers: Array<{ phone: string }>
}

export interface Address {
  street: string,
  zipcode: string,
  district: string,
  city: string,
  state: string
}