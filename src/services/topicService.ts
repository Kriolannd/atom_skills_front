import axios from "axios"

export const getAllTopics = () => {
    return axios.get("topics")
}

// export const getTask = (id: string) => {
//     console.log("tasks/" + id)
//     return axios.get("tasks/" + id)
// }