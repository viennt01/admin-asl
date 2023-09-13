interface Header {
  name: string;
  value: string;
  converter?: (value: any) => any;
}

// generate string based on system date
export const getSystemDate = () => {
  const date = new Date();
  return new Date(Number(date)).toLocaleString();
};

// export data to csv and auto download
export const exportCsv = (data: any, headers: Header[], fileName?: string) => {
  const exportData = data.map((record: any) =>
    headers.map((column) => {
      const value = record[column.value];
      return `"${column.converter ? column.converter(value) : value ?? ''}"`;
    })
  );
  exportData.unshift(headers.map((column) => column.name));

  const csvContent =
    'data:text/csv;charset=UTF-8,' +
    '\uFEFF' +
    exportData.map((row: any) => row.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.href = encodedUri;
  link.download = fileName ? getSystemDate() + '_' + fileName : getSystemDate();
  link.click();
};

// Thay đổi hàm exportCsv để tạo và tải xuống tệp Excel
export const exportExcel = (
  data: any,
  headers: Header[],
  fileName?: string
) => {
  // Tạo một mảng XML cho dữ liệu Excel
  const xmlData = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">',
    '<ss:Worksheet ss:Name="Sheet1">',
    '<ss:Table>',
  ];

  // Thêm hàng tiêu đề
  xmlData.push('<ss:Row>');
  headers.forEach((column) => {
    xmlData.push(
      `<ss:Cell><ss:Data ss:Type="String">${column.name}</ss:Data></ss:Cell>`
    );
  });
  xmlData.push('</ss:Row>');

  // Thêm dữ liệu
  data.forEach((record: any) => {
    xmlData.push('<ss:Row>');
    headers.forEach((column) => {
      const value = record[column.value];
      xmlData.push(
        `<ss:Cell><ss:Data ss:Type="String">${
          column.converter ? column.converter(value) : value ?? ''
        }</ss:Data></ss:Cell>`
      );
    });
    xmlData.push('</ss:Row>');
  });

  // Kết thúc XML
  xmlData.push('</ss:Table>');
  xmlData.push('</ss:Worksheet>');
  xmlData.push('</ss:Workbook>');

  // Tạo một blob từ chuỗi XML và tải xuống nó
  const xmlString = xmlData.join('');
  const blob = new Blob([xmlString], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName
    ? getSystemDate() + '_' + fileName + '.xls'
    : getSystemDate() + '.xls';
  link.click();
};
