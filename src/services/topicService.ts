import axios from "axios"

export const getAllTopics = () => {
    return axios.get("topics")
}

export const getTopic = (id: number) => {
    return axios.get("topics/" + id)
}