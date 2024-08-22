export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: string;
  phone: string;
  address: string;
  joiningDate: string;
  relevingDate: string;
  dob: string;
  aadharNo: string;
  gender: string;
  department: number;

  constructor(user: any) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.active = user.active;
    this.phone = user.phone;
    this.address = user.address;
    this.joiningDate = user.joiningDate;
    this.relevingDate = user.relevingDate;
    this.dob = user.dob;
    this.aadharNo = user.aadharNo;
    this.gender = user.gender;
    this.department = user.department;
  }
}
