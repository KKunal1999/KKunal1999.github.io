import React from 'react'
import "./main.css";
import students from "./data.json"
import { useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Main() {
  const [searchData, setSearchData] = useState(students);
  const [sortOrder, setSortOrder] = useState("asc");
  const [show, setShow] = useState(false);
  const [finalGradeSortOrder, setFinalGradeSortOrder] = useState("asc");
  const [,setFilterStatus] = useState("all");

  //sorting by name (A to Z or Z to A)
  const handleSort = () => {
    const sortedData = [...searchData].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : -1
        : a.name.toLowerCase() < b.name.toLowerCase()
          ? 1
          : -1
    );
    setSearchData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //sorting by finalGrade (1 to 10 or 10 to 1)
  const handleSort1 = () => {
    const sortedData = [...searchData].sort((a, b) =>
      finalGradeSortOrder === "asc"
        ? a.rating_grade + a.exam_grade - (b.rating_grade + b.exam_grade)
        : b.rating_grade + b.exam_grade - (a.rating_grade + a.exam_grade)
    );
    setSearchData(sortedData);
    setFinalGradeSortOrder(finalGradeSortOrder === "asc" ? "desc" : "asc");
  };

  //SearchBar to search any student
  const handleSearch = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord + "input word");
    const newFilter = students.filter((value) => {
      return value.name.toLowerCase().includes(searchWord);

    });
    setSearchData(newFilter);
  }

  //for passed and falied (status)
  const handleFilter = (status) => {
    setFilterStatus(status);
    if (status === "passed") {
      const newFilter = students.filter((value) => (0.6 * value.exam_grade + 0.4 * value.rating_grade) > 4);
      setSearchData(newFilter);
    } else if (status === "failed") {
      const newFilter = students.filter((value) => (0.6 * value.exam_grade + 0.4 * value.rating_grade) <= 4);
      setSearchData(newFilter);
    } else {
      setSearchData(students);
    }
  };

  //for download button (pdf file only)
  const handleDownload = () => {
    const input = document.documentElement;
    html2canvas(input, { scrollY: -window.scrollY })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
      });
  };

  //Detail Button (shows student details)
  const showDetails = (students) => {
    const details = `<h3>Details</h3>ID: ${students.no}<br> Name: ${students.name}<br>Ticket Number: ${students.ticket_number}<br>Rating Grade: ${students.rating_grade}<br>Exam Grade: ${students.exam_grade}<br>Final Grade: ${(0.6 * students.exam_grade + 0.4 * students.rating_grade).toFixed(2)}<br>Status: ${(0.6 * students.exam_grade + 0.4 * students.rating_grade) > 4 ? "passed" : "failed"}<br>Comments: ${students.Details}<br>`;

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'Close';
    closeButton.classList.add('close-button');

    modalContent.innerHTML = details;
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  };

  //background color (for a complete row) and Capatalize Name
  function selectStudent(event) {
    var element = event.target.closest('tr');
    element.classList.toggle('selected');
    element.querySelector('td:nth-child(2)').classList.toggle('uppercase');
    var selectedRows = document.querySelectorAll('.selected');
    if (selectedRows.length === 0) {
      // no rows selected
      console.log("no rows selected");
    } else {
      // rows selected
      console.log(selectedRows.length + " rows selected");
    }
  }

  //View Statistics (button at the bottom)
  let numStudents = students.length;
  let sum = 0;
  students.map((row) => {
    sum = sum + (0.4 * row.rating_grade + 0.6 * row.exam_grade);
    return 0.4 * row.rating_grade + 0.6 * row.exam_grade; 
  });
  const avg = sum / numStudents;

  let maxi = 0;
  students.map((row) => {
    const curr_max = 0.4 * row.rating_grade + 0.6 * row.exam_grade;
    maxi = Math.max(maxi, curr_max).toFixed(2);
    return curr_max; 
  });

  let mini = Number.MAX_SAFE_INTEGER;
  students.map((row) => {
    const curr_min = 0.4 * row.rating_grade + 0.6 * row.exam_grade;
    mini = Math.min(mini, curr_min);
    return curr_min;
  });

  const grade0to4 = students.filter((student) => {
    const finalGrade = 0.4 * student.rating_grade + 0.6 * student.exam_grade;
    return finalGrade >= 0 && finalGrade < 4;
  }).length;

  const grade4to5 = students.filter((student) => {
    const finalGrade = 0.4 * student.rating_grade + 0.6 * student.exam_grade;
    return finalGrade >= 4 && finalGrade < 5;
  }).length;

  const grade5to6 = students.filter((student) => {
    const finalGrade = 0.4 * student.rating_grade + 0.6 * student.exam_grade;
    return finalGrade >= 5 && finalGrade < 6;
  }).length;

  const grade6to7 = students.filter((student) => {
    const finalGrade = 0.4 * student.rating_grade + 0.6 * student.exam_grade;
    return finalGrade >= 6 && finalGrade < 7;
  }).length;

  const grade7to8 = students.filter((student) => {
    const finalGrade = 0.4 * student.rating_grade + 0.6 * student.exam_grade;
    return finalGrade >= 7 && finalGrade < 8;
  }).length;

  const gradeAbove8 = students.filter((student) => {
    const finalGrade = 0.4 * student.rating_grade + 0.6 * student.exam_grade;
    return finalGrade >= 8;
  }).length;


  return (
    <div className='main'>
      <div className='btn'>
        <button className='btns' onClick={() => handleFilter("All")}>All</button>
        <button onClick={() => handleFilter("passed")} className='btns'>Passed</button>
        <button onClick={() => handleFilter("failed")} className='btns'>Failed</button>
        <button onClick={handleSort} className='btns' >A-Z</button>
        <button onClick={handleSort1} className='btns'>1-10</button>
        <input placeholder='search by name' className='search' type='text'
          onChange={handleSearch} />
        <button id="download-btn" className='btns' onClick={handleDownload}>Download</button>
      </div>

      <table id="students">
        <thead>
          <tr className='tr1'>
            <th>No.</th>
            <th>Name</th>
            <th>Ticket number</th>
            <th>Rating grade</th>
            <th>Exam grade</th>
            <th>Final grade</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {searchData.map((students, index) => (
            <tr key={index} onClick={(event) => selectStudent(event)}>
              <td>{students.no}</td>
              <td>{students.name}</td>
              <td>{students.ticket_number}</td>
              <td>{students.rating_grade}</td>
              <td>{students.exam_grade}</td>
              <td>{(0.6 * students.exam_grade + 0.4 * students.rating_grade).toFixed(2)}</td>
              <td>{(0.6 * students.exam_grade + 0.4 * students.rating_grade) > 4 ? "passed" : "failed"}</td>
              <td><button id='btn1' onClick={(event) => {
                event.stopPropagation();
                showDetails(students);
              }}>Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setShow(!show)} className='Static'>Show Statistics</button>
      {
        show && <div className='staticBlock'>
          <table className='tb2' >
            <thead>
              <tr className='tr1'>
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tr>
              <td>All Student</td>
              <td>{numStudents}</td>
            </tr>
            <tr>
              <td>Average of All</td>
              <td>{avg}</td>
            </tr>
            <tr>
              <td>Max Of All</td>
              <td>{maxi}</td>
            </tr>
            <tr>
              <td>Min Of All</td>
              <td>{mini}</td>
            </tr>
            <tr>
              <td>Final-Grade 0-4</td>
              <td>{grade0to4}</td>
            </tr>
            <tr>
              <td>Final-Grade 0-5</td>
              <td>{grade4to5}</td>
            </tr>
            <tr>
              <td>Final-Grade 5-6</td>
              <td>{grade5to6}</td>
            </tr>
            <tr>
              <td>Final-Grade 6-7</td>
              <td>{grade6to7}</td>
            </tr>
            <tr>
              <td>Final-Grade 7-8</td>
              <td>{grade7to8}</td>
            </tr>
            <tr>
              <td>Final-Grade more than 8</td>
              <td>{gradeAbove8}</td>
            </tr>
          </table>
        </div>
      }
    </div>
  )
}
export default Main
