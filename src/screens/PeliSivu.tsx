import * as React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

 const PeliSivu : React.FC = () : React.ReactElement => {
  
    const video = React.useRef(null);

    const [status, setStatus] = React.useState({});

    const route = useRoute();

    const peliId : any = route.params;

    const yksiPeliId : any = Object.values(peliId)

    const pelit = useSelector((state : RootState) => state.pelit.pelit);

  return (
  <>
    <View style={styles.container}>

      <Text
        variant="headlineLarge"
      >
        {pelit[yksiPeliId - 1].homeTeam.teamName}
      </Text>

      <Text
         variant="headlineMedium"
      >
      {pelit[yksiPeliId - 1].homeTeam.goals}
      </Text>
     
    </View>

    <View style={styles.container}>

      <Text
        variant="headlineLarge"
      >
        {pelit[yksiPeliId - 1].awayTeam.teamName}
      </Text>

      <Text
        variant="headlineMedium"
      >
        {pelit[yksiPeliId - 1].awayTeam.goals}
    </Text>

    </View>

    <View style={styles.container}>

      <Text>
        Katsojamäärä:  {pelit[yksiPeliId - 1].spectators}
      </Text>

      <Text>
        Maalit:
      </Text>
      
    </View>

    </>

)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container2: {
      marginTop: 25,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    teksti: {
        marginLeft : 5,
        marginRight : 5
    },
    video : {
      flex: 1,
      alignSelf: 'stretch'
    },
    buttons:{
      margin: 10
    }
  });

export default PeliSivu;
