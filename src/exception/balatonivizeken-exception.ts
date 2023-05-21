export class BalatoniVizekenException extends Error {
  constructor(mskey) {
    super();
    this.message = mskey;
  }
}
