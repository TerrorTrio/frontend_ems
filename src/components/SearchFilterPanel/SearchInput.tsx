import {Input} from "@mui/joy";
import {SearchRounded} from "@mui/icons-material";

interface SearchInputProps {
    searchedName: string,
    setSearchedName: (value: string) => void;
}

export function SearchInput({searchedName, setSearchedName }: SearchInputProps) {
    return <Input placeholder={"Suchen..."}
                  startDecorator={<SearchRounded sx={{ml: "-3px"}}/>}
                  sx={{
                      width: "70%",
                      "--Input-radius": "15px",
                  }}
                  value={searchedName}
                  onChange={(e) => setSearchedName(e.target.value)}
    />;
}