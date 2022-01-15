// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
    var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
      let ufoelement = d3.select(this);
    // 4b. Save the value that was changed as a variable.
      let ufovalue = ufoelement.property("value");
    // 4c. Save the id of the filter that was changed as a variable.
      let ufoId = ufoelement.attr("id");
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
      if (ufovalue) {
        filters[ufoId] = ufovalue;
      }
      else {
        delete filtersz[ufoId];
      }
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {  
    
    
    // 8. Set the filtered data to the tableData.
    filterData = tableData; 
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    let var_date = d3.select("#datetime").property("value");
    let var_city = d3.select("#city").property("value");
    let var_state = d3.select("#state").property("value");
    let var_country = d3.select("#country").property("value");
    let var_shape = d3.select("#shape").property("value");
    let var_comment = d3.select("#comment").property("value");



    if (var_date) {
      filterData = filterData.filter(row => row.datetime === var_date);
    }
    if (var_city) {
      filterData = filterData.filter(row => row.city === var_city);
    }
    if (var_state) {
      filterData = filterData.filter(row => row.state === var_state);
    }
    if (var_country) {
      filterData = filterData.filter(row => row.country === var_country);
    }
    if (var_shape) {
      filterData = filterData.filter(row => row.shape === var_shape);
    }
    if (var_comment) {
      filterData = filterData.filter(row => String(row.comments).toLowerCase().includes(var_comment.toLowerCase()));
    }

    // 10. Finally, rebuild the table using the filtered data
    buildTable(filterData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("#datetime").on("change", filterTable);
  d3.selectAll("#city").on("change", filterTable);
  d3.selectAll("#state").on("change", filterTable);
  d3.selectAll("#country").on("change", filterTable);
  d3.selectAll("#shape").on("change", filterTable);
  d3.selectAll("#comment").on("change", filterTable);

  
  
  // Build the table when the page loads
  buildTable(tableData);
