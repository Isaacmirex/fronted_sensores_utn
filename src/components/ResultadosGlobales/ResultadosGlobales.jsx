import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import './ResultadosGlobalesCSS.css'; // Importa el archivo CSS

ChartJS.register(ArcElement, Tooltip, Legend);

const facultades = ["FECYT", "FACAE", "FICA", "FCCSS", "FICAYA"];

const ResultadosGlobales = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [generalChartData, setGeneralChartData] = useState({});
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://web-production-8f98.up.railway.app/api/usuarios/');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const facultadData = facultades.map(facultad => {
        const students = data.filter(student => student.usr_facultad === facultad);
        const stressCount = students.filter(student => student.usr_estres > 50).length;
        const noStressCount = students.length - stressCount;
        return {
          facultad,
          stressCount,
          noStressCount
        };
      });

      const facultyCharts = facultadData.reduce((acc, { facultad, stressCount, noStressCount }) => {
        acc[facultad] = {
          labels: ["Sin Estrés", "Con Estrés"],
          datasets: [
            {
              label: 'Nivel de Estrés',
              data: [noStressCount, stressCount],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }
          ]
        };
        return acc;
      }, {});

      setChartData(facultyCharts);

      const totalStudents = data.length;
      setTotalStudents(totalStudents);
      const totalStress = data.filter(student => student.usr_estres > 50).length;
      const totalNoStress = totalStudents - totalStress;

      setGeneralChartData({
        labels: ["Sin Estrés", "Con Estrés"],
        datasets: [
          {
            label: 'Nivel de Estrés',
            data: [totalNoStress, totalStress],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }
        ]
      });
    }
  }, [data]);

  return (
    <div id="resultados-globales-container">
      <h1 id="resultados-globales-title">Resultados Globales</h1>
      <div id="resultados-globales-charts-container">
        {facultades.map(facultad => (
          chartData[facultad] ? (
            <div key={facultad} className="chart-wrapper">
              <h2 className="chart-title">Estrés en {facultad}</h2>
              <div className="chart-and-legend">
                <Pie data={chartData[facultad]} />
              </div>
            </div>
          ) : null
        ))}
        {generalChartData.labels && generalChartData.datasets ? (
          <div className="chart-wrapper">
            <h2 className="chart-title">Total De Muestra: {totalStudents}</h2>
            <div className="chart-and-legend">
              <Pie data={generalChartData} />
            </div>
          </div>
        ) : null}
      </div>
      <footer>
        <p>Desarrollado por Isaac Romero - 2024</p>
      </footer>
    </div>
  );
};

export default ResultadosGlobales;
