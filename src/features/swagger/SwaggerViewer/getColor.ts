export const getMethodColor = (method: string) => {
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

export const getResponseColor = (status: string) => {
  let statusColor = '#B38F37';
  let statusBgColor = '#0D1117';
  let statusBorderColor = '#30363D';

  switch (status) {
    case '200':
      statusColor = '#54CD61';
      statusBgColor = '#1C2128';
      statusBorderColor = '#2A2E4D';
      break;

    default:
      statusColor = '#C49B3B';
      statusBgColor = '#0D1117';
      statusBorderColor = '#30363D';
      break;
  }

  return {
    statusColor,
    statusBgColor,
    statusBorderColor,
  };
};
