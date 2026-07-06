const getColor = (method: string) => {
  let methodBgColor = '#1D293A';
  let methodBorderColor = '#203A60';

  switch (method) {
    case 'POST':
      methodBgColor = '#1B2927';
      methodBorderColor = '#193927';
      break;
    case 'PATCH':
      methodBgColor = '#201D35';
      methodBorderColor = '#34235A';
      break;
    case 'DELETE':
      methodBgColor = '#2B2026';
      methodBorderColor = '#582D30';
      break;

    default:
      methodBgColor = '#1D293A';
      methodBorderColor = '#203A60';
      break;
  }

  return {
    methodBgColor,
    methodBorderColor,
  };
};

export default getColor;
