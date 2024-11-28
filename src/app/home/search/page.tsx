import { Suspense } from "react";
import SearchBar from "./SearchBar"
import SearchList from "./SearchList";
import SearchData from "@/ui/home/list/searchdata";
import { Spinner } from "../../ui/home/list/spinner";

const SearchPage = async ({
        searchParams,
    }: {
        searchParams?: {
            query?: string;
        };
}) => {
    const query = searchParams?.query || '';
    //console.log("query", query);
    return (
        <div className="space-y-4">
            {/* <SearchBar /> */}
            {/* <SearchList query={query} /> */}
            <div>{ query === '' ? null : <p>{query}의 검색 결과</p> }</div>
                    

            <Suspense key={query} fallback={<Spinner/>}>
                <SearchList query={query}/>
            </Suspense>
        </div>
    )
}

export default SearchPage