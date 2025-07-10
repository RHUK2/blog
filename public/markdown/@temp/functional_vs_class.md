```ts
type RequestInterceptor = (
  config: RequestInit & { url: string },
) => (RequestInit & { url: string }) | Promise<RequestInit & { url: string }>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;
type ErrorInterceptor = (error: Error | unknown) => void | Promise<void>;

interface ServerHttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

class CustomFetch {
  private baseURL: string;
  private defaultConfig: RequestInit;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(config: ServerHttpClientConfig = {}) {
    this.baseURL =
      config.baseURL ||
      (process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_URL || ''
        : process.env.NEXT_PUBLIC_TEST_API_URL || '');

    this.defaultConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      ...config,
    };
  }

  // Request 인터셉터 추가
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
    return this;
  }

  // Response 인터셉터 추가
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
    return this;
  }

  // Error 인터셉터 추가
  addErrorInterceptor(interceptor: ErrorInterceptor) {
    this.errorInterceptors.push(interceptor);
    return this;
  }

  // URL 생성 헬퍼
  private createUrl(input: string | URL | globalThis.Request): string {
    if (typeof input === 'string') {
      return input.startsWith('http') ? input : `${this.baseURL}${input}`;
    }
    if (input instanceof URL) {
      return input.href;
    }
    return input.url;
  }

  // Request 인터셉터 실행
  private async executeRequestInterceptors(config: RequestInit & { url: string }) {
    let currentConfig = config;

    for (const interceptor of this.requestInterceptors) {
      try {
        currentConfig = await interceptor(currentConfig);
      } catch (error) {
        await this.executeErrorInterceptors(error);
        throw error;
      }
    }

    return currentConfig;
  }

  // Response 인터셉터 실행
  private async executeResponseInterceptors(response: Response) {
    let currentResponse = response;

    for (const interceptor of this.responseInterceptors) {
      try {
        currentResponse = await interceptor(currentResponse);
      } catch (error) {
        await this.executeErrorInterceptors(error);
        throw error;
      }
    }

    return currentResponse;
  }

  // Error 인터셉터 실행
  private async executeErrorInterceptors(error: Error | unknown) {
    for (const interceptor of this.errorInterceptors) {
      try {
        await interceptor(error);
      } catch (interceptorError) {
        console.error('Error in error interceptor:', interceptorError);
      }
    }
  }

  // 메인 fetch 메서드
  async fetch(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response> {
    try {
      const url = this.createUrl(input);

      // Request config 준비
      const config = {
        ...this.defaultConfig,
        ...init,
        url,
        headers: {
          ...this.defaultConfig.headers,
          ...init?.headers,
        },
      };

      // Request 인터셉터 실행
      const interceptedConfig = await this.executeRequestInterceptors(config);

      // url을 분리하여 fetch 호출
      const { url: requestUrl, ...fetchConfig } = interceptedConfig;

      // 실제 fetch 요청
      const response = await fetch(requestUrl, fetchConfig);

      // Response 인터셉터 실행
      return await this.executeResponseInterceptors(response);
    } catch (error) {
      await this.executeErrorInterceptors(error);
      throw error;
    }
  }

  // HTTP 메서드 헬퍼들
  get(url: string, config?: RequestInit) {
    return this.fetch(url, { ...config, method: 'GET' });
  }

  post(url: string, data?: unknown, config?: RequestInit) {
    return this.fetch(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put(url: string, data?: unknown, config?: RequestInit) {
    return this.fetch(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  patch(url: string, data?: unknown, config?: RequestInit) {
    return this.fetch(url, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete(url: string, config?: RequestInit) {
    return this.fetch(url, { ...config, method: 'DELETE' });
  }
}

// 기본 인스턴스 생성
const serverHttpClient = new CustomFetch();

// 인터셉터 설정 예시
serverHttpClient
  .addRequestInterceptor((config) => {
    // 요청 로깅
    console.log(`API Request: ${config.method?.toUpperCase() || 'GET'} ${config.url}`);
    return config;
  })
  .addResponseInterceptor((response) => {
    // 응답 로깅
    console.log(`API Response: ${response.status} ${response.url}`);
    return response;
  })
  .addErrorInterceptor((error) => {
    // 에러 로깅
    console.error('API Error:', error);
  });

export { serverHttpClient, CustomFetch };
```

```ts
type RequestInterceptor = (
  config: RequestInit & { url: string },
) => (RequestInit & { url: string }) | Promise<RequestInit & { url: string }>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;
type ErrorInterceptor = (error: Error | unknown) => void | Promise<void>;

// 함수형 API 클라이언트
interface ServerHttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
  errorInterceptors?: ErrorInterceptor[];
}

function createServerHttpClient(config: ServerHttpClientConfig = {}) {
  const baseURL =
    config.baseURL ||
    (process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL || ''
      : process.env.NEXT_PUBLIC_TEST_API_URL || '');

  const defaultConfig: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    ...config,
  };

  const requestInterceptors: RequestInterceptor[] = config.requestInterceptors || [];
  const responseInterceptors: ResponseInterceptor[] = config.responseInterceptors || [];
  const errorInterceptors: ErrorInterceptor[] = config.errorInterceptors || [];

  // URL 생성 헬퍼
  const createUrl = (input: string | URL | globalThis.Request): string => {
    if (typeof input === 'string') {
      return input.startsWith('http') ? input : `${baseURL}${input}`;
    }
    if (input instanceof URL) {
      return input.href;
    }
    return input.url;
  };

  // Request 인터셉터 실행
  const executeRequestInterceptors = async (config: RequestInit & { url: string }) => {
    let currentConfig = config;

    for (const interceptor of requestInterceptors) {
      try {
        currentConfig = await interceptor(currentConfig);
      } catch (error) {
        await executeErrorInterceptors(error);
        throw error;
      }
    }

    return currentConfig;
  };

  // Response 인터셉터 실행
  const executeResponseInterceptors = async (response: Response) => {
    let currentResponse = response;

    for (const interceptor of responseInterceptors) {
      try {
        currentResponse = await interceptor(currentResponse);
      } catch (error) {
        await executeErrorInterceptors(error);
        throw error;
      }
    }

    return currentResponse;
  };

  // Error 인터셉터 실행
  const executeErrorInterceptors = async (error: Error | unknown) => {
    for (const interceptor of errorInterceptors) {
      try {
        await interceptor(error);
      } catch (interceptorError) {
        console.error('Error in error interceptor:', interceptorError);
      }
    }
  };

  // 메인 fetch 메서드
  const apiFetch = async (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response> => {
    try {
      const url = createUrl(input);

      // Request config 준비
      const config = {
        ...defaultConfig,
        ...init,
        url,
        headers: {
          ...defaultConfig.headers,
          ...init?.headers,
        },
      };

      // Request 인터셉터 실행
      const interceptedConfig = await executeRequestInterceptors(config);

      // url을 분리하여 fetch 호출
      const { url: requestUrl, ...fetchConfig } = interceptedConfig;

      // 실제 fetch 요청
      const response = await fetch(requestUrl, fetchConfig);

      // Response 인터셉터 실행
      return await executeResponseInterceptors(response);
    } catch (error) {
      await executeErrorInterceptors(error);
      throw error;
    }
  };

  // 인터셉터 추가 함수들
  const addRequestInterceptor = (interceptor: RequestInterceptor) => {
    requestInterceptors.push(interceptor);
  };

  const addResponseInterceptor = (interceptor: ResponseInterceptor) => {
    responseInterceptors.push(interceptor);
  };

  const addErrorInterceptor = (interceptor: ErrorInterceptor) => {
    errorInterceptors.push(interceptor);
  };

  // HTTP 메서드 헬퍼들
  const get = (url: string, config?: RequestInit) => {
    return apiFetch(url, { ...config, method: 'GET' });
  };

  const post = (url: string, data?: unknown, config?: RequestInit) => {
    return apiFetch(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  const put = (url: string, data?: unknown, config?: RequestInit) => {
    return apiFetch(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  const patch = (url: string, data?: unknown, config?: RequestInit) => {
    return apiFetch(url, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  const remove = (url: string, config?: RequestInit) => {
    return apiFetch(url, { ...config, method: 'DELETE' });
  };

  return {
    fetch: apiFetch,
    get,
    post,
    put,
    patch,
    delete: remove,
    addRequestInterceptor,
    addResponseInterceptor,
    addErrorInterceptor,
  };
}

// 기본 함수형 인스턴스 생성
const serverHttpClient = createServerHttpClient();

// 인터셉터 설정
serverHttpClient.addRequestInterceptor((config) => {
  console.log(`API Request: ${config.method?.toUpperCase() || 'GET'} ${config.url}`);
  return config;
});

serverHttpClient.addResponseInterceptor((response) => {
  console.log(`API Response: ${response.status} ${response.url}`);
  return response;
});

serverHttpClient.addErrorInterceptor((error) => {
  console.error('API Error:', error);
});

export { serverHttpClient, createServerHttpClient };
```
