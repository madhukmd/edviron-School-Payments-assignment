import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

import "./index.css";

function VisualizationData({ data }) {
  // console.log(data)

  if (!data) {
    return (
      <div className="error-chart">
        <h1>Visual Dashboard</h1>
        <p className="error-heading">Something went wrong while getting Charts...</p>
      </div>
    );
  }

  const gatewayData = [
    {
      name: "PHONEPE",
      value: data.filter((item) => item.gateway === "PHONEPE").length,
    },
    {
      name: "CASHFREE",
      value: data.filter((item) => item.gateway === "CASHFREE").length,
    },
  ];
  // console.log(gatewayData)

  const statusData = [
    {
      name: "SUCCESS",
      value: data.filter((item) => item.status === "SUCCESS").length,
    },
    {
      name: "PENDING",
      value: data.filter((item) => item.status === "PENDING").length,
    },
    {
      name: "FAILURE",
      value: data.filter((item) => item.status === "FAILURE").length,
    },
  ];

  const amountByStatus = [
    {
      status: "SUCCESS",
      amount: data
        .filter((item) => item.status === "SUCCESS")
        .reduce((sum, item) => sum + item.transaction_amount, 0),
    },
    {
      status: "PENDING",
      amount: data
        .filter((item) => item.status === "PENDING")
        .reduce((sum, item) => sum + item.transaction_amount, 0),
    },
    {
      status: "FAILURE",
      amount: data
        .filter((item) => item.status === "FAILURE")
        .reduce((sum, item) => sum + item.transaction_amount, 0),
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  return (
    <div className="visual-dashboard">
      <h1 className="visaul-dashboard-heading">Visual Dashboard</h1>
      <div className="visualization-container">
        <div className="chart-card">
          <h1 className="chart-title">Payment Gateway Distribution</h1>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gatewayData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gatewayData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h1 className="chart-title">Transaction Status Distribution</h1>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card amount-chart">
          <h1 className="chart-title">Transaction Amounts by Status</h1>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={amountByStatus}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VisualizationData;
