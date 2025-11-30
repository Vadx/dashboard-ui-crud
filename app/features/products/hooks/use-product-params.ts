import { useSearchParams } from "react-router";

export function useProductParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const order = searchParams.get("order") || "";

  const updateSearch = (searchValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const updateSort = (field: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", field);
    params.set("order", order === "asc" ? "desc" : "asc");
    params.set("page", "1");
    setSearchParams(params);
  };

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  return {
    page,
    limit,
    search,
    sortBy,
    order,
    updateSearch,
    updateSort,
    updatePage,
  };
}
