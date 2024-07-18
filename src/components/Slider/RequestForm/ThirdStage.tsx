// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import DatePicker, { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// import useAxios from "../../../api/useAxios";

// interface FormData {
//   day: number;
//   month: number;
//   year: number;
// }

// interface ThirdStageProps {
//   finishStep: () => void;
//   prevStep: () => void;
// }

// const ThirdStage: React.FC<ThirdStageProps> = ({
//   finishStep,
//   prevStep,
//   idProduct,
// }) => {
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     setError,
//     clearErrors,
//   } = useForm<FormData>({
//     defaultValues: {
//       day: 0,
//       month: 0,
//       year: 0,
//     },
//   });

//   const { putData } = useAxios<any>();
//   const sendDataSecondState = async (data: FormData) => {
//     const success = await putData(
//       `http://192.168.93.1:8000/order/${idProduct}`,
//       {
//         delivery_date: data.year + data.month + data.day,
//         token: localStorage.getItem("refresh_token"),
//       }
//     );

//     if (success) {
//       finishStep();
//     }
//   };

//   const onSubmit = (data: FormData) => {
//     const today = new DateObject({ calendar: persian }).convert(persian);
//     const selectedDate = new DateObject({
//       year: data.year,
//       month: data.month,
//       day: data.day,
//       calendar: persian,
//     });

//     if (selectedDate < today) {
//       setError("day", {
//         type: "manual",
//         message: "تاریخ تحویل نمی‌تواند قبل از امروز باشد",
//       });
//       return;
//     }

//     console.log("stepThree", data);
//     clearErrors("day");
//     sendDataSecondState(data);
//   };

//   const handleDateChange = (date: DateObject | null) => {
//     if (date) {
//       setValue("day", date.day);
//       setValue("month", date.month.number);
//       setValue("year", date.year);
//     } else {
//       setValue("day", 0);
//       setValue("month", 0);
//       setValue("year", 0);
//     }
//   };

//   return (
//     <form
//       style={{ width: "100%", height: "100%" }}
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <div style={{ width: "100%", height: "80%" }}>
//         <fieldset className="show">
//           <h2 className="fs-title">مقدار و تاریخ</h2>
//           <div className="input-container">
//             <div className="input-group">
//               <h5>تاریخ تحویل</h5>
//               <Controller
//                 name="day"
//                 control={control}
//                 rules={{ required: "تاریخ تحویل نمی‌تواند خالی باشد" }}
//                 render={({ field }) => (
//                   <DatePicker
//                     calendar={persian}
//                     locale={persian_fa}
//                     value={null}
//                     onChange={handleDateChange}
//                     format="YYYY/MM/DD"
//                   />
//                 )}
//               />
//               <ErrorMessage
//                 errors={errors}
//                 name="day"
//                 as="span"
//                 className="error"
//               />
//             </div>
//           </div>
//         </fieldset>
//       </div>
//       <div className="row">
//         <input
//           type="button"
//           name="prev"
//           className="add action-button"
//           value="قبلی"
//           onClick={prevStep}
//         />
//         <button type="submit" className="next action-button">
//           ارسال
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ThirdStage;


import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useAxios from "../../../api/useAxios";

interface FormData {
  day: number;
  month: number;
  year: number;
}

interface ThirdStageProps {
  finishStep: () => void;
  prevStep: () => void;
  idProduct: string; // Ensure you pass idProduct as a prop to this component
}

const ThirdStage: React.FC<ThirdStageProps> = ({ finishStep, prevStep, idProduct }) => {
  const { control, handleSubmit, setValue, formState: { errors }, setError, clearErrors } = useForm<FormData>({
    defaultValues: {
      day: 0,
      month: 0,
      year: 0,
    },
  });

  const { putData } = useAxios<any>();

  const sendDataSecondState = async (data: FormData) => {
    const deliveryDate = `${data.year}-${String(data.month).padStart(2, '0')}-${String(data.day).padStart(2, '0')}`;
    const payload = {
      delivery_date: deliveryDate,
      token: localStorage.getItem("refresh_token"),
    };
    console.log("Sending data to server:", payload);

    const response = await putData(`http://192.168.100.18:8000/order/${idProduct}`, payload);

    console.log("Response from server:", response);

    if (response) {
      finishStep();
    }
  };

  const onSubmit = (data: FormData) => {
    const today = new DateObject({ calendar: persian }).convert(persian);
    const selectedDate = new DateObject({
      year: data.year,
      month: data.month,
      day: data.day,
      calendar: persian,
    });

    if (selectedDate < today) {
      setError("day", {
        type: "manual",
        message: "تاریخ تحویل نمی‌تواند قبل از امروز باشد",
      });
      return;
    }

    console.log("stepThree", data);
    clearErrors("day");
    sendDataSecondState(data);
  };

  const handleDateChange = (date: DateObject | null) => {
    if (date) {
      setValue("day", date.day);
      setValue("month", date.month.number);
      setValue("year", date.year);
    } else {
      setValue("day", 0);
      setValue("month", 0);
      setValue("year", 0);
    }
  };

  return (
    <form
      style={{ width: "100%", height: "100%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ width: "100%", height: "80%" }}>
        <fieldset className="show">
          <h2 className="fs-title">مقدار و تاریخ</h2>
          <div className="input-container">
            <div className="input-group">
              <h5>تاریخ تحویل</h5>
              <Controller
                name="day"
                control={control}
                rules={{ required: "تاریخ تحویل نمی‌تواند خالی باشد" }}
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={null}
                    onChange={handleDateChange}
                    format="YYYY/MM/DD"
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="day"
                as="span"
                className="error"
              />
            </div>
          </div>
        </fieldset>
      </div>
      <div className="row">
        <input
          type="button"
          name="prev"
          className="add action-button"
          value="قبلی"
          onClick={prevStep}
        />
        <button type="submit" className="next action-button">
          ارسال
        </button>
      </div>
    </form>
  );
};

export default ThirdStage;
