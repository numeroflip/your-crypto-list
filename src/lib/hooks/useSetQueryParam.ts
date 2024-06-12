import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

type QueryParameter = { name: string; value: string }; // [parameter. value]

/**
 * Functions to help handle the query parameters
 */
export function useSetQueryParameter() {
  const router = useRouter();
  const pathname = usePathname();

  const getUpdatedQueryParameters = useCallback(
    (name: string, value: string) => {
      const params = new URL(window.location.href).searchParams;
      params.set(name, value);

      return params.toString();
    },
    []
  );

  const setQueryParameter = useCallback(
    (name: string, value: string) => {
      router.push(pathname + "?" + getUpdatedQueryParameters(name, value));
    },
    [router, pathname, getUpdatedQueryParameters]
  );

  const setQueryParameters = useCallback(
    (parameters: QueryParameter[]) => {
      const params = new URL(window.location.href).searchParams;

      parameters.forEach(({ name, value }) => {
        params.set(name, value);
      });

      const newParams = params.toString();
      router.push(pathname + "?" + newParams);
    },

    [pathname, router]
  );

  return { setQueryParameter, setQueryParameters, getUpdatedQueryParameters };
}
