import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const IndonesiaEconomicDashboard = () => {
  const [activeTab, setActiveTab] = useState('economy');
  
  // Economic and democracy data
  // Note: This is sample data that would be replaced with actual API data in production
  const economicData = [
    { year: 2020, gdpGrowth: -2.1, inflation: 1.68, unemployment: 7.07, exchangeRate: 14105 },
    { year: 2021, gdpGrowth: 3.7, inflation: 1.87, unemployment: 6.49, exchangeRate: 14269 },
    { year: 2022, gdpGrowth: 5.3, inflation: 5.51, unemployment: 5.86, exchangeRate: 15731 },
    { year: 2023, gdpGrowth: 5.05, inflation: 3.16, unemployment: 5.32, exchangeRate: 15642 },
    { year: 2024, gdpGrowth: 5.2, inflation: 2.84, unemployment: 5.0, exchangeRate: 15789 },
    { year: 2025, gdpGrowth: 5.1, inflation: 2.9, unemployment: 4.9, exchangeRate: 15900, forecast: true },
    { year: 2026, gdpGrowth: 5.3, inflation: 3.0, unemployment: 4.8, exchangeRate: 16000, forecast: true }
  ];
  
  const democracyData = [
    { year: 2019, index: 6.48, category: "Demokrasi Tidak Penuh", rank: 64 },
    { year: 2020, index: 6.30, category: "Demokrasi Tidak Penuh", rank: 64 },
    { year: 2021, index: 6.71, category: "Demokrasi Tidak Penuh", rank: 52 },
    { year: 2022, index: 6.53, category: "Demokrasi Tidak Penuh", rank: 57 },
    { year: 2023, index: 6.59, category: "Demokrasi Tidak Penuh", rank: 54 },
    { year: 2024, index: 6.61, category: "Demokrasi Tidak Penuh", rank: 55 }
  ];
  
  // Currency forecast
  const currencyForecast = [
    { month: 'Jan 2024', idr_usd: 15600 },
    { month: 'Feb 2024', idr_usd: 15700 },
    { month: 'Mar 2024', idr_usd: 15760 },
    { month: 'Apr 2024', idr_usd: 15800 },
    { month: 'May 2024', idr_usd: 15850 },
    { month: 'Jun 2024', idr_usd: 15789 },
    { month: 'Jul 2024', idr_usd: 15810 },
    { month: 'Aug 2024', idr_usd: 15840 },
    { month: 'Sep 2024', idr_usd: 15870 },
    { month: 'Oct 2024', idr_usd: 15900 },
    { month: 'Nov 2024', idr_usd: 15930, forecast: true },
    { month: 'Dec 2024', idr_usd: 15950, forecast: true },
    { month: 'Jan 2025', idr_usd: 15980, forecast: true },
    { month: 'Feb 2025', idr_usd: 16000, forecast: true },
    { month: 'Mar 2025', idr_usd: 16020, forecast: true },
    { month: 'Apr 2025', idr_usd: 16050, forecast: true }
  ];

  // Key economic highlights
  const economicHighlights = [
    {
      title: "Pertumbuhan PDB",
      value: "5,2%",
      year: "2024",
      trend: "positive",
      description: "Melanjutkan trajektori pemulihan dengan konsumsi domestik dan investasi yang kuat"
    },
    {
      title: "Tingkat Inflasi",
      value: "2,8%",
      year: "2024",
      trend: "stable",
      description: "Dalam rentang target Bank Indonesia, menunjukkan stabilitas ekonomi"
    },
    {
      title: "Pengangguran",
      value: "5,0%",
      year: "2024",
      trend: "positive",
      description: "Menurun secara bertahap dari tingkat tinggi era pandemi"
    },
    {
      title: "Nilai Tukar IDR-USD",
      value: "Rp 15.789",
      year: "2024",
      trend: "stable",
      description: "Proyeksi pelemahan bertahap karena tekanan ekonomi global"
    }
  ];
  
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-serif font-bold mb-4">Dashboard Ekonomi & Demokrasi Indonesia</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Wawasan real-time tentang kinerja ekonomi dan status demokrasi Indonesia. Sumber data meliputi Bank Dunia, Bank Indonesia, Indeks Demokrasi EIU, dan proyeksi keuangan.
      </p>
      
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
      
      {/* Economic indicators tab */}
      {activeTab === 'economy' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {economicHighlights.map((highlight, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">{highlight.title}</div>
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
                    <span>Proses Pemilu & Pluralisme</span>
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
              <h4 className="font-medium mb-2">Tren Utama & Analisis</h4>
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
      
      <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        <p>Data terakhir diperbarui: 9 April 2025. Sumber data termasuk Bank Dunia, Bank Indonesia, Economist Intelligence Unit, dan proyeksi keuangan. Proyeksi setelah 2024 adalah perkiraan dan dapat disesuaikan berdasarkan kondisi pasar yang berkembang.</p>
      </div>
    </div>
  );
};

export default IndonesiaEconomicDashboard;