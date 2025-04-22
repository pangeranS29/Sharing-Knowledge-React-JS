export default class RequestHandler {
  private url: string;
  private baseUrl: string;
  private headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  constructor(url: string) {
    this.url = url;
    this.baseUrl = import.meta.env.VITE_APP_API_URL;
  }

  private buildUrl(endpoint?: string, params?: Record<string, unknown>) {
    const url = new URL(
      `${this.baseUrl}/${this.url}${endpoint ? `/${endpoint}` : ""}`
    );
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  get(params?: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      fetch(this.buildUrl(undefined, params), {
        method: "GET",
        headers: this.headers,
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then(resolve)
        .catch(reject);
    });
  }

  find(param: string) {
    return new Promise((resolve, reject) => {
      fetch(this.buildUrl(param), {
        method: "GET",
        headers: this.headers,
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then(resolve)
        .catch(reject);
    });
  }

  store(body: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      fetch(this.buildUrl(), {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(body),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then(resolve)
        .catch(reject);
    });
  }

  update(id: string, body: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      fetch(this.buildUrl(id), {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(body),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then(resolve)
        .catch(reject);
    });
  }

  delete(id: string) {
    return new Promise((resolve, reject) => {
      fetch(this.buildUrl(id), {
        method: "DELETE",
        headers: this.headers,
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then(resolve)
        .catch(reject);
    });
  }
}
