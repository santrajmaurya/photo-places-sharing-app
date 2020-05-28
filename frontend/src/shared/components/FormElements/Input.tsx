import React, { useReducer, useEffect } from "react";

import { validate } from '../../util/Validators';

import "./Input.scss";

interface InputProps {
    element?: string,
    id?: string,
    type?: string,
    placeholder?: string,
    label?: string,
    rows?: number,
    validators?: any,
    errorText?: string,
    onInput?: any,
    value?: string,
    valid?: boolean,
}
type Action = any;
type State = {
    inputValue: string,
    isValid: boolean,
    isTouched: boolean,
}

type Event = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

const inputReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                inputValue: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};

const Input: React.FC<InputProps> = ({ element, id, type, placeholder, label, rows, errorText, validators, onInput, value, valid }) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        inputValue: value || '',
        isTouched: false,
        isValid: valid || false,
    });

    const { inputValue, isValid } = inputState;

    useEffect(() => {
        onInput(id, inputValue, isValid);
    }, [id, inputValue, isValid, onInput])

    const changeHandler = (e: Event) => {
        dispatch({ type: "CHANGE", val: e.target.value, validators: validators });
    };

    const touchHandler = () => {
        dispatch({ type: "TOUCH" });
    };

    const elementName =
        element === "input" ? (
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.inputValue}
            />
        ) : (
                <textarea
                    id={id}
                    rows={rows || 3}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.inputValue}
                />
            );

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={id}>{label}</label>
            {elementName}
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
    );
};

export default Input;
