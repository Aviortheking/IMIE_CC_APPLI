// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
const remote = 'http://localhost:3000'
import MapView from 'react-native-maps';
class HomeScreen extends React.Component<{navigation: any}, {data:Array<{
    pseudo: string
    path: string
}>}> {
    public async componentDidMount() {
        const request = await fetch(remote + '/api/photos')
        const data = await request.json()
        this.setState({data})
    }
    public render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            {this.state && this.state.data && this.state.data.map((el, index) => (
                <View key={index}>
                    <Image source={{uri: `${remote}${el.path}`}} style={{width: 400, height: 200}}/>
                    <Text>Author {el.pseudo}</Text>
                </View>
            
            )) || (
                <Text>Loading Shares</Text>
            )}
            <Button onPress={() => this.props.navigation.navigate('Tracker')} title="Test" />
            </View>
        );
    
    }
}

function TrackerScreen({ navigation }: {navigation: any}) {
    return (
        <View>
            <MapView style={{flex: 1}} />
            <Button onPress={trackerPress} title="Activer le tracker" />
        </View>
    )
}

async function trackerPress() { 
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    await Geolocation.getCurrentPosition((info: any) => console.log(info), (error) => console.log(error))
    // geolocation.requestAuthorization();
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Partager une Image" component={HomeScreen} />
        <Stack.Screen name="Tracker" component={TrackerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;