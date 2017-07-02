export default class User {
  private id: string;
  private email: string;
  public name: string;

  constructor({id, email, name}) {
    this.id = id
    this.email = email
    this.name = name
  }
}