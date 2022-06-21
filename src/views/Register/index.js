import React from 'react';
import FormLogin from '../../components/FormLogin';
import "./style.css"

function Register() {
  return (
  <div className="mainLogin">
      <FormLogin className="form" type="register"/>
  </div>);
}

export default Register;
