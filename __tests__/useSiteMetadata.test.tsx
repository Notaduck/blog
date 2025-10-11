import { renderHook } from "@testing-library/react";
import { useSiteMetadata } from "../src/hooks/use-site-metadata";

const mockUseStaticQuery = jest.fn();

jest.mock("gatsby", () => ({
  useStaticQuery: (query: unknown) => mockUseStaticQuery(query),
  graphql: jest.fn(),
}));

describe("useSiteMetadata", () => {
  beforeEach(() => {
    mockUseStaticQuery.mockReset();
  });

  it("returns the site's metadata from the Gatsby static query", () => {
    const expectedMetadata = {
      title: "Test Title",
      description: "A description",
      siteUrl: "https://example.com",
    };

    mockUseStaticQuery.mockReturnValue({ site: { siteMetadata: expectedMetadata } });

    const { result } = renderHook(() => useSiteMetadata());

    expect(mockUseStaticQuery).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(expectedMetadata);
  });
});
