const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = './Note/Introduction to Spreadsheets.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

const parser = new PDFParse({ data: dataBuffer });

parser.getText().then(function(data) {
    fs.writeFileSync('./scratch/extracted_spreadsheets.txt', data.text);
    console.log("PDF parsed successfully. Total Pages:", data.total);
}).catch(err => {
    console.error("Error parsing PDF:", err);
});
