"use client"

import Chart from "react-apexcharts"
import { useGetUsersQuery } from "../../redux/api/usersApiSlice"
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice"

import { useState, useEffect } from "react"
import AdminMenu from "./AdminMenu"
import OrderList from "./orderList"
import Loader from "../../components/Loader"
import { DollarSign, Users, ShoppingBag } from "lucide-react"

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery()
  const { data: customers, isLoading: loading } = useGetUsersQuery()
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery()
  const { data: salesDetail } = useGetTotalSalesByDateQuery()

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
        background: "transparent",
        foreColor: "#4b5563", // text color
      },
      tooltip: {
        theme: "light",
      },
      colors: ["#8b5cf6"], // purple-500
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#4b5563"],
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      title: {
        text: "Sales Trend",
        align: "left",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#1f2937",
        },
      },
      grid: {
        borderColor: "#e5e7eb",
        row: {
          colors: ["#f9fafb", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 5,
        colors: ["#8b5cf6"],
        strokeColors: "#ffffff",
        strokeWidth: 2,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            fontSize: "14px",
            color: "#4b5563",
          },
        },
        labels: {
          style: {
            colors: "#4b5563",
          },
        },
      },
      yaxis: {
        title: {
          text: "Sales",
          style: {
            fontSize: "14px",
            color: "#4b5563",
          },
        },
        min: 0,
        labels: {
          style: {
            colors: "#4b5563",
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
        labels: {
          colors: "#4b5563",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#3b82f6"], // blue-500
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.5,
          stops: [0, 100],
        },
      },
    },
    series: [{ name: "Sales", data: [] }],
  })

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }))

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [{ name: "Sales", data: formattedSalesDate.map((item) => item.y) }],
      }))
    }
  }, [salesDetail])

  // Add CSS to fix table text visibility
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style")

    // Add CSS rules to ensure table text is visible
    style.textContent = `
      /* Ensure table text is visible */
      table {
        color: #1f2937 !important;
      }
      
      table th {
        color: #1f2937 !important;
        background-color: #f3f4f6 !important;
        font-weight: 600 !important;
      }
      
      table td {
        color: #4b5563 !important;
        background-color: white !important;
      }
      
      table tr:hover td {
        background-color: #f9fafb !important;
      }
      
      /* Fix any links in the table */
      table a {
        color: #6366f1 !important;
        text-decoration: none !important;
      }
      
      table a:hover {
        color: #4f46e5 !important;
        text-decoration: underline !important;
      }
      
      /* Fix any buttons in the table */
      table button {
        color: white !important;
      }
    `

    // Append the style element to the document head
    document.head.appendChild(style)

    // Clean up function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to right, #bfdbfe, #e9d5ff)" }}>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem] p-6">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {/* Sales Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full sm:w-[20rem]">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-gray-600 font-medium">Total Sales</p>
                <h1 className="text-2xl font-bold text-gray-800">
                  {isLoading ? <Loader /> : `$${sales.totalSales.toFixed(2)}`}
                </h1>
              </div>
            </div>
          </div>

          {/* Customers Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full sm:w-[20rem]">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Users size={24} />
              </div>
              <div>
                <p className="text-gray-600 font-medium">Total Customers</p>
                <h1 className="text-2xl font-bold text-gray-800">{loading ? <Loader /> : customers?.length}</h1>
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full sm:w-[20rem]">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-gray-600 font-medium">Total Orders</p>
                <h1 className="text-2xl font-bold text-gray-800">{loadingTwo ? <Loader /> : orders?.totalOrders}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sales Analytics</h2>
          <div className="w-full">
            <Chart options={state.options} series={state.series} type="bar" height={350} />
          </div>
        </div>

        {/* Orders List Section */}
        <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          <div className="order-list-container text-gray-800">
            <OrderList />
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
