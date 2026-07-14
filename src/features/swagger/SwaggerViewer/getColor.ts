export const getMethodColor = (method: string) => {
  let methodBgColor = '#388bfd18';
  let methodBorderColor = '#388bfd35';
  let methodColor = '#79c0ff';

  switch (method) {
    case 'POST':
      methodBgColor = '#23863618';
      methodBorderColor = '#23863635';
      methodColor = '#56d364';
      break;
    case 'PUT':
      methodBgColor = '#7c3aed18';
      methodBorderColor = '#7c3aed35';
      methodColor = '#a78bfa';
      break;
    case 'DELETE':
      methodBgColor = '#f8514918';
      methodBorderColor = '#f8514935';
      methodColor = '#ff7b72';
      break;

    default:
      methodBgColor = '#1D293A';
      methodBorderColor = '#203A60';
      break;
  }

  return {
    methodBgColor,
    methodBorderColor,
    methodColor,
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
    case '201':
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
