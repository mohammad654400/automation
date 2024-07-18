import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface UseAxiosReturn<T> {
  data: T | null;
  error: string | null;
  status: RequestStatus;
  postData: (url: string, data: any) => Promise<T | null>;
  getData: (url: string) => Promise<T | null>;
  putData: (url: string, data: any) => Promise<T | null>;
}

const useAxios = <T,>(): UseAxiosReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<RequestStatus>("idle");

  const postData = useCallback(
    async (url: string, postData: any): Promise<T | null> => {
      return handleRequest(() => axios.post(url, postData), url, postData);
    },
    []
  );

  const getData = useCallback(async (url: string): Promise<T | null> => {
    return handleRequest(() => axios.get(url), url);
  }, []);

  const putData = useCallback(
    async (url: string, putData: any): Promise<T | null> => {
      return handleRequest(() => axios.put(url, putData), url, putData);
    },
    []
  );

  const handleRequest = async (
    requestFn: () => Promise<AxiosResponse<T>>,
    url: string,
    requestData?: any
  ): Promise<T | null> => {
    setStatus("loading");
    setError(null);

    try {
      const response: AxiosResponse<T> = await requestFn();
      setData(response.data);
      setStatus("succeeded");

      if (response.status === 200) {
        const successMessage = requestData
          ? "ارسال با موفقیت انجام شد."
          : "دریافت داده با موفقیت انجام شد.";
        toast.success(successMessage);
        console.log(successMessage);
        console.log("آدرس:", url);
        if (requestData) console.log("داده‌های ارسال شده:", requestData);
        console.log("داده‌های دریافتی:", response.data);
        return response.data;
      }
    } catch (err) {
      handleError(err);
      setStatus("failed");
    }
    return null;
  };

  const handleError = (err: any) => {
    let errorMessage = "یک خطای ناشناخته رخ داده است.";
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      switch (axiosError.response?.status) {
        case 400:
          errorMessage = "درخواست اشتباه بود.";
          break;
        case 401:
          errorMessage = "شما احراز هویت نشده‌اید.";
          break;
        case 403:
          errorMessage = "دسترسی غیرمجاز.";
          break;
        case 404:
          errorMessage = "منبع مورد نظر یافت نشد.";
          break;
        case 500:
          errorMessage = "خطای سرور داخلی.";
          break;
        default:
          errorMessage = "خطای ناشناخته‌ای رخ داده است.";
      }
    }

    setError(errorMessage);
    toast.error(errorMessage);
  };

  return { data, error, status, postData, getData, putData };
};

export default useAxios;



// import { useState, useCallback } from "react";
// import axios, { AxiosError, AxiosResponse } from "axios";
// import { toast } from "react-toastify";

// type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

// interface UseAxiosReturn<T> {
//   data: T | null;
//   error: string | null;
//   status: RequestStatus;
//   postData: (url: string, data: any) => Promise<boolean>;
//   getData: (url: string) => Promise<boolean>;
// }
// const useAxios = <T,>(): UseAxiosReturn<T> => {
//   const [data, setData] = useState<T | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [status, setStatus] = useState<RequestStatus>("idle");

//   const postData = useCallback(
//     async (url: string, postData: any): Promise<T | null> => {
//       return handleRequest(() => axios.post(url, postData), url, postData);
//     },
//     []
//   );

//   const getData = useCallback(async (url: string): Promise<T | null> => {
//     return handleRequest(() => axios.get(url), url);
//   }, []);

//   const handleRequest = async (
//     requestFn: () => Promise<AxiosResponse<T>>,
//     url: string,
//     postData?: any
//   ): Promise<T | null> => {
//     setStatus("loading");
//     setError(null);

//     try {
//       const response: AxiosResponse<T> = await requestFn();
//       setData(response.data);
//       setStatus("succeeded");

//       if (response.status === 200) {
//         const successMessage = postData
//           ? "ارسال با موفقیت انجام شد."
//           : "دریافت داده با موفقیت انجام شد.";
//         toast.success(successMessage);
//         console.log(successMessage);
//         console.log("آدرس:", url);
//         if (postData) console.log("داده‌های ارسال شده:", postData);
//         console.log("داده‌های دریافتی:", response.data);
//         return response.data;
//       }
//     } catch (err) {
//       handleError(err);
//       setStatus("failed");
//     }
//     return null;
//   };

//   const handleError = (err: any) => {
//     let errorMessage = "یک خطای ناشناخته رخ داده است.";
//     if (axios.isAxiosError(err)) {
//       const axiosError = err as AxiosError;
//       switch (axiosError.response?.status) {
//         case 400:
//           errorMessage = "درخواست اشتباه بود.";
//           break;
//         case 401:
//           errorMessage = "شما احراز هویت نشده‌اید.";
//           break;
//         case 403:
//           errorMessage = "دسترسی غیرمجاز.";
//           break;
//         case 404:
//           errorMessage = "منبع مورد نظر یافت نشد.";
//           break;
//         case 500:
//           errorMessage = "خطای سرور داخلی.";
//           break;
//         default:
//           errorMessage = "خطای ناشناخته‌ای رخ داده است.";
//       }
//     }

//     setError(errorMessage);
//     toast.error(errorMessage);
//   };

//   return { data, error, status, postData, getData };
// };

// export default useAxios;





// const useAxios = <T,>(): UseAxiosReturn<T> => {
//   const [data, setData] = useState<T | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [status, setStatus] = useState<RequestStatus>("idle");

//   const postData = useCallback(
//     async (url: string, postData: any): Promise<boolean> => {
//       return handleRequest(() => axios.post(url, postData), url, postData);
//     },
//     []
//   );

//   const getData = useCallback(async (url: string): Promise<boolean> => {
//     return handleRequest(() => axios.get(url), url);
//   }, []);

//   const handleRequest = async (
//     requestFn: () => Promise<AxiosResponse<T>>,
//     url: string,
//     postData?: any
//   ): Promise<boolean> => {
//     setStatus("loading");
//     setError(null);

//     try {
//       const response: AxiosResponse<T> = await requestFn();
//       setData(response.data);
//       setStatus("succeeded");

//       if (response.status === 200) {
//         const successMessage = postData
//           ? "ارسال با موفقیت انجام شد."
//           : "دریافت داده با موفقیت انجام شد.";
//         toast.success(successMessage);
//         console.log(successMessage);
//         console.log("آدرس:", url);
//         if (postData) console.log("داده‌های ارسال شده:", postData);
//         console.log("داده‌های دریافتی:", response.data);
//         return true;
//       }
//     } catch (err) {
//       handleError(err);
//       setStatus("failed");
//     }
//     return false;
//   };

//   const handleError = (err: any) => {
//     let errorMessage = "یک خطای ناشناخته رخ داده است.";
//     if (axios.isAxiosError(err)) {
//       const axiosError = err as AxiosError;
//       switch (axiosError.response?.status) {
//         case 400:
//           errorMessage = "درخواست اشتباه بود.";
//           break;
//         case 401:
//           errorMessage = "شما احراز هویت نشده‌اید.";
//           break;
//         case 403:
//           errorMessage = "دسترسی غیرمجاز.";
//           break;
//         case 404:
//           errorMessage = "منبع مورد نظر یافت نشد.";
//           break;
//         case 500:
//           errorMessage = "خطای سرور داخلی.";
//           break;
//         default:
//           errorMessage = "خطای ناشناخته‌ای رخ داده است.";
//       }
//     }

//     setError(errorMessage);
//     toast.error(errorMessage);
//   };

//   return { data, error, status, postData, getData };
// };

// export default useAxios;
