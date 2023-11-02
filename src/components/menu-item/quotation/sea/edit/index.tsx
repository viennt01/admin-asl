// import router from 'next/router';
// import {
//   IFormValues,
//   ISeaQuotationEdit,
//   ISeaQuotationFeeFormValue,
//   SeaQuotationDetailDTOsFormValue,
// } from '../interface';
// import { editSeaQuotation } from '../fetcher';
// import { useMutation } from '@tanstack/react-query';
// import { errorToast, successToast } from '@/hook/toast';
// import { API_MESSAGE } from '@/constant/message';
// import SeaQuotation from '../components/form';
// import { STATUS_ALL_LABELS } from '@/constant/form';
// import { returnFeeDTOs, returnQuotationDetails } from '../create';

// const EditSeaQuotation = () => {
//   const checkRow = router.query.checkRow as string;
//   const updateMutation = useMutation({
//     mutationFn: (body: ISeaQuotationEdit) => {
//       return editSeaQuotation(body);
//     },
//   });

//   const handleSubmit = (
//     formValues: IFormValues,
//     idQuery?: string,
//     seaPricingFeeDTOs?: ISeaQuotationFeeFormValue[],
//     seaQuotationDetail?: SeaQuotationDetailDTOsFormValue[]
//   ) => {
//     const returnQuotationDetail = returnQuotationDetails(
//       seaQuotationDetail,
//       formValues.seaQuotationDetailDTOs
//     );
//     console.log(returnQuotationDetail);

//     if (idQuery) {
//       const _requestData: ISeaQuotationEdit = {
//         seaQuotationID: idQuery,
//         podid: formValues.podid || '',
//         polid: formValues.polid || '',
//         commodityID: formValues.commodityID || '',
//         note: formValues.note || '',
//         dateEffect: formValues.dateEffect.valueOf(),
//         validityDate: formValues.validityDate.valueOf(),
//         freqDate: formValues.freqDate || '',
//         demSeaQuotation: formValues.demSeaQuotation || '',
//         detSeaQuotation: formValues.detSeaQuotation || '',
//         stoSeaQuotation: formValues.stoSeaQuotation || '',
//         lclMinSeaQuotation: formValues.lclMinSeaQuotation || '',
//         lclSeaQuotation: formValues.lclSeaQuotation || '',
//         currencyID: formValues.currencyID || '',
//         public: formValues.public || true,
//         seaQuotationDetailUpdateRequests: returnQuotationDetail || [],
//         seaPricingFeeGroupUpdateRequests: returnFeeDTO,
//         statusSeaQuotation:
//           formValues.statusSeaQuotation || STATUS_ALL_LABELS.ACTIVE,
//       };
//       // console.log(_requestData);

//       updateMutation.mutate(_requestData, {
//         onSuccess: (data) => {
//           data.status ? successToast(data.message) : errorToast(data.message);
//         },
//         onError() {
//           errorToast(API_MESSAGE.ERROR);
//         },
//       });
//     } else {
//       errorToast(API_MESSAGE.ERROR);
//     }
//   };

//   return (
//     <SeaQuotation
//       edit
//       handleSubmit={handleSubmit}
//       loadingSubmit={updateMutation.isLoading}
//       checkRow={checkRow === 'true' ? true : false}
//     />
//   );
// };

// export default EditSeaQuotation;
