export const validFormCreator = (fields = []) => () => {
    return -1 !== fields.indexOf(true);
}

// Function creator return is function for checking the form field for validity. Accepts an array of validators.
// the function created by the creator of the function takes a boolean value as a parameter
// returns an array of errors by default; if passed true returns a boolean value
export const validFieldCreator = (validators = []) => (isBool = false) => {
    if(isBool){
        return -1 !== validators.map(item => !!item).indexOf(true);
    } else {
        return validators;
    }
}

// validators creators func
export const isRequiredFieldCreator = value => () => {
    if(value.length === 0) return `Field is required. `;
    return undefined;
}

export const minLengthCreator = minLength => value => {
    if(value.length < minLength) return `Min length is ${minLength} symbols. `;
    return undefined;
}

export const maxLengthCreator = maxLength => value => {
    if(value.length > maxLength) return `Max length is ${maxLength} symbols. `;
    return undefined;
}

export const repeatPasswordCreator = (password, repeatPassword) => () => {
    if(password !== repeatPassword) return `Passwords do not match. `;
    return undefined;
}
