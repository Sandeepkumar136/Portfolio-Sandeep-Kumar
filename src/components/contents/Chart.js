import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import { motion } from 'framer-motion';

const Chart = () => {
  const [daysToFetch, setDaysToFetch] = useState(5);
  const [chartData, setChartData] = useState({ series: [], categories: [] });
  const USERNAME = 'Sandeepkumar136'; // Your GitHub username
  const BASE_URL = 'https://api.github.com';

  const getAllEvents = async (username, days) => {
    let allEvents = [];
    let page = 1;
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    try {
      while (true) {
        const url = `${BASE_URL}/users/${username}/events?page=${page}&per_page=100`;
        const response = await axios.get(url);
        const events = response.data;
        if (events.length === 0) break;

        const filteredEvents = events.filter(
          event => new Date(event.created_at) >= sinceDate
        );
        allEvents = [...allEvents, ...filteredEvents];
        page++;
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    return allEvents;
  };

  const processEvents = (events) => {
    const data = {};
    events.forEach(event => {
      const dateKey = new Date(event.created_at).toISOString().split('T')[0];
      if (!data[dateKey]) {
        data[dateKey] = {
          commits: 0,
          repoCreations: 0,
          forks: 0,
          stars: 0,
          pullRequests: 0,
          issues: 0
        };
      }

      switch (event.type) {
        case 'PushEvent':
          data[dateKey].commits += event.payload.commits?.length || 0;
          break;
        case 'CreateEvent':
          if (event.payload.ref_type === 'repository') {
            data[dateKey].repoCreations += 1;
          }
          break;
        case 'ForkEvent':
          data[dateKey].forks += 1;
          break;
        case 'WatchEvent':
          data[dateKey].stars += 1;
          break;
        case 'PullRequestEvent':
          data[dateKey].pullRequests += 1;
          break;
        case 'IssuesEvent':
          data[dateKey].issues += 1;
          break;
        default:
          break;
      }
    });
    return data;
  };

  const prepareChartData = async () => {
    const events = await getAllEvents(USERNAME, daysToFetch);
    const processedData = processEvents(events);

    const today = new Date();
    const labels = Array.from({ length: daysToFetch }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const commitsSeries = labels.map(date => processedData[date]?.commits || 0);
    const repoSeries = labels.map(date => processedData[date]?.repoCreations || 0);
    const forksSeries = labels.map(date => processedData[date]?.forks || 0);
    const starsSeries = labels.map(date => processedData[date]?.stars || 0);
    const pullSeries = labels.map(date => processedData[date]?.pullRequests || 0);
    const issuesSeries = labels.map(date => processedData[date]?.issues || 0);

    setChartData({
      categories: labels,
      series: [
        { name: 'Commits', data: commitsSeries },
        { name: 'Repositories Created', data: repoSeries },
        { name: 'Forks', data: forksSeries },
        { name: 'Stars', data: starsSeries },
        { name: 'Pull Requests', data: pullSeries },
        { name: 'Issues', data: issuesSeries }
      ]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (daysToFetch < 5 || daysToFetch > 90) {
      alert('Please enter a number between 5 and 90.');
    } else {
      prepareChartData();
    }
  };

  useEffect(() => {
    prepareChartData();
  }, []);

  const options = {
    chart: {
      id: 'github-activity',
      type: 'line',
      zoom: { enabled: true },
      toolbar: {
        autoSelected: 'zoom',
        tools: { download: true }
      }
    },
    xaxis: {
      categories: chartData.categories,
      type: 'datetime',
      labels: { rotate: -45 }
    },
    yaxis: {
      title: { text: 'Activity Count' }
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: { format: 'yyyy-MM-dd' }
    },
    stroke: { curve: 'smooth' },
    legend: { position: 'top' }
  };

  return (
    <motion.div
      className="chart-container"
      initial={{ y: 80 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.form
        className="git-form"
        onSubmit={handleSubmit}
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className='git-days' htmlFor="git_days">
          Enter Specified Days (5–90):
        </label>
        <input
          type="number"
          id="git_days"
          value={daysToFetch}
          onChange={(e) => setDaysToFetch(Number(e.target.value))}
        />
        <button className='fetch-btn' type="submit">Fetch</button>
      </motion.form>

      <motion.div
        className="chart-wrapper"
        style={{ height: '500px' }}
        initial={{ y: 60 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
      >
        <ApexCharts
          options={options}
          series={chartData.series}
          type="line"
          height={500}
        />
      </motion.div>
    </motion.div>
  );
};

export default Chart;
