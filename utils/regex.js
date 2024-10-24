export function extractNumericalValue(input) {
    // If the input is already a number, return it directly
    if (typeof input === 'number') {
        return input;
    }

    // If the input is a string, apply the regular expression to extract the number
    if (typeof input === 'string') {
        const match = input.match(/-?\d+(\.\d+)?/); // Match integers or decimal numbers
        console.log("--------match -------", match);
        return match ? parseFloat(match[0]) : null; // Return the number as a float or null if no match
    }

    // If the input is neither a string nor a number, return null
    return null;
}



// export function extractNumericalValue(input) {
//     console.log("----------input ", input , typeof input);
//     if (typeof input !== 'string') {
//         return null; // If the input is not a string, return null
//     }

//     // Regular expression to match integers or decimal numbers (including negative numbers)
//     const match = input.match(/-?\d+(\.\d+)?/);
    
//     return match ? parseFloat(match[0]) : null; // Return the number as a float or null if no match
// }


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