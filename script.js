$(document).ready(function () {
    // Sample data for demonstration
    var dataKeuangan = []; // Memulai dengan data kosong

    var itemsPerPage = 3; // Sesuaikan jumlah item per halaman
    var currentPage = 1;

    // Function to update the financial dashboard
    function updateDashboard() {
        var totalPengeluaran = 0;
        var totalPemasukan = 0;

        // Calculate total pengeluaran and pemasukan
        for (var i = 0; i < dataKeuangan.length; i++) {
            if (dataKeuangan[i].kategori === "Pengeluaran") {
                totalPengeluaran += parseFloat(dataKeuangan[i].jumlah);
            } else if (dataKeuangan[i].kategori === "Pemasukan") {
                totalPemasukan += parseFloat(dataKeuangan[i].jumlah);
            }
        }

        // Update the HTML elements with the calculated values
        $("#total-pengeluaran").text("" + formatCurrency(totalPengeluaran));
        $("#total-pemasukan").text("" + formatCurrency(totalPemasukan));
        $("#saldo").text("" + formatCurrency(totalPemasukan - totalPengeluaran));

        // Menampilkan atau menyembunyikan tabel berdasarkan keberadaan data
        var noDataMessage = "<tr><td colspan='5' class='no-data'>Tidak ada data</td></tr>";
        if (dataKeuangan.length === 0) {
            // Menggunakan efek fade-in untuk menampilkan pesan "Tidak ada data"
            $("#data-keuangan").html(noDataMessage).fadeIn(1000);
            $("#pagination").empty(); // Sembunyikan paginasi jika tidak ada data
        } else {
            $("#data-keuangan").html(noDataMessage); // Menampilkan pesan "Tidak ada data" tanpa fade-in jika ada data
            renderData();
        }
    }

    // Function to format currency with commas
    function formatCurrency(value) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
    }

    // Function to render data in the table with pagination
    function renderData() {
        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var paginatedData = dataKeuangan.slice(startIndex, endIndex);

        $("#data-keuangan").empty(); // Hapus data yang ada

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
        }

        // Attach event handlers for edit and delete buttons
        $(".btn-edit").click(function () {
            var index = $(this).data("index");
            showEditModal(index);
        });

        $(".btn-delete").click(function () {
            var index = $(this).data("index");
            deleteData(index);
        });

        // Render pagination below the table
        renderPagination();
    }

    // Function to show the edit modal with data
    function showEditModal(index) {
        $("#edit-nama").val(dataKeuangan[index].nama);
        $("#edit-jumlah").val(dataKeuangan[index].jumlah);
        $("#edit-kategori").val(dataKeuangan[index].kategori);
        $("#editModal").modal("show");

        // Event handler for update button in edit modal
        $("#btn-update")
            .off("click")
            .on("click", function () {
                updateData(index);
            });
    }

    // Function to add new data
    function addData(nama, jumlah, kategori) {
        dataKeuangan.push({ nama: nama, jumlah: jumlah, kategori: kategori });
        updateDashboard();
        renderData();
        $("#addModal").modal("hide");

        // Reset form values
        $("#nama").val("");
        $("#jumlah").val("");
        $("#kategori").val("");
    }

    // Function to update existing data
    function updateData(index) {
        dataKeuangan[index].nama = $("#edit-nama").val();
        dataKeuangan[index].jumlah = $("#edit-jumlah").val();
        dataKeuangan[index].kategori = $("#edit-kategori").val();
        updateDashboard();
        renderData();
        $("#editModal").modal("hide");
    }

    // Function to delete data
    function deleteData(index) {
        dataKeuangan.splice(index, 1);
        updateDashboard();
        renderData();
    }

    // Render pagination below the table
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

    // Event handler for add button in add modal
    $("#btn-add").click(function () {
        var nama = $("#nama").val();
        var jumlah = $("#jumlah").val();
        var kategori = $("#kategori").val();
        addData(nama, jumlah, kategori);
    });

    // Initialize the dashboard and table on page load
    updateDashboard();
});
