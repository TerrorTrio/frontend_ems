import {useEffect, useState} from "react";
import type {Employee} from "../types/employee.ts";

export default function useEmployeeSearch(debouncedSearchTerm : string){
    const [results, setResults] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage("");
        if(debouncedSearchTerm.length === 0){
            return;
        }
        setResults([]);
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
                setResults([]);
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
