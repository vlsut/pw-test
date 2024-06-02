export function generateRandomEmail(username) {
    if (!username) {
        username = generateRandomString(8); // Generate a random string for the username part
    }
    const domain = "example.com"; // Your desired domain

    return `${username}@${domain}`;
}

export function generateRandomString(length = 10) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function generateRandomUser() {
    const randomString = generateRandomString();
    const emailPrefix = "qauser-";

    return {
        name: randomString,
        lastName: randomString,
        email: emailPrefix + generateRandomEmail(randomString),
        password: randomString,
        repeatPassword: randomString,
    };
}
