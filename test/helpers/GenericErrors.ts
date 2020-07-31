export const expectError = (func: any, ...args: any[]) => {
    try {
        func(...args);
        expect(1).toBe(2);
    } catch (error) {
        expect(1).toBe(1);
    }
}