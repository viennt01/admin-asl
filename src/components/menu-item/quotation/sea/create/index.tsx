// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { ROUTERS } from '@/constant/router';
// import { errorToast, successToast } from '@/hook/toast';
// import router from 'next/router';
// import { API_MESSAGE } from '@/constant/message';
// import SeaQuotation from '../components/form';
// import {
//   IFormValues,
//   ISeaQuotationCreate,
//   ISeaQuotationDetailDTOsUpdate,
//   ISeaQuotationEdit,
//   ISeaQuotationFeeFormValue,
//   SeaQuotationDetailDTOsFormValue,
// } from '../interface';
// import { createSeaQuotation, editSeaQuotation } from '../fetcher';
// import { STATUS_ALL_LABELS } from '@/constant/form';
// import { API_SEA_QUOTATION } from '@/fetcherAxios/endpoint';

// export const returnFeeDTOs = (
//   seaPricingFeeDTOs?: ISeaQuotationFeeFormValue[],
//   fromSeaPricingFeeDTOs?: string[]
// ) => {
//   const resultArray = JSON.parse(
//     JSON.stringify(
//       seaPricingFeeDTOs?.map((item) => ({
//         seaQuotationID: item.seaQuotationID,
//         feeGroupID: item.feeGroupID,
//         public: item.public,
//       }))
//     )
//   );

//   for (const item of resultArray) {
//     if (
//       fromSeaPricingFeeDTOs &&
//       fromSeaPricingFeeDTOs.includes(item.feeGroupID)
//     ) {
//       item.isDelete = false;
//     } else {
//       item.isDelete = true;
//     }
//   }
//   if (fromSeaPricingFeeDTOs) {
//     for (const id of fromSeaPricingFeeDTOs) {
//       if (
//         !resultArray.some(
//           (item: ISeaQuotationFeeFormValue) => item.feeGroupID === id
//         )
//       ) {
//         resultArray.push({
//           feeGroupID: id,
//           public: true,
//           isDelete: false,
//         });
//       }
//     }
//   }
//   return resultArray;
// };

// export const returnQuotationDetails = (
//   old?: SeaQuotationDetailDTOsFormValue[],
//   newData?: ISeaQuotationDetailDTOsUpdate[]
// ) => {
//   if (!newData) {
//     return [];
//   }
//   const mergedData = old?.map((oldItem) => {
//     const newItem = newData.find(
//       (newItem) =>
//         newItem.seaQuotationDetailID === oldItem.seaQuotationDetailID &&
//         newItem.containerTypeID === oldItem.containerTypeID
//     );

//     if (newItem) {
//       return {
//         ...oldItem,
//         ...newItem,
//         isDelete: false,
//       };
//     }

//     return { ...oldItem, isDelete: true };
//   });

//   const itemsInNewButNotInOld = newData
//     .filter(
//       (newItem) =>
//         !old?.some(
//           (oldItem) =>
//             newItem.seaQuotationDetailID === oldItem.seaQuotationDetailID &&
//             newItem.containerTypeID === oldItem.containerTypeID
//         )
//     )
//     .map((newItem) => ({ ...newItem, isDelete: false }));

//   const result = [...(mergedData ?? []), ...(itemsInNewButNotInOld ?? [])].map(
//     ({ ...rest }) => rest
//   );

//   return result;
// };

// const CreateSeaQuotation = () => {
//   const queryClient = useQueryClient();

//   const createMutation = useMutation({
//     mutationFn: (body: ISeaQuotationCreate) => {
//       return createSeaQuotation(body);
//     },
//   });

//   const updateMutation = useMutation({
//     mutationFn: (body: ISeaQuotationEdit) => {
//       return editSeaQuotation(body);
//     },
//   });

//   const handleSubmit = (
//     formValues: IFormValues,
//     id?: string,
//     seaPricingFeeDTOs?: ISeaQuotationFeeFormValue[],
//     seaQuotationDetail?: SeaQuotationDetailDTOsFormValue[]
//   ) => {
//     const seaQuotationDetailRegisterRequests =
//       formValues.seaQuotationDetailDTOs.map((data) => {
//         return {
//           containerTypeID: data.containerTypeID,
//           currencyID: data.currencyID,
//           priceQuotationDetail: data.price,
//         };
//       });
//     // const returnFeeDTO = returnFeeDTOs(
//     //   seaPricingFeeDTOs,
//     //   formValues.seaPricingFeeDTOs
//     // );

//     const returnQuotationDetail = returnQuotationDetails(
//       seaQuotationDetail,
//       formValues.seaQuotationDetailDTOs
//     );

//     if (id) {
//       const _requestData: ISeaQuotationEdit = {
//         seaQuotationID: id || '',
//         podid: formValues.podid || '',
//         polid: formValues.polid || '',
//         commodityID: formValues.commodityID || '',
//         note: formValues.note || '',
//         dateEffect: formValues.dateEffect?.valueOf(),
//         validityDate: formValues.validityDate?.valueOf(),
//         freqDate: formValues.freqDate || '',
//         demSeaQuotation: formValues.demSeaQuotation || '',
//         detSeaQuotation: formValues.detSeaQuotation || '',
//         stoSeaQuotation: formValues.stoSeaQuotation || '',
//         lclSeaQuotation: formValues.lclSeaQuotation || '',
//         lclMinSeaQuotation: formValues.lclMinSeaQuotation || '',
//         currencyID: formValues.currencyID || '',
//         public: formValues.public || true,
//         seaQuotationDetailUpdateRequests: returnQuotationDetail || [],
//         // seaPricingFeeGroupUpdateRequests: returnFeeDTO,
//         statusSeaQuotation: STATUS_ALL_LABELS.REQUEST,
//       };

//       // updateMutation.mutate(_requestData, {
//       //   onSuccess: (data) => {
//       //     data.status
//       //       ? (successToast(data.message), router.push(ROUTERS.SEA_PRICING))
//       //       : errorToast(data.message);
//       //   },
//       //   onError() {
//       //     errorToast(API_MESSAGE.ERROR);
//       //   },
//       // });
//     } else {
//       const _requestData: ISeaQuotationCreate = {
//         podid: formValues.podid || '',
//         polid: formValues.polid || '',
//         commodityID: formValues.commodityID || '',
//         note: formValues.note || '',
//         dateEffect: formValues.dateEffect?.valueOf(),
//         validityDate: formValues.validityDate?.valueOf(),
//         freqDate: formValues.freqDate || '',
//         demSeaQuotation: formValues.demSeaQuotation || '',
//         detSeaQuotation: formValues.detSeaQuotation || '',
//         stoSeaQuotation: formValues.stoSeaQuotation || '',
//         lclSeaQuotation: formValues.lclSeaQuotation || '',
//         lclMinSeaQuotation: formValues.lclMinSeaQuotation || '',
//         currencyID: formValues.currencyID || '',
//         public: formValues.public || true,
//         seaQuotationDetailRegisterRequests:
//           seaQuotationDetailRegisterRequests || [],
//         // seaPricingFeeGroupRegisterRequests: returnFeeDTO,
//         statusSeaQuotation: STATUS_ALL_LABELS.REQUEST,
//       };
//       console.log(_requestData);

//       // createMutation.mutate(_requestData, {
//       //   onSuccess: (data) => {
//       //     data.status
//       //       ? (successToast(data.message), router.push(ROUTERS.SEA_PRICING))
//       //       : errorToast(data.message);
//       //   },
//       //   onError() {
//       //     errorToast(API_MESSAGE.ERROR);
//       //   },
//       // });
//     }
//   };

//   const handleSaveDraft = (
//     formValues: IFormValues,
//     id?: string,
//     seaPricingFeeDTOs?: ISeaQuotationFeeFormValue[],
//     seaQuotationDetail?: SeaQuotationDetailDTOsFormValue[]
//   ) => {
//     const seaQuotationDetailRegisterRequests =
//       formValues.seaQuotationDetailDTOs.map((data) => {
//         return {
//           containerTypeID: data.containerTypeID,
//           currencyID: data.currencyID,
//           priceQuotationDetail: data.price,
//         };
//       });
//     // const returnFeeDTO = returnFeeDTOs(
//     //   seaPricingFeeDTOs,
//     //   formValues.seaPricingFeeDTOs
//     // );
//     const returnQuotationDetail = returnQuotationDetails(
//       seaQuotationDetail,
//       formValues.seaQuotationDetailDTOs
//     );
//     if (id) {
//       const _requestData: ISeaQuotationEdit = {
//         seaQuotationID: id,
//         podid: formValues.podid || '',
//         polid: formValues.polid || '',
//         commodityID: formValues.commodityID || '',
//         note: formValues.note || '',
//         dateEffect: formValues.dateEffect?.valueOf(),
//         validityDate: formValues.validityDate?.valueOf(),
//         freqDate: formValues.freqDate || '',
//         demSeaQuotation: formValues.demSeaQuotation || '',
//         detSeaQuotation: formValues.detSeaQuotation || '',
//         stoSeaQuotation: formValues.stoSeaQuotation || '',
//         lclSeaQuotation: formValues.lclSeaQuotation || '',
//         lclMinSeaQuotation: formValues.lclMinSeaQuotation || '',
//         currencyID: formValues.currencyID || '',
//         public: formValues.public || true,
//         seaQuotationDetailUpdateRequests: returnQuotationDetail || [],
//         // seaPricingFeeGroupUpdateRequests: returnFeeDTO,
//         statusSeaQuotation: STATUS_ALL_LABELS.DRAFT,
//       };
//       console.log(_requestData);

//       // updateMutation.mutate(_requestData, {
//       //   onSuccess: (data) => {
//       //     data.status
//       //       ? (successToast(data.message),
//       //         queryClient.invalidateQueries({
//       //           queryKey: [API_SEA_QUOTATION.GET_SEARCH],
//       //         }))
//       //       : errorToast(data.message);
//       //   },
//       //   onError() {
//       //     errorToast(API_MESSAGE.ERROR);
//       //   },
//       // });
//     } else {
//       const _requestData: ISeaQuotationCreate = {
//         podid: formValues.podid || '',
//         polid: formValues.polid || '',
//         commodityID: formValues.commodityID || '',
//         note: formValues.note || '',
//         dateEffect: formValues.dateEffect?.valueOf(),
//         validityDate: formValues.validityDate?.valueOf(),
//         freqDate: formValues.freqDate || '',
//         demSeaQuotation: formValues.demSeaQuotation || '',
//         detSeaQuotation: formValues.detSeaQuotation || '',
//         stoSeaQuotation: formValues.stoSeaQuotation || '',
//         lclSeaQuotation: formValues.lclSeaQuotation || '',
//         lclMinSeaQuotation: formValues.lclMinSeaQuotation || '',
//         currencyID: formValues.currencyID || '',
//         public: formValues.public || true,
//         seaQuotationDetailRegisterRequests:
//           seaQuotationDetailRegisterRequests || [],
//         // seaPricingFeeGroupRegisterRequests: returnFeeDTO,
//         statusSeaQuotation: STATUS_ALL_LABELS.DRAFT,
//       };
//       console.log(_requestData);

//       // createMutation.mutate(_requestData, {
//       //   onSuccess: (data) => {
//       //     data.status
//       //       ? (successToast(data.message),
//       //         queryClient.invalidateQueries({
//       //           queryKey: [API_SEA_QUOTATION.GET_SEARCH],
//       //         }))
//       //       : errorToast(data.message);
//       //   },
//       //   onError() {
//       //     errorToast(API_MESSAGE.ERROR);
//       //   },
//       // });
//     }
//   };

//   return (
//     <SeaQuotation
//       create
//       handleSubmit={handleSubmit}
//       handleSaveDraft={handleSaveDraft}
//       loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
//       checkRow={false}
//       useDraft
//     />
//   );
// };

// export default CreateSeaQuotation;
