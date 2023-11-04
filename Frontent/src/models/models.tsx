export interface userModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number | string | null | undefined;
    place: string | null | undefined;
    age: number | null | undefined;
    address: string | null | undefined;
    profilePicture: string | null | undefined;
  }


export interface userInittalModel {
    user: userModel | null;
    success: boolean;
  }
  