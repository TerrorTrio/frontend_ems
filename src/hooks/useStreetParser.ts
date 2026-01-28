export function parseStreet(street: string): { streetName: string; houseNumber: string } {
    const match = street.match(/^(.+?)\s+(\d+\s*\w*)$/);
    if (match) {
        return {streetName: match[1], houseNumber: match[2]};
    }
    return {streetName: street, houseNumber: ""};
}
