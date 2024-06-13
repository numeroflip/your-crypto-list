import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

type QueryParameter = { name: string; value: string }; // [parameter. value]

/**
 * Functions to help handle query parameters
 */
export function useSetQueryParameters() {
  const router = useRouter();
  const pathname = usePathname();

  const setQueryParameters = useCallback(
    (parameters: QueryParameter[], { scroll }: { scroll?: boolean } = {}) => {
      if (typeof window === "undefined") return "";

      const params = new URL(window.location.href).searchParams;

      parameters.forEach(({ name, value }) => {
        params.set(name, value);
      });

      const newParams = params.toString();

      router.push(pathname + "?" + newParams, { scroll });
    },

    [pathname, router]
  );

  return { setQueryParameters };
}
