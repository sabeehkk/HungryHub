export interface UserData {
     _id:string;
     name: string;
    lastName: string;
    email: string;
    phoneNumber: number | string | null | undefined;
    place: string | null | undefined;
    address: string | null | undefined;
    profilePicture: string | null | undefined;
    status:boolean;
  }


export interface userInittalModel {
    user: UserData | null;
    success: boolean;
  }

  export interface AdminSideRestaurentModel {
    _id:string;
      name : string;
      email:string ;
      phoneNumber : number| string 
      place:string|null | undefined ;
      address :string |null |undefined ;
      profilePicture : string | null | undefined ;
      status:boolean
  }
  

  export interface AdminSideTableFrameProps{
    heading :string | null;
    data:AdminSideRestaurentModel[]| null ;
    handleAction:(id:string,status:string,message:string)=>void;
    role:string;
  }
