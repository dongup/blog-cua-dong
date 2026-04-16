type ErrorPayload = {
  message?: string;
};

async function parseErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as ErrorPayload;
    if (payload?.message) {
      return payload.message;
    }
  } catch {
    // Ignore invalid JSON payloads.
  }

  return `Request failed with status ${response.status}`;
}

export async function requestJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as T;
}
