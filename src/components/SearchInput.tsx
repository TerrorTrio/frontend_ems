import {Input} from "@mui/joy";
import "./css/SearchInput.css";
import {SearchRounded} from "@mui/icons-material";
import useEmployeeSearch from "../hooks/useEmployeeSearch.ts";

interface SearchInputProps {
    searchTerm: string,
    debouncedSearchTerm: string,
    setSearchTerm: (term: string) => void,
}

export function SearchInput({searchTerm, debouncedSearchTerm, setSearchTerm}: SearchInputProps) {
    useEmployeeSearch(debouncedSearchTerm);
    return <Input className={"input"}
                  placeholder={"Suchen..."}
                  startDecorator={<SearchRounded sx={{ml: "-3px"}}/>}
                  sx={{
                      width: "70%",
                      "--Input-radius": "15px",
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
    />;
}