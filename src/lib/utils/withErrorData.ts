type AsyncResponse<T> =
  | { data: T; isError: false; error?: never }
  | { isError: true; data?: never; error: unknown };

/**
 * Wraps a promise to return the trown error as a value or the success value.
 * It's a convinience method to avoud try-catch-ing
 */
export async function withErrorData<T>(
  promise: Promise<T>
): Promise<AsyncResponse<T>> {
  const [response] = await Promise.allSettled([promise]);
  if (response.status === "rejected") {
    return {
      isError: true,
      error: response.reason,
    };
  }

  return { isError: false, data: response.value }; // Success Tuple
}
