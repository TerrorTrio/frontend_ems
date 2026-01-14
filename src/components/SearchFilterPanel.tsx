import "react-bootstrap";
import {SearchInput} from "./SearchInput.tsx";

interface SearchFilterPanelProps {
    searchTerm: string,
    debouncedSearchTerm: string,
    setSearchTerm: (term: string) => void,
}

export function SearchFilterPanel({searchTerm, debouncedSearchTerm, setSearchTerm}: SearchFilterPanelProps) {
    return (
        <>
            <SearchInput searchTerm={searchTerm} debouncedSearchTerm={debouncedSearchTerm} setSearchTerm={setSearchTerm}/>
        </>
    )
}