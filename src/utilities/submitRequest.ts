import axios, {type AxiosResponse} from "axios";

export const submitRequest = (
    method: string,
    url: string,
    data: any, 
    onResponse: (response: AxiosResponse) => any,
    onError: (error: any) => any
): void => {
    axios({
        method: method,
        url: url,
        data: data,
        headers: {"Content-Type": "application/json"},
    }).then(onResponse).catch(onError);
}