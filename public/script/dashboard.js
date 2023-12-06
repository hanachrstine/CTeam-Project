$(document).ready(function () {

    var dataKeuangan = [];

    var itemsPerPage = 3;
    var currentPage = 1;

    function saveDataToLocalStorage() {
        console.log(dataKeuangan);
        localStorage.setItem("dataKeuangan", JSON.stringify(dataKeuangan));
    }

    function loadDataFromLocalStorage() {
        var storedData = localStorage.getItem("dataKeuangan");
        if (storedData) {
            dataKeuangan = [];
            dataKeuangan = JSON.parse(storedData);
        }
    }

    function updateDashboard() {
        var totalPengeluaran = 0;
        var totalPemasukan = 0;

        for (var i = 0; i < dataKeuangan.length; i++) {
            if (dataKeuangan[i].kategori === "Pengeluaran") {
                totalPengeluaran += parseFloat(dataKeuangan[i].jumlah);
            } else if (dataKeuangan[i].kategori === "Pemasukan") {
                totalPemasukan += parseFloat(dataKeuangan[i].jumlah);
            }
        }

        $("#total-pengeluaran").text("" + formatCurrency(totalPengeluaran));
        $("#total-pemasukan").text("" + formatCurrency(totalPemasukan));
        $("#saldo").text("" + formatCurrency(totalPemasukan - totalPengeluaran));

        var noDataMessage = "<tr><td colspan='5' class='no-data'>Tidak ada data</td></tr>";
        if (dataKeuangan.length === 0) {
            
            // $("#data-keuangan").html(noDataMessage).fadeIn(500);
            $("#pagination").empty();
        } else {
            $("#data-keuangan").html(noDataMessage);
            renderData();
        }

        saveDataToLocalStorage();
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
    }

    function renderData() {
        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var paginatedData = dataKeuangan.slice(startIndex, endIndex);

        $("#data-keuangan").empty();

        for (var i = 0; i < paginatedData.length; i++) {
            var row = "<tr>";
            row += "<td>" + (startIndex + i + 1) + "</td>";
            row += "<td>" + paginatedData[i].nama + "</td>";
            row += "<td>" + formatCurrency(paginatedData[i].jumlah) + "</td>";
            row += "<td>" + paginatedData[i].kategori + "</td>";
            row +=
                "<td><button class='btn btn-warning btn-edit' data-index='" +
                (startIndex + i) +
                "'>Edit</button> <button class='btn btn-danger btn-delete' data-index='" +
                (startIndex + i) +
                "'>Delete</button></td>";
            row += "</tr>";
            $("#data-keuangan").append(row);

            saveDataToLocalStorage();
        }

        $(".btn-edit").click(function () {
            var index = $(this).data("index");
            showEditModal(index);
        });

        $(".btn-delete").click(function () {
            var index = $(this).data("index");
            deleteData(index);
        });

        renderPagination();
    }

    function showEditModal(index) {
        $("#edit-nama").val(dataKeuangan[index].nama);
        $("#edit-jumlah").val(dataKeuangan[index].jumlah);
        $("#edit-kategori").val(dataKeuangan[index].kategori);
        $("#editModal").modal("show");

        $("#btn-update")
            .off("click")
            .on("click", function () {
                updateData(index);
            });

    }

    function addData(nama, jumlah, kategori) {
        dataKeuangan.push({ nama: nama, jumlah: jumlah, kategori: kategori });
        updateDashboard();
        renderData();
        $("#addModal").modal("hide");

        $("#nama").val("");
        $("#jumlah").val("");
        $("#kategori").val("");

        saveDataToLocalStorage();
    }

    function updateData(index) {
        dataKeuangan[index].nama = $("#edit-nama").val();
        dataKeuangan[index].jumlah = $("#edit-jumlah").val();
        dataKeuangan[index].kategori = $("#edit-kategori").val();
        updateDashboard();
        renderData();
        $("#editModal").modal("hide");
        
        saveDataToLocalStorage();
    }

    function deleteData(index) {
        dataKeuangan.splice(index, 1);
        updateDashboard();
        renderData();
        
        saveDataToLocalStorage();
    }
    
    loadDataFromLocalStorage();
    updateDashboard();

    function renderPagination() {
        var totalPages = Math.ceil(dataKeuangan.length / itemsPerPage);
        var pagination = $("#pagination").empty();

        for (var i = 1; i <= totalPages; i++) {
            var li = $("<li class='page-item'><a class='page-link' href='#'>" + i + "</a></li>");
            if (i === currentPage) {
                li.addClass("active");
            }

            li.click(function () {
                currentPage = parseInt($(this).text());
                renderData();
            });

            pagination.append(li);
        }
    }


    $("#btn-add").click(function () {
        var nama = $("#nama").val();
        var jumlah = $("#jumlah").val();
        var kategori = $("#kategori").val();
        addData(nama, jumlah, kategori);
    });

    updateDashboard();
});
