import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

// Dummy data for different chart types
const productionData = [
  { month: 'Jan', batches: 45, revenue: 32000 },
  { month: 'Feb', batches: 52, revenue: 38000 },
  { month: 'Mar', batches: 48, revenue: 35000 },
  { month: 'Apr', batches: 61, revenue: 42000 },
  { month: 'May', batches: 55, revenue: 40000 },
  { month: 'Jun', batches: 67, revenue: 48000 }
]

const distributionData = [
  { name: 'Distributed', value: 65, color: 'hsl(var(--primary))' },
  { name: 'In Stock', value: 25, color: 'hsl(var(--accent))' },
  { name: 'Pending', value: 10, color: 'hsl(var(--muted))' }
]

const salesData = [
  { week: 'Week 1', sales: 24, target: 30 },
  { week: 'Week 2', sales: 28, target: 30 },
  { week: 'Week 3', sales: 32, target: 30 },
  { week: 'Week 4', sales: 29, target: 30 }
]

const temperatureData = [
  { time: '00:00', temp: 2.5 },
  { time: '04:00', temp: 3.1 },
  { time: '08:00', temp: 2.8 },
  { time: '12:00', temp: 3.4 },
  { time: '16:00', temp: 2.9 },
  { time: '20:00', temp: 2.6 }
]

interface ProductionChartProps {
  title?: string
  description?: string
}

export function ProductionChart({ title = "Production Analytics", description = "Monthly batch production and revenue" }: ProductionChartProps) {
  return (
    <Card className="blockchain-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="batches"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stackId="2"
              stroke="hsl(var(--accent))"
              fill="hsl(var(--accent))"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface DistributionChartProps {
  title?: string
  description?: string
}

export function DistributionChart({ title = "Distribution Status", description = "Current inventory distribution" }: DistributionChartProps) {
  return (
    <Card className="blockchain-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface SalesChartProps {
  title?: string
  description?: string
}

export function SalesChart({ title = "Sales Performance", description = "Weekly sales vs targets" }: SalesChartProps) {
  return (
    <Card className="blockchain-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface TemperatureChartProps {
  title?: string
  description?: string
}

export function TemperatureChart({ title = "Temperature Monitoring", description = "Cold chain temperature tracking" }: TemperatureChartProps) {
  return (
    <Card className="blockchain-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--accent))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}