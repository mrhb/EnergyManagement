export class Profile {
  _id: string;
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
  id:string;
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
 

export class UserList {
  id: string;
  firstName: string;  // نام
  lastName: string;  //  نام خانوادگی
  organizationalUnit: string;  // واحد سازمانی
  organizationalLevel: string;  // رتبه سازمانی
  newPass: string;  // رمز جدید
}
                 