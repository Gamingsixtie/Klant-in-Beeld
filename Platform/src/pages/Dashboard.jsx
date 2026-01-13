import { useMemo } from 'react'
import { useAppStore } from '../stores/appStore'
import { useMethodologieStore } from '../stores/methodologieStore'
import { stuurparameters, sectoren } from '../data/programmaData'
import { useNavigate } from 'react-router-dom'
import {
  Target,
  ListTodo,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Calendar,
  Zap,
  CheckCircle2,
  BarChart3,
  Building2,
  Clock,
  AlertCircle
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts'

const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#ef4444']
const SECTOR_COLORS = ['#003366', '#0066cc', '#0088ee', '#00aaff', '#66ccff']

function StatCard({ icon: Icon, label, value, subValue, color, trend, trendValue, onClick }) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-100 p-5 hover:shadow-lg hover:border-slate-200 transition-all duration-300 hover:-translate-y-0.5 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[13px] text-slate-500 font-medium mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
            {trend && (
              <span className={'flex items-center text-xs font-medium ' + (trend === 'up' ? 'text-green-600' : 'text-red-500')}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {trendValue}
              </span>
            )}
          </div>
          {subValue && <p className="text-[12px] text-slate-400 mt-1.5">{subValue}</p>}
        </div>
        <div className={'p-3 rounded-xl shadow-lg ' + color}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}

function StuurparameterCard({ parameter }) {
  const statusColors = {
    groen: 'bg-green-500',
    geel: 'bg-yellow-500',
    rood: 'bg-red-500'
  }

  const statusBg = {
    groen: 'bg-green-50 border-green-200',
    geel: 'bg-yellow-50 border-yellow-200',
    rood: 'bg-red-50 border-red-200'
  }

  return (
    <div className={`rounded-lg border p-3 ${statusBg[parameter.status]}`}>
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2.5 h-2.5 rounded-full ${statusColors[parameter.status]}`} />
        <span className="text-sm font-medium text-slate-800">{parameter.naam}</span>
      </div>
      <p className="text-xs text-slate-600">{parameter.toelichting}</p>
    </div>
  )
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-lg transition-all duration-300">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function RecentActivityItem({ icon: Icon, title, description, time, color }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className={'p-2 rounded-lg ' + color}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">{title}</p>
        <p className="text-xs text-slate-500 truncate">{description}</p>
      </div>
      <span className="text-xs text-slate-400 whitespace-nowrap">{time}</span>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { baten, inspanningen, stakeholders, risicos, issues, getStats } = useAppStore()
  const { voortgang } = useMethodologieStore()

  // Memoized statistics calculations
  const stats = useMemo(() => ({
    // Baten statistics
    totalBaten: baten?.length || 0,
    completedBaten: baten?.filter(b => b.status === 'completed')?.length || 0,
    inProgressBaten: baten?.filter(b => b.status === 'in_progress')?.length || 0,
    pendingBaten: baten?.filter(b => b.status === 'pending')?.length || 0,

    // Inspanningen statistics
    totalInspanningen: inspanningen?.length || 0,
    activeInspanningen: inspanningen?.filter(i => i.status === 'in_progress')?.length || 0,
    plannedInspanningen: inspanningen?.filter(i => i.status === 'planned')?.length || 0,

    // Risico's & issues
    openRisicos: risicos?.filter(r => r.status === 'open' || r.status === 'in_behandeling')?.length || 0,
    hoogRisicos: risicos?.filter(r => (r.score || 0) >= 15)?.length || 0,
    openIssues: issues?.filter(i => i.status === 'open' || i.status === 'in_behandeling' || i.status === 'wacht_op_besluit')?.length || 0
  }), [baten, inspanningen, risicos, issues])

  // Destructure for convenience
  const {
    totalBaten, completedBaten, inProgressBaten, pendingBaten,
    totalInspanningen, activeInspanningen, plannedInspanningen,
    openRisicos, hoogRisicos, openIssues
  } = stats

  // Memoized chart data
  const baatStatusData = useMemo(() => [
    { name: 'Voltooid', value: completedBaten, color: '#22c55e' },
    { name: 'In uitvoering', value: inProgressBaten, color: '#3b82f6' },
    { name: 'Gepland', value: pendingBaten, color: '#eab308' }
  ].filter(item => item.value > 0), [completedBaten, inProgressBaten, pendingBaten])

  const domeinData = useMemo(() => [
    { name: 'Mens', inspanningen: inspanningen?.filter(i => i.domein === 'Mens')?.length || 0 },
    { name: 'Proces', inspanningen: inspanningen?.filter(i => i.domein === 'Proces')?.length || 0 },
    { name: 'Systeem', inspanningen: inspanningen?.filter(i => i.domein === 'Systeem')?.length || 0 },
    { name: 'Cultuur', inspanningen: inspanningen?.filter(i => i.domein === 'Cultuur')?.length || 0 }
  ].filter(item => item.inspanningen > 0), [inspanningen])

  const faseData = useMemo(() => [
    {
      fase: 'Fundament',
      gepland: inspanningen?.filter(i => i.fase === 'Fundament' && i.status === 'planned')?.length || 0,
      actief: inspanningen?.filter(i => i.fase === 'Fundament' && i.status === 'in_progress')?.length || 0
    },
    {
      fase: 'Implementatie',
      gepland: inspanningen?.filter(i => i.fase === 'Implementatie' && i.status === 'planned')?.length || 0,
      actief: inspanningen?.filter(i => i.fase === 'Implementatie' && i.status === 'in_progress')?.length || 0
    },
    {
      fase: 'Verankering',
      gepland: inspanningen?.filter(i => i.fase === 'Verankering' && i.status === 'planned')?.length || 0,
      actief: inspanningen?.filter(i => i.fase === 'Verankering' && i.status === 'in_progress')?.length || 0
    }
  ], [inspanningen])

  // Memoized recent activities
  const recentActivities = useMemo(() => [
    ...(inspanningen?.filter(i => i.status === 'in_progress')?.slice(0, 2)?.map(i => ({
      icon: Target,
      title: 'Inspanning actief',
      description: `${i.naam} - ${i.eigenaar}`,
      time: 'Actief',
      color: 'bg-blue-500'
    })) || []),
    ...(risicos?.filter(r => r.score >= 15)?.slice(0, 1)?.map(r => ({
      icon: AlertCircle,
      title: 'Hoog risico',
      description: r.titel,
      time: r.trend,
      color: 'bg-red-500'
    })) || []),
    ...(issues?.filter(i => i.prioriteit === 'hoog' || i.prioriteit === 'kritiek')?.slice(0, 1)?.map(i => ({
      icon: AlertCircle,
      title: `Issue: ${i.prioriteit}`,
      description: i.titel,
      time: i.status,
      color: 'bg-amber-500'
    })) || [])
  ].slice(0, 4), [inspanningen, risicos, issues])

  // Completion percentage
  const completionRate = useMemo(() =>
    totalBaten > 0 ? Math.round((completedBaten / totalBaten) * 100) : 0
  , [totalBaten, completedBaten])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overzicht van alle trajecten en acties</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>Laatst bijgewerkt: vandaag, {new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Target}
          label="Baten"
          value={totalBaten}
          subValue={`${inProgressBaten} in uitvoering`}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend={inProgressBaten > 0 ? 'up' : undefined}
          trendValue={inProgressBaten > 0 ? `${inProgressBaten} actief` : undefined}
          onClick={() => navigate('/baten')}
        />
        <StatCard
          icon={ListTodo}
          label="Inspanningen"
          value={totalInspanningen}
          subValue={`${activeInspanningen} actief, ${plannedInspanningen} gepland`}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend={activeInspanningen > 0 ? 'up' : undefined}
          trendValue={activeInspanningen > 0 ? `${activeInspanningen} actief` : undefined}
          onClick={() => navigate('/inspanningen')}
        />
        <StatCard
          icon={AlertCircle}
          label="Risico's & Issues"
          value={openRisicos + openIssues}
          subValue={`${hoogRisicos} hoog risico, ${openIssues} issues`}
          color="bg-gradient-to-br from-amber-500 to-orange-500"
          trend={hoogRisicos > 0 ? 'down' : 'up'}
          trendValue={hoogRisicos > 0 ? `${hoogRisicos} kritiek` : 'Onder controle'}
        />
        <StatCard
          icon={CheckCircle2}
          label="Baten Voortgang"
          value={`${completionRate}%`}
          subValue={`${completedBaten} van ${totalBaten} gerealiseerd`}
          color="bg-gradient-to-br from-green-500 to-green-600"
          trend={completionRate > 0 ? 'up' : undefined}
          trendValue={completionRate > 0 ? `${completionRate}%` : undefined}
          onClick={() => navigate('/baten')}
        />
      </div>

      {/* Stuurparameters */}
      <ChartCard
        title="Stuurparameters"
        subtitle="5 kernparameters voor programmasturing"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {stuurparameters?.map((param) => (
            <StuurparameterCard key={param.id} parameter={param} />
          ))}
        </div>
      </ChartCard>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart - Inspanningen per Fase */}
        <ChartCard
          title="Inspanningen per Fase"
          subtitle="Gepland vs actief per programmafase"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={faseData}>
                <defs>
                  <linearGradient id="colorGepland" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="colorActief" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="fase" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="gepland" fill="url(#colorGepland)" name="Gepland" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actief" fill="url(#colorActief)" name="Actief" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Pie Chart - Baten Status */}
        <ChartCard
          title="Baten per Status"
          subtitle="Verdeling van baten statussen"
        >
          <div className="h-64 flex items-center justify-center">
            {baatStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={baatStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {baatStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-slate-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Geen baten beschikbaar</p>
              </div>
            )}
          </div>
        </ChartCard>

        {/* Bar Chart - Inspanningen per Domein */}
        <ChartCard
          title="Inspanningen per Domein"
          subtitle="Verdeling over domeinen"
        >
          <div className="h-64">
            {domeinData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domeinData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="#94a3b8" width={70} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="inspanningen" fill="#003366" radius={[0, 4, 4, 0]} name="Inspanningen" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Geen inspanningen beschikbaar</p>
                </div>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <ChartCard
          title="Recente Activiteit"
          subtitle="Laatste wijzigingen in het systeem"
        >
          <div className="space-y-1">
            {recentActivities.map((activity, index) => (
              <RecentActivityItem key={index} {...activity} />
            ))}
          </div>
        </ChartCard>

        {/* Programma Cyclus Voortgang */}
        <ChartCard
          title="Programma Cyclus"
          subtitle={`Huidige cyclus: ${voortgang?.huidigeCyclus || 'Verkennen'}`}
        >
          <div className="space-y-4">
            {[
              { naam: 'Verkennen', id: 'verkennen', color: '#003366' },
              { naam: 'Opbouwen', id: 'opbouwen', color: '#0066cc' },
              { naam: 'Uitvoeren', id: 'uitvoeren', color: '#0088ee' },
              { naam: 'Verankeren', id: 'verankeren', color: '#00aaff' }
            ].map((cyclus, index) => {
              const isActive = voortgang?.huidigeCyclus === cyclus.id
              const isPast = ['verkennen', 'opbouwen', 'uitvoeren', 'verankeren'].indexOf(voortgang?.huidigeCyclus || 'verkennen') > index
              const progress = isPast ? 100 : isActive ? 50 : 0
              return (
                <div key={cyclus.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-slate-700'}`}>
                      {cyclus.naam}
                      {isActive && <span className="ml-2 text-xs text-blue-500">(actief)</span>}
                    </span>
                    <span className="text-slate-500">{progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: cyclus.color
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Stakeholders overview */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-2">Stakeholders ({stakeholders?.length || 0})</p>
            <div className="flex flex-wrap gap-2">
              {stakeholders?.slice(0, 4)?.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                  {s.naam}
                </span>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
