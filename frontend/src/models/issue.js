export default class Issue {
  constructor(name, surname, idNumber, email, address,
    description, status, teamId) {
    this.name = name;
    this.surname = surname;
    this.idNumber = idNumber;
    this.email = email;
    this.address = address;
    this.description = description;
    this.status = status;
    this.teamId = teamId;
  }
}