import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [touched, setTouched] = useState({ email: false, password: false });
    const navigate = useNavigate();

    async function login() {

        const response = await axios.post(
            'http://localhost:3001/api/v1/auth/login',
            JSON.stringify({ email, password }),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        console.log(response);
        if (response.data) {
            console.log("Login successfully")
            navigate('/Dashboard');
        }
        else {
            alert('login failed');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            alert("Done");
        }
    }
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setTouched(prevTouched => ({ ...prevTouched, email: true }));
        const validationErrors = validate();
        setErrors(prevErrors => ({
            ...prevErrors,
            email: validationErrors.email
        }));
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setTouched(prevTouched => ({ ...prevTouched, password: true }));
        const validationErrors = validate();
        setErrors(prevErrors => ({
            ...prevErrors,
            password: validationErrors.password
        }));

    }

    const validate = () => {
        const error = {};
        if (!email) {
            error.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = "Email not Matched";
        } else {
            error.email = "";
        }

        if (!password) {
            error.password = "Password is Required";

            // } else if (password.length < 8) {
            //     error.password = "Password not Matched";
        } else {
            error.password = "";
        }

        return error;
    }

    const googleAuth = async () => {
        try {
            window.open("http://localhost:3001/api/v1/auth/google", "_self");
            const response = await axios.get("http://localhost:3001/api/v1/auth/google", {
                withCredentials: true
            });
            if (response.data) {
                console.log("Google login successful");
                navigate('/Dashboard');
            }
        } catch (error) {
            console.error("Google login failed", error);
        }
    };
    

    // const googleAuth = () => {
    //     window.open("http://localhost:3001/api/v1/auth/google", "_self");
    // };
    return (
        <div className="login-page">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                <path fill="#2395ec" d="M47.527,19.847c-0.13-0.102-1.345-1.007-3.908-1.007c-0.677,0.003-1.352,0.06-2.019,0.171 c-0.496-3.354-3.219-4.93-3.345-5.003l-0.688-0.392l-0.453,0.644c-0.567,0.866-1.068,1.76-1.311,2.763 c-0.459,1.915-0.18,3.713,0.806,5.25C35.417,22.928,33.386,22.986,33,23H1.582c-0.826,0.001-1.496,0.66-1.501,1.474 c-0.037,2.733,0.353,5.553,1.306,8.119c1.089,2.818,2.71,4.894,4.818,6.164C8.567,40.184,12.405,41,16.756,41 c1.965,0.006,3.927-0.169,5.859-0.524c2.686-0.487,5.271-1.413,7.647-2.74c1.958-1.119,3.72-2.542,5.219-4.215 c2.505-2.798,3.997-5.913,5.107-8.682c0.149,0,0.298,0,0.442,0c2.743,0,4.429-1.083,5.359-1.99 c0.618-0.579,1.101-1.284,1.414-2.065L48,20.216L47.527,19.847z"></path><path fill="#2395ec" d="M8,22H5c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C9,21.552,8.552,22,8,22z"></path><path fill="#2395ec" d="M14,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C15,21.552,14.552,22,14,22z"></path><path fill="#2395ec" d="M20,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C21,21.552,20.552,22,20,22z"></path><path fill="#2395ec" d="M26,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,21.552,26.552,22,26,22z"></path><path fill="#2395ec" d="M14,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C15,15.552,14.552,16,14,16z"></path><path fill="#2395ec" d="M20,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C21,15.552,20.552,16,20,16z"></path><path fill="#2395ec" d="M26,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,15.552,26.552,16,26,16z"></path><path fill="#2395ec" d="M26,10h-3c-0.552,0-1-0.448-1-1V6c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,9.552,26.552,10,26,10z"></path><path fill="#2395ec" d="M32,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C33,21.552,32.552,22,32,22z"></path>
            </svg>
            <h2> Sign in to Docker Hub</h2>
            <button onClick={googleAuth}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Sign in with Google

            </button>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                    <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"></stop><stop offset="1" stop-color="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
                </svg>
                Sign in with Facebook
            </button>
            <hr />
            <span>Or</span>
            <form onSubmit={handleSubmit}>

                <input type="text" className={`input-container ${touched.email && errors.email ? 'input-error' : ''}`} value={email} onChange={handleEmailChange} placeholder="Your email" />
                {errors.email && <div className='error'>{errors.email}</div>}

                <input type="password" className={`input-password ${errors.password ? 'input-error' : ''}`} value={password} onChange={handlePasswordChange} placeholder="Your password" />
                {errors.password && <div className='error'>{errors.password}</div>}
                <button className="btn-Signin" type="submit" onClick={login}>Sign in</button>

            </form>
            <button>Forget Password</button>
            <p>
                <Link to="/register" className="signup-link">
                    Don't have an account? Sign up
                </Link>

            </p>
        </div>
    );
}
export default LoginPage;   
