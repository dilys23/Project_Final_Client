import "../Login/Login.css";
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const handleForgotPass = async (email) => {
    try {
        const response = await axios.post(
            'http://tuducmanh2911.io.vn/api/v1/auth/forgotPassword',
            { email },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        if (response.data) {
            console.log('Email send');
        } else {
            console.error('Error sending email');
        }  
    } catch (error) {
        toast.error('Error');
    }
}

const handleOTP = async (email, otp) => {
    try {
        const response = await axios.post(
            'http://tuducmanh2911.io.vn/api/v1/auth/checkOTP',
            { email, otp },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        if (response.data) {
            console.log('OTP verified');
            window.location.href = '/reset-password';
        } else {
            console.error('Error verifying OTP');
        }
    } catch (error) {
        toast.error('Error');
    }
}

function ForgotPass() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        handleForgotPass(email);
        setEmailSent(true);
        console.log('Email sent:', email);
    };
    const handleOtpSubmit = (event) => {
        event.preventDefault();
        console.log(email, otp);
        handleOTP(email, otp);
        console.log('OTP entered:', otp);
        localStorage.setItem('email', email);
    };
    return (
        <div className="login-page">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                <path fill="#2395ec" d="M47.527,19.847c-0.13-0.102-1.345-1.007-3.908-1.007c-0.677,0.003-1.352,0.06-2.019,0.171 c-0.496-3.354-3.219-4.93-3.345-5.003l-0.688-0.392l-0.453,0.644c-0.567,0.866-1.068,1.76-1.311,2.763 c-0.459,1.915-0.18,3.713,0.806,5.25C35.417,22.928,33.386,22.986,33,23H1.582c-0.826,0.001-1.496,0.66-1.501,1.474 c-0.037,2.733,0.353,5.553,1.306,8.119c1.089,2.818,2.71,4.894,4.818,6.164C8.567,40.184,12.405,41,16.756,41 c1.965,0.006,3.927-0.169,5.859-0.524c2.686-0.487,5.271-1.413,7.647-2.74c1.958-1.119,3.72-2.542,5.219-4.215 c2.505-2.798,3.997-5.913,5.107-8.682c0.149,0,0.298,0,0.442,0c2.743,0,4.429-1.083,5.359-1.99 c0.618-0.579,1.101-1.284,1.414-2.065L48,20.216L47.527,19.847z"></path><path fill="#2395ec" d="M8,22H5c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C9,21.552,8.552,22,8,22z"></path><path fill="#2395ec" d="M14,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C15,21.552,14.552,22,14,22z"></path><path fill="#2395ec" d="M20,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C21,21.552,20.552,22,20,22z"></path><path fill="#2395ec" d="M26,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,21.552,26.552,22,26,22z"></path><path fill="#2395ec" d="M14,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C15,15.552,14.552,16,14,16z"></path><path fill="#2395ec" d="M20,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C21,15.552,20.552,16,20,16z"></path><path fill="#2395ec" d="M26,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,15.552,26.552,16,26,16z"></path><path fill="#2395ec" d="M26,10h-3c-0.552,0-1-0.448-1-1V6c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,9.552,26.552,10,26,10z"></path><path fill="#2395ec" d="M32,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C33,21.552,32.552,22,32,22z"></path>
            </svg>
            <h2>Forgot your password</h2>
            Enter the email address associated with your account and we'll send you a OTP to reset your password
            {!emailSent ? (
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" className="btn-Email" placeholder="Email" value={email} onChange={handleEmailChange} />
                    <button className="btn-Forgot">Continue</button>
                </form>
            ) : (
                <form action="" onSubmit={handleOtpSubmit}>
                    <input type="text" className="btn-Otp" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} />
                    <button className="btn-Verify">Verify OTP</button>
                </form>
            )}
            <p>
                Already have an account?
                <a href="/login">Sign in</a>
            </p>
        </div>
    );
}
export default ForgotPass;   
