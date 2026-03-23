import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Eye, Clock, TrendingUp, Monitor, Globe, 
  ArrowUp, ArrowDown, Activity, Calendar, RefreshCw
} from 'lucide-react';
import { useAppContext } from '../App';
import { endpoints } from '../lib/api';

interface AnalyticsOverview {
  totalPageViews: number;
  uniqueVisitors: number;
  uniqueSessions: number;
  newVisitors: number;
  returningVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
}

interface PageViewData {
  date: string;
  count: number;
}

interface TopPage {
  path: string;
  title: string;
  views: number;
  uniqueVisitors: number;
}

interface DeviceStats {
  devices: { type: string; count: number }[];
  browsers: { name: string; count: number }[];
  operatingSystems: { name: string; count: number }[];
}

interface ActiveUsers {
  activeSessions: number;
  activeVisitors: number;
  currentPages: { path: string; activeSessions: number }[];
}

const AdminAnalytics: React.FC = () => {
  const { lang, isDark } = useAppContext();
  const isPt = lang === 'pt';
  const navigate = useNavigate();
  
  const [period, setPeriod] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [pageViews, setPageViews] = useState<{ pageViews: PageViewData[]; uniqueVisitors: PageViewData[] } | null>(null);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [deviceStats, setDeviceStats] = useState<DeviceStats | null>(null);
  const [activeUsers, setActiveUsers] = useState<ActiveUsers | null>(null);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const [overviewData, pageViewsData, topPagesData, deviceData, activeData] = await Promise.all([
        endpoints.analytics.getOverview({ period }),
        endpoints.analytics.getPageViews({ period }),
        endpoints.analytics.getTopPages({ period, limit: 10 }),
        endpoints.analytics.getDevices({ period }),
        endpoints.analytics.getActiveUsers()
      ]);

      if (overviewData.success) setOverview(overviewData.data);
      if (pageViewsData.success) setPageViews(pageViewsData.data);
      if (topPagesData.success) setTopPages(topPagesData.data);
      if (deviceData.success) setDeviceStats(deviceData.data);
      if (activeData.success) setActiveUsers(activeData.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchAnalyticsData, 30000);
    return () => clearInterval(interval);
  }, [period]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const getMaxValue = (data: PageViewData[]): number => {
    return Math.max(...data.map(d => d.count), 1);
  };

  const periodLabels = {
    '24h': isPt ? 'Últimas 24 horas' : 'Last 24 hours',
    '7d': isPt ? 'Últimos 7 dias' : 'Last 7 days',
    '30d': isPt ? 'Últimos 30 dias' : 'Last 30 days',
    '90d': isPt ? 'Últimos 90 dias' : 'Last 90 days'
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 ${isDark ? 'bg-slate-900 border-none' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}
            >
              {isPt ? 'Estatísticas do Site' : 'Site Statistics'}
            </motion.h1>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              {isPt ? 'Analyse o desempenho do seu site' : 'Analyze your website performance'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Period selector */}
            <div className={`flex rounded-lg overflow-hidden border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
              {['24h', '7d', '30d', '90d'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    period === p 
                      ? 'bg-[#6a00a3] text-white' 
                      : isDark 
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            
            <button
              onClick={fetchAnalyticsData}
              className={`p-2 rounded-lg border ${isDark ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-white text-slate-600'} hover:bg-slate-100`}
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {loading && !overview ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-[#6a00a3]" />
          </div>
        ) : (
          <>
            {/* Active Users (Real-time) */}
            {activeUsers && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-green-500" />
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {isPt ? 'Utilizadores em Tempo Real' : 'Real-time Users'}
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {isPt ? 'Sessões ativas' : 'Active sessions'}
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {activeUsers.activeSessions}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {isPt ? 'Visitantes ativos' : 'Active visitors'}
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {activeUsers.activeVisitors}
                    </p>
                  </div>
                  <div className={`col-span-2 p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-purple-500" />
                      <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {isPt ? 'Páginas ativas' : 'Active pages'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeUsers.currentPages.map((page, idx) => (
                        <span 
                          key={idx}
                          className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-slate-600 text-slate-300' : 'bg-slate-200 text-slate-600'}`}
                        >
                          {page.path} ({page.activeSessions})
                        </span>
                      ))}
                      {activeUsers.currentPages.length === 0 && (
                        <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          {isPt ? 'Nenhuma página ativa' : 'No active pages'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Overview Cards */}
            {overview && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-[#6a00a3]" />
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isPt ? 'Visualizações' : 'Page Views'}
                    </span>
                  </div>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {formatNumber(overview.totalPageViews)}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isPt ? 'Visitantes únicos' : 'Unique Visitors'}
                    </span>
                  </div>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {formatNumber(overview.uniqueVisitors)}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isPt ? 'Duração média' : 'Avg. Duration'}
                    </span>
                  </div>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {formatDuration(overview.avgSessionDuration)}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isPt ? 'Taxa de rejeição' : 'Bounce Rate'}
                    </span>
                  </div>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {overview.bounceRate}%
                  </p>
                </motion.div>
              </div>
            )}

            {/* Page Views Chart */}
            {pageViews && pageViews.pageViews.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`mb-6 p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
              >
                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Visualizações ao longo do tempo' : 'Page Views Over Time'}
                </h2>
                <div className="h-64 flex items-end gap-1">
                  {pageViews.pageViews.map((pv, idx) => {
                    const height = (pv.count / getMaxValue(pageViews.pageViews)) * 100;
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div 
                          className="w-full bg-[#6a00a3] rounded-t transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                          title={`${pv.date}: ${pv.count}`}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>{pageViews.pageViews[0]?.date}</span>
                  <span>{pageViews.pageViews[pageViews.pageViews.length - 1]?.date}</span>
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Pages */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
              >
                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {isPt ? 'Páginas mais visitadas' : 'Top Pages'}
                </h2>
                <div className="space-y-3">
                  {topPages.map((page, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>
                          {page.path}
                        </p>
                        <p className={`text-sm truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {page.title || '-'}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                          {formatNumber(page.views)}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {formatNumber(page.uniqueVisitors)} {isPt ? 'únicos' : 'unique'}
                        </p>
                      </div>
                    </div>
                  ))}
                  {topPages.length === 0 && (
                    <p className={`text-center py-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isPt ? 'Sem dados ainda' : 'No data yet'}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Device Stats */}
              {deviceStats && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                >
                  <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {isPt ? 'Dispositivos e Browsers' : 'Devices and Browsers'}
                  </h2>
                  
                  {/* Devices */}
                  <div className="mb-6">
                    <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isPt ? 'Tipo de dispositivo' : 'Device Type'}
                    </h3>
                    <div className="space-y-2">
                      {deviceStats.devices.map((device, idx) => {
                        const total = deviceStats.devices.reduce((sum, d) => sum + d.count, 0);
                        const percent = total > 0 ? (device.count / total * 100).toFixed(1) : '0';
                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <Monitor className="w-4 h-4 text-slate-500" />
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                  {device.type}
                                </span>
                                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                  {percent}%
                                </span>
                              </div>
                              <div className={`h-2 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                <div 
                                  className="h-full bg-[#6a00a3] rounded-full"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Browsers */}
                  <div>
                    <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isPt ? 'Browsers' : 'Browsers'}
                    </h3>
                    <div className="space-y-2">
                      {deviceStats.browsers.slice(0, 5).map((browser, idx) => {
                        const total = deviceStats.browsers.reduce((sum, b) => sum + b.count, 0);
                        const percent = total > 0 ? (browser.count / total * 100).toFixed(1) : '0';
                        return (
                          <div key={idx} className="flex items-center justify-between">
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                              {browser.name || 'Unknown'}
                            </span>
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                              {percent}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
