import { HttpException } from './index';

export class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: String) {
    super(404, `${email} Email Already Exists`);
  }
}
 