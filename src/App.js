
import './App.scss';
import CampaignTracker from './components/CampaignTracker';

function App() {
  return (
    <div className="App">
      <CampaignTracker 
        campaign={{campaignDays: 30, days: [{number: 1, complete: true}]}}
        hunters={[{hunterName: 'Frost'}]}
      />
    </div>
  );
}

export default App;
