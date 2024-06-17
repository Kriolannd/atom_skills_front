import {useRouter, type Router} from "vue-router";


export const redirect = (path: string): void => {
    try {
        const router: Router = useRouter();
        console.log(router);
        router.push({ name: path }); 
    } catch (error) {
        console.error(error);
    }
}