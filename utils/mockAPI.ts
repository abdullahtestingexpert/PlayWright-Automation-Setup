// mockApi.ts

type LoginRequest = {
  email: string;
  password: string;
};

type MockResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export async function mockLoginApi(request: LoginRequest): Promise<MockResponse> {
  const start = performance.now(); // Record start time

  // Simulate slight network delay
  await new Promise((resolve) => setTimeout(resolve, 80)); 

  const mockResponse: MockResponse = {
    token: 'mocked_jwt_token_123456',
    user: {
      id: 'user_123',
      name: 'Brandon Apple',
      email: request.email,
      role: 'admin',
    },
  };

  const end = performance.now(); // Record end time
  const elapsed = Math.round(end - start); // Calculate elapsed time

  console.log(`[Mock Login API] Responded in ${elapsed}ms`);

  return mockResponse;
}
