export interface UserData {
     _id:string;
     name: string;
    email: string;
    phoneNumber: number | string | null | undefined;
    place: string | null | undefined;
    address: string | null | undefined;
    profilePicture: string | null | undefined;
    Wallet:number | null | undefined;
    status:boolean;
  }
  export interface RestaurentData {
    _id:string;
    restaurentName: string;
   email: string;
   phoneNumber: number | string | null | undefined;
   place: string | null | undefined;
   address: string | null | undefined;
   profilePicture: string | null | undefined;
   status:boolean;
 }
  export interface EmployeeData {
    _id:string;
    name: string;
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
      item:string;
  }
  
  export interface AdminSideTableFrameProps{
    heading :string | null;
    data:AdminSideRestaurentModel[]| null ;
    handleAction:(id:string,status:string,message:string)=>void;
    role: string;
    filterPagination: (val: number) => void;
    currentPage: number;
    size: number;
  }
  
  export interface profileEditModal {
    private _id(
      data: {
        name: string;
        email: string;
        phoneNumber: string | number;
      },
      _id: any
    ): unknown;
    name: string;

    email: string;
    phoneNumber: string | number | null | undefined;
   
  }

  export interface OrderData {
    userId: string | undefined;
    restaurantId: string;
    item: string;
    product: string;
    price: number;
    quantity: number;
    variant: String;
    employeeId: string;
    start_date: string;
    totalPrice: number;
    discount: number;
    grandTotal: number;
   
  }

 export interface CategoryModalProps {
    showModal: any;
    closeModal: any;
    categoryId: any;
    categoryToEdit: any;
    editMode: any;
  }