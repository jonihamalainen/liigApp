import * as React from 'react';
import { View, StyleSheet, Image, FlatList, ScrollView, Linking} from 'react-native';
import {Card, Text} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { haePeli } from '../redux/yksiPeliSlice';

 const YksiPeli : React.FC = () : React.ReactElement => {

    const peli : string = useSelector((state : RootState) => state.peli.peli);

    let peliJson : any;

    let maalit : any[] = []

    if(peli.length > 0) {

       peliJson  = JSON.parse(peli);

      if(peliJson.game.homeTeam.goals > 0) {
    
        for(let i = 0; i < peliJson.game.homeTeam.goalEvents.length; i++) {
        
          maalit.push(peliJson.game.homeTeam.goalEvents[i])
            
        }
    
      }
    
      if(peliJson.game.awayTeam.goals > 0){
    
        for(let i = 0; i < peliJson.game.awayTeam.goalEvents.length; i++) {
        
          maalit.push(peliJson.game.awayTeam.goalEvents[i])
      
        }
    
      }
    
      maalit.sort((a,b) => (a.gameTime > b.gameTime) ? 1 : - 1);
    

    }


  return (
    <>
     {(peli.length > 0)
    ?  <View style={styles.container}>

    <Text
      variant="headlineLarge"
      style={{marginTop: 15}}
    >
      {peliJson.game.homeTeam.teamName}
    </Text>

    <Text
      variant="headlineMedium"
    >
    {peliJson.game.homeTeam.goals}
    </Text>

    <Text
      variant="headlineLarge"
      style={{marginTop: 25}}
    >
      {peliJson.game.awayTeam.teamName}
    </Text>

    <Text
      variant="headlineMedium"
    >
      {peliJson.game.awayTeam.goals}
  </Text>

    <Text
      variant='headlineSmall'
      style={{marginTop: 15}}
    >
      Katsojamäärä:  {peliJson.game.spectators}
    </Text>

    <Text
    variant='headlineSmall'
      style={{marginTop: 15}}
    >
      Maalit:
    </Text>

      <FlatList
        data={maalit}
        keyExtractor={(maali : any, index : number) => `${index}`}
        renderItem={({item, index}) => {

          const KaikkiSekunnit : number = item.gameTime;

          const minuutit : number = Math.floor(KaikkiSekunnit / 60);

          const sekunnit : number = KaikkiSekunnit % 60

          function padTo2Digits(num: { toString: () => string; }) {
            return num.toString().padStart(2, '0');
          }

          const peliAika : string = `${padTo2Digits(minuutit)}:${padTo2Digits(sekunnit)}`;
          
          return(

            <ScrollView>

              {(item.videoThumbnailUrl !== null)

                ?<Card
                  onPress={() => Linking.openURL(`${item.videoClipUrl}`)}
                >

                  <Text
                    style={{fontSize: 20, marginTop: 15}}
                  >
                    {item.homeTeamScore} {peliJson.game.homeTeam.teamName} - {item.awayTeamScore}  {peliJson.game.awayTeam.teamName}
                  </Text>

                  <Text
                    style={{marginBottom: 5}}
                  >
                    Aika: {peliAika}
                  </Text>
                  
                  <Image
                  style={styles.stretch}
                    source={{
                      uri: `${item.videoThumbnailUrl}`,
                    }}
                />

                </Card>

                :<Card>

                <Text
                  style={{fontSize: 20, marginTop: 15}}
                >
                  {item.homeTeamScore} {peliJson.game.homeTeam.teamName} - {item.awayTeamScore}  {peliJson.game.awayTeam.teamName}
                </Text>

                <Text
                    style={{marginBottom: 5}}
                >
                    Aika: {peliAika}
                </Text>
                
                <Text>
                  Videota  ei saatavilla
                </Text>

              </Card>

              }

            </ScrollView>

          )

        }}
      />

  </View>
    : null
    }
     

    </>

)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    stretch: {
      width: 200,
      height: 150,
      resizeMode: 'stretch',
    },
  });

export default YksiPeli;
