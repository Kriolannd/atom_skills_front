import axios from "axios"

export const getAllTasks = () => {
    return axios.get("tasks")
}

export const getTask = (id: string) => {
    // console.log("tasks/" + id)
    return axios.get("tasks/" + id)
}

export const getTaskStatus = (id: string) => {
    // console.log("tasks/" + id)
    return axios.get(`tasks/${id}/status`)
}

export const submitAnswer = (data: {
    id: string,
    files: File[],
    comments: string[]
}) => {
    let formData = new FormData();
    
    for (let file of data.files) {
        formData.append("files", file);
    }
    formData.append("comments", data.comments.join(","));

    return axios.post(`tasks/${data.id}/submit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
}

export const startTask = (id: string) => {
    return axios.post(`tasks/${id}/start`)
}
