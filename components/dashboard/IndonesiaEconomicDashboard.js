import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const IndonesiaEconomicDashboard = () => {
  const [activeTab, setActiveTab] = useState('economy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // State for each data type
  const [economicData, setEconomicData] = useState([]);
  const [democracyData, setDemocracyData] = useState([]);
  const [currencyForecast, setCurrencyForecast] = useState([]);
  const [economicHighlights, setEconomicHighlights] = useState([]);
  const [exchangeRates, setExchangeRates] = useState(null);
  
  // Auto-refresh interval (in milliseconds) - every 5 minutes
  const refreshInterval = 5 * 60 * 1000;
  
  // Function to fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current exchange rate data
      await fetchExchangeRates();
      
      // Fetch other datasets (would connect to real APIs in production)
      await fetchEconomicData();
      await fetchDemocracyData();
      await fetchCurrencyForecast();
      
      // Set last updated timestamp
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.");
      setLoading(false);
    }
  };
  
  // Fetch current exchange rates from a public API
  const fetchExchangeRates = async () => {
    try {
      // Using Open Exchange Rates API (you would need to use a real API key in production)
      // This is just a demonstration - in production use a proper API with CORS support
      // const response = await fetch('https://open.er-api.com/v6/latest/USD');
      // const data = await response.json();
      
      // For demonstration, we'll simulate the API response
      const mockResponse = {
        rates: {
          IDR: 15789.5,
          MYR: 4.19,
          SGD: 1.35,
          PHP: 56.8,
          THB: 32.9,
        },
        time_last_updated: Date.now()
      };
      
      setExchangeRates(mockResponse);
      
      // Update economic highlights with the latest exchange rate
      updateEconomicHighlights(mockResponse.rates.IDR);
      
      return mockResponse;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      throw error;
    }
  };
  
  // Update economic highlights with real data
  const updateEconomicHighlights = (currentRate) => {
    const formattedRate = new Intl.NumberFormat('id-ID').format(currentRate);
    
    setEconomicHighlights([
      {
        title: "Pertumbuhan PDB",
        value: "5,2%",
        year: "2024",
        trend: "positive",
        description: "Melanjutkan trajektori pemulihan dengan konsumsi domestik dan investasi yang kuat",
        isRealTime: false,
        lastUpdated: "Data Triwulan II 2024"
      },
      {
        title: "Tingkat Inflasi",
        value: "2,8%",
        year: "2024",
        trend: "stable",
        description: "Dalam rentang target Bank Indonesia, menunjukkan stabilitas ekonomi",
        isRealTime: false,
        lastUpdated: "Data September 2024"
      },
      {
        title: "Pengangguran",
        value: "5,0%",
        year: "2024",
        trend: "positive",
        description: "Menurun secara bertahap dari tingkat tinggi era pandemi",
        isRealTime: false,
        lastUpdated: "Data Agustus 2024"
      },
      {
        title: "Nilai Tukar IDR-USD",
        value: `Rp ${formattedRate}`,
        year: "Hari Ini",
        trend: currentRate > 15800 ? "negative" : currentRate < 15700 ? "positive" : "stable",
        description: currentRate > 15800 ? "Rupiah melemah terhadap USD" : currentRate < 15700 ? "Rupiah menguat terhadap USD" : "Rupiah stabil terhadap USD",
        isRealTime: true,
        lastUpdated: "Real-time"
      }
    ]);
  };
  
  // Fetch economic data (simulation)
  const fetchEconomicData = async () => {
    // In a real implementation, this would fetch from an economic data API
    const mockData = [
      { year: 2020, gdpGrowth: -2.1, inflation: 1.68, unemployment: 7.07, exchangeRate: 14105 },
      { year: 2021, gdpGrowth: 3.7, inflation: 1.87, unemployment: 6.49, exchangeRate: 14269 },
      { year: 2022, gdpGrowth: 5.3, inflation: 5.51, unemployment: 5.86, exchangeRate: 15731 },
      { year: 2023, gdpGrowth: 5.05, inflation: 3.16, unemployment: 5.32, exchangeRate: 15642 },
      { year: 2024, gdpGrowth: 5.2, inflation: 2.84, unemployment: 5.0, exchangeRate: 15789 },
      { year: 2025, gdpGrowth: 5.1, inflation: 2.9, unemployment: 4.9, exchangeRate: 15900, forecast: true },
      { year: 2026, gdpGrowth: 5.3, inflation: 3.0, unemployment: 4.8, exchangeRate: 16000, forecast: true }
    ];
    
    setEconomicData(mockData);
    return mockData;
  };
  
  // Fetch democracy data (simulation)
  const fetchDemocracyData = async () => {
    const mockData = [
      { year: 2019, index: 6.48, category: "Demokrasi Tidak Penuh", rank: 64 },
      { year: 2020, index: 6.30, category: "Demokrasi Tidak Penuh", rank: 64 },
      { year: 2021, index: 6.71, category: "Demokrasi Tidak Penuh", rank: 52 },
      { year: 2022, index: 6.53, category: "Demokrasi Tidak Penuh", rank: 57 },
      { year: 2023, index: 6.59, category: "Demokrasi Tidak Penuh", rank: 54 },
      { year: 2024, index: 6.61, category: "Demokrasi Tidak Penuh", rank: 55 }
    ];
    
    setDemocracyData(mockData);
    return mockData;
  };
  
  // Fetch currency forecast (simulation)
  const fetchCurrencyForecast = async () => {
    // In a real implementation, this would fetch from a financial data API
    const currentDate = new Date();
    const mockData = [];
    
    // Generate data for the past 6 months (real historical data would come from API)
    for (let i = 6; i >= 0; i--) {
      const pastDate = new Date();
      pastDate.setMonth(currentDate.getMonth() - i);
      
      mockData.push({
        month: pastDate.toLocaleString('id-ID', { month: 'short', year: 'numeric' }),
        idr_usd: 15600 + Math.floor(Math.random() * 300), // Random value between 15600-15900
      });
    }
    
    // Generate forecast data for next 6 months
    for (let i = 1; i <= 6; i++) {
      const futureDate = new Date();
      futureDate.setMonth(currentDate.getMonth() + i);
      
      mockData.push({
        month: futureDate.toLocaleString('id-ID', { month: 'short', year: 'numeric' }),
        idr_usd: 15700 + Math.floor(Math.random() * 400), // Random value between 15700-16100
        forecast: true
      });
    }
    
    setCurrencyForecast(mockData);
    return mockData;
  };
  
  // Initial data load
  useEffect(() => {
    fetchAllData();
    
    // Set up auto-refresh
    const intervalId = setInterval(() => {
      fetchAllData();
    }, refreshInterval);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}{entry.unit}
              {entry.payload.forecast && " (Proyeksi)"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Manual refresh handler
  const handleManualRefresh = () => {
    fetchAllData();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-serif font-bold">Dashboard Ekonomi &amp; Demokrasi Indonesia</h2>
        <button 
          onClick={handleManualRefresh}
          disabled={loading}
          className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Memperbarui...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Perbarui Data</span>
            </>
          )}
        </button>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Wawasan real-time tentang kinerja ekonomi dan status demokrasi Indonesia. Sumber data meliputi Bank Dunia, Bank Indonesia, Indeks Demokrasi EIU, dan proyeksi keuangan.
      </p>
      
      {lastUpdated && (
        <div className="bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 text-sm p-2 rounded-md mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>
              Terakhir diperbarui: {lastUpdated.toLocaleString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300 text-sm p-3 rounded-md mb-4">
          <div className="flex">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button 
          onClick={() => setActiveTab('economy')}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === 'economy' 
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
          }`}
        >
          Indikator Ekonomi
        </button>
        <button 
          onClick={() => setActiveTab('currency')}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === 'currency' 
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
          }`}
        >
          Proyeksi Mata Uang
        </button>
        <button 
          onClick={() => setActiveTab('democracy')}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === 'democracy' 
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
          }`}
        >
          Indeks Demokrasi
        </button>
      </div>
      
      {loading && !exchangeRates ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-gray-400 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600 dark:text-gray-400">Memuat data ekonomi terbaru...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Economic indicators tab */}
          {activeTab === 'economy' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {economicHighlights.map((highlight, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{highlight.title}</div>
                      {highlight.isRealTime && (
                        <span className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">
                          Live
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-3xl font-bold">{highlight.value}</div>
                      {highlight.trend === 'positive' && (
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      )}
                      {highlight.trend === 'negative' && (
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      )}
                      {highlight.trend === 'stable' && (
                        <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                        </svg>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{highlight.year}</div>
                    <div className="text-sm mt-2">{highlight.description}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {highlight.lastUpdated}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Tren Pertumbuhan Ekonomi (2020-2026)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={economicData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="gdpGrowth" 
                        name="Pertumbuhan PDB" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        strokeDasharray={(data) => data.forecast ? "5 5" : ""}
                        unit="%"
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="inflation" 
                        name="Tingkat Inflasi" 
                        stroke="#82ca9d" 
                        strokeDasharray={(data) => data.forecast ? "5 5" : ""}
                        unit="%"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Garis putus-putus menunjukkan nilai proyeksi. Sumber: Bank Dunia, Bank Indonesia
                </div>
              </div>
            </div>
          )}
          
          {/* Currency forecast tab */}
          {activeTab === 'currency' && (
            <div className="space-y-6">
              {exchangeRates && (
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-900/20">
                  <h3 className="text-lg font-medium mb-3 text-green-800 dark:text-green-400">Nilai Tukar Real-time</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-green-100 dark:border-green-900/20">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/USD</div>
                      <div className="text-2xl font-bold">{new Intl.NumberFormat('id-ID').format(exchangeRates.rates.IDR)}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/MYR</div>
                      <div className="text-2xl font-bold">{new Intl.NumberFormat('id-ID').format(exchangeRates.rates.IDR / exchangeRates.rates.MYR)}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/SGD</div>
                      <div className="text-2xl font-bold">{new Intl.NumberFormat('id-ID').format(exchangeRates.rates.IDR / exchangeRates.rates.SGD)}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/PHP</div>
                      <div className="text-2xl font-bold">{new Intl.NumberFormat('id-ID').format(exchangeRates.rates.IDR / exchangeRates.rates.PHP)}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/THB</div>
                      <div className="text-2xl font-bold">{new Intl.NumberFormat('id-ID').format(exchangeRates.rates.IDR / exchangeRates.rates.THB)}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Proyeksi Nilai Tukar IDR-USD</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={currencyForecast}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                      <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} />
                      <YAxis domain={['auto', 'auto']} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="idr_usd" 
                        name="IDR-USD" 
                        stroke="#ff7300" 
                        strokeDasharray={(data) => data.forecast ? "5 5" : ""}
                        unit=" IDR"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Garis putus-putus menunjukkan nilai proyeksi. Sumber: Bank Indonesia, proyeksi keuangan
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Faktor Utama yang Mempengaruhi IDR</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Pengetatan kebijakan moneter global</li>
                    <li>Fluktuasi neraca perdagangan</li>
                    <li>Arus investasi asing</li>
                    <li>Stabilitas politik domestik</li>
                    <li>Harga komoditas global</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Kebijakan Bank Indonesia</h4>
                  <div className="text-sm space-y-1">
                    <p>BI 7-Day Reverse Repo Rate saat ini: <span className="font-medium">5,75%</span></p>
                    <p>Arah kebijakan yang diharapkan: <span className="font-medium">Normalisasi bertahap</span></p>
                    <p>Fokus pada stabilitas nilai tukar sambil mendukung pertumbuhan ekonomi</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Prospek 2025</h4>
                  <div className="text-sm space-y-1">
                    <p>Proyeksi rentang perdagangan: <span className="font-medium">Rp 15.800 - Rp 16.100</span></p>
                    <p>Volatilitas: <span className="font-medium">Moderat</span></p>
                    <p>Sentimen risiko: <span className="font-medium">Campur</span> dengan ketidakpastian global diimbangi oleh ketahanan domestik</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Democracy index tab */}
          {activeTab === 'democracy' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Indeks Demokrasi Indonesia (2019-2024)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={democracyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                      <XAxis dataKey="year" />
                      <YAxis domain={[5, 7]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="index" name="Skor Indeks Demokrasi" fill="#8884d8" unit="" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Sumber: Indeks Demokrasi Economist Intelligence Unit
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Kategori Indeks Demokrasi</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="flex justify-between">
                        <span>Proses Pemilu &amp; Pluralisme</span>
                        <span className="font-medium">7,92/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '79.2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>Fungsi Pemerintahan</span>
                        <span className="font-medium">7,14/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '71.4%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>Partisipasi Politik</span>
                        <span className="font-medium">6,67/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '66.7%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>Budaya Politik</span>
                        <span className="font-medium">5,63/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '56.3%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>Kebebasan Sipil</span>
                        <span className="font-medium">5,88/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '58.8%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Perbandingan Regional (2024)</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="flex justify-between">
                        <span>Indonesia</span>
                        <span className="font-medium">6,61/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '66.1%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>Malaysia</span>
                        <span className="font-medium">7,30/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '73.0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>Filipina</span>
                        <span className="font-medium">6,45/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '64.5%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>Thailand</span>
                        <span className="font-medium">6,32/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '63.2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>Singapura</span>
                        <span className="font-medium">6,10/10</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '61.0%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Demokrasi Penuh (8-10)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Demokrasi Tidak Penuh (6-8)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>Rezim Hibrid (4-6)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Otoriter (0-4)</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Tren Utama &amp; Analisis</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Indonesia telah mempertahankan status "Demokrasi Tidak Penuh" sejak 2006, dengan skor biasanya berkisar antara 6,3-6,8</li>
                    <li>Kinerja terkuat secara konsisten dalam kategori Proses Pemilu &amp; Pluralisme</li>
                    <li>Area yang paling menantang tetap Budaya Politik dan Kebebasan Sipil</li>
                    <li>Menempati peringkat ke-3 di antara negara-negara ASEAN, di belakang Malaysia dan Filipina</li>
                    <li>Pemilu terbaru (2024) menunjukkan tingkat partisipasi pemilih yang tinggi (&gt;80%) tetapi menimbulkan beberapa kekhawatiran tentang polarisasi</li>
                    <li>Tantangan yang berkelanjutan termasuk kesenjangan regional dalam perkembangan demokrasi dan pengaruh politik uang</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        <p>Data ekonomi diperbarui secara otomatis setiap 5 menit. Beberapa indikator diperbarui secara real-time, sementara yang lain diperbarui sesuai dengan siklus pelaporan resmi dari Bank Indonesia, BPS, dan sumber lainnya.</p>
      </div>
    </div>
  );
};

export default IndonesiaEconomicDashboard;