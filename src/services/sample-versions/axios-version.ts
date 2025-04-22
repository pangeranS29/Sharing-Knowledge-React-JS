import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export default class RequestHandler {
  private url: string;
  api: typeof api;

  constructor(url: string) {
    this.url = url;
    this.api = api;
  }

  get(params?: Record<string, unknown> | undefined) {
    return new Promise((resolve, reject) => {
      api
        .get(this.url, {
          ...params,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  find(param: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      api
        .get(`${this.url}/${param}`)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  store(body: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      api
        .post(this.url, body)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  update(id: string, body: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      api
        .put(`${this.url}/${id}`, body)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  delete(id: string) {
    return new Promise((resolve, reject) => {
      api
        .delete(`${this.url}/${id}`)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
