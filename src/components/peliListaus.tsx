import { View, StyleSheet, ScrollView, Text, Pressable, Button } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { haePelit } from '../redux/pelitSlice';
import { List } from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/fi';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

 const PeliListaus : React.FC = () : React.ReactElement => {

    const navigation : any = useNavigation();

    const haettu : React.MutableRefObject<boolean> = React.useRef<boolean>(false);

    const dispatch : AppDispatch = useDispatch();

    const pelit = useSelector((state : RootState) => state.pelit.pelit);

    const [date, setDate] = React.useState(new Date());

    const paivanPelit : any[] = [];

    moment.locale();

    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date: any) => {
      setDate(date);
      hideDatePicker();
    };


    let paiva : any = date.toLocaleDateString('fi-Fi');

        for(let i = 0; i < pelit.length; i++) {

            let pelinPaiva : any = new Date(pelit[i].start).toLocaleDateString('fi-Fi');

            if(paiva === pelinPaiva )
        
            paivanPelit.push(pelit[i])
            
        }
        
      
    React.useEffect(() => {

        if(!haettu.current) {
    
          dispatch(haePelit());
    
        }

        const interval = setInterval(() => {
            dispatch(haePelit());
          }, 120000);
    
        return () => { haettu.current = true}
    
        }, 
      [dispatch]);

  return (

    <View style={styles.container}>

        <Text
            style={styles.teksti}
        >
            {paiva}
        </Text>

        <Button title="Avaa kalenteri" onPress={showDatePicker} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

        <List.Section 
            title="Ottelut:"
            style={{width : "100%"}}
        >

        <ScrollView
            style={{ marginBottom : 5, height : "85%"}}
        >


        {(paivanPelit.length > 0)
        ? paivanPelit.map((peli : any) => (
            peli.ended && peli.started
                ?<>
                    <Pressable
                        onPress={() => navigation.navigate('LiigaApp - Ottelu', {
                            peliId : peli.id
                        })}
                    >
                        <List.Item
                            key={peli.id}
                            title={"Ottelu loppu"}
                            description={peli.homeTeam.teamName + " " + peli.homeTeam.goals + "\n" + peli.awayTeam.teamName + " " + peli.awayTeam.goals} 
                        />
                    </Pressable>
                </>
                : !peli.ended && !peli.started
                ?<>
                 <Pressable
                        onPress={() => navigation.navigate('LiigaApp - Ottelu', {
                            peliId : peli.id
                        })}
                    >
                    <List.Item
                        key={peli.id}
                        titleNumberOfLines = {2}
                        titleStyle={{fontSize : 14}}
                        title={"Ottelu alkaa: " + "\n" + moment(peli.start).locale('fi').format('LLL')}
                        description={peli.homeTeam.teamName + " " + peli.homeTeam.goals + "\n" + peli.awayTeam.teamName + " " + peli.awayTeam.goals} 
                    />
                </Pressable>
                </>
                : peli.started && !peli.ended
                ? <>
                <Pressable
                        onPress={() => navigation.navigate('LiigaApp - Ottelu', {
                            peliId : peli.id
                        })}
                    >
                <List.Item
                    key={peli.id}
                    title={"Ottelu käynnissä"}
                    description={peli.homeTeam.teamName + " " + peli.homeTeam.goals + "\n" + peli.awayTeam.teamName + " " + peli.awayTeam.goals} 
                />
                </Pressable>
                </>
                : 
                <Text>
                    Virhe ottelutiedoissa
                </Text>
            ))
        :<Text>
            Ei otteluita
        </Text>
        }

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
        marginTop: 5,
        marginLeft : 5,
        marginRight : 5
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
  });

export default PeliListaus;
