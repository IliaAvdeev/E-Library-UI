export class Author {
  constructor(
    public id: number,
    public name: string,
    public dateOfBirth: Date,
    public countryOfBirth: string,
    public dateOfDeath?: Date,
    public countryOfDeath?: string,
    public biography?: string
  ) { }
}
