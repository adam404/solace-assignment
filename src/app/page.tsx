"use client";

import { useEffect, useState } from "react";
import React from "react";

import { Advocate } from "../types/advocate";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = searchTerm;
    }

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        advocate.yearsOfExperience == Number(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  const table = useReactTable({
    data: filteredAdvocates,
    columns: [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "degree",
        header: "Degree",
      },
      {
        accessorKey: "specialties",
        header: "Specialties",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.specialties.map(
                (specialty: string, index: number) => (
                  <div key={`${row.original.id}-${index}`}>{specialty}</div>
                )
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "yearsOfExperience",
        header: "Years of Experience",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        cell: ({ row }) => {
          const phoneNumber = row.original.phoneNumber.toString();
          const formatted = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
            3,
            6
          )}-${phoneNumber.slice(6)}`;
          return formatted;
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <main style={{ margin: "24px" }}>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-textPrimary mb-6">
          Search Advocates
        </h1>
        <div className="flex gap-4 items-start max-w-3xl">
          <div className="flex-1">
            <div className="relative">
              <input
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
                placeholder="Search by name, city, degree..."
                onChange={onChange}
              />
            </div>
            {document.getElementById("search-term")?.innerHTML && (
              <p className="mt-2 text-sm text-gray-500">
                Searching for:{" "}
                <span
                  id="search-term"
                  className="text-primary font-medium"
                ></span>
              </p>
            )}
          </div>
          <button
            onClick={onClick}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap text-lg"
          >
            Reset Search
          </button>
        </div>
      </div>
      <br />
      <br />
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="text-white/70">
                        {header.column.getIsSorted() === "asc" && "↑"}
                        {header.column.getIsSorted() === "desc" && "↓"}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`
                  border-t border-gray-200 
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  hover:bg-primary/5 transition-colors
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm text-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
