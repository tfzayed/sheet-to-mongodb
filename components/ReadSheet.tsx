"use client";

import { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import SheetTable from "./SheetTable";

export default function ReadSheet() {
  const [items, setItems] = useState([]);

  const readSheet = useCallback((file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;

        // Acquiring and Extracting Data
        const workbook = XLSX.read(bufferArray, {
          type: "buffer",
        });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        // Processing Data
        const data = XLSX.utils.sheet_to_json(worksheet);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise
      .then((data: any) => {
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
        alert("File reading failed. Please try again.");
      });
  }, []);

  const handleUpload = useCallback(async () => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });

      if (response.status === 200) {
        alert("Data insert successful");
      } else {
        alert("Data insert failed");
      }
    } catch (error) {
      alert("Data insert failed");
      console.error(error);
    }
  }, [items]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h1 className="mb-5">Upload xlsx or csv Sheet</h1>
          <input
            id="file"
            type="file"
            onChange={(e) => {
              const file = e.target.files![0];
              readSheet(file);
            }}
            accept=".csv, .xlsx"
            className="mb-5 block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-black file:text-white cursor-pointer"
          />
          <button
            onClick={handleUpload}
            disabled={items?.length === 0}
            className={`bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded cursor-pointer block disabled:opacity-50`}
          >
            Upload
          </button>
        </div>
        <div className="col-8">
          {items?.length === 0 ? (
            <h1>No Data to Preview</h1>
          ) : (
            <SheetTable items={items} />
          )}
        </div>
      </div>
    </div>
  );
}
