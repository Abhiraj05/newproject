import React, { useState } from "react";
import axios from "axios"

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if(!formData.email && !formData.password){
        alert("please fill the details")
    }
    else{
        try{
           const data= axios.post()
        }
        catch(error){
           console.log(error)
        }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {console.log(formData)}
        <div>
          <div>
            <input type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
          </div>
          <div>
            <input type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
             />
          </div>
          <button>submit</button>
        </div>
      </form>
    </>
  );
};
export default SignIn;
