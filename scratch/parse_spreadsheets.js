import fs from 'fs';
import pdf from 'pdf-parse';

const pdfPath = './Note/Introduction to Spreadsheets.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('./scratch/extracted_spreadsheets.txt', data.text);
    console.log("PDF parsed successfully. Total Pages:", data.numpages);
}).catch(err => {
    console.error("Error parsing PDF:", err);
});
