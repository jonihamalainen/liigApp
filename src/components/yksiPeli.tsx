import * as React from 'react';
import { View, StyleSheet, Image, SafeAreaView, FlatList, ScrollView, Linking} from 'react-native';
import {Card, Text} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

 const YksiPeli : React.FC = () : React.ReactElement => {

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
                      {item.homeTeamScore} {pelit[yksiPeliId - 1].homeTeam.teamName} - {item.awayTeamScore}  {pelit[yksiPeliId - 1].awayTeam.teamName}
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
                    {item.homeTeamScore} {pelit[yksiPeliId - 1].homeTeam.teamName} - {item.awayTeamScore}  {pelit[yksiPeliId - 1].awayTeam.teamName}
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
