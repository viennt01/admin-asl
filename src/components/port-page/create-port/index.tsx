import PortForm from '../components/port-form';
import { FormValues, PortCreate } from '../interface';

const CreatePort = () => {
  const handleSubmit = (formValues: FormValues) => {
    const _requestData: PortCreate = {
      portID: formValues.portID,
      countryID: formValues.countryID,
      portName: formValues.portName,
      portCode: formValues.portCode,
      address: formValues.address,
      company: formValues.company,
    };
    console.log('_requestData', _requestData);
  };

  return <PortForm create handleSubmit={handleSubmit} />;
};

export default CreatePort;
