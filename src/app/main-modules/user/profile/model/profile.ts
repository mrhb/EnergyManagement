export class Profile {
  firstName: string;
  lastName: string;
  phone: string;
  organizationalUnit: string;
  organizationalLevel: string;
  address: string;
  city: string;
  province: string;
  photo: string;
}

export  class Password {
  password: string;
  passwordConfirm: string;
}


export  enum OrganizationalLevelEnum {
  DEPUTY = <any> 'معاون' ,
  MANAGER = <any> 'مدیر',
  MASTER = <any> 'کارشناس ارشد',
  EXPERT = <any> 'کارشناس',
  OPERATOR = <any> 'اپراتور',
}
 