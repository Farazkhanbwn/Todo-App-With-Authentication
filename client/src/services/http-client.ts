import { HttpRequestMethods } from "@/shared/types";

// const API_ENDPOINT = process.env?.NEXT_PUBLIC_MOCK_API;
const API_ENDPOINT = "http://localhost:4000";
const headerConfig = {
  "content-Type": "application/json",
};

class HttpClient {
  // Get Method
  static async get(resourcePath: string, headers?: Record<string, string>) {
    const request = await fetch(`${API_ENDPOINT}${resourcePath}`, {
      method: HttpRequestMethods.GET,
      headers: {
        ...headerConfig,
        ...headers,
      },
      credentials: "include",
    });
    const response = await request.json();
    return response;
  }
  // Post Method
  static async post(
    resourcePath: string,
    body: any,
    headers?: Record<string, string>
  ) {
    const request = await fetch(`${API_ENDPOINT}${resourcePath}`, {
      method: HttpRequestMethods.POST,
      headers: {
        ...headerConfig,
        ...headers,
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const response = await request.json();
    return response;
  }

  // PUT Method
  static async patch(
    resourcePath: string,
    body: any,
    headers?: Record<string, string>
  ) {
    const request = await fetch(`${API_ENDPOINT}${resourcePath}`, {
      method: HttpRequestMethods.PATCh,
      headers: {
        ...headerConfig,
        ...headers,
      },
      body: JSON.stringify(body),
    });
    const response = await request.json();
    return response;
  }

  // Delete Method
  static async delete(resourcePath: string, headers?: Record<string, string>) {
    const request = await fetch(`${API_ENDPOINT}${resourcePath}`, {
      method: HttpRequestMethods.DELETE,
      headers: {
        ...headerConfig,
        ...headers,
      },
      credentials: 'include'
    });
    const response = await request.json();
    return response;
  }
}

export default HttpClient;
