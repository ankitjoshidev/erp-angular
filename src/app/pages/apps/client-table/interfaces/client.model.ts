export class Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: string
  constructor(user: any) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.active = user.active;
  }
}
