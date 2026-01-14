import {useEffect, useState} from "react";
import type {EmployeeSearchResults} from "../types/employee.ts";

export default function useEmployeeSearch(debouncedSearchTerm : string){
    const [results, setResults] = useState<EmployeeSearchResults>({results: []});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage("");
        if(debouncedSearchTerm.length === 0){
            return;
        }
        setResults({results: []});
        setIsLoading(true);
        let cancelled = false;

        async function doSearch() {
            try {
                const results = await fetchSearchedEmployeesFromApi(debouncedSearchTerm);
                if(results.length === 0){
                    setResults(results);
                    setErrorMessage("No results found");
                }else if (!cancelled) {
                    setResults(results);
                    setErrorMessage("");
                }
            } catch (error: unknown) {
                setResults({results: []});
                setErrorMessage(String(error).substring(7));
            }finally {
                setIsLoading(false);
            }
        }

        void doSearch();
        return () => {
            cancelled = true;
        };
    }, [debouncedSearchTerm, setResults]);

    return {results, isLoading, errorMessage};
}
