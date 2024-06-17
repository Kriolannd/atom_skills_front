import axios from "axios";
import saveAs from "file-saver";

enum SomeEnum {
    FIRST = 'FIRST',
    SECOND = 'SECOND'
}

type EntitiesPageRequest = {
    page: number,
    size: number,
    textQuery: string,
    fromNumber: number,
    toNumber: number,
    fromDate: Date,
    toDate: Date,
    enums: SomeEnum[]
}

type SomeEntity = {
    id: number,
    text: string,
    number: number,
    date: Date,
    someEnum: SomeEnum,
    file: string
}

export const getPage = (request: EntitiesPageRequest) => {
    return axios.get("entities/pages", {
        params: {
            ...request
        }
    })
}

export const getEntity = (id: number) => {
    return axios.get("entities/" + id)
}
// await getEntity(402) ->
// {
//     "data": {
//         "id": 402,
//         "text": "test form",
//         "number": 123,
//         "date": "2024-06-08T14:23:01.467",
//         "someEnum": "FIRST",
//         "file": "response.txt"
//     },
//     ...
// }

export const getAll = () => {
    return axios.get("entities")
}
// await getAll() ->
// {
//     "data": [
//         {
//             "id": 1,
//             "text": "qwe",
//             "number": 123,
//             "date": "2024-01-01T00:00:00",
//             "someEnum": "FIRST",
//             "file": null
//         },
//         {
//             "id": 2,
//             "text": "rty",
//             "number": 456,
//             "date": "2024-01-02T00:00:00",
//             "someEnum": "SECOND",
//             "file": null
//         },
//         {
//             "id": 52,
//             "text": "test",
//             "number": 1111,
//             "date": "2024-01-01T00:00:00",
//             "someEnum": null,
//             "file": "Result_19_05_2024_test.pdf"
//         },
//         ...
//     ],
//     ...
// }

export const saveEntity = (entity: SomeEntity) => {
    return axios.post("entities", entity)
}
// await saveEntity({text:"some text",number:123,date:new Date()}) ->
// {
//     "data": {
//         "id": 353,
//         "text": "some text",
//         "number": 123,
//         "date": "2024-06-08T13:49:27.57",
//         "someEnum": null,
//         "file": null
//     },
//     ...
// }

export const saveEntityForm = (data: {
    text: string,
    number: number,
    date: Date,
    someEnum: SomeEnum,
    file: File
}) => {
    let formData = new FormData();

    console.log(data.file);
    
    formData.append("text", data.text);
    formData.append("number", data.number.toString());
    formData.append("date", data.date.toISOString());
    formData.append("enum", data.someEnum);
    formData.append("file", data.file);

    return axios.post("entities/form", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
}
// await saveEntityForm("test form", 123, new Date(), SomeEnum.FIRST, file) ->
// {
//     "data": {
//         "id": 402,
//         "text": "test form",
//         "number": 123,
//         "date": "2024-06-08T14:23:01.467",
//         "someEnum": "FIRST",
//         "file": "response.txt"
//     },
//     ...
// }

export const editEntity = (id: number, entity: SomeEntity) => {
    return axios.put(`entities/${id}`, entity)
}

export const deleteEntity = (id: number) => {
    return axios.delete(`entities/${id}`)
}
// await deleteEntity(402) ->
// {
//     "data": "",
//     "status": 204,
//     ...
// }

export const getEntityFile = (id: number) => {
    axios.get(`entities/${id}/file`).then(response => {
        const filename = response.headers['content-disposition'].slice(22, -1);
        saveAs(new Blob([response.data], { type: 'application/octet-stream' }), filename);
    })
}