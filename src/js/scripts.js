function readExcel() {
            var input = document.getElementById('fileInput');
            if (input.files.length > 0) {
                var file = input.files[0];
                var reader = new FileReader();

                reader.onload = function (e) {
                    var data = readExcelData(e.target.result);
                    displayData(data);
                };

                reader.readAsBinaryString(file);
            }
        }

        function readExcelData(binaryString) {
            var workbook = XLSX.read(binaryString, { type: 'binary' });
            var sheet = workbook.Sheets[workbook.SheetNames[0]];
            var data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            return data;
        }

        function displayData(data) {
            $('#dataTable').empty();
            $('#dataTable').append('<thead><tr></tr></thead>');
            for (var i = 0; i < data[0].length; i++) {
                $('#dataTable thead tr').append('<th>' + data[0][i] + '</th>');
            }

            $('#dataTable').append('<tbody></tbody>');
            for (var i = 1; i < data.length; i++) {
                var row = '<tr>';
                for (var j = 0; j < data[i].length; j++) {
                    row += '<td>' + data[i][j] + '</td>';
                }
                row += '</tr>';
                $('#dataTable tbody').append(row);
            }

            // Initialize DataTables after appending the content
            $('#dataTable').DataTable();
        }