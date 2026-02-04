import {useCallback, useMemo, useState} from "react";
import type {EmployeeFormData} from "../types/employeeFormData.ts";

function validateEmployeeForm(data: EmployeeFormData): boolean {
    const firstNameValid = data.firstName.trim() !== "";
    const lastNameValid = data.lastName.trim() !== "";
    const phoneValid = data.phone.trim() !== "" && /^[\d\s\-+()]{6,20}$/.test(data.phone);
    const streetValid = data.streetName.trim() !== "";
    const houseNumberValid = data.houseNumber.trim() !== "";
    const postcodeValid = /^\d{5}$/.test(data.postcode);
    const cityValid = data.city.trim() !== "";

    return (
        firstNameValid &&
        lastNameValid &&
        phoneValid &&
        streetValid &&
        houseNumberValid &&
        postcodeValid &&
        cityValid
    );
}

export function useEmployeeForm(initial: EmployeeFormData) {
    const [formData, setFormData] = useState<EmployeeFormData>(initial);

    const setField = useCallback(<K extends keyof EmployeeFormData>(field: K, value: EmployeeFormData[K]) => {
        setFormData((prev) => ({...prev, [field]: value}));
    }, []);

    const isValid = useMemo(() => validateEmployeeForm(formData), [formData]);

    return {formData, setFormData, setField, isValid};
}