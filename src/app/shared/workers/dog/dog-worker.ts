import { DogApi } from "../../enums/dog-api.enum";

export class DogWorker {
    private worker: Worker;
  
    constructor() {
      this.worker = new Worker(new URL('./dog.worker', import.meta.url));
    }
  
    public getRandomDogImage(): Promise<string> {
      return new Promise((resolve, reject) => {
        this.worker.postMessage({ type: DogApi.GetRandomDogImage });
        this.worker.addEventListener('message', ({ data }) => {
          switch (data.type) {
            case DogApi.GetRandomDogImageSuccess:
              resolve(data.payload);
              break;
            case DogApi.GetRandomDogImageError:
              reject(data.payload);
              break;
          }
        });
      });
    }
  }