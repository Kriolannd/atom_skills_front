import axios from "axios"

export const getAllLessons = () => {
    return axios.get("lessons")
}

export const getLesson = (id: string) => {
    console.log("lessons/" + id)
    return axios.get("lessons/" + id)
}
