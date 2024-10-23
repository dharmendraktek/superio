export function extractNumericalValue(input) {
    // Regular expression to match integers or decimal numbers
    const match = input && input?.match(/-?\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : null; // Return the number as a float or null if no match
}

export const cleanString = (input) =>  {
    return input
        ?.replace(/^\s*,\s*|\s*,\s*$/g, '') // Remove leading/trailing empty spaces and commas
        .replace(/,\s*,/g, ',') // Remove empty commas in the middle
        .replace(/,\s+/g, ',') // Remove spaces after commas
        .replace(/\s+,/g, ',') // Remove spaces before commas
        .replace(/\bNone\b,\s*/g, ''); // 
}

export function capitalizeFirstLetter(input) {
    if (!input) return input; // Return if the input is empty or undefined
    return input?.charAt(0)?.toUpperCase() + input.slice(1);
}


export function convertToUppercase(input) {
    return input?.toUpperCase();
}