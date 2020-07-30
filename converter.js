let selectedFile;
console.log(window.XLSX);

document.getElementById("file-upload").addEventListener('change', (event) => {
    selectedFile = event.target.files[0];
});

document.getElementById("upload-excel").addEventListener('click', () => {
    if (selectedFile) {
        console.log("this is working");
        let fileReader = new FileReader();
        fileReader.onload = (event) => {
            let data = event.target.result;

            let workbook = XLSX.read(data, {
                type: "binary"
            });
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                let jsonObject = JSON.stringify(rowObject);
                document.getElementById("jsonData").innerHTML = jsonObject;
                document.getElementById("json-container").innerHTML = jsonObject;
                console.log(jsonObject);
            });
        };
        fileReader.readAsBinaryString(selectedFile);
    }
});