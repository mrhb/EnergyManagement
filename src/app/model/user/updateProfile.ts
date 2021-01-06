import {User} from '@app/model/user/user';

export class UpdateProfile {
  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.organizationalUnit = user.organizationalUnit;
    this.organizationalLevel = user.organizationalLevel;
    this.address = user.address;
    this.city = user.city;
    this.province = user.province;
  }

  firstName: string;
  lastName: string;
  phone: string;
  organizationalUnit: string;
  organizationalLevel: string;
  address: string;
  city: string;
  province: string;
}
