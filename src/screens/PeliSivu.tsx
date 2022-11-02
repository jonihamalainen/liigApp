import * as React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

 const PeliSivu : React.FC = () : React.ReactElement => {

    const route = useRoute();

    const peliId : any = route.params;

    const yksiPeliId : any = Object.values(peliId)

    const pelit = useSelector((state : RootState) => state.pelit.pelit);

    const maalit : any[] = [];

  if(pelit[yksiPeliId - 1].homeTeam.goals > 0) {

    for(let i = 0; i < pelit[yksiPeliId - 1].homeTeam.goalEvents.length; i++) {
    
      maalit.push(pelit[yksiPeliId  - 1].homeTeam.goalEvents[i])
        
    }

  }

  if(pelit[yksiPeliId - 1].awayTeam.goals > 0){

    for(let i = 0; i < pelit[yksiPeliId - 1].awayTeam.goalEvents.length; i++) {
    
      maalit.push(pelit[yksiPeliId - 1].awayTeam.goalEvents[i])
  
    }

  }

  maalit.sort((a,b) => (a.gameTime > b.gameTime) ? 1 : - 1);

  console.log(maalit);

  return (
  <>
    <View style={styles.container}>

      <Text
        variant="headlineLarge"
        style={{marginTop: 15}}
      >
        {pelit[yksiPeliId - 1].homeTeam.teamName}
      </Text>

      <Text
         variant="headlineMedium"
      >
      {pelit[yksiPeliId - 1].homeTeam.goals}
      </Text>

      <Text
        variant="headlineLarge"
        style={{marginTop: 25}}
      >
        {pelit[yksiPeliId - 1].awayTeam.teamName}
      </Text>

      <Text
        variant="headlineMedium"
      >
        {pelit[yksiPeliId - 1].awayTeam.goals}
    </Text>

      <Text
        variant='headlineSmall'
        style={{marginTop: 15}}
      >
        Katsojamäärä:  {pelit[yksiPeliId - 1].spectators}
      </Text>

      <Text
        style={{marginTop: 15}}
      >
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
    }
  });

export default PeliSivu;
