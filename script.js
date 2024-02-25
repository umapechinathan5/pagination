var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);
request.send();
request.onload = function () {
  var data = JSON.parse(request.response);

  const itemsPerPage = 10;
  let currentPage = 1;

  const tableBody = document.getElementById("table-body");
  const paginationDiv = document.getElementById("pagination");

  function renderTable(page) {
    tableBody.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);
    paginatedData.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function renderPagination() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    paginationDiv.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "< Previous";
    prevButton.classList.add("page-btn");
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
        renderPagination();
      }
    });
    paginationDiv.appendChild(prevButton);

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("page-btn");
      if (i === currentPage) {
        pageButton.disabled = true;
      }
      pageButton.addEventListener("click", () => {
        currentPage = i;
        renderTable(currentPage);
        renderPagination();
      });
      paginationDiv.appendChild(pageButton);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next >";
    nextButton.classList.add("page-btn");
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable(currentPage);
        renderPagination();
      }
    });
    paginationDiv.appendChild(nextButton);
  }

  // Initial render
  renderTable(currentPage);
  renderPagination();
};
