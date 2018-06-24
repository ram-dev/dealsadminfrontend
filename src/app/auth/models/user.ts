export class NbUser {

  constructor(public id?: number,
              public username?: string,
              public password?: string,
              public rememberMe?: boolean,
              public terms?: boolean,
              public confirmpassword?: string,
              public firstName?: string,
              public lastName?: string,
              public companyname?: string,
              public categoryId?: string,
              public contactNumber?: number) {
  }
}
