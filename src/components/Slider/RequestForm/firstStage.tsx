// import React, { useCallback, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import axios from "axios";
// import { toast } from "react-toastify";
// import useAxios from "../../../api/useAxios";

// interface FormData {
//   fullName: string;
//   companyName: string;
//   phoneNumber: string;
//   customerPosition: string;
// }

// interface FirstStageProps {
//   nextStep: () => void;
// }

// const FirstStage: React.FC<FirstStageProps> = ({ nextStep, setIdProduct }) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     defaultValues: {
//       fullName: "",
//       companyName: "",
//       phoneNumber: "",
//       customerPosition: "",
//     },
//   });

//   const { postData } = useAxios<any>();

//   const sendDataFirstState = async (data: FormData) => {
//     const success = await postData("http://192.168.93.1:8000/order/", {
//       customer_fullname: data.fullName,
//       customer_company: data.companyName,
//       customer_mobile: data.phoneNumber,
//       position: data.customerPosition,
//       token: localStorage.getItem("refresh_token"),
//     });

//     if (success) {
//       console.log("success",response);

//       setIdProduct = Response.data.id;
//       nextStep();
//     }
//   };
//   const onSubmit = (data: FormData) => {
//     console.log("stepOne", data);
//     // console.log("مقدار اول",data);
//     // nextStep();
//     sendDataFirstState(data);
//   };

//   return (
//     <form
//       style={{ width: "100%", height: "100%" }}
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <div style={{ width: "100%", height: "80%" }}>
//         <fieldset className="show">
//           <h2 className="fs-title">ثبت مشتری</h2>
//           <div className="input-container">
//             <div className="input-group">
//               <h5>نام و نام خانوادگی</h5>
//               <Controller
//                 name="fullName"
//                 control={control}
//                 rules={{
//                   required: "نام خانوادگی نمی‌تواند خالی باشد",
//                   pattern: {
//                     value: /^[\u0600-\u06FF\s]{5,}$/,
//                     message:
//                       "نام خانوادگی باید حداقل 5 حرف و فقط شامل حروف فارسی باشد",
//                   },
//                 }}
//                 render={({ field }) => <input type="text" {...field} />}
//               />
//               <ErrorMessage
//                 errors={errors}
//                 name="fullName"
//                 as="span"
//                 className="error"
//               />
//             </div>
//             <div className="input-group">
//               <h5>نام شرکت</h5>
//               <Controller
//                 name="companyName"
//                 control={control}
//                 rules={{
//                   required: "نام شرکت نمی‌تواند خالی باشد",
//                   minLength: {
//                     value: 3,
//                     message: "نام شرکت باید حداقل 3 حرف باشد",
//                   },
//                   pattern: {
//                     value: /^[^\d].*$/,
//                     message: "نام شرکت نباید با عدد شروع شود",
//                   },
//                 }}
//                 render={({ field }) => <input type="text" {...field} />}
//               />
//               <ErrorMessage
//                 errors={errors}
//                 name="companyName"
//                 as="span"
//                 className="error"
//               />
//             </div>
//             <div className="input-group">
//               <h5>شماره تماس</h5>
//               <Controller
//                 name="phoneNumber"
//                 control={control}
//                 rules={{
//                   required: "شماره تماس نمی‌تواند خالی باشد",
//                   pattern: {
//                     value: /^09\d{9}$/,
//                     message: "شماره تماس باید 11 رقمی و با 09 شروع شود",
//                   },
//                 }}
//                 render={({ field }) => <input type="text" {...field} />}
//               />
//               <ErrorMessage
//                 errors={errors}
//                 name="phoneNumber"
//                 as="span"
//                 className="error"
//               />
//             </div>
//             <div className="input-group">
//               <h5>سمت</h5>
//               <Controller
//                 name="customerPosition"
//                 control={control}
//                 rules={{
//                   required: "سمت نمی‌تواند خالی باشد",
//                   minLength: { value: 4, message: "سمت باید حداقل 4 حرف باشد" },
//                 }}
//                 render={({ field }) => <input type="text" {...field} />}
//               />
//               <ErrorMessage
//                 errors={errors}
//                 name="customerPosition"
//                 as="span"
//                 className="error"
//               />
//             </div>
//           </div>
//         </fieldset>
//       </div>
//       <div className="row">
//         <button type="submit" className="next action-button">
//           بعدی
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FirstStage;
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import useAxios from "../../../api/useAxios";

interface FormData {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  customerPosition: string;
}

interface FirstStageProps {
  nextStep: () => void;
  setIdProduct: (id: string) => void;
}

const FirstStage: React.FC<FirstStageProps> = ({ nextStep, setIdProduct }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      companyName: "",
      phoneNumber: "",
      customerPosition: "",
    },
  });

  const { postData } = useAxios<any>();

  const sendDataFirstState = async (data: FormData) => {
    const responseData = await postData("http://192.168.100.18:8000/order/", {
      customer_fullname: data.fullName,
      customer_company: data.companyName,
      customer_mobile: data.phoneNumber,
      positon: data.customerPosition,
      token: localStorage.getItem("refresh_token"),
    });

    if (responseData) {
      setIdProduct(responseData.id);
      nextStep();
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("stepOne", data);
    sendDataFirstState(data);
  };

  return (
    <form
      style={{ width: "100%", height: "100%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ width: "100%", height: "80%" }}>
        <fieldset className="show">
          <h2 className="fs-title">ثبت مشتری</h2>
          <div className="input-container">
            <div className="input-group">
              <h5>نام و نام خانوادگی</h5>
              <Controller
                name="fullName"
                control={control}
                rules={{
                  required: "نام خانوادگی نمی‌تواند خالی باشد",
                  pattern: {
                    value: /^[\u0600-\u06FF\s]{5,}$/,
                    message:
                      "نام خانوادگی باید حداقل 5 حرف و فقط شامل حروف فارسی باشد",
                  },
                }}
                render={({ field }) => <input type="text" {...field} />}
              />
              <ErrorMessage
                errors={errors}
                name="fullName"
                as="span"
                className="error"
              />
            </div>
            <div className="input-group">
              <h5>نام شرکت</h5>
              <Controller
                name="companyName"
                control={control}
                rules={{
                  required: "نام شرکت نمی‌تواند خالی باشد",
                  minLength: {
                    value: 3,
                    message: "نام شرکت باید حداقل 3 حرف باشد",
                  },
                  pattern: {
                    value: /^[^\d].*$/,
                    message: "نام شرکت نباید با عدد شروع شود",
                  },
                }}
                render={({ field }) => <input type="text" {...field} />}
              />
              <ErrorMessage
                errors={errors}
                name="companyName"
                as="span"
                className="error"
              />
            </div>
            <div className="input-group">
              <h5>شماره تماس</h5>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: "شماره تماس نمی‌تواند خالی باشد",
                  pattern: {
                    value: /^09\d{9}$/,
                    message: "شماره تماس باید 11 رقمی و با 09 شروع شود",
                  },
                }}
                render={({ field }) => <input type="text" {...field} />}
              />
              <ErrorMessage
                errors={errors}
                name="phoneNumber"
                as="span"
                className="error"
              />
            </div>
            <div className="input-group">
              <h5>سمت</h5>
              <Controller
                name="customerPosition"
                control={control}
                rules={{
                  required: "سمت نمی‌تواند خالی باشد",
                  minLength: { value: 4, message: "سمت باید حداقل 4 حرف باشد" },
                }}
                render={({ field }) => <input type="text" {...field} />}
              />
              <ErrorMessage
                errors={errors}
                name="customerPosition"
                as="span"
                className="error"
              />
            </div>
          </div>
        </fieldset>
      </div>
      <div className="row">
        <button type="submit" className="next action-button">
          بعدی
        </button>
      </div>
    </form>
  );
};

export default FirstStage;
