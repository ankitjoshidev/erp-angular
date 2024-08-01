export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  registered: boolean;
  active: string;

  constructor(user: any) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.registered = user.registered;
    this.active = user.active;
  }
}
