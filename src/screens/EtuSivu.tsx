import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { haePelit } from '../redux/pelitSlice';


 const EtuSivu : React.FC = () : React.ReactElement => {

    const haettu : React.MutableRefObject<boolean> = React.useRef<boolean>(false);

    const dispatch : AppDispatch = useDispatch();

    const pelit = useSelector((state : RootState) => state.pelit.pelit);

    React.useEffect(() => {

        if(!haettu.current) {
    
          dispatch(haePelit());
    
        }
    
        return () => { haettu.current = true}
    
        }, 
      [dispatch]);

  return (

    <View style={styles.container}>

        <Text>
            Etusivu
        </Text>

        

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
  });

export default EtuSivu;
