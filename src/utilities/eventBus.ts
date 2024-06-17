import { reactive } from 'vue';


interface Listener {
    event: string;
    callback: (payload: any) => void;
}

const eventBus = reactive({
    listeners: [] as Listener[],
    emit(event: string, payload: any) {
      this.listeners.forEach(listener => {
        if (listener.event === event) {
          listener.callback(payload);
        }
      });
    },
    on(event: string, callback: (payload: any) => void) {
      this.listeners.push({ event, callback });
    },
    off(event: string, callback: (payload: any) => void) {
      this.listeners = this.listeners.filter(listener => 
        listener.event !== event || listener.callback !== callback);
    }
});
  
export default eventBus;
