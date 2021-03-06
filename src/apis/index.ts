import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {IOrder, IMember, IHelperOrder} from '../types'

// API 원형
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(instance: AxiosInstance) {
    this.instance = instance;

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  protected _handleRequest(config:AxiosRequestConfig) : AxiosRequestConfig {
    return config;
  }

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    return axiosResponse;
  }

  protected _handleError(error: AxiosError) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      alert('요청을 처리하는 중에 오류가 발생하였습니다.');
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      alert('서버 또는 네트워크의 상태가 좋지 않습니다.');
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  };
  public postByForm<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const params = new URLSearchParams();

    for ( let key in data ) {
      params.append(key, data[key]);
    }

    config =  {} as AxiosRequestConfig;

    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    };

    return this.instance.post(url, params, config);
  }
  public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(url, data, config);
  }
  public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config);
  }
}

// 응답타입1
interface Base__IResponseBodyType1 {
  resultCode:string;
  msg:string;
  fail:boolean;
  success:boolean;
}

// /usr/order/list, /usr/caleandar/list 의 응답 타입
export interface MainApi__order_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    orders: IOrder[]
  };
}
export interface MainApi__helperOrder_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    helperOrders: IHelperOrder[]
  };
}
// /usr/order/detail 의 응답 타입
export interface MainApi__order_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    order: IOrder
  };
}

export interface MainApi__helper_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    helperOrder: IHelperOrder
  };
}

export interface MainApi__article_doWrite__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

export interface MainApi__member_authKey__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    authKey: string,
    member: IMember,
  };
}

export interface MainApi__member_doExpertJoin__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number,
  };
}
export interface MainApi__member_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    member: IMember
  };
}
export interface MainApi__common_genFile_doUpload__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    genFileIdsStr: string,
  };
}
export interface MainApi__article_accept__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

// http://localhost:8021/usr/ 와의 통신장치
export class MainApi extends HttpClient {
  public constructor() {
    super(
      axios.create({
        baseURL:'http://localhost:8021/',
      })
    );
  }

  protected _handleRequest(config:AxiosRequestConfig) {
    config.params = {};
    config.params.authKey = localStorage.getItem("authKey");
    return config;
  };

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    if ( ["F-A", "F-B"].includes(axiosResponse?.data?.resultCode) ) {
      alert('로그인 후 이용해주세요.');
      location.replace('/member/login');
      localStorage.removeItem("authKey");
      localStorage.removeItem("loginedMemberId");
      localStorage.removeItem("loginedMemberName");
      localStorage.removeItem("loginedMemberNickname");
      localStorage.removeItem("loginedMemberProfileImgUrl");
    }

    return axiosResponse;
  }

  // http://localhost:8021/usr/article/list?directorId=? 를 요청하고 응답을 받아오는 함수 요청 리스트
  public order_list(loginedMemberId: number) {
    return this.get<MainApi__order_list__IResponseBody>(`/usr/order/list?directorId=${loginedMemberId}`);
  }
  // 일정 리스트 가져오기
  public caleandar_list(loginedMemberId: number) {
    return this.get<MainApi__order_list__IResponseBody>(`/usr/caleandar/list?directorId=${loginedMemberId}`);
  }

  // http://localhost:8021/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수  일정, 요청 통합 사용
  public order_detail(id: number) {
    return this.get<MainApi__order_detail__IResponseBody>(`/usr/order/detail?id=${id}`);  
  }
  public helper_detail(id: number) {
    return this.get<MainApi__helper_detail__IResponseBody>(`/usr/order/helperDetail?id=${id}`);  
  }

  public helperOrders(id: number) {
    return this.get<MainApi__helperOrder_list__IResponseBody>(`/usr/helperOrder/list?id=${id}`);  
  }
  
  public article_doWrite(boardId:number, title: string, body: string) {
    return this.postByForm<MainApi__article_doWrite__IResponseBody>(
      `/article/doAdd`, {
        boardId,
        title,
        body
      }
    );
  }
  public member_authKey(loginId:string, loginPw:string) {
    return this.postByForm<MainApi__member_authKey__IResponseBody>(
      `/usr/member/authKey`,
      {
        loginId,
        loginPw
      }
    );
  }
  public member_doExpertJoin(loginId:string, loginPw:string, name:string, cellphoneNo:string, email:string, genFileIdsStr:string, sido:string, license:string, career:string, relId:number) {
    return this.postByForm<MainApi__member_doExpertJoin__IResponseBody>(
      `/usr/member/doExpertJoin`, {
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        genFileIdsStr,
        sido,
        license,
        career,
        relId
      }
    );
  }  

  
  public member_detail(id:number) {
    return this.get<MainApi__member_detail__IResponseBody>(`/usr/member/detail?id=${id}`);
  }  


  public common_genFile_doUpload(profileImg:File) {
    const formDate = new FormData();
    formDate.append("file__member__0__common__attachment__1", profileImg);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }
  //요청 수락 
  public accept(id:number){
    return this.get<MainApi__member_doExpertJoin__IResponseBody>(`/usr/order/accept?id=${id}`);     
  } 
  
  public acceptHelperOrder(id:number){
    return this.get<MainApi__member_doExpertJoin__IResponseBody>(`/usr/helperOrder/accept?id=${id}`);     
  } 
  


  public member_doHelperJoin(loginId:string, loginPw:string, name:string, cellphoneNo:string, email:string, genFileIdsStr:string, sido:string, career:string) {
    return this.postByForm<MainApi__member_doExpertJoin__IResponseBody>(
      `/usr/member/doHelperJoin`, {
        loginId,
        loginPw,
        name,        
        cellphoneNo,
        email,
        genFileIdsStr,
        sido,        
        career,
      }
    );
  }  

} 