import axios from "axios"

export const getAllTasks = () => {
    return axios.get("tasks")
}

export const getTask = (id: string) => {
    console.log("tasks/" + id)
    return axios.get("tasks/" + id)
}