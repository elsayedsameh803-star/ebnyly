"use client";

import EndpointsScrape from "@/components/app/(home)/sections/endpoints/EndpointsScrape/EndpointsScrape";
import { ComponentProps, useEffect, useState } from "react";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) =>
      setMatches(event.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export const RenderEndpointIcon = ({
  icon: Icon,
  ...props
}: { icon: typeof EndpointsScrape } & ComponentProps<
  typeof EndpointsScrape
>) => {
  const isMobile = useMediaQuery("(max-width: 996px)");

  return <Icon {...props} size={isMobile ? 24 : 20} />;
};
