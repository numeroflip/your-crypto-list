import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

type QueryParameter = { name: string; value: string }; // [parameter. value]

/**
 * Functions to help handle the query parameters
 */
export function useSetQueryParameter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getUpdatedQueryParameters = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setQueryParameter = useCallback(
    (name: string, value: string) => {
      router.push(pathname + "?" + getUpdatedQueryParameters(name, value));
    },
    [searchParams]
  );

  const setQueryParameters = useCallback(
    (parameters: QueryParameter[]) => {
      const params = new URLSearchParams(searchParams.toString());

      parameters.forEach(({ name, value }) => {
        params.set(name, value);
      });

      const newParams = params.toString();
      router.push(pathname + "?" + newParams);
    },

    [searchParams]
  );

  return { setQueryParameter, setQueryParameters, getUpdatedQueryParameters };
}
