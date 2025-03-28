const express = require('express')
const cors = require('cors')
const fs = require('fs').promises
const path = require('path')

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Path to scenarios file
const SCENARIOS_FILE = path.join(__dirname, 'scenarios.json')

// Helper function to read scenarios
async function readScenarios() {
  try {
    const data = await fs.readFile(SCENARIOS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return []
  }
}

// Helper function to write scenarios
async function writeScenarios(scenarios) {
  await fs.writeFile(SCENARIOS_FILE, JSON.stringify(scenarios, null, 2))
}

// GET /api/scenarios
app.get('/api/scenarios', async (req, res) => {
  try {
    const scenarios = await readScenarios()
    res.json(scenarios)
  } catch (error) {
    console.error('Error reading scenarios:', error)
    res.status(500).json({ error: 'Failed to read scenarios' })
  }
})

// POST /api/scenarios
app.post('/api/scenarios', async (req, res) => {
  try {
    const { name, criteria, options } = req.body

    // Validate required fields
    if (!name || !criteria || !options) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Read existing scenarios
    const scenarios = await readScenarios()

    // Create new scenario
    const newScenario = {
      id: Date.now(), // Simple ID generation
      name,
      criteria,
      options,
      createdAt: new Date().toISOString()
    }

    // Add to scenarios array
    scenarios.push(newScenario)

    // Write back to file
    await writeScenarios(scenarios)

    res.status(201).json(newScenario)
  } catch (error) {
    console.error('Error saving scenario:', error)
    res.status(500).json({ error: 'Failed to save scenario' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
}) 