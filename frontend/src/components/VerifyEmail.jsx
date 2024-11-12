import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        const verifyToken = async () => {
            // console.log(token)
            try {
                const response = await fetch(`http://localhost:5000/api/verify?token=${token}`);
                if (response.ok) {
                    alert('Email verified successfully!');
                    navigate('/dashboard');
                } else {
                    alert('Invalid or expired verification link');
                }
            } catch (error) {
                console.error('Verification error:', error);
                alert('Failed to verify email');
            }
        };
        if (token) verifyToken();
    }, [token, navigate]);

    return (
        <>
            Verifying Email, this might take a second..
        </>
    )
}

export default VerifyEmail