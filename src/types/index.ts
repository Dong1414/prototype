  export interface IEntity {
    id:number;
    regDate:string;
    updateDate:string;
  }
  
  export interface IArticle extends IEntity {  
    boardId:number;
    memberId:number;
    title:string;
    body:string;
    extra__writer:string;
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