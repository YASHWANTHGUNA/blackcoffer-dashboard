"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartCard({ title, children, loading, isEmpty }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm min-h-[320px] border-l-8 border-black flex flex-col">
      <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
        {title}
      </h2>

      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="flex flex-col justify-center h-full space-y-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-100 rounded-xl"></div>
          </div>
        ) : isEmpty ? (
          <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">
            No matching records
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [filters, setFilters] = useState({
    topics: [],
    regions: [],
    countries: [],
    sectors: [],
    endYears: [],
    sources: [],
    pestles: [],
    cities: [],
    swots: [],
  });

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedPestle, setSelectedPestle] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSwot, setSelectedSwot] = useState("");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("/api/filters");
        const data = await response.json();
        setFilters(data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (selectedTopic) params.append("topic", selectedTopic);
        if (selectedRegion) params.append("region", selectedRegion);
        if (selectedCountry) params.append("country", selectedCountry);
        if (selectedSector) params.append("sector", selectedSector);
        if (selectedEndYear) params.append("endYear", selectedEndYear);
        if (selectedSource) params.append("source", selectedSource);
        if (selectedPestle) params.append("pestle", selectedPestle);
        if (selectedCity) params.append("city", selectedCity);
        if (selectedSwot) params.append("swot", selectedSwot);

        const response = await fetch(`/api/data?${params.toString()}`);
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [
    selectedTopic,
    selectedRegion,
    selectedCountry,
    selectedSector,
    selectedEndYear,
    selectedSource,
    selectedPestle,
    selectedCity,
    selectedSwot,
  ]);

  const intensityData = dashboardData.slice(0, 8).map((item, index) => ({
    name: item.topic
      ? item.topic.length > 12
        ? `${item.topic.slice(0, 12)}..`
        : item.topic
      : `ID ${index + 1}`,
    intensity: item.intensity || 0,
  }));

  const likelihoodData = dashboardData.slice(0, 10).map((item, index) => ({
    name: item.topic
      ? item.topic.length > 14
        ? `${item.topic.slice(0, 14)}..`
        : item.topic
      : `Item ${index + 1}`,
    likelihood: item.likelihood || 0,
  }));

  const relevanceData = dashboardData.slice(0, 4).map((item, index) => ({
    name: item.topic || `Topic ${index + 1}`,
    value: item.relevance || 0,
  }));

  const regionData = dashboardData.slice(0, 6).map((item, index) => ({
    region: item.region
      ? item.region.length > 14
        ? `${item.region.slice(0, 14)}..`
        : item.region
      : `Region ${index + 1}`,
    intensity: item.intensity || 0,
  }));

  const filterFields = [
    { label: "Topic", value: selectedTopic, setter: setSelectedTopic, options: filters.topics },
    { label: "Region", value: selectedRegion, setter: setSelectedRegion, options: filters.regions },
    { label: "Country", value: selectedCountry, setter: setSelectedCountry, options: filters.countries },
    { label: "Sector", value: selectedSector, setter: setSelectedSector, options: filters.sectors },
    { label: "End Year", value: selectedEndYear, setter: setSelectedEndYear, options: filters.endYears },
    { label: "Source", value: selectedSource, setter: setSelectedSource, options: filters.sources },
    { label: "Pestle", value: selectedPestle, setter: setSelectedPestle, options: filters.pestles },
    { label: "City", value: selectedCity, setter: setSelectedCity, options: filters.cities },
    { label: "Swot", value: selectedSwot, setter: setSelectedSwot, options: filters.swots },
  ];

  const isEmpty = !loading && dashboardData.length === 0;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-black text-white p-5 shadow-2xl flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-black tracking-tighter uppercase">
          Blackcoffer Dashboard
        </h1>
        <div className="text-[10px] font-mono border border-gray-700 px-2 py-1 rounded">
          SYS_READY
        </div>
      </nav>

      {loading && (
        <div className="sticky top-[72px] z-40 bg-yellow-50 border-b border-yellow-200 text-yellow-800 text-xs font-semibold tracking-wider uppercase px-6 py-2">
          Updating analytics...
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-72 bg-white border-r border-gray-200 p-6">
          <h2 className="text-xs font-bold mb-6 text-gray-400 uppercase tracking-widest">
            Global Filters
          </h2>

          <div className="space-y-6">
            {filterFields.map((field) => (
              <div key={field.label} className="group">
                <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block transition-colors group-focus-within:text-black">
                  {field.label}
                </label>

                <select
                  className="w-full p-2 border-b-2 border-gray-100 bg-transparent focus:border-black outline-none transition-all text-sm appearance-none cursor-pointer"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  disabled={loading}
                >
                  <option value="">All {field.label}s</option>
                  {field.options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              onClick={() => {
                setSelectedTopic("");
                setSelectedRegion("");
                setSelectedCountry("");
                setSelectedSector("");
                setSelectedEndYear("");
                setSelectedSource("");
                setSelectedPestle("");
                setSelectedCity("");
                setSelectedSwot("");
              }}
              disabled={loading}
              className="w-full mt-4 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all font-bold text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        <section className="flex-1 p-6 lg:p-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <ChartCard title="Intensity Score" loading={loading} isEmpty={isEmpty}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={intensityData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 45 }}
                >
                  <XAxis
                    dataKey="name"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    height={60}
                    tick={{ fontSize: 9 }}
                  />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: "#f8f8f8" }} />
                  <Bar dataKey="intensity" fill="#000" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Likelihood Stats" loading={loading} isEmpty={isEmpty}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={likelihoodData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 45 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis
                    dataKey="name"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    height={60}
                    tick={{ fontSize: 9 }}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line
                    type="step"
                    dataKey="likelihood"
                    stroke="#000"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Relevance Overview" loading={loading} isEmpty={isEmpty}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={relevanceData}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {relevanceData.map((entry, index) => (
                      <Cell key={index} fill={index % 2 === 0 ? "#000" : "#999"} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Geographic Reach" loading={loading} isEmpty={isEmpty}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={regionData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 45 }}
                >
                  <XAxis
                    dataKey="region"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    height={60}
                    tick={{ fontSize: 9 }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="intensity"
                    stroke="#000"
                    fill="#f0f0f0"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <footer className="mt-12 text-center border-t border-gray-200 pt-8">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
              Blackcoffer Analytics Engine &copy; 2026
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}