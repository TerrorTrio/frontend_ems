export type EmployeeFormData = {
    firstName: string;
    lastName: string;
    phone: string;
    streetName: string;
    houseNumber: string;
    postcode: string;
    city: string;
}

export type ToastState = {
    open: boolean;
    message: string;
    color: "danger" | "success";
}