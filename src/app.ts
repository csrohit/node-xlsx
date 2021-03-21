import * as xlsx from 'xlsx';
import express, { Request } from "express";
import multer, { } from 'multer';




const app: express.Application = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage });



app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.post('/', upload.single('file'), (req: Request, res) => {
    const file = xlsx.readFile('test.xlsx');

    const data: any[] = []

    const sheets = file.SheetNames;
    console.log(file.Sheets);

    sheets.forEach(sheet => {
        const sheetData = xlsx.utils.sheet_to_json(file.Sheets[sheet]);
        data[sheet] = sheetData
    });

    return res.json({ data });
});



app.listen(3000, () => {
    console.log('Started on port 3000');
});









