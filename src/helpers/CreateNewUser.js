export const createNewUser = (e) => {
    const [firstName, lastName, email, age, gender, password] = e.target;
    return {
        id: new Date().getTime().toString(),
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        age: age.value,
        gender: gender.value,
        password: password.value,
        image: "",
        isAuth: false
    }
}