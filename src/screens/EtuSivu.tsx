import { View, StyleSheet, ScrollView, Text } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { haePelit } from '../redux/pelitSlice';
import { List } from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/fi';


 const EtuSivu : React.FC = () : React.ReactElement => {

    const haettu : React.MutableRefObject<boolean> = React.useRef<boolean>(false);

    const dispatch : AppDispatch = useDispatch();

    const pelit = useSelector((state : RootState) => state.pelit.pelit);

    moment.locale();

    React.useEffect(() => {

        if(!haettu.current) {
    
          dispatch(haePelit());
    
        }
    
        return () => { haettu.current = true}
    
        }, 
      [dispatch]);

  return (

    <View style={styles.container}>

        <Text
            style={styles.teksti}
        >
            Klikkaa ottelua avataksesi ottelun tiedot
        </Text>

        <Text>
            tähän tulee pickeri
        </Text>

        <List.Section 
            title="Ottelut:"
            style={{width : "100%"}}
        >

        <ScrollView
            style={{ marginBottom : 5, height : "85%"}}
        >

        {pelit.map((peli : any, idx : number) => (
            peli.ended && peli.started
                ?<>
                <List.Item
                    key={idx}
                    title={"Ottelu loppu"}
                    description={peli.homeTeam.teamName + " " + peli.homeTeam.goals + "\n" + peli.awayTeam.teamName + " " + peli.awayTeam.goals} 
                />
                </>
                : !peli.ended && !peli.started
                ?<>
                <List.Item
                    key={idx}
                    titleNumberOfLines = {2}
                    titleStyle={{fontSize : 14}}
                    title={"Ottelu alkaa: " + "\n" + moment(peli.start).locale('fi').format('LLL')}
                    description={peli.homeTeam.teamName + " " + peli.homeTeam.goals + "\n" + peli.awayTeam.teamName + " " + peli.awayTeam.goals} 
                />
                </>
                : peli.started && !peli.ended
                ? <>
                <List.Item
                    key={idx}
                    title={"Ottelu käynnissä"}
                    description={peli.homeTeam.teamName + " " + peli.homeTeam.goals + "\n" + peli.awayTeam.teamName + " " + peli.awayTeam.goals} 
                />
                </>
                : 
                <Text>
                    Virhe ottelutiedoissa
                </Text>
            ))}

        </ScrollView>

        </List.Section>

        <StatusBar style="auto" />

    </View>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    teksti: {
        marginLeft : 5,
        marginRight : 5
    }
  });

export default EtuSivu;
