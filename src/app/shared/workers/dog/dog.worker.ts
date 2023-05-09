/// <reference lib="webworker" />

import { environment } from "src/environments/environment";
import { DogApi } from "../../enums/dog-api.enum";

addEventListener('message', async ({ data }) => {
  if (data.type === DogApi.GetRandomDogImage) {
    try {
      const response = await fetch(environment.dogApiUrl);
      const json = await response.json();
      postMessage({ type: DogApi.GetRandomDogImageSuccess, payload: json.message });
    } catch (error) {
      postMessage({ type: DogApi.GetRandomDogImageError, payload: error });
    }
  }
});