import SearchBar from "./SearchBar"
import SearchList from "./SearchList";

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
        <div>
            <SearchBar />
            <SearchList query={query} />
        </div>
    )
}

export default SearchPage