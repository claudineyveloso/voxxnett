export const MaskPhone = ({ event }) => {
  const [Phone, setPhone] = useState('');
  const [CellPhone, setCellPhone] = useState('');

  const handlePhoneMask = (event) => {
    let inputValue = event.target.value;
    let lengthInput = 0;
    event.target.name === 'customer.phone'
      ? (lengthInput = 9)
      : (lengthInput = 10);

    inputValue = inputValue.replace(/\D/g, '');
    if (inputValue.length >= 2) {
      inputValue = `(${inputValue.substring(0, 2)}) ${inputValue.substring(2)}`;
    }
    if (inputValue.length >= lengthInput) {
      inputValue = `${inputValue.substring(
        0,
        lengthInput
      )}-${inputValue.substring(lengthInput)}`;
    }
    event.target.name === 'customer.phone'
      ? setPhone(inputValue)
      : setCellPhone(inputValue);
  };
};
