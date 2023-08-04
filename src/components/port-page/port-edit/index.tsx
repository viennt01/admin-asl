import PortForm from '../components/port-form';
import { FormValues, PortEdit } from '../interface';

const EditPort = () => {
  const handleSubmit = (formValues: FormValues) => {
    const _requestData: PortEdit = {
      portID: formValues.portID,
      countryID: formValues.countryID,
      portName: formValues.portName,
      portCode: formValues.portCode,
      address: formValues.address,
      company: formValues.company,
      status: formValues.status,
    };
    console.log('_requestData', _requestData);
  };

  return <PortForm handleSubmit={handleSubmit} />;
};

export default EditPort;
