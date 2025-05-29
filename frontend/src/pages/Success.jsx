import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { toast } from "react-hot-toast";
import { setPaymentLoading } from "../slices/courseSlice";
import { studentEndpoints } from "../services/apis";
import { resetCart } from "../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;
function Success() {
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom right, #d1fae5, #ffffff)",
    padding: "1rem",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "1.5rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    textAlign: "center",
  };

  const emojiStyle = {
    fontSize: "4rem",
    marginBottom: "1.5rem",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  };

  const textStyle = {
    color: "#4b5563",
    marginBottom: "1.5rem",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    borderRadius: "9999px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  };
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    console.log("kamali");

    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("user_id");
    const courseIdParam = queryParams.get("course_id");
    const amount = queryParams.get("amount");

    const courseIds = courseIdParam ? courseIdParam.split(",") : [];

    console.log("User ID:", userId);
    console.log("Course IDs:", courseIds);
    console.log("Amount:", amount);
    console.log("Token:", token);

    sendPaymentSuccessEmail(amount, token);
    verifyPayment({ coursesId: courseIds }, token, navigate, dispatch);
  }, []);
  async function sendPaymentSuccessEmail(amount, token) {
    try {
      await apiConnector(
        "POST",
        SEND_PAYMENT_SUCCESS_EMAIL_API,
        {
          amount,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
  }

  // ================ verify payment ================
  async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));

    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("payment Successful, you are addded to the course");
      navigate("/dashboard/enrolled-courses");
      dispatch(resetCart());
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR....", error);
      toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={emojiStyle}>✅</div>
        <h1 style={headingStyle}>Success!</h1>
        <p style={textStyle}>
          Your Purchase For The Course Has Been Completed! Please Wait While we
          are Enrolling you in Your Purchased Course Please Don't refresh the
          page . Thanks For Your Patients
        </p>
      </div>
    </div>
  );
}

export default Success;
