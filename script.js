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

      // Create table row for desktop (xl and above)
      if (tableBody) {
        const row = document.createElement("tr");
        row.className =
          "border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-200";
        row.dataset.param = key;
        row.dataset.unit = data[key].unit;

        row.innerHTML = `
          <td class="py-4 px-6 text-sm font-medium text-slate-700">${key}</td>
          <td class="py-4 px-6">
            <input type="${valueType}" 
                   placeholder="${placeholderValue}" 
                   class="w-full p-3 border border-slate-300 rounded-xl bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-slate-700 transition-all duration-200 hover:border-slate-400 placeholder-slate-400"
                   data-default="${data[key].value}">
          </td>
          <td class="py-4 px-6 text-sm text-slate-500 font-medium">${data[key].unit}</td>
        `;
        tableBody.appendChild(row);
      }

      // Create card for mobile/responsive layout (below xl)
      if (inputCardsContainer) {
        const card = document.createElement("div");
        card.className =
          "bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 xl:hidden";
        card.dataset.param = key;
        card.dataset.unit = data[key].unit;

        // Get icon based on parameter type
        const getParameterIcon = (paramName) => {
          if (
            paramName.toLowerCase().includes("yarn") ||
            paramName.toLowerCase().includes("count")
          ) {
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>';
          } else if (
            paramName.toLowerCase().includes("production") ||
            paramName.toLowerCase().includes("working")
          ) {
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>';
          } else if (
            paramName.toLowerCase().includes("price") ||
            paramName.toLowerCase().includes("selling") ||
            paramName.toLowerCase().includes("cost") ||
            paramName.toLowerCase().includes("wages")
          ) {
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>';
          } else if (
            paramName.toLowerCase().includes("machine") ||
            paramName.toLowerCase().includes("depreciation") ||
            paramName.toLowerCase().includes("maintenance")
          ) {
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>';
          } else if (
            paramName.toLowerCase().includes("electric") ||
            paramName.toLowerCase().includes("energy") ||
            paramName.toLowerCase().includes("light")
          ) {
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>';
          } else if (
            paramName.toLowerCase().includes("area") ||
            paramName.toLowerCase().includes("building") ||
            paramName.toLowerCase().includes("land")
          ) {
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>';
          } else {
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>';
          }
        };

        card.innerHTML = `
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="font-semibold text-slate-800 text-lg mb-1 leading-tight">${key}</h3>
              <p class="text-sm text-orange-600 font-medium">${
                data[key].unit
              }</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl flex items-center justify-center ml-4 shadow-lg flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${getParameterIcon(key)}
              </svg>
            </div>
          </div>
          <input type="${valueType}" 
                 placeholder="${placeholderValue}" 
                 class="w-full p-4 border border-slate-300 rounded-xl bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-slate-700 transition-all duration-200 hover:border-slate-400 text-lg placeholder-slate-400"
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
    itemDiv.className = "border border-stone-200 rounded-lg";

    const button = document.createElement("button");
    button.className =
      "w-full text-left p-4 bg-stone-50 hover:bg-stone-100 rounded-t-lg focus:outline-none flex justify-between items-center";
    // Conditionally apply rounding for the value based on unit
    const displayValue =
      cost.unit === "%" ? cost.value.toFixed(2) : cost.value.toFixed(3);
    button.innerHTML = `
            <span class="font-medium text-stone-700"><span class="details-icon"></span>${cost.name}: ${displayValue} ${cost.unit}</span>
            <svg class="w-5 h-5 text-stone-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        `;

    const detailsDiv = document.createElement("div");
    detailsDiv.className =
      "p-4 border-t border-stone-200 bg-white rounded-b-lg hidden";
    detailsDiv.innerHTML = `
            <h4 class="font-semibold text-md mb-2 text-orange-600">${
              cost.detailsTitle
            }</h4>
            <ul class="list-disc list-inside space-y-1 text-sm text-stone-600">
                ${cost.details.map((detail) => `<li>${detail}</li>`).join("")}
            </ul>
        `;

    button.addEventListener("click", () => {
      detailsDiv.classList.toggle("hidden");
      button.classList.toggle("details-visible");
      button.querySelector("svg").classList.toggle("rotate-180");
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
  costChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      // Filter out the 'Total Expenses' and 'Net Profit' from the chart labels and data
      labels: calculatedData.costs
        .filter((cost) => cost.unit === "EGP/kg")
        .map((cost) => cost.name.match(/.{1,16}/g).join("\n")),
      datasets: [
        {
          label: "Cost (EGP/kg)",
          data: calculatedData.costs
            .filter((cost) => cost.unit === "EGP/kg")
            .map((cost) => cost.value),
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(100, 159, 100, 0.7)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(100, 159, 100, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Cost (EGP/kg)",
            font: { size: 14, weight: "bold" },
          },
        },
        x: {
          ticks: {
            font: { size: 10 },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += `${context.parsed.y.toFixed(3)} EGP/kg`;
              }
              return label;
            },
          },
        },
      },
    },
  });
}

// Event listener for the "Generate Analysis" button
document.getElementById("generateAnalysisBtn").addEventListener("click", () => {
  const currentInputData = readDataFromTable();
  const newReportData = calculateReportData(currentInputData);
  updateCostAnalysisUI(newReportData);

  // Hide the placeholder and show the cost analysis section
  const placeholderSection = document.getElementById("analysisPlaceholder");
  const costAnalysisSection = document.getElementById("costAnalysis");

  if (placeholderSection) {
    placeholderSection.classList.add("hidden");
  }

  if (costAnalysisSection) {
    costAnalysisSection.classList.remove("hidden");
    costAnalysisSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

// Initial population of the data table only (no calculation on page load)
document.addEventListener("DOMContentLoaded", () => {
  populateDataTable(defaultRawJsonData);
  // Do not perform initial calculation - wait for user input
});
