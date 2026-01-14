// import {createContext, useContext, useState, type ReactNode} from "react";
// import type {Employee} from "../types/employee.ts";
//
// type EmployeeContextType = {
//     employees: Employee[];
//     setEmployees: (employees: Employee[]) => void;
// }
//
// const EmployeesContext = createContext<EmployeeContextType | []>([]);
//
// export function EmployeeProvider({children}: {children: ReactNode}) {
//     const [employees, setEmployees] = useState<Employee[]>([]);
//
//     return (
//         <EmployeesContext.Provider value = {{ employees, setEmployees}}>
//             {children}
//         </EmployeesContext.Provider>
//     )
// }
//
// // eslint-disable-next-line react-refresh/only-export-components
// export const useEmployees = () => {
//     const context = useContext(EmployeesContext);
//     if (!context) {
//         throw new Error("useEmployees muss innerhalb eines EmployeesProvider verwendet werden.")
//     }
//     return context;
// }