// Importing
import React, {useState, useEffect} from 'react';
import StatusBar from './components/STATUSBAR';
import COLORS from './config/COLORS';
import {NavigationContainer} from '@react-navigation/native';
import HomeDrawer from './navigators/drawers/HomeDrawer';



// Root functional component
const App = () => {
  // Local states
  const [isLoading, setIsLoading] = useState(true);
  
  // Hooks
  useEffect(() => {
    // Updating state value after 2.5 seconds of delay. You may change the value of milliseconds(2500) as per your need.
    setTimeout(() => {
      // Updating state
      setIsLoading(false);
    }, 2500);
  }, []);

  // Checking & comparing
  if (isLoading) {
    // Returning
   // return <Login />;
  }

  // Returning
  return (
    <NavigationContainer>
      {/* Custom stausbar */}
      <StatusBar
        backgroundColor={COLORS.primaryDark}
        barStyle="light-content"
      />
      {/* Drawer navigator */}
      <HomeDrawer />
    </NavigationContainer>
  );
};

// Exporting
export default App;
