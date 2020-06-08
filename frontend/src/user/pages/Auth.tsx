import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/Validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext} from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import "./Auth.scss";

type Event = React.ChangeEvent<HTMLFormElement>;

const Auth: React.FC = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const {isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandeler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
      if(!isLoginMode) {
          setFormData({
              ...formState.inputs,
              name: undefined
          }, formState.inputs.email.isValid && formState.inputs.password.isValid);
      } else {
          setFormData({
              ...formState.inputs,
              name: {
                  value: '',
                  isValid: false
              }

          }, false);
      }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (e: Event) => {
    e.preventDefault();
    
    if (isLoginMode) {
      try{
        const responseData = await sendRequest('http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.user.id);
      } catch(err) {

      }
        
    } else {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users/signup', 
          'POST',
           JSON.stringify({
             name: formState.inputs.name.value,
             email: formState.inputs.email.value,
             password: formState.inputs.password.value
           }),
           {
            'Content-Type': 'application/json'
          }
        );

        auth.login(responseData.user.id);
      } catch (err) {
       
      }
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay />}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText= 'Please enter a name'
            onInput={inputHandeler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandeler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, atleast 5 characters."
          onInput={inputHandeler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGN UP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
      </Button>
    </Card>
    </>
  );
};

export default Auth;
