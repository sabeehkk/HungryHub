export interface userModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number | string | null | undefined;
    place: string | null | undefined;
    address: string | null | undefined;
    profilePicture: string | null | undefined;
  }


export interface userInittalModel {
    user: userModel | null;
    success: boolean;
  }

  export interface AdminSideRestaurentModel {
      firstName : string;
      lastName : string;
      email:string ;
      phoneNumber : number| string 
      place:string|null | undefined ;
      address :string |null |undefined ;
      profilePicture : string | null | undefined ;
  }
  

  export interface AdminSideTableFrameProps{
    heading :string | null;
    data:restaurentModel[]| null ;
    handleAction:(id:string,status:string,message:string)=>void;
    role:string;
  }
