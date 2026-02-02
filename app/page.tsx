'use client'

import { useState } from 'react'

export default function Home() {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [monthlyUsers, setMonthlyUsers] = useState('')
  const [avgSessionLength, setAvgSessionLength] = useState('')
  const [result, setResult] = useState<{
    dailyUsers: number
    hourlyAvg: number
    weeklyUsers: number
  } | null>(null)

  const calculateDailyUsers = () => {
    const monthly = parseFloat(monthlyUsers)

    if (isNaN(monthly) || monthly <= 0) {
      alert('Please enter valid numbers')
      return
    }

    const dailyUsers = Math.round(monthly / 30)
    const hourlyAvg = Math.round(dailyUsers / 24)
    const weeklyUsers = Math.round(dailyUsers * 7)

    setResult({
      dailyUsers,
      hourlyAvg,
      weeklyUsers
    })
  }

  const resetForm = () => {
    setWebsiteUrl('')
    setMonthlyUsers('')
    setAvgSessionLength('')
    setResult(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculateDailyUsers()
    }
  }

  return (
    <main className="container">
      <h1>Daily User Calculator</h1>
      <p className="subtitle">Calculate daily incoming users for any website</p>

      <div className="input-group">
        <label>Website URL</label>
        <input
          type="text"
          placeholder="e.g., example.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="input-group">
        <label>Monthly Users</label>
        <input
          type="number"
          placeholder="e.g., 30000"
          value={monthlyUsers}
          onChange={(e) => setMonthlyUsers(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="input-group">
        <label>Avg Session Length (minutes) - Optional</label>
        <input
          type="number"
          placeholder="e.g., 5"
          value={avgSessionLength}
          onChange={(e) => setAvgSessionLength(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="button-group">
        <button className="calculate-btn" onClick={calculateDailyUsers}>
          Calculate
        </button>
        <button className="reset-btn" onClick={resetForm}>
          Reset
        </button>
      </div>

      {result && (
        <div className="result">
          <div className="result-label">Daily Incoming Users</div>
          <div className="result-value">{result.dailyUsers.toLocaleString()}</div>

          <div className="result-details">
            <div className="detail-item">
              <div className="detail-label">Hourly Average</div>
              <div className="detail-value">{result.hourlyAvg.toLocaleString()}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Weekly Users</div>
              <div className="detail-value">{result.weeklyUsers.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
