import "../Login/Login.css";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleDisplayNameChange = (e) => setDisplayName(e.target.value); // Updated handler name
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(
                    "http://localhost:3001/api/v1/auth/register",
                    { email, displayName, password, role: "user" },  // Add role here
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
    
                if (response.data) {
                    console.log("Registration successful");
                    navigate("/Dashboard");
                }
            } catch (error) {
                console.error("Registration failed", error);
                setErrors({ apiError: "Registration failed. Please try again." });
            }
        }
    };
    

    const validate = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!displayName) {
            newErrors.displayName = "Display Name is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    return (
        <div className="login-page">
            <h2>Create your account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="btn-Email"
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input
                    type="text"
                    placeholder="Display Name" 
                    value={displayName} 
                    className="btn-DisplayName"
                    onChange={handleDisplayNameChange}
                />
                {errors.displayName && <p className="error">{errors.displayName}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="btn-password"
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="btn-confirmpassword"
                />
                {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                )}

                {/* <select
                    value={role}
                    onChange={handleRoleChange}
                    className="btn-role"
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select> */}

                {errors.apiError && <p className="error">{errors.apiError}</p>}

                <button className="btn-Signup">Sign up</button>
            </form>
            <hr />
            <span>Or</span>

            <button>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Continue with Google

            </button>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                    <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"></stop><stop offset="1" stop-color="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
                </svg>
                Continue with Facebook
            </button>
            <p>
                Already have an account?
                <a href="/login">Sign in</a>
            </p>
        </div>
    );
}
export default RegisterPage;   
