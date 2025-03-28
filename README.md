# ValueWeigh

A modern web application for comparing options based on weighted criteria. Built with Nuxt 3, Vue 3, and Kendo UI.

## Features

- **Criteria Management**: Define and weight multiple criteria for comparison
- **Options Comparison**: Add and evaluate options against defined criteria
- **Scenario Management**: Save and load different comparison scenarios
- **Real-time Updates**: Instant recalculation of scores as you modify criteria or options
- **Responsive Design**: Works well on both desktop and mobile devices

## Tech Stack

- **Frontend Framework**: Nuxt 3
- **UI Components**: Kendo UI for Vue
- **Styling**: Bootstrap 5
- **State Management**: Vue 3 Composition API
- **Backend**: Node.js with Express

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A valid Kendo UI license key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/valueweigh.git
cd valueweigh
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Kendo UI license key:
```env
KENDO_LICENSE_KEY=your_license_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
valueweigh/
├── components/          # Vue components
│   ├── CriteriaGrid.vue    # Grid for managing criteria
│   └── OptionsGrid.vue     # Grid for managing options
├── pages/              # Application pages
│   ├── index.vue          # Landing page
│   ├── compare.vue        # Main comparison page
│   └── results.vue        # Results display page
├── plugins/            # Nuxt plugins
│   ├── bootstrap.js       # Bootstrap initialization
│   └── kendo.js          # Kendo UI setup
├── server/             # Backend server code
│   └── api/             # API endpoints
├── .env                # Environment variables
├── nuxt.config.ts      # Nuxt configuration
└── package.json        # Project dependencies
```

## Usage

1. **Define Criteria**:
   - Click "Add New Criterion" to add criteria
   - Set a name and weight (1-10) for each criterion

2. **Add Options**:
   - Click "Add New Option" to add options
   - Rate each option against the defined criteria

3. **Save Scenarios**:
   - Click "Save Scenario" to save your current comparison
   - Use the "Load Scenario" dropdown to restore saved scenarios

4. **View Results**:
   - Click "Next" to see the comparison results
   - Results are calculated based on weighted criteria scores

## Development

- **Frontend Development**:
  ```bash
  npm run dev
  ```

- **Backend Development**:
  ```bash
  cd server
  npm run dev
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Nuxt.js](https://nuxtjs.org/)
- [Kendo UI](https://www.telerik.com/kendo-vue-ui)
- [Bootstrap](https://getbootstrap.com/)
