import {useEffect, useState} from "react";
import type {Employee} from "../types/employee.ts";
import {getEmployees} from "../services/employeeService.ts";

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
                const results = await getEmployees();
                if(results.length === 0){
                    setResults(results);
                    setErrorMessage("No results found");
                }else if (!cancelled) {
                    const filteredEmployees = results.filter(
                        (e) =>
                            e.firstName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                            e.lastName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                    );
                    setResults(filteredEmployees);
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
