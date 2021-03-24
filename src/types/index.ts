  export interface IEntity {
    id:number;
    regDate:string;
    updateDate:string;
  }
  
  export interface IOrder extends IEntity {      
    clientId:number;
    term:string;
    funeralHome:string;
    title:string;
    body:string;
    updateDate:string;
    extra__writer:string;
    extra__cellphoneNo:string;
  }
  
  export interface IMember extends IEntity {  
    loginId:string;
    authLevel:number;
    name:string;
    nickname:string;
    cellphoneNo:string;
    email:string;
    sido:string;
		certificate:string;
		career:string;
    extra__thumbImg:string;
  }