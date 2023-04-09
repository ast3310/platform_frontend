const generator = {
    getPassword(length) {
        let chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let pwordLength = length;
        let password = '';

        const array = new Uint32Array(chars.length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < pwordLength; i++) {
            password += chars[array[i] % chars.length];
        }


        return password;
    }
}

export default generator;