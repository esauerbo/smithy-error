import { ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { LivenessQuickStartReact } from './LivenessQuickStartReact';

Amplify.configure(awsExports);

function App() {

  return (
    <>
      <ThemeProvider>
        <LivenessQuickStartReact />
      </ThemeProvider>
    </>
  );
}

export default App;
