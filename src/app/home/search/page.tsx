import SearchBar from "./SearchBar"
import SearchList from "./SearchList";
import SearchData from "@/src/app/ui/home/list/searchdata";

const SearchPage = ({
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
            <SearchBar />
            {/* <SearchList query={query} /> */}
            <div>{query}</div>

            <SearchData/>
        </div>
    )
}

export default SearchPage