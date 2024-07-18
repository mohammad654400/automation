import "./Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FormValues {
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

const Login: React.FC = () => {
  const [isLoginCardLarge, setIsLoginCardLarge] = useState(true);
  const [isSignUpCardLarge, setIsSignUpCardLarge] = useState(false);
  const [loginData, setLoginData] = useState<FormValues | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    if (isSignUpCardLarge) {
      handleSignUp(data);
    } else {
      setLoginData(data);
    }
  };

  const handleSignUp = (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "رمزهای عبور همخوانی ندارند",
      });
      return;
    }
    console.log("Sign up data:", data);
  };

  const toggleCards = () => {
    setIsLoginCardLarge(!isLoginCardLarge);
    setIsSignUpCardLarge(!isSignUpCardLarge);
  };

  useEffect(() => {
    checkTokenExpiration();
    if (loginData) {
      handleLogin(loginData);
    }
  }, [loginData]);

  const checkTokenExpiration = () => {
    const expirationTime = localStorage.getItem("expiration_time");
    if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expiration_time");
      toast.info("توکن‌ها منقضی شده و حذف شدند.");
    }
  };

  const handleLogin = (data: FormValues) => {
    const a = async () => {
      try {
        const response = await axios.post(
          "http://192.168.100.18:8000/api/login/",
          {
            mobile: data.phoneNumber,
            password: data.password,
          }
        );
        console.log("status", response.status);

        if (response.status === 200) {
          const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 روز از الان
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("expiration_time", expirationTime.toString());
          toast.success("ورود با موفقیت انجام شد.");
          console.log("ورود با موفقیت انجام شد.");
          navigate("/home");
        } else {
          toast.error("ورود ناموفق بود. لطفاً مجدداً تلاش کنید.");
        }
      } catch (error) {
        handleLoginError(error);
      }
    };
    a();
  };

  const handleLoginError = (error: any) => {
    if (axios.isAxiosError(error) && error.response) {
      console.error("خطای ورود:", error.response.data);
      toast.error(error.response.data.detail || "خطایی رخ داده است.");
    } else {
      console.error("خطای غیرمنتظره:", error);
      toast.error("خطایی رخ داده است.");
    }
  };

  return (
    <div className="bodyy">
      <div className="container">
        <motion.div
          className={`card login-card ${isLoginCardLarge ? "large" : "small"}`}
          animate={{
            y: isLoginCardLarge ? -50 : 50,
            scale: isLoginCardLarge ? 1 : 0.8,
            zIndex: isLoginCardLarge ? 1 : 0,
            opacity: isLoginCardLarge ? 1 : 0.8,
          }}
          transition={{ duration: 0.5 }}
          onClick={() => !isLoginCardLarge && toggleCards()}
          style={{ bottom: isLoginCardLarge ? "0" : "-30px" }}
        >
          {isLoginCardLarge ? (
            <LoginForm
              handleSubmit={handleSubmit}
              handleFormSubmit={handleFormSubmit}
              register={register}
              errors={errors}
            />
          ) : (
            <h5>ورود</h5>
          )}
        </motion.div>

        <motion.div
          className={`card signup-card ${
            isSignUpCardLarge ? "large" : "small"
          }`}
          animate={{
            y: isSignUpCardLarge ? -50 : 50,
            scale: isSignUpCardLarge ? 1 : 0.8,
            zIndex: isSignUpCardLarge ? 1 : 0,
            opacity: isSignUpCardLarge ? 1 : 0.8,
          }}
          transition={{ duration: 0.5 }}
          onClick={() => !isSignUpCardLarge && toggleCards()}
          style={{ bottom: isSignUpCardLarge ? "0" : "-30px" }}
        >
          {isSignUpCardLarge ? (
            <SignUpForm
              handleSubmit={handleSubmit}
              handleFormSubmit={handleFormSubmit}
              register={register}
              errors={errors}
            />
          ) : (
            <h5>ثبت نام</h5>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const LoginForm: React.FC<any> = ({
  handleSubmit,
  handleFormSubmit,
  register,
  errors,
}) => (
  <form onSubmit={handleSubmit(handleFormSubmit)}>
    <div className="profile-pic-container">
      <div className="profile-pic">
        <img src="/path/to/profile-icon.png" alt="Profile Icon" />
      </div>
    </div>
    <div className="input-group">
      <i className="bi bi-person input-icon"></i>
      <input
        type="tel"
        placeholder="شماره تلفن"
        {...register("phoneNumber", {
          required: "شماره تلفن الزامی است",
          pattern: {
            value: /^09\d{9}$/,
            message: "شماره تلفن باید با 09 شروع شده و 11 رقم باشد",
          },
        })}
      />
    </div>
    {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
    <div className="input-group">
      <i className="bi bi-lock input-icon"></i>
      <input
        type="password"
        placeholder="رمز عبور"
        {...register("password", { required: "رمز عبور الزامی است" })}
      />
    </div>
    {errors.password && <p>{errors.password.message}</p>}
    <button type="submit" className="btn">
      ورود شوید
    </button>
  </form>
);

const SignUpForm: React.FC<any> = ({
  handleSubmit,
  handleFormSubmit,
  register,
  errors,
}) => (
  <form onSubmit={handleSubmit(handleFormSubmit)}>
    <div className="input-group">
      <i className="bi bi-person input-icon"></i>
      <input
        type="text"
        placeholder="نام"
        {...register("firstName", { required: "نام الزامی است" })}
      />
    </div>
    {errors.firstName && <p>{errors.firstName.message}</p>}
    <div className="input-group">
      <i className="bi bi-person input-icon"></i>
      <input
        type="text"
        placeholder="نام خانوادگی"
        {...register("lastName", { required: "نام خانوادگی الزامی است" })}
      />
    </div>
    {errors.lastName && <p>{errors.lastName.message}</p>}
    <div className="input-group">
      <i className="bi bi-phone input-icon"></i>
      <input
        type="tel"
        placeholder="شماره تلفن"
        {...register("phoneNumber", {
          required: "شماره تلفن الزامی است",
          pattern: {
            value: /^09\d{9}$/,
            message: "شماره تلفن باید با 09 شروع شده و 11 رقم باشد",
          },
        })}
      />
    </div>
    {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
    <div className="input-group">
      <i className="bi bi-lock input-icon"></i>
      <input
        type="password"
        placeholder="رمز عبور"
        {...register("password", { required: "رمز عبور الزامی است" })}
      />
    </div>
    {errors.password && <p>{errors.password.message}</p>}
    <div className="input-group">
      <i className="bi bi-lock input-icon"></i>
      <input
        type="password"
        placeholder="تکرار رمز عبور"
        {...register("confirmPassword", {
          required: "تکرار رمز عبور الزامی است",
        })}
      />
    </div>
    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
    <button type="submit" className="btn">
      ثبت نام
    </button>
  </form>
);

export default Login;
