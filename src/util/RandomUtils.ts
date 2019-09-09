const util = {
    getRandomNumber: (min: number, max: number): number => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    dec2hex: (dec: number) => {
        return ("0" + dec.toString(16)).substr(-2);
    },

    getRandomFromArray: (arr: string[]) => arr[Math.floor(Math.random() * arr.length)],

    getRandomString: (length: number) => {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    getRandomPhone: (length: number) => {
        return String(Math.random()).substring(2, length + 2);
    },

    getRandomDate: (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    },

    getRandomBoolean: () => {
        return Math.random() >= 0.5;
    }
};

export default util;
