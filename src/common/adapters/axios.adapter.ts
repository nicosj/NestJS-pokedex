import {HttpAdapterInterface} from "../interfaces/http-adapter.interface";
import axios, {AxiosInstance} from "axios";
import {Injectable} from "@nestjs/common";
@Injectable()
export class AxiosAdapter implements HttpAdapterInterface {
    private readonly axios: AxiosInstance = axios;
   async get<T>(url: string): Promise<T> {
        try{
            const {data}=await this.axios.get<T>(url);
            return data;
        }
        catch (e){
            throw new Error('This is an error');
        }
    }

}