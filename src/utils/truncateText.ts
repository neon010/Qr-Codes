export function truncate(input:string) {
    if (input.length > 30) {
       return input.substring(0, 30) + '...';
    }
    return input;
};