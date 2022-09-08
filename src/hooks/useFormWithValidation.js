import React, {useCallback} from "react";

export function useFormWithValidation(customValidity) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    if (customValidity[name]) {
      evt.target.setCustomValidity(customValidity[name](value))
    }
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: input.validationMessage});
    setIsValid(input.closest("form").checkValidity());
  };

  const resetFrom = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {values, setValues, handleChange, resetFrom, errors, isValid};
}

export default useFormWithValidation;