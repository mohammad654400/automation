// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import useAxios from "../../../api/useAxios";

// interface IResult {
//   name: string;
//   Number: number;
//   SerialNumber: string;
//   Description: string;
// }

// interface FormData {
//   name: string;
//   Number: number;
//   SerialNumber: string;
//   Description: string;
// }

// interface SecondStageProps {
//   nextStep: () => void;
//   prevStep: () => void;
//   appendItem: (item: IResult) => void;
//   results: IResult[];
// }

// const SecondStage: React.FC<SecondStageProps> = ({
//   nextStep,
//   prevStep,
//   appendItem,
//   results,
//   idProduct
// }) => {
//   const {
//     control,
//     handleSubmit,
//     reset,
//     getValues,
//     formState: { errors },
//     clearErrors,
//   } = useForm<FormData>({
//     defaultValues: {
//       name: "",
//       Number: 0,
//       SerialNumber: "",
//       Description: "",
//     },
//   });

//   const { postData } = useAxios<any>();
//   const sendDataSecondState = async (data: FormData) => {
//     const success = await postData("http://192.168.93.1:8000/order/{idProduct}", {
//       product: data.name,
//       amount: data.Number,
//       SerialNumber: data.SerialNumber,
//       Description: data.Description,
//     });

//     if (success) {

//       nextStep();
//     }
//   };

//   const onSubmit = (data: FormData) => {
//     const values = getValues();
//     appendItem(values);
//     // reset({
//     //   name: "",
//     //   Number: 0,
//     //   SerialNumber: "",
//     //   Description: "",
//     // });
//     console.log("مقدار", data);
//     sendDataSecondState(data);
//   };

//   const handleNextClick = () => {
//     const values = getValues();

//     if (
//       results.length >= 1 &&
//       !values.name &&
//       !values.Number &&
//       !values.SerialNumber &&
//       !values.Description
//     ) {
//       clearErrors();
//       nextStep();
//     } else {
//       handleSubmit(onSubmit)();
//     }
//     console.log("results", results);
//   };

//   const handleAddClick = () => {
//     const values = getValues();
//     sendDataSecondState(values);
//     appendItem(values);
//     reset({
//       name: "",
//       Number: 0,
//       SerialNumber: "",
//       Description: "",
//     });
//   };

//   return (
//     <form
//       style={{ width: "100%", height: "100%" }}
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <div style={{ width: "100%", height: "80%" }}>
//         <fieldset className="show">
//           <h2 className="fs-title">نوع محصول</h2>
//           <div className="input-container">
//             <div className="input-group">
//               <h5>نام محصول</h5>
//               <Controller
//                 name="name"
//                 control={control}
//                 rules={{
//                   required: "نام محصول الزامی است",
//                   minLength: {
//                     value: 2,
//                     message: "حداقل طول نام محصول دو حرف است",
//                   },
//                   pattern: {
//                     value: /^[^\d].*$/,
//                     message: "نام محصول نباید با عدد شروع شود",
//                   },
//                 }}
//                 render={({ field }) => <input type="text" {...field} />}
//               />
//               <ErrorMessage
//                 errors={errors}
//                 name="name"
//                 as="span"
//                 className="error"
//               />
//             </div>
//             <div className="input-group">
//               <h5>تعداد محصول</h5>
//               <Controller
//                 name="Number"
//                 control={control}
//                 rules={{
//                   required: "تعداد محصول الزامی است",
//                   min: { value: 1, message: "تعداد محصول باید حداقل ۱ باشد" },
//                 }}
//                 render={({ field }) => <input type="number" {...field} />}
//               />
//               <ErrorMessage
//                 errors={errors}
//                 name="Number"
//                 as="span"
//                 className="error"
//               />
//             </div>
//             <div className="input-group">
//               <h5>شماره سریال</h5>
//               <Controller
//                 name="SerialNumber"
//                 control={control}
//                 render={({ field }) => <input type="text" {...field} />}
//               />
//               <ErrorMessage
//                 errors={errors}
//                 name="SerialNumber"
//                 as="span"
//                 className="error"
//               />
//             </div>
//             <div className="input-group">
//               <h5>توضیحات</h5>
//               <Controller
//                 name="Description"
//                 control={control}
//                 rules={{
//                   maxLength: {
//                     value: 200,
//                     message: "توضیحات نباید بیشتر از ۲۰۰ حرف باشد",
//                   },
//                 }}
//                 render={({ field }) => <input type="text" {...field} />}
//               />
//               <ErrorMessage
//                 errors={errors}
//                 name="Description"
//                 as="span"
//                 className="error"
//               />
//             </div>
//           </div>
//         </fieldset>
//         <div className="row">
//           <input
//             type="button"
//             name="add"
//             className="add action-button"
//             value="اضافه کردن"
//             onClick={handleAddClick}
//           />
//           <input
//             type="button"
//             name="prev"
//             className="add action-button"
//             value="قبلی"
//             onClick={prevStep}
//           />
//           <button
//             type="button"
//             className="next action-button"
//             onClick={handleNextClick}
//           >
//             بعدی
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SecondStage;

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import useAxios from "../../../api/useAxios";

interface IResult {
  name: string;
  Number: number;
  SerialNumber: string;
  Description: string;
}

interface FormData {
  name: string;
  Number: number;
  SerialNumber: string;
  Description: string;
}

interface SecondStageProps {
  nextStep: () => void;
  prevStep: () => void;
  appendItem: (item: IResult) => void;
  results: IResult[];
  idProduct: string; // Add this prop
}

const SecondStage: React.FC<SecondStageProps> = ({
  nextStep,
  prevStep,
  appendItem,
  results,
  idProduct, // Add this prop
}) => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      Number: 0,
      SerialNumber: "",
      Description: "",
    },
  });

  const { postData } = useAxios<any>();
  const sendDataSecondState = async (data: FormData) => {
    const success = await postData(
      `http://192.168.100.18:8000/order/${idProduct}`,
      {
        product: data.name,
        amount: data.Number,
        serial: data.SerialNumber,
        // Description: data.Description,
      }
    );
  };

  const onSubmit = (data: FormData) => {
    const values = getValues();
    appendItem(values);
    console.log("مقدار", data);

    sendDataSecondState;
    nextStep();
  };

  const handleNextClick = () => {
    const values = getValues();

    if (
      results.length >= 1 &&
      !values.name &&
      !values.Number &&
      !values.SerialNumber &&
      !values.Description
    ) {
      clearErrors();
      nextStep();
    } else {
      handleSubmit(onSubmit)();
    }
    console.log("results", results);
  };

  const handleAddClick = () => {
    const values = getValues();
    sendDataSecondState(values);
    appendItem(values);
    reset({
      name: "",
      Number: 0,
      SerialNumber: "",
      Description: "",
    });
  };

  return (
    <form
      style={{ width: "100%", height: "100%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ width: "100%", height: "80%" }}>
        <fieldset className="show">
          <h2 className="fs-title">نوع محصول</h2>
          <div className="input-container">
            <div className="input-group">
              <h5>نام محصول</h5>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "نام محصول الزامی است",
                  minLength: {
                    value: 2,
                    message: "حداقل طول نام محصول دو حرف است",
                  },
                  pattern: {
                    value: /^[^\d].*$/,
                    message: "نام محصول نباید با عدد شروع شود",
                  },
                }}
                render={({ field }) => <input type="text" {...field} />}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                as="span"
                className="error"
              />
            </div>
            <div className="input-group">
              <h5>تعداد محصول</h5>
              <Controller
                name="Number"
                control={control}
                rules={{
                  required: "تعداد محصول الزامی است",
                  min: { value: 1, message: "تعداد محصول باید حداقل ۱ باشد" },
                }}
                render={({ field }) => <input type="number" {...field} />}
              />
              <ErrorMessage
                errors={errors}
                name="Number"
                as="span"
                className="error"
              />
            </div>
            <div className="input-group">
              <h5>شماره سریال</h5>
              <Controller
                name="SerialNumber"
                control={control}
                render={({ field }) => <input type="text" {...field} />}
              />
              <ErrorMessage
                errors={errors}
                name="SerialNumber"
                as="span"
                className="error"
              />
            </div>
            <div className="input-group">
              <h5>توضیحات</h5>
              <Controller
                name="Description"
                control={control}
                rules={{
                  maxLength: {
                    value: 200,
                    message: "توضیحات نباید بیشتر از ۲۰۰ حرف باشد",
                  },
                }}
                render={({ field }) => <input type="text" {...field} />}
              />
              <ErrorMessage
                errors={errors}
                name="Description"
                as="span"
                className="error"
              />
            </div>
          </div>
        </fieldset>
        <div className="row">
          <input
            type="button"
            name="add"
            className="add action-button"
            value="اضافه کردن"
            onClick={handleAddClick}
          />
          <input
            type="button"
            name="prev"
            className="add action-button"
            value="قبلی"
            onClick={prevStep}
          />
          <button
            type="button"
            className="next action-button"
            onClick={handleNextClick}
          >
            بعدی
          </button>
        </div>
      </div>
    </form>
  );
};

export default SecondStage;
