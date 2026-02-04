import EmployeeTable from "../components/EmployeeTable.tsx";
import {SearchFilterPanel} from "../components/SearchFilterPanel/SearchFilterPanel.tsx";

export function EmployeePage() {
    return (
        <>
            <h3 style={{
                marginBottom: "20px"
            }}>Mitarbeiterübersicht</h3>
            <SearchFilterPanel/>
            <EmployeeTable/>
        </>
    )
}