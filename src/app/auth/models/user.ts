export class NbUser {

  constructor(public id?: number,
              public email?: string,
              public password?: string,
              public rememberMe?: boolean,
              public terms?: boolean,
              public confirmPassword?: string,
              public fullName?: string) {
  }
}

export interface Dictionary<T> {
  [key: string]: T;
}
