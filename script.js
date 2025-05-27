// Default JSON data (used for initial table population)
const defaultRawJsonData = {
  "Yarn Count": { value: 20, unit: "Ne" },
  "Daily Production": { value: 6, unit: "Ton" },
  "Cotton Factor": { value: 1.13, unit: "" },
  "Corrected Cotton Factor": { value: 1.12, unit: "" },
  "Waste Factor": { value: 1.11, unit: "" },
  "Price of 1 Kg Raw Material": { value: 60, unit: "EPG" },
  "Total Price of Machines (with Taxes)": { value: 200, unit: "Million EGP" },
  "Annual Machines Depreciation Rate": { value: 10, unit: "%" },
  "Annual Investment Rate": { value: 5, unit: "%" },
  "Annual Insurance Rate": { value: 1, unit: "%" },
  "Annual Maintenance Rate": { value: 2, unit: "%" },
  "Annual Working Days": { value: 300, unit: "Days" },
  "Annual Rent of Land & Building": { value: 1.2, unit: "Million EGP" },
  "Processing Specific Energy": { value: 10, unit: "kW·hr/kg" },
  "Electricity Price": { value: 0.65, unit: "EGP/kW·hr" },
  "Air Condition": { value: 12, unit: "%" },
  "Light Intensity": { value: 0.017, unit: "kW·hr/m²" },
  "Area of Mill": { value: 15000, unit: "m²" },
  "Monthly Wages": { value: 400000, unit: "EPG" },
  Packing: { value: 0.5, unit: "%" },
  "Sales & Marketing": { value: 1, unit: "%" },
  "Selling Price of 1 Kg": { value: 110, unit: "EPG" },
};

let reportData; // This will hold the calculated report data
let costChartInstance; // To store the Chart.js instance

// Function to read data from the HTML table and input cards
function readDataFromTable() {
  const data = {};

  // Try reading from table first (desktop)
  const tableBody = document.getElementById("dataTableBody");
  const inputCardsContainer = document.getElementById("inputCardsContainer");

  let elements = [];

  if (tableBody && tableBody.children.length > 0) {
    // Read from table
    elements = Array.from(tableBody.querySelectorAll("tr"));
  } else if (inputCardsContainer && inputCardsContainer.children.length > 0) {
    // Read from cards
    elements = Array.from(inputCardsContainer.children);
  }

  elements.forEach((element) => {
    const paramName = element.dataset.param;
    const inputElement = element.querySelector("input");

    if (inputElement && paramName) {
      const inputValue = inputElement.value.trim();
      const defaultValue =
        inputElement.dataset.default ||
        inputElement.placeholder.replace("e.g., ", "");
      const unit = element.dataset.unit;

      let parsedValue;

      // If input is empty, use default value
      if (
        inputValue === "" ||
        inputValue === null ||
        inputValue === undefined
      ) {
        parsedValue = parseFloat(defaultValue);
      } else {
        // Attempt to parse as number, otherwise keep as string
        if (!isNaN(parseFloat(inputValue)) && isFinite(inputValue)) {
          parsedValue = parseFloat(inputValue);
        } else {
          parsedValue = inputValue;
        }
      }

      data[paramName] = {
        value: parsedValue,
        unit: unit,
      };
    }
  });
  return data;
}

// Function to populate the data input table with placeholders and responsive cards
function populateDataTable(data) {
  const tableBody = document.getElementById("dataTableBody");
  const inputCardsContainer = document.getElementById("inputCardsContainer");

  if (tableBody) tableBody.innerHTML = ""; // Clear existing rows
  if (inputCardsContainer) inputCardsContainer.innerHTML = ""; // Clear existing cards

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const valueType = typeof data[key].value === "number" ? "number" : "text";
      const placeholderValue = `e.g., ${data[key].value}`;

      // Create table row for desktop
      if (tableBody) {
        const row = document.createElement("tr");
        row.className = "hover:bg-gray-50 transition-colors duration-200";
        row.dataset.param = key;
        row.dataset.unit = data[key].unit;

        row.innerHTML = `
          <td class="px-6 py-4 text-sm font-medium text-gray-900">${key}</td>
          <td class="px-6 py-4">
            <input type="${valueType}" 
                   placeholder="${placeholderValue}" 
                   class="w-full"
                   data-default="${data[key].value}">
          </td>
          <td class="px-6 py-4 text-sm text-gray-500 font-medium">${data[key].unit}</td>
        `;
        tableBody.appendChild(row);
      }

      // Create card for mobile layout
      if (inputCardsContainer) {
        const card = document.createElement("div");
        card.className = "input-card";
        card.dataset.param = key;
        card.dataset.unit = data[key].unit;

        card.innerHTML = `
          <h3>${key}</h3>
          <p class="unit">${data[key].unit}</p>
          <input type="${valueType}" 
                 placeholder="${placeholderValue}" 
                 data-default="${data[key].value}">
        `;
        inputCardsContainer.appendChild(card);
      }
    }
  }
}

// Function to calculate report data based on input `data` object
function calculateReportData(data) {
  const dailyProductionTon = data["Daily Production"].value;
  const annualWorkingDays = data["Annual Working Days"].value;
  const annualProductionKg = dailyProductionTon * 1000 * annualWorkingDays; // Convert tons to kg

  // 1. Raw Material Cost
  const priceRawMaterial = data["Price of 1 Kg Raw Material"].value;
  const correctedCottonFactor = data["Corrected Cotton Factor"].value;
  const rawMaterialCost = priceRawMaterial * correctedCottonFactor;

  // 2. Machinery Cost
  const totalPriceMachines =
    data["Total Price of Machines (with Taxes)"].value * 1000000; // Convert Million EGP to EGP
  const depRate = data["Annual Machines Depreciation Rate"].value / 100;
  const invRate = data["Annual Investment Rate"].value / 100;
  const insRate = data["Annual Insurance Rate"].value / 100;
  const maintRate = data["Annual Maintenance Rate"].value / 100;

  const annualDepCost = totalPriceMachines * depRate;
  const annualInvCost = totalPriceMachines * invRate;
  const annualInsCost = totalPriceMachines * insRate;
  const annualMaintCost = totalPriceMachines * maintRate;
  const totalAnnualMachineryFixedCosts =
    annualDepCost + annualInvCost + annualInsCost + annualMaintCost;
  const machineryCost = totalAnnualMachineryFixedCosts / annualProductionKg;

  // 3. Land & Building Cost
  const annualRentLandBuilding =
    data["Annual Rent of Land & Building"].value * 1000000; // Convert Million EGP to EGP
  const landBuildingCost = annualRentLandBuilding / annualProductionKg;

  // 4. Electric Power Cost
  const processingSpecificEnergy = data["Processing Specific Energy"].value;
  const electricityPrice = data["Electricity Price"].value;
  const airConditionPercentage = data["Air Condition"].value / 100;
  const lightIntensity = data["Light Intensity"].value;
  const areaOfMill = data["Area of Mill"].value;
  const annualOperatingHours = 24 * annualWorkingDays;

  const costMainProcessing = processingSpecificEnergy * electricityPrice;
  const costAirCondition = airConditionPercentage * costMainProcessing;
  const annualLightingEnergyConsumption =
    lightIntensity * areaOfMill * annualOperatingHours;
  const annualLightingCost = annualLightingEnergyConsumption * electricityPrice;
  const lightingCostPerKg = annualLightingCost / annualProductionKg;
  const electricPowerCost =
    costMainProcessing + costAirCondition + lightingCostPerKg;

  // 5. Man Power Cost
  const monthlyWages = data["Monthly Wages"].value;
  const annualWages = monthlyWages * 12;
  const manPowerCost = annualWages / annualProductionKg;

  // Packing and Sales & Marketing Costs (as % of Selling Price)
  const sellingPricePerKg = data["Selling Price of 1 Kg"].value;
  const packingPercentage = data["Packing"].value / 100;
  const salesMarketingPercentage = data["Sales & Marketing"].value / 100;

  const packingCost = packingPercentage * sellingPricePerKg;
  const salesMarketingCost = salesMarketingPercentage * sellingPricePerKg;

  // Total Expenses
  const totalExpenses =
    rawMaterialCost +
    machineryCost +
    landBuildingCost +
    electricPowerCost +
    manPowerCost +
    packingCost +
    salesMarketingCost;

  // Net Profit or Loss Before Tax
  const netProfitOrLossBeforeTax =
    ((sellingPricePerKg - totalExpenses) / sellingPricePerKg) * 100;

  return {
    annualProduction: `${annualProductionKg} kg/year`,
    costs: [
      {
        name: "Raw Material Cost",
        value: rawMaterialCost,
        unit: "EGP/kg",
        detailsTitle: "Calculation: Raw Material Cost",
        details: [
          "The raw material cost per kg of yarn is calculated by multiplying the price of 1 kg of raw material by the corrected cotton factor, which accounts for waste removed during processing.",
          `Price of 1 Kg Raw Material = ${data["Price of 1 Kg Raw Material"].value} EGP`,
          `Corrected Cotton Factor = ${data["Corrected Cotton Factor"].value}`,
          `Calculation: ${data["Price of 1 Kg Raw Material"].value} EGP/kg × ${
            data["Corrected Cotton Factor"].value
          } = <strong>${rawMaterialCost.toFixed(3)} EGP/kg</strong>`,
        ],
      },
      {
        name: "Machinery Cost",
        value: machineryCost,
        unit: "EGP/kg",
        detailsTitle: "Calculation: Machinery Cost",
        details: [
          "Machinery cost is a fixed cost component, including annual depreciation, investment (interest on capital), insurance, and maintenance. These annual costs are then divided by the annual production to determine the cost per kg of yarn.",
          `Total Price of Machines (with Taxes) = ${data["Total Price of Machines (with Taxes)"].value} Million EGP`,
          `Annual Machines Depreciation Rate = ${data["Annual Machines Depreciation Rate"].value}%`,
          `Annual Investment Rate = ${data["Annual Investment Rate"].value}%`,
          `Annual Insurance Rate = ${data["Annual Insurance Rate"].value}%`,
          `Annual Maintenance Rate = ${data["Annual Maintenance Rate"].value}%`,
          `Annual Depreciation Cost = ${annualDepCost.toLocaleString()} EGP/year`,
          `Annual Investment Cost = ${annualInvCost.toLocaleString()} EGP/year`,
          `Annual Insurance Cost = ${annualInsCost.toLocaleString()} EGP/year`,
          `Annual Maintenance Cost = ${annualMaintCost.toLocaleString()} EGP/year`,
          `Total Annual Machinery Related Fixed Costs = ${totalAnnualMachineryFixedCosts.toLocaleString()} EGP/year`,
          `Annual Production = ${annualProductionKg.toLocaleString()} kg/year`,
          `Calculation: ${totalAnnualMachineryFixedCosts.toLocaleString()} EGP/year / ${annualProductionKg.toLocaleString()} kg/year = <strong>${machineryCost.toFixed(
            3
          )} EGP/kg</strong>`,
        ],
      },
      {
        name: "Land & Building Cost",
        value: landBuildingCost,
        unit: "EGP/kg",
        detailsTitle: "Calculation: Land & Building Cost",
        details: [
          "The annual rent for land and building, a fixed cost, is divided by the annual production to determine the cost per kg of yarn.",
          `Annual Rent of Land & Building = ${data["Annual Rent of Land & Building"].value} Million EGP`,
          `Annual Production = ${annualProductionKg.toLocaleString()} kg/year`,
          `Calculation: ${annualRentLandBuilding.toLocaleString()} EGP/year / ${annualProductionKg.toLocaleString()} kg/year ≈ <strong>${landBuildingCost.toFixed(
            3
          )} EGP/kg</strong>`,
        ],
      },
      {
        name: "Electric Power Cost",
        value: electricPowerCost,
        unit: "EGP/kg",
        detailsTitle: "Calculation: Electric Power Cost",
        details: [
          "Electric power cost includes main processing consumption, air conditioning, and lighting.",
          `Processing Specific Energy = ${data["Processing Specific Energy"].value} kW·hr/kg`,
          `Electricity Price = ${data["Electricity Price"].value} EGP/kW·hr`,
          `Air Condition = ${data["Air Condition"].value}%`,
          `Light Intensity = ${data["Light Intensity"].value} kW·hr/m²`,
          `Area of Mill = ${data["Area of Mill"].value} m²`,
          `Annual Operating Hours = ${annualOperatingHours} hours/year`,
          `Cost for Main Processing = ${processingSpecificEnergy} kW·hr/kg × ${electricityPrice} EGP/kW·hr = ${costMainProcessing.toFixed(
            3
          )} EGP/kg`,
          `Cost for Air Condition = ${airConditionPercentage} × ${costMainProcessing.toFixed(
            3
          )} EGP/kg = ${costAirCondition.toFixed(3)} EGP/kg`,
          `Annual Lighting Energy Consumption = ${lightIntensity} kW·hr/m² × ${areaOfMill} m² × ${annualOperatingHours} hours/year = ${annualLightingEnergyConsumption.toLocaleString()} kW·hr/year`,
          `Annual Lighting Cost = ${annualLightingEnergyConsumption.toLocaleString()} EGP/year × ${electricityPrice} EGP/kW·hr = ${annualLightingCost.toLocaleString()} EGP/year`,
          `Lighting Cost per kg = ${annualLightingCost.toLocaleString()} EGP/year / ${annualProductionKg.toLocaleString()} kg/year ≈ <strong>${lightingCostPerKg.toFixed(
            3
          )} EGP/kg</strong>`,
          `Calculation: ${costMainProcessing.toFixed(
            3
          )} + ${costAirCondition.toFixed(3)} + ${lightingCostPerKg.toFixed(
            3
          )} ≈ <strong>${electricPowerCost.toFixed(3)} EGP/kg</strong>`,
        ],
      },
      {
        name: "Man Power Cost",
        value: manPowerCost,
        unit: "EGP/kg",
        detailsTitle: "Calculation: Man Power Cost",
        details: [
          "Manpower cost is derived from the total annual wages divided by the annual production.",
          `Monthly Wages = ${data["Monthly Wages"].value.toLocaleString()} EGP`,
          `Annual Wages = ${annualWages.toLocaleString()} EGP/year`,
          `Annual Production = ${annualProductionKg.toLocaleString()} kg/year`,
          `Calculation: ${annualWages.toLocaleString()} EGP/year / ${annualProductionKg.toLocaleString()} kg/year ≈ <strong>${manPowerCost.toFixed(
            3
          )} EGP/kg</strong>`,
        ],
      },
      {
        name: "Packing Cost",
        value: packingCost,
        unit: "EGP/kg",
        detailsTitle: "Calculation: Packing Cost",
        details: [
          "Packing cost is calculated as a percentage of the selling price.",
          `Selling Price of 1 Kg = ${data["Selling Price of 1 Kg"].value} EGP`,
          `Packing Percentage = ${data["Packing"].value}%`,
          `Calculation: ${packingPercentage} × ${sellingPricePerKg} EGP/kg = <strong>${packingCost.toFixed(
            3
          )} EGP/kg</strong>`,
        ],
      },
      {
        name: "Sales & Marketing Cost",
        value: salesMarketingCost,
        unit: "EGP/kg",
        detailsTitle: "Calculation: Sales & Marketing Cost",
        details: [
          "Sales & Marketing cost is calculated as a percentage of the selling price.",
          `Selling Price of 1 Kg = ${data["Selling Price of 1 Kg"].value} EGP`,
          `Sales & Marketing Percentage = ${data["Sales & Marketing"].value}%`,
          `Calculation: ${salesMarketingPercentage} × ${sellingPricePerKg} EGP/kg = <strong>${salesMarketingCost.toFixed(
            3
          )} EGP/kg</strong>`,
        ],
      },
      {
        name: "Total Expenses",
        value: totalExpenses,
        unit: "EGP/kg",
        detailsTitle: "Calculation: Total Expenses (EGP/kg)",
        details: [
          "Total Expenses per kilogram of yarn is the sum of all individual cost components.",
          `Total Expenses = Raw Material Cost + Machinery Cost + Land & Building Cost + Electric Power Cost + Man Power Cost + Packing Cost + Sales & Marketing Cost`,
          `Calculation: ${rawMaterialCost.toFixed(3)} + ${machineryCost.toFixed(
            3
          )} + ${landBuildingCost.toFixed(3)} + ${electricPowerCost.toFixed(
            3
          )} + ${manPowerCost.toFixed(3)} + ${packingCost.toFixed(
            3
          )} + ${salesMarketingCost.toFixed(
            3
          )} = <strong>${totalExpenses.toFixed(3)} EGP/kg</strong>`,
        ],
      },
      {
        name: "Net Profit or Loss Before Tax",
        value: netProfitOrLossBeforeTax,
        unit: "%",
        detailsTitle: "Calculation: Net Profit or Loss Before Tax (%)",
        details: [
          "Net Profit or Loss Before Tax is calculated as the percentage difference between the selling price per kilogram and the total expenses per kilogram, relative to the selling price.",
          `Selling Price of 1 Kg = ${sellingPricePerKg} EGP/kg`,
          `Total Expenses = ${totalExpenses.toFixed(3)} EGP/kg`,
          `Calculation: ((Selling Price - Total Expenses) / Selling Price) × 100%`,
          `Calculation: ((${sellingPricePerKg} - ${totalExpenses.toFixed(
            3
          )}) / ${sellingPricePerKg}) × 100% = <strong>${netProfitOrLossBeforeTax.toFixed(
            2
          )}%</strong>`,
        ],
      },
    ],
    totalExpenses: totalExpenses,
    netProfitPercentage: netProfitOrLossBeforeTax,
  };
}

// Function to update the Cost Analysis UI
function updateCostAnalysisUI(calculatedData) {
  const costDetailsContainer = document.getElementById("costDetailsContainer");
  costDetailsContainer.innerHTML = ""; // Clear existing content

  calculatedData.costs.forEach((cost) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cost-detail-item";

    const button = document.createElement("button");
    button.className = "cost-detail-button";

    // Conditionally apply rounding for the value based on unit
    const displayValue =
      cost.unit === "%" ? cost.value.toFixed(2) : cost.value.toFixed(3);

    button.innerHTML = `
      <span>${cost.name}: ${displayValue} ${cost.unit}</span>
      <svg class="w-5 h-5 text-gray-400 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    `;

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "cost-detail-content";
    detailsDiv.innerHTML = `
      <h4>${cost.detailsTitle}</h4>
      <ul>
        ${cost.details.map((detail) => `<li>${detail}</li>`).join("")}
      </ul>
    `;

    button.addEventListener("click", () => {
      const isShowing = detailsDiv.classList.contains("show");
      detailsDiv.classList.toggle("show", !isShowing);
      button.querySelector("svg").style.transform = isShowing
        ? "rotate(0deg)"
        : "rotate(180deg)";
    });

    itemDiv.appendChild(button);
    itemDiv.appendChild(detailsDiv);
    costDetailsContainer.appendChild(itemDiv);
  });

  document.getElementById(
    "totalExpensesValue"
  ).textContent = `${calculatedData.totalExpenses.toFixed(3)} EGP/kg`;
  document.getElementById(
    "netProfitValue"
  ).textContent = `${calculatedData.netProfitPercentage.toFixed(2)}%`;

  // Update Cost Breakdown Chart
  const ctx = document.getElementById("costBreakdownChart").getContext("2d");
  if (costChartInstance) {
    costChartInstance.destroy(); // Destroy existing chart instance
  }

  // Filter out the 'Total Expenses' and 'Net Profit' from the chart labels and data
  const chartData = calculatedData.costs.filter(
    (cost) =>
      cost.name !== "Total Expenses" &&
      cost.name !== "Net Profit or Loss Before Tax"
  );

  costChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartData.map((cost) => cost.name),
      datasets: [
        {
          label: "Cost (EGP/kg)",
          data: chartData.map((cost) => cost.value),
          backgroundColor: [
            "#3b82f6",
            "#ef4444",
            "#10b981",
            "#f59e0b",
            "#8b5cf6",
            "#ec4899",
            "#06b6d4",
          ],
          borderColor: [
            "#2563eb",
            "#dc2626",
            "#059669",
            "#d97706",
            "#7c3aed",
            "#db2777",
            "#0891b2",
          ],
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "white",
          bodyColor: "white",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: function (context) {
              return `${context.parsed.y.toFixed(3)} EGP/kg`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "#f3f4f6",
          },
          ticks: {
            color: "#6b7280",
            font: {
              size: 12,
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#6b7280",
            font: {
              size: 12,
            },
            maxRotation: 45,
          },
        },
      },
      layout: {
        padding: {
          top: 20,
          bottom: 20,
        },
      },
    },
  });
}

// Event listeners and initialization
document.addEventListener("DOMContentLoaded", function () {
  // Populate the table with default data
  populateDataTable(defaultRawJsonData);

  // Event listener for the generate analysis button
  document
    .getElementById("generateAnalysisBtn")
    .addEventListener("click", function () {
      const inputData = readDataFromTable();

      // Validate that we have data
      if (Object.keys(inputData).length === 0) {
        alert("Please fill in the required data first.");
        return;
      }

      reportData = calculateReportData(inputData);
      updateCostAnalysisUI(reportData);

      // Hide placeholder and show results
      document.getElementById("analysisPlaceholder").classList.add("hidden");
      document.getElementById("costAnalysis").classList.remove("hidden");
      document.getElementById("costAnalysis").classList.add("fade-in");

      // Scroll to results
      document.getElementById("costAnalysis").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
});
