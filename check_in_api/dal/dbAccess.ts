import UserModel, { IUser } from "../models/userModel";

class CheckinDb {
  constructor() {}

  getCheckins(): Promise<[IUser]>{
    return new Promise<[IUser]>((resolve, reject) => {
      UserModel.find((err: Error, users: [IUser]) => {
        if(err) reject(err);

        resolve(users);
      })
    });
  }

  checkin(name: string): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      const user = new UserModel({
        name: name,
        checkIn: new Date()
      }).save((err: Error, user: IUser) => {
        if(err) reject(err);

        resolve(user);
      })
    });
  }

  //Returns checkin-time in seconds
  checkout(name: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      UserModel.findOneAndDelete({ name: name }, (err: Error, user: IUser) => {
        if(err) reject(err);

        if(user != null) {
          let timeDiff: any = new Date().getTime() - user.checkIn.getTime();
          resolve(Math.floor(timeDiff/1000));
        }
        else
          reject(new Error(`${name} not found`));
      })
    });
  }
}

export default CheckinDb;