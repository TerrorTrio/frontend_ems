import EmployeeTable from "../components/EmployeeTable.tsx";
import {SearchFilterPanel} from "../components/SearchFilterPanel.tsx";
import {useState} from "react";
import {useDebounce} from "use-debounce";


export function EmployeeTablePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    return (
        <>
            <SearchFilterPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                               debouncedSearchTerm={debouncedSearchTerm}/>
            <EmployeeTable/>
        </>
    )
}